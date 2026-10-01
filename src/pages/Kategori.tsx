import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Icon } from '../components/Icon'
import { PageHeader } from '../components/PageHeader'
import { SpotGrid } from '../components/SpotGrid'
import { useKategoriList } from '../hooks/useKategoriList'
import { useTempatList } from '../hooks/useTempatList'
import type { Tempat } from '../types/tempat'

export function Kategori() {
  const [searchParams, setSearchParams] = useSearchParams()
  const kategoriAktif = searchParams.get('nama')
  const { data: kategoriList } = useKategoriList()
  const { data: semuaTempat, loading, error } = useTempatList()

  const tempatPerKategori = useMemo(() => {
    const map = new Map<string, Tempat[]>()
    for (const kategori of kategoriList) {
      map.set(
        kategori.nama,
        semuaTempat.filter((tempat) => tempat.kategori === kategori.nama),
      )
    }
    return map
  }, [kategoriList, semuaTempat])

  function pilihKategori(nama: string | null) {
    if (!nama) {
      setSearchParams({})
    } else {
      setSearchParams({ nama })
    }
  }

  return (
    <div className="bg-surface font-sans text-on-surface min-h-screen">
      <Header />
      <main className="w-full pt-20 bg-surface">
        <PageHeader
          eyebrow="Kategori"
          title="Jelajahi Berdasarkan Kategori"
          description="Pilih jenis tempat yang kamu cari, mulai dari ngopi santai, kerja fokus, hingga rooftop penuh suasana."
        />

        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-space-xl w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md">
            {kategoriList.map((kategori) => {
              const aktif = kategoriAktif === kategori.nama
              return (
                <button
                  key={kategori.id}
                  type="button"
                  onClick={() => pilihKategori(aktif ? null : kategori.nama)}
                  className={`group relative overflow-hidden rounded-2xl p-6 transition-all cursor-pointer shadow-sm hover:shadow-xl flex flex-col justify-between h-48 text-left ${
                    aktif ? 'bg-primary-container' : 'bg-surface-container-low hover:bg-primary-container'
                  }`}
                >
                  <div className="absolute right-[-20px] bottom-[-20px] opacity-10 group-hover:opacity-25 transition-opacity">
                    <Icon name={kategori.icon} className="text-[120px] text-on-surface" />
                  </div>
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                      aktif
                        ? 'bg-secondary text-on-secondary'
                        : 'bg-secondary-fixed text-secondary group-hover:bg-secondary group-hover:text-on-secondary'
                    }`}
                  >
                    <Icon name={kategori.icon} className="text-[24px]" />
                  </div>
                  <div>
                    <h3
                      className={`text-headline-sm transition-colors ${
                        aktif ? 'text-on-primary' : 'text-on-surface group-hover:text-on-primary'
                      }`}
                    >
                      {kategori.nama}
                    </h3>
                    <p
                      className={`text-body-sm transition-colors mt-1 ${
                        aktif ? 'text-on-primary-container' : 'text-on-surface-variant group-hover:text-on-primary-container'
                      }`}
                    >
                      {tempatPerKategori.get(kategori.nama)?.length ?? 0} Tempat Terkurasi
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        </section>

        {loading && (
          <div className="py-space-xl text-center text-on-surface-variant flex items-center justify-center gap-space-sm">
            <Icon name="progress_activity" className="animate-spin" />
            Memuat data tempat...
          </div>
        )}
        {error && <div className="py-space-lg text-center text-error">Gagal memuat data: {error}</div>}

        {!loading && !error && kategoriAktif ? (
          <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-space-xl w-full">
            <div className="flex items-center justify-between mb-space-lg">
              <h2 className="text-headline-lg text-on-surface">{kategoriAktif}</h2>
              <button type="button" onClick={() => pilihKategori(null)} className="text-label-lg text-secondary hover:underline font-medium">
                Tampilkan Semua Kategori
              </button>
            </div>
            <SpotGrid
              spots={tempatPerKategori.get(kategoriAktif) ?? []}
              emptyMessage="Belum ada tempat terkurasi untuk kategori ini."
            />
          </section>
        ) : (
          kategoriList.map((kategori) => {
            const daftar = tempatPerKategori.get(kategori.nama) ?? []
            if (daftar.length === 0) return null
            return (
              <section key={kategori.id} className="max-w-7xl mx-auto px-6 lg:px-12 pb-space-xl w-full">
                <div className="flex items-center justify-between mb-space-lg">
                  <h2 className="text-headline-lg text-on-surface">{kategori.nama}</h2>
                  <button
                    type="button"
                    onClick={() => pilihKategori(kategori.nama)}
                    className="text-label-lg text-secondary hover:underline flex items-center gap-1 font-medium"
                  >
                    Lihat Semua <Icon name="arrow_forward" className="text-[16px]" />
                  </button>
                </div>
                <SpotGrid spots={daftar.slice(0, 3)} />
              </section>
            )
          })
        )}
      </main>
      <Footer />
    </div>
  )
}
