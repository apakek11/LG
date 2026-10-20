# Blueprint — Lokal Gem

Berdasarkan: `prd.md`, `srs.md`, `brd.md`, `referenses-code.md`

---

## 1. Ringkasan Produk

**Lokal Gem** — platform pencarian dan rekomendasi tempat nongkrong (coffee shop, rooftop, workspace, kuliner malam) untuk pelajar, mahasiswa, dan anak muda. Menjawab masalah informasi tempat yang tersebar di banyak platform dengan mengurasi nama, lokasi, kategori, suasana, fasilitas, harga, foto, rating, dan ulasan dalam satu tempat.

Dua peran: **User** (cari, filter, favorit, review) dan **Admin** (CRUD tempat, kelola user & review).

---

## 2. Tech Stack

| Layer | Pilihan | Alasan |
|---|---|---|
| Framework | Next.js 14+ (App Router, TypeScript) | SSR/SEO untuk halaman tempat, API routes terintegrasi, satu repo front+back |
| Styling | Tailwind CSS | Design tokens dari `referenses-code.md` langsung bisa dipetakan ke `tailwind.config.ts` |
| Icon | Material Symbols Outlined | Sudah dipakai di referensi desain |
| Font | Inter | Sudah dipakai di referensi desain |
| ORM | Prisma | Schema sesuai SRS section D, migration tool resmi |
| Database | PostgreSQL | Relasi users/tempat/review/favorit |
| Auth | NextAuth.js (credentials) | Login/register + role USER/ADMIN, password hash bcrypt (NFR-03) |
| Upload foto | Cloudinary (atau lokal `/public/uploads` untuk MVP) | Foto tempat multi-file (FR-11) |
| Maps | Leaflet + OpenStreetMap embed | Tampilkan koordinat lat/long tanpa biaya API key (FR-09) |
| Validasi | Zod | FR-12: field wajib, format email, rating 1–5 |
| Deploy | Vercel + Neon/Supabase Postgres | Simpel, cocok skala awal |

Alternatif lebih ringan (kalau mau tanpa framework): Express + EJS + SQLite. Blueprint ini pakai Next.js sebagai pilihan utama.

---

## 3. Struktur Folder

```
lokalgem/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts                 # data dummy dari referenses-code.md
├── public/
│   └── uploads/                # fallback storage foto
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root: navbar + footer global
│   │   ├── page.tsx            # Beranda (hero, kategori, rekomendasi, review)
│   │   ├── jelajahi/page.tsx   # Katalog + search + filter
│   │   ├── kategori/[slug]/page.tsx
│   │   ├── tempat/[id]/page.tsx# Detail tempat (foto, info, map, review)
│   │   ├── favorit/page.tsx    # Daftar favorit (login required)
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── admin/
│   │   │   ├── layout.tsx      # Guard role ADMIN + sidebar
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── tempat/page.tsx         # List + hapus
│   │   │   ├── tempat/baru/page.tsx    # Form tambah
│   │   │   ├── tempat/[id]/page.tsx    # Form edit
│   │   │   ├── pengguna/page.tsx       # List user
│   │   │   └── review/page.tsx         # Moderasi review
│   │   └── api/
│   │       ├── auth/[...nextauth]/route.ts
│   │       ├── auth/register/route.ts
│   │       ├── tempat/route.ts             # GET list+filter, POST (admin)
│   │       ├── tempat/[id]/route.ts        # GET detail, PUT, DELETE (admin)
│   │       ├── favorit/route.ts            # GET, POST toggle
│   │       └── review/route.ts             # POST (user), DELETE (admin)
│   ├── components/
│   │   ├── ui/                 # Button, Card, Input, Badge, Select
│   │   ├── layout/             # Navbar, Footer, AdminSidebar
│   │   ├── search-bar.tsx      # Quick search hero (lokasi/suasana/kategori)
│   │   ├── category-grid.tsx   # 4 kartu kategori populer
│   │   ├── place-card.tsx      # Kartu spot (rating, jarak, harga)
│   │   ├── review-card.tsx     # Kartu ulasan komunitas
│   │   ├── place-map.tsx       # Leaflet embed
│   │   └── review-form.tsx     # Rating bintang + komentar
│   ├── lib/
│   │   ├── prisma.ts           # Singleton PrismaClient
│   │   ├── auth.ts             # NextAuth config + role check helper
│   │   ├── validations.ts      # Zod schemas (register, tempat, review)
│   │   └── utils.ts            # Format harga Rp, distance, cn()
│   └── types/
│       └── index.ts
├── tailwind.config.ts          # Tokens warna/spacing dari referensi
├── .env.example                # DATABASE_URL, NEXTAUTH_SECRET, CLOUDINARY_*
└── package.json
```

---

## 4. Design System (dari `referenses-code.md`)

Token warna inti (Material 3 style) — salin persis ke `tailwind.config.ts`:

