-- =========================================================================
-- Testimoni & rating pengguna untuk WEBSITE Lokal Gem secara keseluruhan
-- (berbeda dari tabel `review`, yang menilai tempat/cafe tertentu).
-- Aman dijalankan berkali-kali.
-- =========================================================================

create table if not exists public.testimoni (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references public.profiles (id) on delete set null,
  nama_user  text not null,
  rating     smallint not null check (rating between 1 and 5),
  komentar   text not null,
  created_at timestamptz not null default now()
);

comment on table public.testimoni is 'Ulasan & rating pengguna terhadap website Lokal Gem secara keseluruhan.';

create index if not exists idx_testimoni_created on public.testimoni (created_at desc);

alter table public.testimoni enable row level security;

-- Semua orang (termasuk pengunjung belum login) bisa membaca testimoni.
drop policy if exists "testimoni_select_public" on public.testimoni;
create policy "testimoni_select_public" on public.testimoni
  for select using (true);

-- Hanya pengguna yang sudah login yang bisa menambah testimoni atas namanya sendiri.
drop policy if exists "testimoni_insert_own" on public.testimoni;
create policy "testimoni_insert_own" on public.testimoni
  for insert to authenticated
  with check (auth.uid() = user_id);

-- Pemilik testimoni atau admin bisa menghapus.
drop policy if exists "testimoni_delete_own_or_admin" on public.testimoni;
create policy "testimoni_delete_own_or_admin" on public.testimoni
  for delete using (auth.uid() = user_id or public.is_admin());
