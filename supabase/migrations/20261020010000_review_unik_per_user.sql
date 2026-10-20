-- =========================================================================
-- Satu pengguna hanya boleh punya satu review per tempat (blueprint §5).
-- Kalau ingin mengubah penilaian, pengguna mengedit review lamanya
-- (policy review_update_own sudah ada), bukan menulis review baru.
--
-- Review lama dengan user_id NULL (data seed/akun terhapus) tidak terkena:
-- di Postgres, NULL tidak dianggap sama dalam constraint UNIQUE.
-- Aman dijalankan berkali-kali.
-- =========================================================================

-- Bersihkan duplikat yang mungkin sudah terlanjur ada: simpan yang terbaru.
delete from public.review r
using public.review lebih_baru
where r.user_id is not null
  and r.user_id = lebih_baru.user_id
  and r.tempat_id = lebih_baru.tempat_id
  and (r.created_at, r.id) < (lebih_baru.created_at, lebih_baru.id);

alter table public.review drop constraint if exists review_user_tempat_unik;
alter table public.review
  add constraint review_user_tempat_unik unique (user_id, tempat_id);