| Token | Hex | Pakai untuk |
|---|---|---|
| `primary` | `#080c12` | Teks headline, tombol gelap |
| `primary-container` | `#1e2229` | Hero background, CTA banner |
| `secondary` | `#a0401c` | Aksen, tombol Cari, hover state |
| `secondary-container` | `#fe875d` | Hover secondary |
| `secondary-fixed` | `#ffdbcf` | Badge suasana, avatar |
| `surface` | `#f9f9f9` | Background halaman |
| `surface-container-low` | `#f3f3f4` | Section abu, search bar header |
| `surface-container-lowest` | `#ffffff` | Kartu spot |
| `on-surface` | `#1a1c1c` | Teks body |
| `on-surface-variant` | `#45474b` | Teks sekunder |
| `outline-variant` | `#c6c6cb` | Border, divider |
| `error` | `#ba1a1a` | Pesan validasi |

- Radius: kartu `rounded-2xl`, badge/pill `rounded-full/xl`, banner `rounded-3xl`
- Ikon: Material Symbols Outlined (`search`, `location_on`, `mood`, `category`, `local_cafe`, `deck`, `laptop_mac`, `restaurant`, `star`, `favorite`)
- Layout: container `max-w-7xl px-6 lg:px-12`, header fixed `h-20` dengan blur
- Responsive: mobile-first, grid 1 kolom → `md:` 3–4 kolom (NFR-05)

---

## 5. Skema Database (Prisma)

Sesuai SRS section D, field Indonesia dipertahankan:

```prisma
model User {
  id_user    String    @id @default(cuid()) @map("id_user")
  nama       String
  email      String    @unique
  password   String                       // bcrypt hash, bukan plaintext (NFR-03)
  role       Role      @default(USER)
  created_at DateTime  @default(now())
  reviews    Review[]
  favorites  Favorit[]

  @@map("users")
}

enum Role {
  USER
  ADMIN
}

model Tempat {
  id_tempat   String    @id @default(cuid()) @map("id_tempat")
  nama_tempat String
  deskripsi   String
  alamat      String
  kategori    String                      // Coffee Shop | Rooftop | Workspace | Kuliner Malam
  suasana     String                      // Cozy & Aesthetic | Ramai & Live Music | Tenang & Focus | Rooftop View
  harga       String                      // kisaran, mis. "Rp 25k - Rp 50k" atau "Rp 30k / jam"
  fasilitas   String                      // daftar pisah koma, mis. "WiFi, Colokan, AC"
  jam_buka    String
  jam_tutup   String
  foto        String                      // JSON array URL foto
  latitude    Float
  longitude   Float
  created_at  DateTime  @default(now())
  updated_at  DateTime  @updatedAt
  reviews     Review[]
  favorites   Favorit[]

  @@index([kategori])
  @@index([suasana])
  @@map("tempat")
}

model Review {
  id_review  String   @id @default(cuid()) @map("id_review")
  id_user    String
  id_tempat  String
  rating     Int                            // 1–5, divalidasi Zod (FR-12)
  komentar   String
  tanggal    DateTime @default(now())
  user       User     @relation(fields: [id_user], references: [id_user])
  tempat     Tempat   @relation(fields: [id_tempat], references: [id_tempat])

  @@unique([id_user, id_tempat])             // 1 review per user per tempat
  @@map("review")
}

model Favorit {
  id_favorit String   @id @default(cuid()) @map("id_favorit")
  id_user    String
  id_tempat  String
  user       User     @relation(fields: [id_user], references: [id_user])
  tempat     Tempat   @relation(fields: [id_tempat], references: [id_tempat])

  @@unique([id_user, id_tempat])
  @@map("favorit")
}
```

Rating agregat (rata-rata + jumlah) dihitung via query `AVG(rating)` saat list/detail, tidak disimpan redundan.

---

## 6. Halaman & Pemetaan Fitur

| Halaman | PRD/SRS | Konten |
|---|---|---|
| `/` Beranda | FR-03 | Hero + quick search, 4 kategori populer, rekomendasi terpopuler (kartu spot), CTA rekomendasikan tempat, ulasan komunitas terbaru |
| `/jelajahi` | FR-04, FR-05 | Grid katalog semua spot + search bar + filter (lokasi, kategori, harga, suasana, rating) + sort |
| `/kategori/[slug]` | Kategori | Katalog ter-filter per kategori |
| `/tempat/[id]` | FR-06, FR-09 | Galeri foto, deskripsi, alamat, jam buka, harga, fasilitas, badge suasana, peta Leaflet, daftar review + form review, tombol favorit |
| `/favorit` | FR-07 | Daftar spot yang disimpan (login required) |
| `/login`, `/register` | FR-01, FR-02 | Form + validasi Zod inline error |
| `/admin/dashboard` | FR-10 | Statistik: jumlah tempat, user, review |
| `/admin/tempat` | FR-10, FR-11 | Tabel CRUD tempat + form tambah/edit + upload foto |
| `/admin/pengguna` | FR-10 | Tabel user, role |
| `/admin/review` | FR-10 | Moderasi review (hapus/tandai) |

---

## 7. API Endpoints

