import { Link } from 'react-router-dom'
import { useFavoritAction } from '../hooks/useFavoritAction'
import { useJarakTempat } from '../hooks/useJarakTempat'
import type { Tempat } from '../types/tempat'
import { Icon } from './Icon'

interface SpotCardProps {
  tempat: Tempat
}

export function SpotCard({ tempat }: SpotCardProps) {
  const { favorit, toggle } = useFavoritAction(tempat.id)
  const { label: jarak, dariLokasiPengguna } = useJarakTempat(tempat)
  const tautanMaps = `https://www.google.com/maps/search/?api=1&query=${tempat.latitude},${tempat.longitude}`

  return (
    <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col group">
      <div className="relative h-60 w-full overflow-hidden">
        <img
          src={tempat.foto}
          alt={tempat.namaTempat}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-surface/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
          <Icon name="star" filled className="text-[16px] text-amber-500" />
          <span className="text-label-md font-bold text-on-surface">{tempat.rating}</span>
          <span className="text-body-sm text-outline">({tempat.jumlahReview})</span>
        </div>
        <div className="absolute top-4 right-4 flex items-center gap-space-sm">
          <a
            href={tautanMaps}
            target="_blank"
            rel="noreferrer"
            onClick={(event) => event.stopPropagation()}
            aria-label="Buka lokasi di Google Maps"
            title="Buka di Google Maps"
            className="bg-primary/60 text-on-primary hover:bg-secondary backdrop-blur-md p-2 rounded-full transition-colors"
          >
            <Icon name="location_on" className="text-[18px]" />
          </a>
          <button
            type="button"
            onClick={toggle}
            aria-pressed={favorit}
            aria-label={favorit ? 'Hapus dari favorit' : 'Tambahkan ke favorit'}
            className={`backdrop-blur-md p-2 rounded-full cursor-pointer transition-colors ${
              favorit ? 'bg-secondary text-on-secondary' : 'bg-primary/60 text-on-primary hover:bg-secondary'
            }`}
          >
            <Icon name="favorite" filled={favorit} className="text-[18px]" />
          </button>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1 justify-between gap-space-md">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="inline-block bg-secondary-fixed/50 text-on-secondary-fixed text-label-md px-3 py-1 rounded-full font-medium">
              {tempat.suasana}
            </span>
            <span className="text-body-sm text-outline flex items-center gap-1">
              {dariLokasiPengguna && <Icon name="my_location" className="text-[14px] text-secondary" />}
              {jarak}
            </span>
          </div>
          <h3 className="text-headline-sm text-on-surface group-hover:text-secondary transition-colors">
            {tempat.namaTempat}
          </h3>
          <p className="text-body-md text-on-surface-variant mt-1 line-clamp-2">{tempat.deskripsi}</p>
        </div>
        <div className="pt-4 flex items-center justify-between border-t border-outline-variant/20">
          <span className="text-body-sm font-medium text-on-surface">{tempat.hargaLabel}</span>
          <Link
            to={`/tempat/${tempat.id}`}
            className="bg-primary hover:bg-primary-container text-on-primary px-4 py-2 rounded-xl text-label-md font-medium transition-colors"
          >
            Detail Spot
          </Link>
        </div>
      </div>
    </div>
  )
}
