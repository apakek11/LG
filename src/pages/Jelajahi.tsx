import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FilterBar } from '../components/FilterBar'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Icon } from '../components/Icon'
import { LocationButton } from '../components/LocationButton'
import { PageHeader } from '../components/PageHeader'
import { SpotGrid } from '../components/SpotGrid'
import { useKategoriList } from '../hooks/useKategoriList'
import { useTempatList } from '../hooks/useTempatList'
import { useUserLocation } from '../hooks/useUserLocation'
import {
  SEMUA_KATEGORI,
  SEMUA_SUASANA,
  filterTempat,
  sortTempat,
  type Urutan,
} from '../utils/filterTempat'

export function Jelajahi() {
  const [searchParams] = useSearchParams()
  const { data: kategoriList } = useKategoriList()
  const { data: semuaTempat, loading, error } = useTempatList()
  const { coords } = useUserLocation()

  const [q, setQ] = useState(searchParams.get('q') ?? '')
  const [lokasi, setLokasi] = useState(searchParams.get('lokasi') ?? '')
  const [kategori, setKategori] = useState(searchParams.get('kategori') ?? SEMUA_KATEGORI)
  const [suasana, setSuasana] = useState(searchParams.get('suasana') ?? SEMUA_SUASANA)
  const [urutan, setUrutan] = useState<Urutan>('rating')

  const kategoriOptions = useMemo(
    () => [SEMUA_KATEGORI, ...kategoriList.map((item) => item.nama)],
    [kategoriList],
  )

  const suasanaOptions = useMemo(
    () => [SEMUA_SUASANA, ...Array.from(new Set(semuaTempat.map((tempat) => tempat.suasana))).sort()],
    [semuaTempat],
  )

  const hasilTersaring = useMemo(() => {
    const hasil = filterTempat(semuaTempat, { q, lokasi, kategori, suasana })
    return sortTempat(hasil, urutan, coords ?? undefined)
  }, [semuaTempat, q, lokasi, kategori, suasana, urutan, coords])

  const adaFilterAktif = Boolean(q || lokasi || kategori !== SEMUA_KATEGORI || suasana !== SEMUA_SUASANA)

  function resetSemuaFilter() {
    setQ('')
    setLokasi('')
    setKategori(SEMUA_KATEGORI)
    setSuasana(SEMUA_SUASANA)
  }

  return (
    <div className="bg-surface font-sans text-on-surface min-h-screen">
      <Header />
      <main className="w-full pt-20 bg-surface">
        <PageHeader
          eyebrow="Jelajahi"
          title="Temukan Tempat Nongkrong Sesuai Keinginanmu"
          description="Cari, filter, dan urutkan seluruh spot yang terkurasi di Lokal Gem berdasarkan kata kunci, kategori, dan suasana."
        />

        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-space-xl w-full flex flex-col gap-space-lg">
          <FilterBar
            q={q}
            onQChange={setQ}
            kategori={kategori}
            onKategoriChange={setKategori}
            kategoriOptions={kategoriOptions}
            suasana={suasana}
            onSuasanaChange={setSuasana}
            suasanaOptions={suasanaOptions}
            urutan={urutan}
            onUrutanChange={setUrutan}
          />

          <div className="flex flex-wrap items-center justify-between gap-space-sm">
            <div className="flex flex-wrap items-center gap-space-sm">
              {lokasi && (
                <button
                  type="button"
                  onClick={() => setLokasi('')}
                  className="flex items-center gap-1 bg-surface-container-low px-3 py-1.5 rounded-full text-body-sm text-on-surface-variant hover:text-on-surface"
                >
                  Lokasi: {lokasi} <Icon name="close" className="text-[14px]" />
                </button>
              )}
              <span className="text-body-sm text-on-surface-variant">
                {hasilTersaring.length} tempat ditemukan
              </span>
              <LocationButton />
            </div>
            {adaFilterAktif && (
              <button type="button" onClick={resetSemuaFilter} className="text-label-lg text-secondary hover:underline font-medium">
                Reset Semua Filter
              </button>
            )}
          </div>

          {loading && (
            <div className="py-space-xl text-center text-on-surface-variant flex items-center justify-center gap-space-sm">
              <Icon name="progress_activity" className="animate-spin" />
              Memuat data tempat...
            </div>
          )}
          {error && <div className="py-space-lg text-center text-error">Gagal memuat data: {error}</div>}
          {!loading && !error && (
            <SpotGrid spots={hasilTersaring} emptyMessage="Tidak ada tempat yang cocok dengan pencarian atau filter ini." />
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}
