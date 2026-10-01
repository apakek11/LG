-- =========================================================================
-- Ganti seluruh katalog demo (13 tempat fiktif) dengan tempat ASLI yang
-- dikirim pengguna. Koordinat diambil dari parameter !3d!4d hasil redirect
-- link Google Maps (maps.app.goo.gl/...) yang dikirim — itu adalah titik
-- marker tempat sesungguhnya, bukan sekadar titik tengah peta.
--
-- PENTING — field yang BELUM diisi datanya oleh pengguna (ditandai jelas
-- sebagai placeholder, bukan data asli):
--   - kategori  : ditebak "Coffee Shop" untuk semua (nama tempat semuanya
--                 bernuansa kedai kopi/kafe) — perlu dikoreksi manual kalau salah.
--   - suasana   : diisi "Perlu Dilengkapi" (placeholder, akan tampil di badge UI).
--   - harga_label, jam_buka/jam_tutup, fasilitas, deskripsi: placeholder jelas,
--     WAJIB diupdate manual lewat Table Editor sebelum dipakai publik.
--   - foto      : gambar placeholder abu-abu bertuliskan "Foto belum tersedia"
--                 (bukan foto asli tempat — sengaja tidak dikarang).
--
-- Menghapus baris tempat lama otomatis menghapus review & favorit lama yang
-- terkait (ON DELETE CASCADE) — itu memang data seed/demo, aman dihapus.
-- =========================================================================

delete from public.tempat;

insert into public.tempat
  (id, nama_tempat, deskripsi, alamat, kategori_id, suasana, harga_label, foto, fasilitas, jam_buka, jam_tutup, latitude, longitude, rating, jumlah_review)
values
  ('menanti-senja-cipete', 'Menanti Senja',
    'Deskripsi belum diisi — lengkapi data asli tempat ini.',
    'Jl. Cipete Raya No.1C, RT.9/RW.6, Cipete Sel., Kec. Cilandak, Kota Jakarta Selatan, DKI Jakarta 12410',
    'coffee-shop', 'Perlu Dilengkapi', 'Harga belum diisi',
    array['data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTJlMmUyIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjI4IiBmaWxsPSIjNzY3NzdjIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5Gb3RvIGJlbHVtIHRlcnNlZGlhPC90ZXh0Pjwvc3ZnPg=='],
    array['Fasilitas belum diisi'],
    '00:00', '00:00', -6.2777399, 106.805281, 0, 0),

  ('kedai-tuju-abuserin', 'Kedai Tuju',
    'Deskripsi belum diisi — lengkapi data asli tempat ini.',
    'Jl. Abuserin No.11, RT.10/RW.6, Gandaria Sel., Kec. Kby. Baru, Kota Jakarta Selatan, DKI Jakarta 12420',
    'coffee-shop', 'Perlu Dilengkapi', 'Harga belum diisi',
    array['data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTJlMmUyIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjI4IiBmaWxsPSIjNzY3NzdjIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5Gb3RvIGJlbHVtIHRlcnNlZGlhPC90ZXh0Pjwvc3ZnPg=='],
    array['Fasilitas belum diisi'],
    '00:00', '00:00', -6.2758601, 106.7967614, 0, 0),

  ('gamy-coffee-space', 'Gamy Coffee Space',
    'Deskripsi belum diisi — lengkapi data asli tempat ini.',
    'Jl. Panjang No.10A RT.4/RW.4, Cipulir, Kec. Kebayoran Lama, Kota Jakarta Selatan, DKI Jakarta 12230',
    'coffee-shop', 'Perlu Dilengkapi', 'Harga belum diisi',
    array['data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTJlMmUyIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjI4IiBmaWxsPSIjNzY3NzdjIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5Gb3RvIGJlbHVtIHRlcnNlZGlhPC90ZXh0Pjwvc3ZnPg=='],
    array['Fasilitas belum diisi'],
    '00:00', '00:00', -6.2372955, 106.7721736, 0, 0),

  ('the-post-coffee-eatery', 'The Post - Coffee and Eatery',
    'Deskripsi belum diisi — lengkapi data asli tempat ini.',
    'Jl. Cipete Dalam No.33, RT.2/RW.3, Cipete Sel., Kec. Cilandak, Kota Jakarta Selatan, DKI Jakarta 12410',
    'coffee-shop', 'Perlu Dilengkapi', 'Harga belum diisi',
    array['data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTJlMmUyIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjI4IiBmaWxsPSIjNzY3NzdjIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5Gb3RvIGJlbHVtIHRlcnNlZGlhPC90ZXh0Pjwvc3ZnPg=='],
    array['Fasilitas belum diisi'],
    '00:00', '00:00', -6.275345, 106.8004031, 0, 0),

  ('mamo-coffee-eatery', 'Mamo Coffee & Eatery',
    'Deskripsi belum diisi — lengkapi data asli tempat ini.',
    'Jl. Prof. Joko Sutono SH No.1A, RT.1/RW.2, Petogogan, Kec. Kby. Baru, Kota Jakarta Selatan, DKI Jakarta 12170',
    'coffee-shop', 'Perlu Dilengkapi', 'Harga belum diisi',
    array['data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTJlMmUyIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjI4IiBmaWxsPSIjNzY3NzdjIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5Gb3RvIGJlbHVtIHRlcnNlZGlhPC90ZXh0Pjwvc3ZnPg=='],
    array['Fasilitas belum diisi'],
    '00:00', '00:00', -6.241126, 106.8076417, 0, 0),

  ('warkop-pancong-lumer-tendean', 'Warkop Pancong Lumer Tendean',
    'Deskripsi belum diisi — lengkapi data asli tempat ini.',
    'Jl. Kapten Tendean No.RT 05/01, RT.5/RW.1, Mampang Prpt., Kec. Mampang Prpt., Kota Jakarta Selatan, DKI Jakarta 12790',
    'coffee-shop', 'Perlu Dilengkapi', 'Harga belum diisi',
    array['data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTJlMmUyIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjI4IiBmaWxsPSIjNzY3NzdjIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5Gb3RvIGJlbHVtIHRlcnNlZGlhPC90ZXh0Pjwvc3ZnPg=='],
    array['Fasilitas belum diisi'],
    '00:00', '00:00', -6.2402971, 106.8243327, 0, 0),

  ('gordi-hq', 'Gordi HQ',
    'Deskripsi belum diisi — lengkapi data asli tempat ini.',
    'Jl. Jeruk Purut Dalam No.25, RT.6/RW.3, Cilandak Tim., Ps. Minggu, Kota Jakarta Selatan, DKI Jakarta 12560',
    'coffee-shop', 'Perlu Dilengkapi', 'Harga belum diisi',
    array['data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTJlMmUyIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjI4IiBmaWxsPSIjNzY3NzdjIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5Gb3RvIGJlbHVtIHRlcnNlZGlhPC90ZXh0Pjwvc3ZnPg=='],
    array['Fasilitas belum diisi'],
    '00:00', '00:00', -6.284245, 106.8117769, 0, 0);
