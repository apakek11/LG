-- =========================================================================
-- Seed data Lokal Gem — mencerminkan data mock di src/data/kategori.ts,
-- src/data/tempat.ts, dan src/data/review.ts agar skema langsung bisa
-- dites dan hasilnya sama persis dengan tampilan frontend saat ini.
--
-- Jalankan setelah migrations/20261001000000_init_schema.sql, mis. lewat
-- `supabase db reset` (otomatis) atau tempel manual di SQL Editor.
-- =========================================================================

insert into public.kategori (id, nama, icon, urutan) values
  ('coffee-shop',   'Coffee Shop',   'local_cafe',  1),
  ('rooftop',       'Rooftop',       'deck',        2),
  ('workspace',     'Workspace',     'laptop_mac',  3),
  ('kuliner-malam', 'Kuliner Malam', 'restaurant',  4)
on conflict (id) do nothing;

insert into public.tempat
  (id, nama_tempat, deskripsi, alamat, kategori_id, suasana, harga_label, foto, fasilitas, jam_buka, jam_tutup, latitude, longitude, rating, jumlah_review)
values
  ('kopi-seduhan-senja', 'Kopi Seduhan Senja',
    'Hidden gem coffee shop dengan suasana tenang di tengah kota, cocok buat baca buku atau deep talk.',
    'Jl. Kemang Raya No. 12, Jakarta Selatan', 'coffee-shop', 'Cozy & Aesthetic', 'Rp 25k - Rp 50k',
    array['https://lh3.googleusercontent.com/aida-public/AB6AXuANXRxRH_ycvzZrglgGsgEab3HFxOd6xSbpz5wzudYlgoqDnbuIVhe1i9SlZAdbQJiUO5bWCY-fdUshXC90U18Ig_UZlSRQ_oELAE4CEzjb0Kk7dws_IYbOygD5BwAY9jF6ZFGg1DaRpeh5AIoR4qBrFJX-KYxMCN2OEU7Gk7omAYtApfiFA1kYidPhZu661OKtPRy8uulPnYh0F_w1t1Ea7TDk8sD8E86n_CO8ju3B4Qw3YMfXxhmL'],
    array['WiFi Gratis','Colokan Listrik','AC','Area Outdoor','Ramah Hewan'],
    '08:00', '22:00', -6.2608, 106.8133, 4.9, 128),

  ('rooftop-atmakala', 'Rooftop Atmakala',
    'Nikmati senja kota dari ketinggian lantai 8 ditemani alunan musik akustik indie setiap akhir pekan.',
    'Jl. Sudirman Kav. 25, Jakarta Pusat', 'rooftop', 'Ramai & Live Music', 'Rp 40k - Rp 90k',
    array['https://lh3.googleusercontent.com/aida-public/AB6AXuB1Xwz-DEiLjOeKCQd0zadq3iZ2dkB3f-Ems7czLHKtqZ8H9MJSpttsAHPYXgkrdcovrKA8UmVWFbAdo-9dkcBx9o9tmbSI8s8AfJiPrqNb0uFWL7nHjfcgSLwL6D3fzM6LblhUWaiPO3A8ovuLvMi7UpyvEN-vXRw56jEOCr0ACRfyFBjhk9YghR9kbat9jcytCaVzDnv3vKrkGqUpQ8oeYB94G4iGjChATRJXbMkrTEiYVHthuLIJ'],
    array['Live Music','Rooftop View','Smoking Area','Valet Parkir'],
    '16:00', '01:00', -6.2088, 106.8229, 4.8, 94),

  ('titik-temu-workspace', 'Titik Temu Workspace',
    'Ruang kerja bersama dengan fasilitas lengkap, koneksi internet super cepat, dan kopi gratis sepuasnya.',
    'Jl. Gatot Subroto No. 8, Jakarta Selatan', 'workspace', 'Tenang & Focus', 'Rp 30k / jam',
    array['https://lh3.googleusercontent.com/aida-public/AB6AXuBmS3zLLkub_dwqQ94AzLVgST1iRTSw3zpYGCHstxOgyiJ9wZp8PBZaVzdVxl0ZFfkmtFGW3GISWZlvEqBQnwutSi1ASCsLO1ILXUvobw8Jo0qiY2RJC_SXGPkIETvV91G_Tsw7KtwtXIMmKW7YHT20WRQ81GVNzOqxTYIFCkFH8Tyy3U6gh5HqT81aW0YhZ82Nz0yMDTyL0bIV6ExaRx4of4DYuT_-N7xmCoPkkXPRecSvRXFPuGFO'],
    array['WiFi Gratis','Colokan Listrik','Ruang Meeting','Kopi Gratis','AC'],
    '07:00', '21:00', -6.2244, 106.8022, 4.9, 210),

  ('piringan-hitam-roastery', 'Piringan Hitam & Roastery',
    'Listening bar piringan hitam klasik berpadu roastery kopi lokal khas Blok M dengan suasana senja intim.',
    'Jl. Melawai Raya No. 5, Blok M, Jakarta Selatan', 'coffee-shop', 'Vintage & Music', 'Rp 30k - Rp 65k',
    array['https://lh3.googleusercontent.com/aida-public/AB6AXuD8rOU0Q223jc_yqhyA7iQLXC98U1XNtwcDF9c7tyrK9MKw0-FuLF0SpM-yn71bgID3juIz4CcwSPep_Dkg0aex8Um3yEbuG7Y9j_y4zT0ctOvmBRepLMqX1wo5CYBGBmyxBt4RendFtL7FP3IdI_QskzAPqjnPr2wodzXELcuA5YAW1DoVR72uxrIyRLcAcmJYhWjC7XYPuC1QNFPM5To2zQn3dcHw4FDCCGTMTlORD5qKbLt3oo_4'],
    array['Live Vinyl','WiFi Gratis','AC','Area Indoor'],
    '11:00', '23:00', -6.2435, 106.8018, 4.9, 185),

  ('taman-hening-zen-kissa', 'Taman Hening Zen Kissa',
    'Kedai kopi bergaya kissa Jepang dengan tatami mat, pohon bonsai, dan suasana tenang minim distraksi.',
    'Jl. Panglima Polim No. 20, Jakarta Selatan', 'coffee-shop', 'Quiet & Zen', 'Rp 35k - Rp 70k',
    array['https://lh3.googleusercontent.com/aida-public/AB6AXuCVgy2vRj8bf78JloS8XoZS_wNwjzgBvye3_hNM9wXqB0431ya1erzVW3aVS0dwwXSsjFEevw6Um9jTaOnS4nBx2vpDjAeGOV5bhIi5PGwzwUUuzV-aDZj9mQce-gfy2umDxC1rKH9EcwXkCk_E6Ur1wgUGJyJJVc9Zz5GrT4BS-y5ncb205eg5lFV6c9rFQ9F-O1k8fDeNqjYqZzLIXuvqp355Yoa_cOgPYVihrqvGpGWy368IXQQj'],
    array['Tatami Area','WiFi Gratis','Zona Hening','AC'],
    '09:00', '20:00', -6.2443, 106.7956, 4.9, 210),

  ('rumah-kaca-kebun-selatan', 'Rumah Kaca Kebun Selatan',
    'Kafe paviliun kaca tropis dengan koleksi monstera rindang, lantai terakota hangat, dan pencahayaan alami.',
    'Jl. Fatmawati Raya No. 33, Jakarta Selatan', 'coffee-shop', 'Tropical Garden', 'Rp 32k - Rp 75k',
    array['https://lh3.googleusercontent.com/aida-public/AB6AXuDR6yhObURnPEMxBAq2XOAtPkUprNNUyv4xKBWIqof9HhZBgUQOkmGNviWGuF69ACcGQ2btd_TUxLje3ajj9ohvHq41bAzunz59CfybqEDm3_vdvK3kclKX7aGwMgLj8uc2xHQL_2JXrT1fGCzRDBNLbuxysHMWnmcidiVrLMGwu2VwwHb8U8LAJIutdMx9ElBv2JikWXG2Ktfh6EHO1bzHefE8b_XV135shfb3oUdHBi_0x4tKYiA_'],
    array['Area Outdoor','Instagramable Spot','WiFi Gratis','Ramah Hewan'],
    '08:00', '21:00', -6.2935, 106.7975, 4.8, 174),

  ('ruang-baca-arsip-sunyi', 'Ruang Baca & Arsip Sunyi',
    'Surga pembaca buku dan pekerja jarak jauh dengan rak buku tinggi menjulang, lampu meja hangat, dan stopkontak melimpah.',
    'Jl. Cikini Raya No. 15, Jakarta Pusat', 'workspace', 'Work & Study', 'Rp 28k - Rp 55k',
    array['https://lh3.googleusercontent.com/aida-public/AB6AXuBM26eeH4TBXM3og7vDZ7Dyx48XVxjM3MB1DVRRKl6CnM96NkSdNq_eM7rk-H9TI1DUbOrAKcH15TvwmRSOUQ3BzDygUV3g_KftMrtN3PwES1NvQVEIZriGe-JvhbnRnJ0dn3ddgofYwEWMLhZQWzz9xSl2iLTfLtQR-peyaygsYmB7uDvdos_ge01iiEq56ootaTq1RAdVy8bd-cnioU_RRrfWow59RTAGE4GPq3hfkFQHVRy3ftxk'],
    array['WiFi Gratis','Colokan Listrik','Rak Buku','Ruang Baca Pribadi'],
    '07:00', '22:00', -6.1928, 106.8389, 4.9, 245),

  ('kala-senopati-courtyard', 'Kala Senopati Courtyard',
    'Courtyard tersembunyi berlantai koral dan kayu di Senopati dengan pergola berhias lampu temaram yang syahdu.',
    'Jl. Senopati No. 41, Jakarta Selatan', 'rooftop', 'Courtyard Nature', 'Rp 35k - Rp 85k',
    array['https://lh3.googleusercontent.com/aida-public/AB6AXuCzv3Y9x1LNARpySBQk4gKamXoK1mTZKz-qKg7iKO6thX40vS1gFvvQ3aqYytIDfy2giQa2NqxH4mNNeGHm1E5eHEqsfQo0HaZwwzMMgr42ItTk7VCuhnRTEWMgKTXzAfPKQizn54AJ6kGWpGOIasmZeCu63i5rQnuc1VM10VJwXSnbjRJWQgNcfH_9pOVOFjWNv3RFAx6BMdpK0aUHjhBy6K5IT_4J4ZsBUxrNzo-DAzLcHFGfvEGb'],
    array['Area Outdoor','Live Music','Smoking Area','WiFi Gratis'],
    '15:00', '00:00', -6.2301, 106.8091, 4.8, 192),

  ('roti-pagi-menteng', 'Roti & Pagi Menteng',
    'Boutique bakery bergaya art deco dengan croissant mentega Prancis segar panggang harian dan specialty latte.',
    'Jl. HOS Cokroaminoto No. 10, Menteng, Jakarta Pusat', 'kuliner-malam', 'Artisan Bakery', 'Rp 35k - Rp 90k',
    array['https://lh3.googleusercontent.com/aida-public/AB6AXuDBwljfHMX-X5b9FwRON1Fdtjo-J_cMCfdiK0Dct3ynwg8BkPO3PLKtEA3fNGL9p5v2Ao_PDvg1aP8aoRpPzgzSjDASkE5g17FhKb4hh4iXks93OPONF6c1SOAVOeeRUNGInX0wa_54MIrBrAXUWUMgUIsTb1EDJEZ0K0lmwFW7HMpZ-SQjFHMizKKXUoZjokmPJmKB-TqNJjG79M40mAmtV-t5zbCxBbSdfaO_0LPtADQtc9_h9ZoQ'],
    array['Pastry Segar','WiFi Gratis','AC','Area Indoor'],
    '06:30', '20:00', -6.1957, 106.8343, 4.8, 160),

  ('laboratorium-kopi-minimalis', 'Laboratorium Kopi Minimalis',
    'Specialty coffee bar berkonsep industrial modern dengan bar terbuka pour over dan biji kopi mikro-lot pilihan.',
    'Jl. Kemang Selatan No. 7, Jakarta Selatan', 'coffee-shop', 'Modern & Clean', 'Rp 30k - Rp 60k',
    array['https://lh3.googleusercontent.com/aida-public/AB6AXuBy6xwF2hO-r-fD-PIRIWx2tOSe7AtkGV2sXfjmamx9_ueXPCVdaL0kUv4JM6l2r8W2iRoV4aCUShrgPAX9tBSXlseGOS1m19YBrhVRpGsBnTserhiLs9IH7nFWBAcL8XIBhS-rR9uE2Q1o1p2plezlENxI1xwszC9m8KbEAQNtgh6Z0mobGTvEsAhU19dbf5srtbWWP_CRVr1jG3EJJoGszIf2-_AMBS77KwiwHNEFv_auzi09Gcza'],
    array['Pour Over Bar','WiFi Gratis','AC','Colokan Listrik'],
    '08:00', '22:00', -6.2656, 106.8155, 4.7, 148),

  ('rumah-teh-warisan-1932', 'Rumah Teh Warisan 1932',
    'Kedai teh pusaka tempo doeloe di kawasan Kota Tua dengan kursi kayu jati antik dan racikan teh artisan Nusantara.',
    'Jl. Pintu Besar Utara No. 2, Kota Tua, Jakarta Barat', 'kuliner-malam', 'Heritage & Calm', 'Rp 25k - Rp 50k',
    array['https://lh3.googleusercontent.com/aida-public/AB6AXuA8KQl2dI2P6T_2zlGG8xWOJ89mQXUMgfrY2HOI7PVuXeL1xh3W2GwhNaQzineytHPZJ82nKURuXIlZjZUpRjjA-NoQp2LII17c2wMJaNfdvGltKKvgLeGXzNltMjJQ2x_KkoVh-zMMVi1WJB3_nby14ZH-exXz-i6MRS2bUO2IeKJn-cYluHRdKU8midVNF1jYVmn2DYh9ILsODhbqChDlRMcn7w4p8nWNccPqxoRaxDxx2U3bfRcu'],
    array['Interior Heritage','AC','WiFi Gratis','Area Indoor'],
    '10:00', '21:00', -6.1352, 106.8133, 4.9, 228),

  ('langit-biru-senja-rooftop', 'Langit Biru Senja Rooftop',
    'Lounge rooftop semi-terbuka dengan dek kayu, sofa nyaman, dan panorama senja gedung bertingkat ibu kota.',
    'Jl. HR Rasuna Said Kav. 10, Jakarta Selatan', 'rooftop', 'Sunset Skyline', 'Rp 45k - Rp 110k',
    array['https://lh3.googleusercontent.com/aida/AEtjO1WYuvyyR6MWCqvQQysDM1JIcEJ6yb3gr-zpG-UMb_Rz5K5DKjxaz1ayP7F7NemitK-1Ycr1c3-DorgvjesoM8M0Ur22yX5THpEWKfNF9ebBqnBh_umnGfGaaloW4y0N2nh07WMVRxb3XOPx0g2nDeTpVsuaWBePN_R535ILjMlDuUMKbkdwohxoMhWiulXDIixlgsVuJPpO-Mhh_t-hQvQPP8bz-QIfonpi8KcpkBHeLWRZVJX27-253g'],
    array['Rooftop View','Smoking Area','Live DJ','Valet Parkir'],
    '17:00', '01:00', -6.2238, 106.8306, 4.8, 195),

  ('seduh-mula-pastry-bar', 'Seduh Mula & Pastry Bar',
    'Bar kopi kurasi khusus manual brew v60 dengan pendamping pastry fresh out of oven dan baris barista ramah.',
    'Jl. Tebet Raya No. 18, Jakarta Selatan', 'coffee-shop', 'Manual Brew & Chill', 'Rp 28k - Rp 58k',
    array['https://lh3.googleusercontent.com/aida/AEtjO1WpnG2aKOlWmORYJCQOebVB7Ox2G7Aylrc0H21R1BjRJDjoVYl7zx2QrPvUlY-chrQNi2A4zl-Heg9gsXzwA8FYvdfjAD5uq6k5xvw4XyxQ5_66TWoj4uwk-DboX-FQ8ftInWxppUQwPfpuf9JzNraPPvQOSd6iA7nuq7XFzzQxXR6ZOE10bQMb3qP_OliEz2dfkHR1HFg2Z5fVvXY0J-qhHpNAdDyAB2q3UVInZgtwwOqEQCyPobQ6FJU'],
    array['Manual Brew Bar','WiFi Gratis','AC','Area Outdoor'],
    '07:00', '19:00', -6.2256, 106.8513, 4.9, 312)
