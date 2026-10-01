import type { Tempat } from '../types/tempat'
import { SpotCard } from './SpotCard'

interface SpotGridProps {
  spots: Tempat[]
  emptyMessage?: string
}

export function SpotGrid({ spots, emptyMessage = 'Belum ada tempat yang cocok.' }: SpotGridProps) {
  if (spots.length === 0) {
    return <div className="py-space-xl text-center text-on-surface-variant">{emptyMessage}</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
      {spots.map((tempat) => (
        <SpotCard key={tempat.id} tempat={tempat} />
      ))}
    </div>
  )
}
