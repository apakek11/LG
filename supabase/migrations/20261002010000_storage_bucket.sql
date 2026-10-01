-- =========================================================================
-- Bucket Storage untuk foto tempat (sempat gagal dibuat di migration awal).
-- Aman dijalankan berkali-kali.
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