on conflict (id) do nothing;

-- Ulasan contoh (tanpa user_id karena belum tentu ada akun auth.users yang
-- cocok di proyek Supabase baru). Setelah ada akun asli, review baru akan
-- diisi user_id oleh aplikasi saat insert.
-- Dibungkus "where not exists" (bukan on conflict) karena id review
-- memakai uuid acak, jadi aman dijalankan berkali-kali tanpa duplikat.
insert into public.review (tempat_id, nama_user, rating, komentar)
select v.tempat_id, v.nama_user, v.rating, v.komentar
from (values
  ('kopi-seduhan-senja', 'Rian Dirgantara', 5,
    'Tempatnya beneran hidden gem! Suasananya tenang banget buat ngerjain tugas kantor, baristanya ramah, dan manual brew-nya juara.'),
  ('rooftop-atmakala', 'Alya Nabila', 5,
    'Pemandangan sunset dari rooftop ini keren abis! Musik akustiknya pas banget gak terlalu bising. Bakal sering ke sini sih.'),
  ('titik-temu-workspace', 'Kevin Pratama', 5,
    'Internetnya anti ngelag, colokan ada di setiap meja, dan suasananya mendukung banget buat produktif seharian.')
) as v(tempat_id, nama_user, rating, komentar)
where not exists (
  select 1 from public.review r
  where r.tempat_id = v.tempat_id and r.nama_user = v.nama_user
);

-- Catatan: trigger trg_review_refresh_rating otomatis menimpa kolom
-- tempat.rating & tempat.jumlah_review berdasarkan baris review di atas.
-- Jika ingin angka rating/jumlah_review persis seperti nilai awal di
-- src/data/tempat.ts (yang mewakili total ulasan historis, bukan hanya 3
-- ulasan contoh ini), jalankan UPDATE manual setelah seed, misalnya:
--
-- update public.tempat set rating = 4.9, jumlah_review = 128 where id = 'kopi-seduhan-senja';
