-- =========================================================================
-- Tambah tempat baru: Bubur Ayam Barito (kategori Kuliner Malam).
-- Koordinat diambil dari parameter !3d!4d hasil redirect link Google Maps
-- yang dikirim pengguna — titik marker tempat sesungguhnya.
--
-- Harga & jam buka diisi berdasarkan sumber publik (media sosial resmi
-- tempat ini) yang alamatnya cocok persis dengan titik Maps di atas;
-- tetap bisa dikoreksi manual kalau ada perubahan terbaru.
-- Suasana & deskripsi ringkas berdasarkan reputasinya yang dikenal luas
-- sebagai bubur ayam legendaris di kawasan Barito/Gandaria.
-- Foto masih placeholder (belum ada foto asli yang diupload).
-- =========================================================================

insert into public.tempat
  (id, nama_tempat, deskripsi, alamat, kategori_id, suasana, harga_label, foto, fasilitas, jam_buka, jam_tutup, latitude, longitude, rating, jumlah_review)
values
  ('bubur-ayam-barito', 'Bubur Ayam Barito',
    'Bubur ayam legendaris di kawasan Barito/Gandaria, Jakarta Selatan, dikenal luas dengan porsi besar, topping ayam kampung, dan aneka sate.',
    'Jl. Gandaria Tengah III No.3, RT.3/RW.4, Kramat Pela, Kec. Kby. Baru, Kota Jakarta Selatan, DKI Jakarta 12130',
    'kuliner-malam', 'Legendaris & Kaki Lima', 'Rp 24k - Rp 30k',
    array['data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTJlMmUyIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjI4IiBmaWxsPSIjNzY3NzdjIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5Gb3RvIGJlbHVtIHRlcnNlZGlhPC90ZXh0Pjwvc3ZnPg=='],
    array['Fasilitas belum diisi'],
    '15:30', '00:00', -6.2464773, 106.7930381, 0, 0)
on conflict (id) do nothing;
