-- =========================================================================
-- Lokal Gem — skema database Supabase
-- Mengacu pada docs/srs.md (Kebutuhan Data & Hak Akses Pengguna) dan model
-- data yang sudah dipakai di frontend (src/types/tempat.ts).
--
-- Cara pakai:
--   supabase db push            (via Supabase CLI), atau
--   tempel isi file ini ke Supabase Studio > SQL Editor > Run
--
-- File ini aman dijalankan berkali-kali (idempotent): setiap CREATE
-- memakai IF NOT EXISTS / OR REPLACE, atau didahului DROP ... IF EXISTS,
-- supaya tidak error "already exists" kalau sebelumnya sempat gagal
-- di tengah jalan lalu di-run ulang dari awal.
-- =========================================================================

create extension if not exists pgcrypto; -- menyediakan gen_random_uuid()

-- =========================================================================
-- 1. PROFILES — melengkapi auth.users bawaan Supabase Auth
--    Password TIDAK disimpan di sini: ditangani & di-hash oleh Supabase Auth
--    (auth.users), sesuai NFR-03 SRS.
-- =========================================================================
create table if not exists public.profiles (
  id         uuid primary key references auth.users (id) on delete cascade,
  nama       text not null,
  role       text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now()
);

comment on table public.profiles is 'Data tambahan pengguna (FR-01/FR-02), 1:1 dengan auth.users.';

-- Otomatis buat baris profiles setiap kali ada pengguna baru yang mendaftar.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, nama)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'nama', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =========================================================================
-- 2. KATEGORI
-- =========================================================================
create table if not exists public.kategori (
  id     text primary key,          -- slug, mis. 'coffee-shop'
  nama   text not null unique,
  icon   text not null,             -- nama ikon Material Symbols
  urutan int  not null default 0
);

comment on table public.kategori is 'Daftar kategori tempat (fitur Kategori di PRD).';

