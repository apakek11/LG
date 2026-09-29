1. PRD — Product Requirements Document

A. Informasi Produk

Nama Produk: Lokal Gem
Jenis Produk: Platform pencarian dan rekomendasi tempat nongkrong
Target Pengguna: Pelajar, mahasiswa, anak muda, dan masyarakat umum
Tujuan Produk: Membantu pengguna menemukan tempat nongkrong yang menarik, nyaman, dan sesuai dengan preferensi mereka.

B. Latar Belakang

Banyak orang ingin mencari tempat nongkrong yang nyaman, menarik, dan memiliki suasana yang ramai atau “hidup”. Namun, informasi mengenai tempat nongkrong masih tersebar di berbagai platform seperti media sosial, Google Maps, dan rekomendasi dari teman.

Pengguna sering kali harus mencari informasi dari beberapa sumber sebelum menentukan tempat yang ingin dikunjungi. Selain itu, informasi seperti suasana, fasilitas, harga, dan kondisi tempat terkadang tidak tersedia secara lengkap.

Oleh karena itu, Lokal Gem dibuat sebagai platform yang mengumpulkan informasi berbagai tempat nongkrong dalam satu tempat sehingga pengguna dapat menemukan dan memilih tempat yang sesuai dengan kebutuhan mereka.

C. Permasalahan

Permasalahan utama yang ingin diselesaikan:

1. Pengguna kesulitan menemukan tempat nongkrong yang sesuai.


2. Informasi tempat nongkrong tersebar di berbagai platform.


3. Pengguna membutuhkan waktu untuk membandingkan beberapa tempat.


4. Informasi mengenai suasana dan fasilitas tempat terkadang kurang lengkap.


5. Pengguna kesulitan menemukan tempat nongkrong baru yang belum mereka ketahui.



D. Tujuan Produk

Lokal Gem bertujuan untuk:

Mempermudah pengguna menemukan tempat nongkrong.

Menyediakan informasi tempat dalam satu platform.

Membantu pengguna memilih tempat berdasarkan preferensi.

Memberikan gambaran mengenai suasana dan fasilitas tempat.

Membantu memperkenalkan tempat nongkrong lokal kepada lebih banyak orang.


E. Target Pengguna

1. Pengunjung/Pengguna

Ingin mencari tempat nongkrong.

Ingin mengetahui informasi suatu tempat.

Ingin mencari tempat berdasarkan kategori atau suasana.


2. Pemilik/Pengelola Tempat

Ingin memperkenalkan tempat mereka.

Ingin menampilkan informasi tempat kepada calon pengunjung.

Ingin meningkatkan visibilitas tempat mereka.


F. Fitur Utama

Fitur	Deskripsi

Beranda	Menampilkan rekomendasi dan daftar tempat
Pencarian	Mencari tempat berdasarkan nama atau kata kunci
Filter	Memfilter tempat berdasarkan kategori, lokasi, harga, atau suasana
Detail Tempat	Menampilkan informasi lengkap suatu tempat
Foto Tempat	Menampilkan foto untuk memberikan gambaran tempat
Lokasi	Menampilkan lokasi tempat
Kategori	Mengelompokkan tempat berdasarkan jenis/suasana
Favorit	Menyimpan tempat yang disukai pengguna
Review/Rating	Memberikan penilaian atau ulasan terhadap tempat
Login/Register	Mengelola akun pengguna
Kelola Tempat	Admin dapat menambah, mengubah, dan menghapus data tempat


G. User Flow

Pengguna:

Buka Lokal Gem → Beranda → Cari/Filter Tempat → Pilih Tempat → Lihat Detail → Tentukan Pilihan → Lihat Lokasi

Pengguna terdaftar:

Login → Cari Tempat → Lihat Detail → Tambahkan ke Favorit / Berikan Review

Admin:

Login Admin → Dashboard → Kelola Data Tempat → Tambah/Edit/Hapus Data → Data Tersimpan

H. Indikator Keberhasilan

Produk dianggap berhasil apabila:

Pengguna dapat menemukan tempat dengan mudah.

Informasi tempat dapat ditampilkan dengan jelas.

Pencarian dan filter dapat digunakan dengan baik.

Data tempat dapat dikelola oleh admin.

Pengguna dapat melihat lokasi dan informasi utama tempat.

Sistem dapat digunakan tanpa proses yang membingungkan.



---

2. SRS — Software Requirements Specification

A. Pendahuluan

1. Tujuan

Dokumen SRS ini menjelaskan kebutuhan perangkat lunak yang diperlukan dalam pengembangan Lokal Gem, termasuk kebutuhan fungsional, nonfungsional, pengguna sistem, serta kebutuhan data.

2. Ruang Lingkup

Lokal Gem merupakan sistem berbasis web yang digunakan untuk membantu pengguna menemukan tempat nongkrong berdasarkan informasi seperti nama tempat, lokasi, kategori, suasana, fasilitas, harga, foto, dan ulasan.

Sistem memiliki dua jenis pengguna utama:

User/Pengguna

Admin



---

B. Kebutuhan Fungsional

FR-01 — Registrasi

