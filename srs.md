# SRS — Software Requirements Specification

## A. Pendahuluan

### 1. Tujuan

Dokumen SRS ini menjelaskan kebutuhan perangkat lunak yang diperlukan dalam pengembangan **Lokal Gem**, termasuk kebutuhan fungsional, nonfungsional, pengguna sistem, serta kebutuhan data.

### 2. Ruang Lingkup

Lokal Gem merupakan sistem berbasis web yang digunakan untuk membantu pengguna menemukan tempat nongkrong berdasarkan informasi seperti nama tempat, lokasi, kategori, suasana, fasilitas, harga, foto, dan ulasan.

Sistem memiliki dua jenis pengguna utama:

- User/Pengguna
- Admin

---

## B. Kebutuhan Fungsional

### FR-01 — Registrasi

Sistem harus memungkinkan pengguna membuat akun dengan memasukkan informasi yang diperlukan seperti:

- Nama
- Username/email
- Password

Sistem harus melakukan validasi terhadap data yang dimasukkan.

### FR-02 — Login

Sistem harus memungkinkan pengguna dan admin melakukan login menggunakan akun yang telah terdaftar.

Sistem harus melakukan validasi username/email dan password.

### FR-03 — Menampilkan Daftar Tempat

Sistem harus dapat menampilkan daftar tempat nongkrong yang tersedia.

Setiap tempat minimal menampilkan:

- Nama tempat
- Foto
- Lokasi
- Kategori
- Harga
- Rating

### FR-04 — Pencarian Tempat

Pengguna dapat mencari tempat berdasarkan nama atau kata kunci tertentu.

**Contoh:** User mengetik "Cafe" → Sistem menampilkan tempat yang berkaitan dengan Cafe.

### FR-05 — Filter Tempat

Sistem harus menyediakan filter untuk membantu pengguna mempersempit hasil pencarian.

Contoh filter:

- Lokasi
- Kategori
- Harga
- Suasana
- Rating

### FR-06 — Detail Tempat

Sistem harus menyediakan halaman detail untuk setiap tempat.

Informasi yang ditampilkan meliputi:

- Nama tempat
- Foto
- Deskripsi
- Alamat
- Jam operasional
- Harga
- Fasilitas
- Suasana
- Rating/review
- Lokasi

### FR-07 — Favorit

Pengguna yang telah login dapat menyimpan tempat ke dalam daftar favorit.

Pengguna juga dapat menghapus tempat dari daftar favorit.

### FR-08 — Review dan Rating

Pengguna dapat memberikan rating dan review terhadap tempat yang dikunjungi.

Sistem harus menyimpan:

- Nama pengguna
- Rating
- Isi review
- Waktu review

### FR-09 — Lokasi

Sistem harus menampilkan lokasi tempat dan menyediakan informasi yang dapat membantu pengguna menemukan lokasi tersebut.

### FR-10 — Admin Dashboard

Admin memiliki halaman dashboard untuk mengelola data sistem.

Admin dapat:

- Menambahkan tempat.
- Mengubah informasi tempat.
- Menghapus tempat.
- Melihat data pengguna.
- Mengelola review.

### FR-11 — Kelola Data Tempat

Admin dapat memasukkan informasi:

- Nama tempat
- Deskripsi
- Alamat
- Kategori
- Harga
- Fasilitas
- Suasana
- Foto
- Jam operasional
- Koordinat/lokasi

### FR-12 — Validasi Data

Sistem harus melakukan validasi terhadap data yang dimasukkan pengguna maupun admin.

Contohnya:

- Field wajib tidak boleh kosong.
- Email harus memiliki format yang valid.
- Password harus sesuai dengan akun.
- Rating harus berada pada rentang yang ditentukan.

---

## C. Kebutuhan Non-Fungsional

### NFR-01 — Usability

Antarmuka Lokal Gem harus mudah digunakan dan dipahami oleh pengguna.

### NFR-02 — Performance

Sistem harus mampu menampilkan halaman dan data dengan waktu respons yang wajar pada koneksi internet normal.

### NFR-03 — Security

Sistem harus menjaga keamanan akun pengguna.

Password tidak boleh disimpan dalam database dalam bentuk teks biasa.

### NFR-04 — Compatibility

Website dapat digunakan pada:

- Google Chrome
- Microsoft Edge
- Mozilla Firefox
- Browser mobile

### NFR-05 — Responsive

Tampilan website harus dapat menyesuaikan ukuran layar:

- Desktop
- Laptop
- Tablet
- Smartphone

### NFR-06 — Availability

Sistem harus dapat diakses selama server dalam kondisi aktif dan normal.

### NFR-07 — Maintainability

Struktur kode harus dibuat secara terorganisir sehingga sistem dapat dikembangkan dan diperbaiki di kemudian hari.

---

## D. Kebutuhan Data

Database Lokal Gem minimal memiliki tabel berikut:

### 1. `users`

| Field | Fungsi |
|---|---|
| `id_user` | ID pengguna |
| `nama` | Nama pengguna |
| `email` | Email pengguna |
| `password` | Password |
| `role` | User/Admin |

### 2. `tempat`

| Field | Fungsi |
|---|---|
| `id_tempat` | ID tempat |
| `nama_tempat` | Nama tempat |
| `deskripsi` | Deskripsi tempat |
| `alamat` | Alamat |
| `kategori` | Kategori tempat |
| `suasana` | Suasana tempat |
| `harga` | Kisaran harga |
| `fasilitas` | Fasilitas |
| `jam_buka` | Jam buka |
| `jam_tutup` | Jam tutup |
| `foto` | Foto tempat |
| `latitude` | Koordinat latitude |
| `longitude` | Koordinat longitude |

### 3. `review`

| Field | Fungsi |
|---|---|
| `id_review` | ID review |
| `id_user` | Pengguna yang memberikan review |
| `id_tempat` | Tempat yang direview |
| `rating` | Nilai rating |
| `komentar` | Isi review |
| `tanggal` | Waktu review |

### 4. `favorit`

| Field | Fungsi |
|---|---|
| `id_favorit` | ID favorit |
| `id_user` | Pengguna |
| `id_tempat` | Tempat yang disimpan |

---

## E. Hak Akses Pengguna

| Fitur | User | Admin |
|---|:---:|:---:|
| Melihat tempat | ✓ | ✓ |
| Mencari tempat | ✓ | ✓ |
| Filter tempat | ✓ | ✓ |
| Melihat detail | ✓ | ✓ |
| Favorit | ✓ | - |
| Review | ✓ | - |
| Mengelola tempat | - | ✓ |
| Mengelola pengguna | - | ✓ |
| Mengelola review | - | ✓ |
