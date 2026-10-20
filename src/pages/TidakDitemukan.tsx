import { Link, useLocation } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Icon } from '../components/Icon'

export function TidakDitemukan() {
  const { pathname } = useLocation()

  return (
    <div className="bg-surface font-sans text-on-surface min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center gap-space-md text-center px-6 pt-28 pb-space-xl">
        <span className="text-label-md text-secondary font-bold tracking-wider uppercase">404</span>
        <Icon name="explore_off" className="text-[48px] text-outline" />
        <h1 className="text-headline-lg text-on-surface">Halaman ini nggak ketemu</h1>
        <p className="text-body-md text-on-surface-variant max-w-sm">
          Alamat <code className="bg-surface-container-low px-1.5 py-0.5 rounded break-all">{pathname}</code> tidak ada
          di Lokal Gem. Mungkin tautannya salah ketik atau halamannya sudah dipindah.
        </p>
        <div className="flex flex-wrap justify-center gap-space-sm">
          <Link
            to="/"
            className="bg-primary hover:bg-primary-container text-on-primary px-6 py-3 rounded-xl text-label-lg font-medium transition-colors"
          >
            Ke Beranda
          </Link>
          <Link
            to="/jelajahi"
            className="border border-outline-variant/40 text-on-surface hover:bg-surface-container-low px-6 py-3 rounded-xl text-label-lg font-medium transition-colors"
          >
            Jelajahi Tempat
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