Sistem harus memungkinkan pengguna membuat akun dengan memasukkan informasi yang diperlukan seperti:

Nama

Username/email

Password


Sistem harus melakukan validasi terhadap data yang dimasukkan.

FR-02 — Login

Sistem harus memungkinkan pengguna dan admin melakukan login menggunakan akun yang telah terdaftar.

Sistem harus melakukan validasi username/email dan password.

FR-03 — Menampilkan Daftar Tempat

Sistem harus dapat menampilkan daftar tempat nongkrong yang tersedia.

Setiap tempat minimal menampilkan:

Nama tempat

Foto

Lokasi

Kategori

Harga

Rating


FR-04 — Pencarian Tempat

Pengguna dapat mencari tempat berdasarkan nama atau kata kunci tertentu.

Contoh:

User mengetik "Cafe" → Sistem menampilkan tempat yang berkaitan dengan Cafe.

FR-05 — Filter Tempat

Sistem harus menyediakan filter untuk membantu pengguna mempersempit hasil pencarian.

Contoh filter:

Lokasi

Kategori

Harga

Suasana

Rating


FR-06 — Detail Tempat

Sistem harus menyediakan halaman detail untuk setiap tempat.

Informasi yang ditampilkan meliputi:

Nama tempat

Foto

Deskripsi

Alamat

Jam operasional

Harga

Fasilitas

Suasana

Rating/review

Lokasi


FR-07 — Favorit

Pengguna yang telah login dapat menyimpan tempat ke dalam daftar favorit.

Pengguna juga dapat menghapus tempat dari daftar favorit.

FR-08 — Review dan Rating

Pengguna dapat memberikan rating dan review terhadap tempat yang dikunjungi.

Sistem harus menyimpan:

Nama pengguna

Rating

Isi review

Waktu review


FR-09 — Lokasi

Sistem harus menampilkan lokasi tempat dan menyediakan informasi yang dapat membantu pengguna menemukan lokasi tersebut.

FR-10 — Admin Dashboard

Admin memiliki halaman dashboard untuk mengelola data sistem.

Admin dapat:

Menambahkan tempat.

Mengubah informasi tempat.

Menghapus tempat.

Melihat data pengguna.

Mengelola review.


FR-11 — Kelola Data Tempat

Admin dapat memasukkan informasi:

Nama tempat

Deskripsi

Alamat

Kategori

Harga

Fasilitas

Suasana

Foto

Jam operasional

Koordinat/lokasi


FR-12 — Validasi Data

Sistem harus melakukan validasi terhadap data yang dimasukkan pengguna maupun admin.

Contohnya:

Field wajib tidak boleh kosong.

Email harus memiliki format yang valid.

Password harus sesuai dengan akun.

Rating harus berada pada rentang yang ditentukan.



---

C. Kebutuhan Non-Fungsional

NFR-01 — Usability

Antarmuka Lokal Gem harus mudah digunakan dan dipahami oleh pengguna.

NFR-02 — Performance

Sistem harus mampu menampilkan halaman dan data dengan waktu respons yang wajar pada koneksi internet normal.

NFR-03 — Security

Sistem harus menjaga keamanan akun pengguna.

Password tidak boleh disimpan dalam database dalam bentuk teks biasa.

NFR-04 — Compatibility

Website dapat digunakan pada:

Google Chrome

Microsoft Edge

Mozilla Firefox

Browser mobile


NFR-05 — Responsive

Tampilan website harus dapat menyesuaikan ukuran layar:

Desktop

Laptop

Tablet

Smartphone


NFR-06 — Availability

Sistem harus dapat diakses selama server dalam kondisi aktif dan normal.

NFR-07 — Maintainability

Struktur kode harus dibuat secara terorganisir sehingga sistem dapat dikembangkan dan diperbaiki di kemudian hari.


---

D. Kebutuhan Data

Database Lokal Gem minimal memiliki tabel berikut:

1. users

Field	Fungsi

id_user	ID pengguna
nama	Nama pengguna
email	Email pengguna
password	Password
role	User/Admin


2. tempat

Field	Fungsi

id_tempat	ID tempat
nama_tempat	Nama tempat
deskripsi	Deskripsi tempat
alamat	Alamat
kategori	Kategori tempat
suasana	Suasana tempat
harga	Kisaran harga
fasilitas	Fasilitas
jam_buka	Jam buka
jam_tutup	Jam tutup
foto	Foto tempat
latitude	Koordinat latitude
longitude	Koordinat longitude


3. review

Field	Fungsi

id_review	ID review
id_user	Pengguna yang memberikan review
id_tempat	Tempat yang direview
rating	Nilai rating
komentar	Isi review
tanggal	Waktu review


4. favorit

Field	Fungsi

id_favorit	ID favorit
id_user	Pengguna
id_tempat	Tempat yang disimpan



---

E. Hak Akses Pengguna

Fitur	User	Admin

Melihat tempat	✓	✓
Mencari tempat	✓	✓
Filter tempat	✓	✓
Melihat detail	✓	✓
Favorit	✓	-
Review	✓	-
Mengelola tempat	-	✓
Mengelola pengguna	-	✓
Mengelola review	-	✓
