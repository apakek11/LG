import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Icon } from '../components/Icon'
import { PageHeader } from '../components/PageHeader'
import { SpotGrid } from '../components/SpotGrid'
import { useAuth } from '../hooks/useAuth'
import { useFavorit } from '../hooks/useFavorit'
import { useTempatList } from '../hooks/useTempatList'

export function Favorit() {
  const { user } = useAuth()
  const { favoritIds, loading: loadingFavorit } = useFavorit()
  const { data: semuaTempat, loading: loadingTempat, error } = useTempatList()

  const tempatFavorit = useMemo(
    () => semuaTempat.filter((tempat) => favoritIds.has(tempat.id)),
    [favoritIds, semuaTempat],
  )

  const loading = loadingFavorit || loadingTempat

  return (
    <div className="bg-surface font-sans text-on-surface min-h-screen">
      <Header />
      <main className="w-full pt-20 bg-surface">
        <PageHeader
          eyebrow="Favorit"
          title="Tempat yang Kamu Simpan"
          description="Semua spot yang kamu tandai favorit tersimpan di sini supaya mudah dikunjungi lagi kapan saja."
        />

        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-space-xl w-full">
          {!user ? (
            <div className="flex flex-col items-center text-center gap-space-md py-space-xl">
              <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center">
                <Icon name="lock" className="text-[28px] text-outline" />
              </div>
              <h2 className="text-headline-sm text-on-surface">Masuk dulu untuk melihat favoritmu</h2>
              <p className="text-body-md text-on-surface-variant max-w-md">
                Favorit tersimpan per akun. Masuk atau daftar supaya tempat favoritmu bisa diakses kapan saja.
              </p>
              <Link
                to="/login"
                state={{ from: '/favorit' }}
                className="bg-primary hover:bg-primary-container text-on-primary px-6 py-3 rounded-xl text-label-lg font-medium transition-colors"
              >
                Masuk
              </Link>
            </div>
          ) : loading ? (
            <div className="py-space-xl text-center text-on-surface-variant flex items-center justify-center gap-space-sm">
              <Icon name="progress_activity" className="animate-spin" />
              Memuat data favorit...
            </div>
          ) : error ? (
            <div className="py-space-lg text-center text-error">Gagal memuat data: {error}</div>
          ) : tempatFavorit.length === 0 ? (
            <div className="flex flex-col items-center text-center gap-space-md py-space-xl">
              <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center">
                <Icon name="favorite" className="text-[28px] text-outline" />
              </div>
              <h2 className="text-headline-sm text-on-surface">Belum ada tempat favorit</h2>
              <p className="text-body-md text-on-surface-variant max-w-md">
                Tekan ikon hati pada kartu tempat untuk menyimpannya ke daftar favoritmu.
              </p>
              <Link
                to="/jelajahi"
                className="bg-primary hover:bg-primary-container text-on-primary px-6 py-3 rounded-xl text-label-lg font-medium transition-colors"
              >
                Jelajahi Tempat
              </Link>
            </div>
          ) : (
            <>
              <p className="text-body-sm text-on-surface-variant mb-space-lg">
                {tempatFavorit.length} tempat tersimpan
              </p>
              <SpotGrid spots={tempatFavorit} />
            </>
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}
