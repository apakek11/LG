import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { CatalogSection } from '../components/CatalogSection'
import { CategorySection } from '../components/CategorySection'
import { CtaSection } from '../components/CtaSection'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { HeroSection, type SearchFilters } from '../components/HeroSection'
import { Icon } from '../components/Icon'
import { PopularSpotsSection } from '../components/PopularSpotsSection'
import { ReviewsSection } from '../components/ReviewsSection'
import { TestimoniSection } from '../components/TestimoniSection'
import { useTempatList } from '../hooks/useTempatList'
import { SEMUA_KATEGORI, SEMUA_SUASANA } from '../utils/filterTempat'

export function Beranda() {
  const navigate = useNavigate()
  const { data: semuaTempat, loading, error } = useTempatList()

  const tempatPopuler = useMemo(() => semuaTempat.slice(0, 3), [semuaTempat])
  const tempatKatalogSemua = useMemo(() => semuaTempat.slice(3), [semuaTempat])
  const suasanaOptions = useMemo(
    () => [SEMUA_SUASANA, ...Array.from(new Set(semuaTempat.map((tempat) => tempat.suasana))).sort()],
    [semuaTempat],
  )

  function handleSearch(filters: SearchFilters) {
    const params = new URLSearchParams()
    if (filters.lokasi) params.set('lokasi', filters.lokasi)
    if (filters.suasana && filters.suasana !== SEMUA_SUASANA) params.set('suasana', filters.suasana)
    if (filters.kategori && filters.kategori !== SEMUA_KATEGORI) params.set('kategori', filters.kategori)
    navigate(`/jelajahi?${params.toString()}`)
  }

  return (
    <div className="bg-surface font-sans text-on-surface min-h-screen">
      <Header />
      <main className="w-full pt-20 bg-surface">
        <div className="flex flex-col w-full">
          <HeroSection onSearch={handleSearch} suasanaOptions={suasanaOptions} />
          <CategorySection />

          {loading && (
            <div className="py-space-xl text-center text-on-surface-variant flex items-center justify-center gap-space-sm">
              <Icon name="progress_activity" className="animate-spin" />
              Memuat data tempat...
            </div>
          )}

          {error && (
            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-space-lg w-full text-center text-error">
              Gagal memuat data dari Supabase: {error}
            </div>
          )}

          {!loading && !error && (
            <>
              <PopularSpotsSection spots={tempatPopuler} />
              <CtaSection />
              <CatalogSection spots={tempatKatalogSemua} totalTersedia={semuaTempat.length} />
              <ReviewsSection />
            </>
          )}

          <TestimoniSection />
        </div>
      </main>
      <Footer />
    </div>
  )
}