-- =========================================================================
-- 3. TEMPAT
-- =========================================================================
create table if not exists public.tempat (
  id           text primary key,    -- slug, mis. 'kopi-seduhan-senja'
  nama_tempat  text not null,
  deskripsi    text not null default '',
  alamat       text not null,
  kategori_id  text not null references public.kategori (id),
  suasana      text not null,
  harga_label  text not null,
  foto         text[] not null default '{}',
  fasilitas    text[] not null default '{}',
  jam_buka     time not null,
  jam_tutup    time not null,
  latitude     double precision not null,
  longitude    double precision not null,
  rating       numeric(2, 1) not null default 0 check (rating between 0 and 5),
  jumlah_review int not null default 0,
  dibuat_oleh  uuid references public.profiles (id) on delete set null,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

comment on table public.tempat is 'Data tempat nongkrong (FR-03, FR-06, FR-11).';
comment on column public.tempat.rating is 'Dihitung ulang otomatis dari tabel review via trigger.';
comment on column public.tempat.jumlah_review is 'Dihitung ulang otomatis dari tabel review via trigger.';

-- Kolom pencarian penuh teks untuk FR-04 (cari berdasarkan nama/kata kunci).
alter table public.tempat
  add column if not exists pencarian tsvector generated always as (
    setweight(to_tsvector('simple', coalesce(nama_tempat, '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(suasana, '')), 'B') ||
    setweight(to_tsvector('simple', coalesce(deskripsi, '')), 'C')
  ) stored;

create index if not exists idx_tempat_pencarian on public.tempat using gin (pencarian);
create index if not exists idx_tempat_kategori  on public.tempat (kategori_id);
create index if not exists idx_tempat_fasilitas on public.tempat using gin (fasilitas);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_tempat_updated_at on public.tempat;
create trigger trg_tempat_updated_at
  before update on public.tempat
  for each row execute function public.set_updated_at();

-- =========================================================================
-- 4. REVIEW
--    nama_user disimpan sebagai salinan (snapshot) nama saat ulasan dibuat,
--    supaya tampilan ulasan tidak perlu join ke profiles (FR-08).
--    user_id boleh NULL agar data ulasan lama/seed tetap bisa disimpan.
-- =========================================================================
create table if not exists public.review (
  id         uuid primary key default gen_random_uuid(),
  tempat_id  text not null references public.tempat (id) on delete cascade,
  user_id    uuid references public.profiles (id) on delete set null,
  nama_user  text not null,
  rating     smallint not null check (rating between 1 and 5),
  komentar   text not null,
  created_at timestamptz not null default now()
);

comment on table public.review is 'Ulasan & rating pengguna terhadap tempat (FR-08).';

create index if not exists idx_review_tempat on public.review (tempat_id);
create index if not exists idx_review_user   on public.review (user_id);

-- Jaga rating & jumlah_review di tabel tempat tetap sinkron.
-- Catatan: NEW tidak terisi saat DELETE dan OLD tidak terisi saat INSERT,
-- jadi id tempat yang terpengaruh ditentukan lewat TG_OP, bukan coalesce().
create or replace function public.refresh_rating_tempat()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  affected text[];
  tid text;
begin
  if TG_OP = 'DELETE' then
    affected := array[old.tempat_id];
  elsif TG_OP = 'INSERT' then
    affected := array[new.tempat_id];
  elsif old.tempat_id is distinct from new.tempat_id then
    affected := array[old.tempat_id, new.tempat_id];
  else
    affected := array[new.tempat_id];
  end if;

  foreach tid in array affected loop
    update public.tempat t
    set rating        = coalesce((select round(avg(r.rating)::numeric, 1) from public.review r where r.tempat_id = tid), 0),
        jumlah_review = (select count(*) from public.review r where r.tempat_id = tid),
        updated_at    = now()
    where t.id = tid;
  end loop;

  return null;
end;
$$;

drop trigger if exists trg_review_refresh_rating on public.review;
create trigger trg_review_refresh_rating
  after insert or update or delete on public.review
  for each row execute function public.refresh_rating_tempat();

-- =========================================================================
-- 5. FAVORIT
-- =========================================================================
create table if not exists public.favorit (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references public.profiles (id) on delete cascade,
  tempat_id  text not null references public.tempat (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, tempat_id)
);

comment on table public.favorit is 'Tempat yang disimpan pengguna (FR-07).';

create index if not exists idx_favorit_user on public.favorit (user_id);

-- =========================================================================
-- 6. HELPER: cek apakah pengguna yang login adalah admin
-- =========================================================================
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer set search_path = public
as $$
  select exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  );
$$;

-- =========================================================================
-- 7. ROW LEVEL SECURITY
--    Mengikuti tabel "Hak Akses Pengguna" di docs/srs.md.
-- =========================================================================
alter table public.profiles enable row level security;
alter table public.kategori enable row level security;
alter table public.tempat   enable row level security;
alter table public.review   enable row level security;
alter table public.favorit  enable row level security;

-- profiles: pemilik akun & admin bisa lihat; pemilik & admin bisa ubah.
drop policy if exists "profiles_select" on public.profiles;
create policy "profiles_select" on public.profiles
  for select using (auth.uid() = id or public.is_admin());

drop policy if exists "profiles_update_self" on public.profiles;
create policy "profiles_update_self" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists "profiles_update_admin" on public.profiles;
create policy "profiles_update_admin" on public.profiles
  for update using (public.is_admin());

-- kategori: semua orang bisa lihat; hanya admin bisa ubah (FR-10/FR-11).
drop policy if exists "kategori_select_public" on public.kategori;
create policy "kategori_select_public" on public.kategori
  for select using (true);

drop policy if exists "kategori_admin_write" on public.kategori;
create policy "kategori_admin_write" on public.kategori
  for all using (public.is_admin()) with check (public.is_admin());

-- tempat: semua orang (termasuk pengunjung belum login) bisa lihat & cari;
-- hanya admin yang bisa menambah/mengubah/menghapus (FR-10/FR-11).
drop policy if exists "tempat_select_public" on public.tempat;
create policy "tempat_select_public" on public.tempat
  for select using (true);

drop policy if exists "tempat_admin_write" on public.tempat;
create policy "tempat_admin_write" on public.tempat
  for all using (public.is_admin()) with check (public.is_admin());

-- review: semua orang bisa baca; hanya pengguna login yang bisa menulis
-- ulasan atas namanya sendiri; pemilik ulasan atau admin bisa menghapus
-- (FR-08, FR-10 "mengelola review").
drop policy if exists "review_select_public" on public.review;
create policy "review_select_public" on public.review
  for select using (true);

drop policy if exists "review_insert_own" on public.review;
create policy "review_insert_own" on public.review
  for insert to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "review_update_own" on public.review;
create policy "review_update_own" on public.review
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "review_delete_own_or_admin" on public.review;
create policy "review_delete_own_or_admin" on public.review
  for delete using (auth.uid() = user_id or public.is_admin());

-- favorit: hanya pemilik akun yang boleh melihat/menambah/menghapus
-- miliknya sendiri (FR-07).
drop policy if exists "favorit_select_own" on public.favorit;
create policy "favorit_select_own" on public.favorit
  for select using (auth.uid() = user_id);

drop policy if exists "favorit_insert_own" on public.favorit;
create policy "favorit_insert_own" on public.favorit
  for insert to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "favorit_delete_own" on public.favorit;
create policy "favorit_delete_own" on public.favorit
  for delete using (auth.uid() = user_id);

-- =========================================================================
-- 8. STORAGE (opsional) — bucket untuk foto tempat yang diunggah admin
-- =========================================================================
insert into storage.buckets (id, name, public)
values ('tempat-foto', 'tempat-foto', true)
on conflict (id) do nothing;

drop policy if exists "tempat_foto_public_read" on storage.objects;
create policy "tempat_foto_public_read" on storage.objects
  for select using (bucket_id = 'tempat-foto');

drop policy if exists "tempat_foto_admin_write" on storage.objects;
create policy "tempat_foto_admin_write" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'tempat-foto' and public.is_admin());

drop policy if exists "tempat_foto_admin_update" on storage.objects;
create policy "tempat_foto_admin_update" on storage.objects
  for update using (bucket_id = 'tempat-foto' and public.is_admin());

drop policy if exists "tempat_foto_admin_delete" on storage.objects;
create policy "tempat_foto_admin_delete" on storage.objects
  for delete using (bucket_id = 'tempat-foto' and public.is_admin());
