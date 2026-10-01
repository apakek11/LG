import { Link } from 'react-router-dom'
import type { Tempat } from '../types/tempat'
import { Icon } from './Icon'
import { SpotGrid } from './SpotGrid'

interface CatalogSectionProps {
  spots: Tempat[]
  totalTersedia: number
}

export function CatalogSection({ spots, totalTersedia }: CatalogSectionProps) {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-space-xl w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-space-lg gap-space-md">
        <div>
          <span className="text-label-md text-secondary font-bold tracking-wider uppercase">Eksplorasi Lengkap</span>
          <h2 className="text-headline-lg text-on-surface mt-1">Katalog Spot Unggulan</h2>
          <p className="text-body-md text-on-surface-variant mt-1">
            Koleksi destinasi autentik pilihan komunitas dengan suasana unik dan cita rasa istimewa.
          </p>
        </div>
        <Link
          to="/jelajahi"
          className="flex items-center gap-space-sm bg-surface-container-low px-4 py-2 rounded-xl border border-outline-variant/30 text-body-sm text-on-surface-variant hover:text-on-surface hover:border-outline transition-colors"
        >
          <Icon name="tune" className="text-[18px] text-secondary" />
          <span>{totalTersedia} Tempat Terkurasi</span>
          <Icon name="arrow_forward" className="text-[16px]" />
        </Link>
      </div>

      <SpotGrid spots={spots} />
    </section>
  )
}
