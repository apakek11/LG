# Database Lokal Gem (Supabase)

Project Supabase CLI untuk proyek ini diberi nama **`supabase_LocalGem`**
(lihat `project_id` di `supabase/config.toml`).

Skema ini mengikuti kebutuhan data & hak akses di `docs/srs.md`, disesuaikan
dengan model data yang dipakai di `src/types/tempat.ts`.

## Isi folder

- `config.toml` — konfigurasi Supabase CLI (`project_id = "supabase_LocalGem"`).
- `migrations/20261001000000_init_schema.sql` — tabel `profiles`, `kategori`,
  `tempat`, `review`, `favorit`, trigger (auto-profile saat registrasi,
  auto-update rating tempat), index pencarian, dan Row Level Security.
- `seed.sql` — data contoh yang sama persis dengan `src/data/*.ts` (4
  kategori, 13 tempat, 3 ulasan) supaya langsung bisa dites.

Sisi frontend React sudah disiapkan untuk tersambung ke Supabase ini:

- `src/lib/supabaseClient.ts` — client Supabase, baca kredensial dari
  `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY`.
- `.env.example` — contoh file environment variable (salin ke `.env.local`).

## Langkah menyambungkan ke project Supabase sungguhan

1. **Buat project di supabase.com** (kalau belum ada) — beri nama
   `supabase_LocalGem` juga supaya konsisten, lalu catat **Database
   Password**-nya di tempat aman.
2. **Jalankan skema**: buka project itu → SQL Editor → tempel & jalankan isi
   `migrations/20261001000000_init_schema.sql`, lalu `seed.sql` (opsional,
   untuk data contoh).
   - Atau lewat CLI: `supabase login` → `supabase link --project-ref <ref-project-kamu>` → `supabase db push`.
3. **Ambil kredensial API**: di project itu buka Project Settings → API,
   salin **Project URL** dan **anon public key**.
4. Di root folder `LG/`, salin `.env.example` menjadi `.env.local` dan isi:
   ```
   VITE_SUPABASE_URL=...
   VITE_SUPABASE_ANON_KEY=...
   ```
   (`.env.local` sudah di-ignore git, aman untuk kredensial lokal.)
5. Jalankan `npm run dev` — `src/lib/supabaseClient.ts` otomatis memakai
   kredensial tadi.

## Status integrasi saat ini

`AuthContext`, `FavoritContext`, dan data tempat/kategori/ulasan di halaman
React **masih memakai data mock & localStorage**, belum memanggil
`supabase` secara langsung. Setelah langkah 1-5 di atas selesai dan
kredensialnya dibagikan, langkah berikutnya adalah mengganti bagian-bagian
itu agar membaca/menulis ke tabel Supabase sungguhan (auth asli, favorit &
ulasan tersimpan di database, bukan di browser).
