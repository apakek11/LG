import { useState, type ReactNode } from 'react'
import { Link, NavLink, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { Icon } from '../Icon'

const MENU_ADMIN = [
  { path: '/admin', label: 'Dashboard', icon: 'space_dashboard', end: true },
  { path: '/admin/tempat', label: 'Kelola Tempat', icon: 'storefront', end: false },
  { path: '/admin/review', label: 'Kelola Review', icon: 'rate_review', end: false },
  { path: '/admin/pengguna', label: 'Pengguna', icon: 'group', end: false },
]

interface AdminLayoutProps {
  title: string
  description?: string
  actions?: ReactNode
  children: ReactNode
}

export function AdminLayout({ title, description, actions, children }: AdminLayoutProps) {
  const { user, loading, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [menuTerbuka, setMenuTerbuka] = useState(false)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center gap-space-sm bg-surface text-on-surface-variant font-sans">
        <Icon name="progress_activity" className="animate-spin" />
        Memeriksa akses...
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  if (user.role !== 'admin') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-space-md text-center px-6 bg-surface font-sans">
        <Icon name="gpp_bad" className="text-[48px] text-outline" />
        <h1 className="text-headline-md text-on-surface">Akses ditolak</h1>
        <p className="text-body-md text-on-surface-variant max-w-sm">
          Halaman ini khusus admin Lokal Gem. Akunmu ({user.email}) terdaftar sebagai pengguna biasa.
        </p>
        <Link
          to="/"
          className="bg-primary hover:bg-primary-container text-on-primary px-6 py-3 rounded-xl text-label-lg font-medium transition-colors"
        >
          Kembali ke Beranda
        </Link>
      </div>
    )
  }

  async function handleLogout() {
    await logout()
    navigate('/')
  }

  const sidebar = (
    <nav className="flex flex-col gap-1">
      {MENU_ADMIN.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.end}
          onClick={() => setMenuTerbuka(false)}
          className={({ isActive }) =>
            `flex items-center gap-space-sm px-4 py-2.5 rounded-xl text-label-lg transition-colors ${
              isActive
                ? 'bg-secondary text-on-secondary'
                : 'text-on-primary-container hover:bg-white/5 hover:text-on-primary'
            }`
          }
        >
          <Icon name={item.icon} className="text-[20px]" />
          {item.label}
        </NavLink>
      ))}
    </nav>
  )

  return (
    <div className="min-h-screen bg-surface font-sans text-on-surface lg:flex">
      <aside className="hidden lg:flex lg:w-64 shrink-0 flex-col justify-between bg-primary-container p-space-lg sticky top-0 h-screen">
        <div className="flex flex-col gap-space-xl">
          <Link to="/" className="text-headline-sm text-on-primary tracking-tight">
            Lokal Gem <span className="text-label-md text-secondary-container align-middle">Admin</span>
          </Link>
          {sidebar}
        </div>
        <div className="flex flex-col gap-space-sm border-t border-white/10 pt-space-md">
          <p className="text-label-lg text-on-primary truncate">{user.nama}</p>
          <p className="text-body-sm text-on-primary-container truncate">{user.email}</p>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-space-sm flex items-center gap-space-sm text-label-lg text-on-primary-container hover:text-on-primary"
          >
            <Icon name="logout" className="text-[18px]" /> Keluar
          </button>
        </div>
      </aside>

      <div className="lg:hidden sticky top-0 z-40 bg-primary-container">
        <div className="h-16 px-6 flex items-center justify-between">
          <Link to="/" className="text-headline-sm text-on-primary tracking-tight">
            Lokal Gem <span className="text-label-md text-secondary-container">Admin</span>
          </Link>
          <button
            type="button"
            onClick={() => setMenuTerbuka((prev) => !prev)}
            aria-expanded={menuTerbuka}
            aria-label="Menu admin"
            className="text-on-primary p-2"
          >
            <Icon name={menuTerbuka ? 'close' : 'menu'} />
          </button>
        </div>
        {menuTerbuka && <div className="px-6 pb-space-md">{sidebar}</div>}
      </div>

      <main className="flex-1 min-w-0 px-6 lg:px-12 py-space-xl">
        <div className="max-w-6xl mx-auto flex flex-col gap-space-lg">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-space-md">
            <div>
              <h1 className="text-headline-lg text-on-surface">{title}</h1>
              {description && <p className="text-body-md text-on-surface-variant mt-1">{description}</p>}
            </div>
            {actions}
          </div>
          {children}
        </div>
      </main>
    </div>
  )
}

export function StatusMuat({ loading, error }: { loading: boolean; error: string | null }) {
  if (loading) {
    return (
      <div className="py-space-xl text-center text-on-surface-variant flex items-center justify-center gap-space-sm">
        <Icon name="progress_activity" className="animate-spin" />
        Memuat data...
      </div>
    )
  }
  if (error) {
    return (
      <div className="flex items-center gap-space-sm bg-error-container text-on-error-container px-4 py-3 rounded-xl text-body-sm">
        <Icon name="error" className="text-[18px]" />
        <span>Gagal memuat data: {error}</span>
      </div>
    )
  }
  return null
}
