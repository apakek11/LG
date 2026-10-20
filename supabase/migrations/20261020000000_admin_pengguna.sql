-- =========================================================================
-- Dukungan halaman Admin (FR-10): daftar pengguna lengkap dengan email.
--
-- Email tersimpan di auth.users yang tidak bisa dibaca langsung dari
-- client, jadi dibungkus fungsi SECURITY DEFINER yang menolak semua
-- pemanggil selain admin. Aman dijalankan berkali-kali.
-- =========================================================================

create or replace function public.admin_list_users()
returns table (
  id             uuid,
  nama           text,
  email          text,
  role           text,
  created_at     timestamptz,
  jumlah_review  bigint,
  jumlah_favorit bigint
)
language plpgsql
stable
security definer set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'Hanya admin yang boleh melihat data pengguna.' using errcode = '42501';
  end if;

  return query
    select
      p.id,
      p.nama,
      u.email::text,
      p.role,
      p.created_at,
      (select count(*) from public.review r where r.user_id = p.id),
      (select count(*) from public.favorit f where f.user_id = p.id)
    from public.profiles p
    join auth.users u on u.id = p.id
    order by p.created_at desc;
end;
$$;

revoke all on function public.admin_list_users() from public, anon;
grant execute on function public.admin_list_users() to authenticated;

-- Pengguna biasa boleh mengubah profilnya sendiri (policy profiles_update_self),
-- tapi tidak boleh menaikkan role-nya sendiri jadi admin.
-- auth.uid() NULL berarti perubahan datang dari SQL Editor / service role
-- (bukan dari aplikasi), jadi dibiarkan — itu cara menunjuk admin pertama.
-- Pengunjung anonim tetap tidak bisa sampai sini karena ditolak RLS.
create or replace function public.cegah_ubah_role_sendiri()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  if new.role is distinct from old.role and auth.uid() is not null and not public.is_admin() then
    raise exception 'Role hanya bisa diubah oleh admin.' using errcode = '42501';
  end if;
  return new;
end;
$$;

drop trigger if exists trg_profiles_role_guard on public.profiles;
create trigger trg_profiles_role_guard
  before update on public.profiles
  for each row execute function public.cegah_ubah_role_sendiri();
