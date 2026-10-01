import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Icon } from '../components/Icon'
import { SpotGrid } from '../components/SpotGrid'
import { StarRatingInput } from '../components/StarRatingInput'
import { useFavoritAction } from '../hooks/useFavoritAction'
import { useAuth } from '../hooks/useAuth'
import { useJarakTempat } from '../hooks/useJarakTempat'
import { useTempatList } from '../hooks/useTempatList'
import { fetchTempatById } from '../lib/api/tempat'
import { fetchReviewsByTempat, insertReview } from '../lib/api/review'
import type { Review, Tempat } from '../types/tempat'
import { getFasilitasIcon } from '../utils/fasilitasIcon'

export function DetailTempat() {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()
  const { data: semuaTempat } = useTempatList()

  const [tempat, setTempat] = useState<Tempat | null>(null)
  const [loadingTempat, setLoadingTempat] = useState(true)
  const [notFound, setNotFound] = useState(false)

  const [reviews, setReviews] = useState<Review[]>([])
  const [loadingReviews, setLoadingReviews] = useState(true)

  const [ratingBaru, setRatingBaru] = useState(5)
  const [komentarBaru, setKomentarBaru] = useState('')
  const [mengirimReview, setMengirimReview] = useState(false)
  const [tautanTersalin, setTautanTersalin] = useState(false)

  const { favorit, toggle: toggleFavorit } = useFavoritAction(id ?? '')
  const { label: jarak, dariLokasiPengguna } = useJarakTempat(tempat)

  useEffect(() => {
    if (!id) return
    let aktif = true

    async function muat() {
      setLoadingTempat(true)
      setNotFound(false)
      try {
        const data = await fetchTempatById(id as string)
        if (!aktif) return
        if (!data) setNotFound(true)
        else setTempat(data)
      } finally {
        if (aktif) setLoadingTempat(false)
      }
    }

    void muat()
    return () => {
      aktif = false
    }
  }, [id])

  useEffect(() => {
    if (!id) return
    let aktif = true

    async function muat() {
      setLoadingReviews(true)
      try {
        const data = await fetchReviewsByTempat(id as string)
        if (aktif) setReviews(data)
      } finally {
        if (aktif) setLoadingReviews(false)
      }
    }

    void muat()
    return () => {
      aktif = false
    }
  }, [id])

  const tempatSerupa = useMemo(() => {
    if (!tempat) return []
    return semuaTempat.filter((item) => item.kategori === tempat.kategori && item.id !== tempat.id).slice(0, 3)
  }, [tempat, semuaTempat])

  if (loadingTempat) {
    return (
      <div className="bg-surface font-sans text-on-surface min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center gap-space-sm text-on-surface-variant pt-20">
          <Icon name="progress_activity" className="animate-spin" />
          Memuat data tempat...
        </main>
        <Footer />
      </div>
    )
  }

  if (notFound || !tempat) {
    return (
      <div className="bg-surface font-sans text-on-surface min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center gap-space-md text-center px-6 pt-20">
          <Icon name="search_off" className="text-[48px] text-outline" />
          <h1 className="text-headline-md text-on-surface">Tempat tidak ditemukan</h1>
          <p className="text-body-md text-on-surface-variant max-w-sm">
            Spot yang kamu cari mungkin sudah tidak tersedia atau tautannya salah.
          </p>
          <Link
            to="/jelajahi"
            className="bg-primary hover:bg-primary-container text-on-primary px-6 py-3 rounded-xl text-label-lg font-medium transition-colors"
          >
            Jelajahi Tempat Lain
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  const tautanMaps = `https://www.google.com/maps/search/?api=1&query=${tempat.latitude},${tempat.longitude}`

  async function handleTambahReview(event: FormEvent) {
    event.preventDefault()
    if (!user || !komentarBaru.trim() || !tempat) return

    setMengirimReview(true)
    try {
      const reviewBaru = await insertReview({
        tempatId: tempat.id,
        userId: user.id,
        namaUser: user.nama,
        rating: ratingBaru,
        komentar: komentarBaru.trim(),
      })
      setReviews((prev) => [reviewBaru, ...prev])
      setKomentarBaru('')
      setRatingBaru(5)

      const tempatTerbaru = await fetchTempatById(tempat.id)
      if (tempatTerbaru) setTempat(tempatTerbaru)
    } finally {
      setMengirimReview(false)
    }
  }

  async function handleBagikan() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setTautanTersalin(true)
      setTimeout(() => setTautanTersalin(false), 2000)
    } catch {
      // abaikan jika clipboard tidak tersedia
    }
  }

  return (
    <div className="bg-surface font-sans text-on-surface min-h-screen">
      <Header />
      <main className="w-full pt-20 bg-surface">
        <div className="relative h-[320px] md:h-[420px] w-full overflow-hidden">
          <img src={tempat.foto} alt={tempat.namaTempat} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          <Link
            to="/jelajahi"
            className="absolute top-6 left-6 flex items-center gap-1 bg-surface/90 backdrop-blur-md px-4 py-2 rounded-full text-label-md text-on-surface shadow-sm hover:bg-surface"
          >
            <Icon name="arrow_back" className="text-[18px]" />
            Kembali
          </Link>

          <div className="absolute top-6 right-6 flex items-center gap-space-sm">
            <button
              type="button"
              onClick={handleBagikan}
              className="bg-surface/90 backdrop-blur-md p-2.5 rounded-full text-on-surface shadow-sm hover:bg-surface"
              aria-label="Bagikan tautan"
            >
              <Icon name={tautanTersalin ? 'check' : 'share'} className="text-[20px]" />
            </button>
            <button
              type="button"
              onClick={toggleFavorit}
              aria-pressed={favorit}
              aria-label={favorit ? 'Hapus dari favorit' : 'Tambahkan ke favorit'}
              className={`p-2.5 rounded-full backdrop-blur-md shadow-sm transition-colors ${
                favorit ? 'bg-secondary text-on-secondary' : 'bg-surface/90 text-on-surface hover:bg-surface'
              }`}
            >
              <Icon name="favorite" filled={favorit} className="text-[20px]" />
            </button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 px-6 lg:px-12 pb-space-lg">
            <div className="max-w-7xl mx-auto flex flex-col gap-space-sm">
              <div className="flex items-center gap-space-sm">
                <span className="inline-block bg-secondary-fixed/80 text-on-secondary-fixed text-label-md px-3 py-1 rounded-full font-medium">
                  {tempat.kategori}
                </span>
                <div className="flex items-center gap-1 bg-surface/90 backdrop-blur-md px-3 py-1 rounded-full">
                  <Icon name="star" filled className="text-[16px] text-amber-500" />
                  <span className="text-label-md font-bold text-on-surface">{tempat.rating}</span>
                  <span className="text-body-sm text-outline">({tempat.jumlahReview})</span>
                </div>
              </div>
              <h1 className="text-headline-xl text-white tracking-tight">{tempat.namaTempat}</h1>
              <p className="text-body-lg text-white/90 flex items-center gap-1">
                <Icon name="location_on" className="text-[18px]" />
                {tempat.alamat}
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-space-xl grid grid-cols-1 lg:grid-cols-3 gap-space-xl">
          <div className="lg:col-span-2 flex flex-col gap-space-xl">
            <section>
              <h2 className="text-headline-sm text-on-surface mb-space-sm">Tentang Tempat</h2>
              <p className="text-body-lg text-on-surface-variant">{tempat.deskripsi}</p>
            </section>

            <section>
              <h2 className="text-headline-sm text-on-surface mb-space-sm">Fasilitas</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-space-sm">
                {tempat.fasilitas.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-space-sm bg-surface-container-low px-4 py-3 rounded-xl text-body-sm text-on-surface"
                  >
                    <Icon name={getFasilitasIcon(item)} className="text-secondary text-[20px]" />
                    {item}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-headline-sm text-on-surface mb-space-sm">Lokasi</h2>
              <div className="bg-surface-container-low rounded-2xl p-space-lg flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
                <div className="flex items-start gap-space-sm">
                  <Icon name="location_on" className="text-secondary text-[22px]" />
                  <div>
                    <p className="text-body-md text-on-surface font-medium">{tempat.alamat}</p>
                    <p className="text-body-sm text-on-surface-variant mt-1 flex items-center gap-1">
                      {dariLokasiPengguna && <Icon name="my_location" className="text-[14px] text-secondary" />}
                      {jarak} {dariLokasiPengguna ? 'dari lokasimu' : 'dari pusat kota'}
                    </p>
                  </div>
                </div>
                <a
                  href={tautanMaps}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-space-sm bg-primary hover:bg-primary-container text-on-primary px-5 py-3 rounded-xl text-label-lg font-medium transition-colors"
                >
                  <Icon name="map" className="text-[18px]" />
                  Buka di Maps
                </a>
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-space-sm">
                <h2 className="text-headline-sm text-on-surface">Ulasan ({reviews.length})</h2>
                <div className="flex items-center gap-1">
                  <Icon name="verified" className="text-secondary text-[18px]" />
                  <span className="text-body-sm text-on-surface-variant">Ulasan Terverifikasi</span>
                </div>
              </div>

              {user ? (
                <form
                  onSubmit={handleTambahReview}
                  className="bg-surface-container-low rounded-2xl p-space-lg flex flex-col gap-space-sm mb-space-lg"
                >
                  <span className="text-label-lg font-medium text-on-surface">Beri rating & ulasanmu</span>
                  <StarRatingInput value={ratingBaru} onChange={setRatingBaru} />
                  <textarea
                    value={komentarBaru}
                    onChange={(event) => setKomentarBaru(event.target.value)}
                    placeholder="Ceritakan pengalamanmu di tempat ini..."
                    rows={3}
                    className="bg-surface text-body-md text-on-surface outline-none placeholder:text-outline w-full rounded-xl px-4 py-3 border border-outline-variant/30"
                  />
                  <button
                    type="submit"
                    disabled={!komentarBaru.trim() || mengirimReview}
                    className="self-end bg-secondary hover:bg-secondary-container disabled:opacity-50 disabled:cursor-not-allowed text-on-secondary px-5 py-2.5 rounded-xl text-label-md font-medium transition-colors"
                  >
                    {mengirimReview ? 'Mengirim...' : 'Kirim Ulasan'}
                  </button>
                </form>
              ) : (
                <div className="bg-surface-container-low rounded-2xl p-space-lg flex items-center justify-between gap-space-md mb-space-lg flex-wrap">
                  <span className="text-body-md text-on-surface-variant">Masuk untuk memberi rating dan ulasan.</span>
                  <Link
                    to="/login"
                    state={{ from: `/tempat/${tempat.id}` }}
                    className="bg-primary hover:bg-primary-container text-on-primary px-5 py-2.5 rounded-xl text-label-md font-medium transition-colors"
                  >
                    Masuk
                  </Link>
                </div>
              )}

              <div className="flex flex-col gap-space-sm">
                {loadingReviews ? (
                  <p className="text-body-md text-on-surface-variant flex items-center gap-space-sm">
                    <Icon name="progress_activity" className="animate-spin" /> Memuat ulasan...
                  </p>
                ) : reviews.length === 0 ? (
                  <p className="text-body-md text-on-surface-variant">Belum ada ulasan untuk tempat ini.</p>
                ) : (
                  reviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-surface p-space-lg rounded-2xl shadow-sm flex flex-col gap-space-sm border border-outline-variant/10"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center font-bold text-on-secondary-fixed">
                            {review.inisial}
                          </div>
                          <h4 className="text-label-lg font-bold text-on-surface">{review.namaUser}</h4>
                        </div>
                        <div className="flex items-center gap-1 text-amber-500">
                          {Array.from({ length: review.rating }).map((_, index) => (
                            <Icon key={index} name="star" filled className="text-[14px]" />
                          ))}
                        </div>
                      </div>
                      <p className="text-body-md text-on-surface-variant">{review.komentar}</p>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-28 bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/10 p-space-lg flex flex-col gap-space-md">
              <div>
                <span className="text-label-md text-on-surface-variant">Kisaran Harga</span>
                <p className="text-headline-sm text-on-surface">{tempat.hargaLabel}</p>
              </div>

              <div className="flex flex-col gap-space-sm border-t border-outline-variant/20 pt-space-md">
                <div className="flex items-center justify-between text-body-sm">
                  <span className="flex items-center gap-space-sm text-on-surface-variant">
                    <Icon name="schedule" className="text-[18px]" /> Jam Operasional
                  </span>
                  <span className="font-medium text-on-surface">
                    {tempat.jamBuka} - {tempat.jamTutup}
                  </span>
                </div>
                <div className="flex items-center justify-between text-body-sm">
                  <span className="flex items-center gap-space-sm text-on-surface-variant">
                    <Icon name="mood" className="text-[18px]" /> Suasana
                  </span>
                  <span className="font-medium text-on-surface">{tempat.suasana}</span>
                </div>
                <div className="flex items-center justify-between text-body-sm">
                  <span className="flex items-center gap-space-sm text-on-surface-variant">
                    <Icon name="category" className="text-[18px]" /> Kategori
                  </span>
                  <span className="font-medium text-on-surface">{tempat.kategori}</span>
                </div>
              </div>

              <a
                href={tautanMaps}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-space-sm bg-secondary hover:bg-secondary-container text-on-secondary px-5 py-3.5 rounded-xl text-label-lg font-medium transition-colors"
              >
                <Icon name="directions" className="text-[18px]" />
                Dapatkan Petunjuk Arah
              </a>
              <button
                type="button"
                onClick={toggleFavorit}
                className={`w-full flex items-center justify-center gap-space-sm px-5 py-3 rounded-xl text-label-lg font-medium transition-colors border ${
                  favorit
                    ? 'bg-secondary-fixed/40 text-on-secondary-fixed border-transparent'
                    : 'border-outline-variant/40 text-on-surface hover:bg-surface-container-low'
                }`}
              >
                <Icon name="favorite" filled={favorit} className="text-[18px]" />
                {favorit ? 'Tersimpan di Favorit' : 'Simpan ke Favorit'}
              </button>
            </div>
          </aside>
        </div>

        {tempatSerupa.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-space-xl w-full">
            <h2 className="text-headline-lg text-on-surface mb-space-lg">Tempat Serupa</h2>
            <SpotGrid spots={tempatSerupa} />
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}
