-- =========================================================================
-- Hapus kategori "Rooftop" (tidak dipakai lagi).
-- Aman: tidak ada tempat asli yang memakai kategori_id = 'rooftop' saat ini.
-- Kalau ternyata masih ada tempat yang memakainya, DELETE ini akan gagal
-- dengan error foreign key constraint (bukan menghapus diam-diam) —
-- pindahkan dulu kategori_id tempat tsb sebelum menghapus baris ini.
-- =========================================================================

delete from public.kategori
where id = 'rooftop';
