import type { Tempat } from '../types/tempat'
import { Icon } from './Icon'
import { SpotCard } from './SpotCard'

interface PopularSpotsSectionProps {
  spots: Tempat[]
}

export function PopularSpotsSection({ spots }: PopularSpotsSectionProps) {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-space-xl w-full">
      <div className="flex justify-between items-end mb-space-lg">
        <div>
          <span className="text-label-md text-secondary font-bold tracking-wider uppercase">Kurasi Terbaik</span>
          <h2 className="text-headline-lg text-on-surface mt-1">Rekomendasi Terpopuler</h2>
        </div>
        <div className="flex gap-space-sm">
          <button
            type="button"
            className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-secondary hover:text-on-secondary transition-colors"
          >
            <Icon name="chevron_left" />
          </button>
          <button
            type="button"
            className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-secondary hover:text-on-secondary transition-colors"
          >
            <Icon name="chevron_right" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
        {spots.map((tempat) => (
          <SpotCard key={tempat.id} tempat={tempat} />
        ))}
      </div>
    </section>
  )
}
