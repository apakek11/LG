-- =========================================================================
-- Tambah 3 tempat baru di area Mampang Prapatan, Jakarta Selatan.
-- Koordinat dari parameter !3d!4d hasil redirect link Google Maps yang
-- dikirim pengguna — titik marker tempat sesungguhnya.
--
-- Foto: memakai foto stok fiktif/aesthetic yang belum pernah dipakai di
-- tempat lain (bukan foto asli tempat ini) — sesuai permintaan pengguna.
-- Field lain (suasana, harga, jam, fasilitas, deskripsi) masih placeholder
-- jelas, menunggu data asli.
-- =========================================================================

insert into public.tempat
  (id, nama_tempat, deskripsi, alamat, kategori_id, suasana, harga_label, foto, fasilitas, jam_buka, jam_tutup, latitude, longitude, rating, jumlah_review)
values
  ('emados-bangka', 'Emados Bangka',
    'Deskripsi belum diisi — lengkapi data asli tempat ini.',
    'Jl. Bangka Raya No.37, RT.6/RW.5, Pela Mampang, Kec. Mampang Prpt., Kota Jakarta Selatan, DKI Jakarta 12720',
    'workspace', 'Perlu Dilengkapi', 'Harga belum diisi',
    array['https://lh3.googleusercontent.com/aida-public/AB6AXuA8KQl2dI2P6T_2zlGG8xWOJ89mQXUMgfrY2HOI7PVuXeL1xh3W2GwhNaQzineytHPZJ82nKURuXIlZjZUpRjjA-NoQp2LII17c2wMJaNfdvGltKKvgLeGXzNltMjJQ2x_KkoVh-zMMVi1WJB3_nby14ZH-exXz-i6MRS2bUO2IeKJn-cYluHRdKU8midVNF1jYVmn2DYh9ILsODhbqChDlRMcn7w4p8nWNccPqxoRaxDxx2U3bfRcu'],
    array['Fasilitas belum diisi'],
    '00:00', '00:00', -6.2464043, 106.8151861, 0, 0),

  ('respati-coffee', 'Respati Coffee',
    'Deskripsi belum diisi — lengkapi data asli tempat ini.',
    'Jl. Mampang Prapatan VIII, RT.2/RW.2, Tegal Parang, Kec. Mampang Prpt., Kota Jakarta Selatan, DKI Jakarta 12790',
    'coffee-shop', 'Perlu Dilengkapi', 'Harga belum diisi',
    array['https://lh3.googleusercontent.com/aida/AEtjO1WpnG2aKOlWmORYJCQOebVB7Ox2G7Aylrc0H21R1BjRJDjoVYl7zx2QrPvUlY-chrQNi2A4zl-Heg9gsXzwA8FYvdfjAD5uq6k5xvw4XyxQ5_66TWoj4uwk-DboX-FQ8ftInWxppUQwPfpuf9JzNraPPvQOSd6iA7nuq7XFzzQxXR6ZOE10bQMb3qP_OliEz2dfkHR1HFg2Z5fVvXY0J-qhHpNAdDyAB2q3UVInZgtwwOqEQCyPobQ6FJU'],
    array['Fasilitas belum diisi'],
    '00:00', '00:00', -6.2482588, 106.826933, 0, 0),

  ('citrusy-coffee-mampang', 'Citrusy Coffee Mampang',
    'Deskripsi belum diisi — lengkapi data asli tempat ini.',
    'Jl. Kapten Tendean No.42D, RT.2/RW.9, Pela Mampang, Kec. Mampang Prpt., Kota Jakarta Selatan, DKI Jakarta 12720',
    'coffee-shop', 'Perlu Dilengkapi', 'Harga belum diisi',
    array['https://lh3.googleusercontent.com/aida-public/AB6AXuCzv3Y9x1LNARpySBQk4gKamXoK1mTZKz-qKg7iKO6thX40vS1gFvvQ3aqYytIDfy2giQa2NqxH4mNNeGHm1E5eHEqsfQo0HaZwwzMMgr42ItTk7VCuhnRTEWMgKTXzAfPKQizn54AJ6kGWpGOIasmZeCu63i5rQnuc1VM10VJwXSnbjRJWQgNcfH_9pOVOFjWNv3RFAx6BMdpK0aUHjhBy6K5IT_4J4ZsBUxrNzo-DAzLcHFGfvEGb'],
    array['Fasilitas belum diisi'],
    '00:00', '00:00', -6.2407853, 106.8209952, 0, 0)
on conflict (id) do nothing;
