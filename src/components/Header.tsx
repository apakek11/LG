import { useState, type KeyboardEvent } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useFavorit } from '../hooks/useFavorit'
import { Icon } from './Icon'

const NAV_LINKS = [
  { path: '/', label: 'Beranda' },
  { path: '/jelajahi', label: 'Jelajahi' },
  { path: '/kategori', label: 'Kategori' },
  { path: '/favorit', label: 'Favorit' },
]

export function Header() {
  const [query, setQuery] = useState('')
  const [menuTerbuka, setMenuTerbuka] = useState(false)
  const [navMobileTerbuka, setNavMobileTerbuka] = useState(false)
  const navigate = useNavigate()
  const { favoritIds } = useFavorit()
  const { user, logout } = useAuth()

  function handleSearchKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' && query.trim()) {
      setNavMobileTerbuka(false)
      navigate(`/jelajahi?q=${encodeURIComponent(query.trim())}`)
    }
  }

  async function handleLogout() {
    await logout()
    setMenuTerbuka(false)
    navigate('/')
  }

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-gutter">
        <div className="flex items-center gap-space-xl">
          <NavLink to="/" className="text-headline-sm text-primary tracking-tight">
            Lokal Gem
          </NavLink>
          <nav className="hidden md:flex items-center gap-space-lg">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  isActive
                    ? 'relative transition-colors bg-surface-container-high text-on-surface font-bold rounded-xl px-3 py-1.5'
                    : 'relative text-body-md text-on-surface-variant hover:text-on-surface transition-colors'
                }
              >
                {link.label}
                {link.path === '/favorit' && favoritIds.size > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-secondary text-on-secondary text-[10px] leading-4 text-center font-bold">
                    {favoritIds.size}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-space-sm sm:gap-space-md">
          <div className="hidden sm:flex items-center bg-surface-container-low px-4 py-2 rounded-xl border border-outline-variant/30 w-64">
            <Icon name="search" className="text-outline text-[18px] mr-2" />
            <input
              className="bg-transparent text-body-md text-on-surface outline-none w-full placeholder:text-outline"
              placeholder="Cari tempat nongkrong..."
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={handleSearchKeyDown}
            />
          </div>
          <button type="button" className="p-2 text-on-surface-variant hover:text-on-surface transition-colors">
            <Icon name="notifications" className="text-[20px]" />
          </button>
          <button
            type="button"
            onClick={() => {
              setNavMobileTerbuka((prev) => !prev)
              setMenuTerbuka(false)
            }}
            aria-expanded={navMobileTerbuka}
            aria-controls="nav-mobile"
            aria-label={navMobileTerbuka ? 'Tutup menu' : 'Buka menu'}
            className="md:hidden p-2 text-on-surface"
          >
            <Icon name={navMobileTerbuka ? 'close' : 'menu'} />
          </button>

          {user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuTerbuka((prev) => !prev)}
                className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary text-label-md font-bold"
              >
                {user.nama.charAt(0).toUpperCase()}
              </button>
              {menuTerbuka && (
                <div className="absolute right-0 mt-2 w-56 bg-surface-container-lowest rounded-xl shadow-xl border border-outline-variant/20 py-2">
                  <div className="px-4 py-2 border-b border-outline-variant/20">
                    <p className="text-label-lg font-bold text-on-surface truncate">{user.nama}</p>
                    <p className="text-body-sm text-on-surface-variant truncate">{user.email}</p>
                  </div>
                  {user.role === 'admin' && (
                    <Link
                      to="/admin"
                      onClick={() => setMenuTerbuka(false)}
                      className="w-full text-left px-4 py-2 text-body-md text-on-surface hover:bg-surface-container-low flex items-center gap-space-sm"
                    >
                      <Icon name="space_dashboard" className="text-[18px]" />
                      Dashboard Admin
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-body-md text-on-surface hover:bg-surface-container-low flex items-center gap-space-sm"
                  >
                    <Icon name="logout" className="text-[18px]" />
                    Keluar
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-primary-container transition-colors"
              aria-label="Masuk"
            >
              <Icon name="person" className="text-on-primary text-[18px]" />
            </Link>
          )}
        </div>
      </div>

      {navMobileTerbuka && (
        <nav id="nav-mobile" className="md:hidden border-t border-outline-variant/20 bg-surface px-6 py-space-md flex flex-col gap-1">
          <div className="sm:hidden flex items-center bg-surface-container-low px-4 py-3 rounded-xl border border-outline-variant/30 mb-space-sm">
            <Icon name="search" className="text-outline text-[18px] mr-2" />
            <input
              className="bg-transparent text-body-md text-on-surface outline-none w-full placeholder:text-outline"
              placeholder="Cari tempat nongkrong..."
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={handleSearchKeyDown}
            />
          </div>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              onClick={() => setNavMobileTerbuka(false)}
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3 rounded-xl text-body-lg transition-colors ${
                  isActive ? 'bg-surface-container-high text-on-surface font-bold' : 'text-on-surface-variant hover:bg-surface-container-low'
                }`
              }
            >
              {link.label}
              {link.path === '/favorit' && favoritIds.size > 0 && (
                <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-secondary text-on-secondary text-label-md leading-5 text-center">
                  {favoritIds.size}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}
