import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from './Icon'

interface AuthLayoutProps {
  title: string
  subtitle: string
  children: ReactNode
  footer: ReactNode
}

export function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full flex bg-surface font-sans text-on-surface">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary-container text-on-primary-container p-12 flex-col justify-between">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCwMP4W5yVm4HU6U4GDPDt2Wmb6meRO9SBk0vhV3wtLON-xCiZpTEfPkTxz7IioYfbzEysrlF_uLfLz8bqrKQKSN0yem0VEZmBfIZg7YoPrBBnmHvO9ZdIwbqvDNM2in2RdS-Kwjht1jCflGk1Agr70blte6HNjhX_K7QiZIfVLZchAH39AvyStTl-mo83PWwbEOPxkJ1Lak6TOEqiGK23F_yX9-MehIy7M8d5b9LSxys4GAMYN6V6d')",
          }}
        />
        <Link to="/" className="relative text-headline-sm text-on-primary tracking-tight">
          Lokal Gem
        </Link>
        <div className="relative flex flex-col gap-space-md">
          <div className="inline-flex items-center gap-space-sm bg-surface-container/20 backdrop-blur-md px-4 py-2 rounded-full text-label-md text-surface tracking-wide w-fit">
            <Icon name="auto_awesome" className="text-[16px] text-secondary-container" />
            <span>TEMUKAN PERMATA TERSEMBUNYI KOTA</span>
          </div>
          <h2 className="text-headline-lg text-on-primary max-w-md">
            Satu platform untuk semua tempat nongkrong favoritmu.
          </h2>
          <p className="text-body-lg text-on-primary-container max-w-sm">
            Simpan favorit, beri ulasan, dan temukan rekomendasi baru yang sesuai gayamu.
          </p>
        </div>
        <p className="relative text-body-sm text-on-primary-container/70">
          © {new Date().getFullYear()} Lokal Gem
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md flex flex-col gap-space-lg">
          <Link to="/" className="lg:hidden text-headline-sm text-primary tracking-tight">
            Lokal Gem
          </Link>
          <div>
            <h1 className="text-headline-lg text-on-surface">{title}</h1>
            <p className="text-body-md text-on-surface-variant mt-1">{subtitle}</p>
          </div>
          {children}
          {footer}
        </div>
      </div>
    </div>
  )
}