| Method | Endpoint | Fungsi | Akses |
|---|---|---|---|
| POST | `/api/auth/register` | Buat akun (validasi nama/email/password) | Public |
| POST | `/api/auth/login` | NextAuth credentials | Public |
| GET | `/api/tempat?q=&kategori=&suasana=&harga=&rating=&lokasi=` | List + search + filter + pagination | Public |
| GET | `/api/tempat/:id` | Detail + review + avg rating | Public |
| POST | `/api/tempat` | Tambah tempat (multipart foto) | Admin |
| PUT | `/api/tempat/:id` | Update tempat | Admin |
| DELETE | `/api/tempat/:id` | Hapus tempat (+ cascade review/favorit) | Admin |
| GET | `/api/favorit` | List favorit user aktif | User |
| POST | `/api/favorit` | Toggle `{ id_tempat }` | User |
| POST | `/api/review` | `{ id_tempat, rating 1-5, komentar }` | User |
| DELETE | `/api/review/:id` | Hapus review | Author/Admin |
| GET | `/api/admin/users` | List pengguna | Admin |

Aturan: semua input divalidasi Zod di boundary, response error konsisten `{ error: string }` + status code benar (400/401/403/404), cek role server-side di setiap route protected.

---

## 8. User Flow (sesuai PRD section G)

```
Pengunjung:  Buka → Beranda → cari/filter → pilih spot → detail → lihat peta → (daftar/login)
User:        Login → jelajahi → detail → ♥ favorit | tulis review → halaman Favorit
Admin:       Login → dashboard → kelola tempat (tambah/edit/hapus) → kelola user/review
```

State yang harus ditangani tiap halaman data: loading (skeleton), empty ("belum ada tempat"), error, success.

---

## 9. Urutan Pengerjaan (Milestone)

1. **M1 — Fondasi** (projek berdiri)
   - `npx create-next-app@latest lokalgem --typescript --tailwind --app --src-dir`
   - Setup Prisma + PostgreSQL, jalankan schema section 5, migrate
   - Seed data dummy (Kopi Seduhan Senja, Rooftop Atmakala, Titik Temu Workspace, dst dari referensi)
   - Convert design tokens ke `tailwind.config.ts`, bangun komponen UI dasar + Navbar/Footer
   - Verifikasi: `npm run build` bersih, beranda tampil responsive

2. **M2 — Auth**
   - NextAuth credentials + register (bcrypt), halaman login/register, middleware guard `/favorit` & `/admin`
   - Verifikasi: register → login → session cookie → akses terproteksi jalan

3. **M3 — Katalog & Pencarian**
   - `/jelajahi` + search + filter (query param), `/kategori/[slug]`, `place-card` connect DB
   - Verifikasi: keyword "cafe" hasilkan tempat terkait; filter kombinasi benar

4. **M4 — Detail & Lokasi**
   - `/tempat/[id]`: galeri, info lengkap, peta Leaflet dari lat/long
   - Verifikasi: data tampil sama dengan DB, peta pinpoint benar

5. **M5 — Interaksi User**
   - Favorit toggle + halaman `/favorit`; review form + daftar + avg rating
   - Verifikasi: toggle dua kali = back to unsave; rating 1–5 tervalidasi

6. **M6 — Admin**
   - Dashboard statistik, CRUD tempat + upload foto, manage user & review
   - Verifikasi: non-admin dapat 403; hapus tempat membersihkan review/favorit

7. **M7 — Polish & Rilis**
   - Cek responsive 375/768/1280px, kontras ≥ 4.5:1, focus state keyboard, loading skeleton
   - Deploy Vercel + Neon, `.env` produksi, smoke test

---

## 10. Kebutuhan Non-Fungsional → Implementasi

| NFR | Implementasi |
|---|---|
| NFR-01 Usability | Alur maksimal 3 klik dari beranda ke detail; label jelas bahasa Indonesia |
| NFR-02 Performance | SSR + image optimization `next/image`, index di `kategori`/`suasana`, pagination 12/bulan |
| NFR-03 Security | bcrypt cost 12, NextAuth secret env, rate-limit register/login, parameterised query Prisma, no secrets di repo |
| NFR-04 Compatibility | Target Chrome/Edge/Firefox/mobile; tanpa fitur experimental |
| NFR-05 Responsive | Mobile-first Tailwind breakpoint `sm/md/lg` |
| NFR-06 Availability | Hosting Vercel/Neon uptime SLA; health check endpoint |
| NFR-07 Maintainability | Struktur folder section 3, TypeScript strict, shared Zod schema front+back |

---

## 11. Risiko & Catatan

- Nama di `brd.md` tertulis "Lokal Game" — kemungkinan typo dari "Lokal Gem". Konfirmasi ke stakeholder sebelum rilis.
- Referensi HTML pakai Google CDN Tailwind (`cdn.tailwindcss.com`) — jangan dipakai produksi; compile via PostCSS.
- Field `harga` bebas format ("Rp 25k - Rp 50k", "Rp 30k / jam"): kalau filter harga range numeric dibutuhkan nanti, pecah jadi `harga_min`/`harga_max` sejak awal (opsional, mudah di-migrate).
- Foto butuh alt text deskriptif (aksesibilitas + SEO) — sudah ada pola `data-alt` di referensi.
