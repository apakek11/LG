-- =========================================================================
-- Ganti kategori "Workspace" menjadi "Tempat Makan" (id tetap 'workspace'
-- supaya tidak perlu migrasi ulang relasi kategori_id di tabel tempat;
-- belum ada tempat asli yang memakai kategori ini).
-- =========================================================================

update public.kategori
set nama = 'Tempat Makan', icon = 'lunch_dining'
where id = 'workspace';
