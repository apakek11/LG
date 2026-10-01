import type { Urutan } from '../utils/filterTempat'
import { Icon } from './Icon'

interface FilterBarProps {
  q: string
  onQChange: (value: string) => void
  kategori: string
  onKategoriChange: (value: string) => void
  kategoriOptions: string[]
  suasana: string
  onSuasanaChange: (value: string) => void
  suasanaOptions: string[]
  urutan: Urutan
  onUrutanChange: (value: Urutan) => void
}

export function FilterBar({
  q,
  onQChange,
  kategori,
  onKategoriChange,
  kategoriOptions,
  suasana,
  onSuasanaChange,
  suasanaOptions,
  urutan,
  onUrutanChange,
}: FilterBarProps) {
  return (
    <div className="w-full bg-surface-container-lowest p-3 rounded-2xl shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center gap-space-sm">
      <div className="flex items-center gap-space-sm flex-1 px-4 py-3 bg-surface-container-low rounded-xl">
        <Icon name="search" className="text-secondary" />
        <input
          className="bg-transparent text-body-md text-on-surface outline-none font-medium placeholder:text-outline w-full"
          placeholder="Cari nama, kategori, atau suasana..."
          type="text"
          value={q}
          onChange={(event) => onQChange(event.target.value)}
        />
      </div>

      <div className="flex items-center gap-space-sm px-4 py-3 bg-surface-container-low rounded-xl">
        <Icon name="category" className="text-secondary" />
        <select
          className="bg-transparent text-body-md text-on-surface outline-none font-medium"
          value={kategori}
          onChange={(event) => onKategoriChange(event.target.value)}
        >
          {kategoriOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-space-sm px-4 py-3 bg-surface-container-low rounded-xl">
        <Icon name="mood" className="text-secondary" />
        <select
          className="bg-transparent text-body-md text-on-surface outline-none font-medium"
          value={suasana}
          onChange={(event) => onSuasanaChange(event.target.value)}
        >
          {suasanaOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-space-sm px-4 py-3 bg-surface-container-low rounded-xl">
        <Icon name="sort" className="text-secondary" />
        <select
          className="bg-transparent text-body-md text-on-surface outline-none font-medium"
          value={urutan}
          onChange={(event) => onUrutanChange(event.target.value as Urutan)}
        >
          <option value="rating">Rating Tertinggi</option>
          <option value="jarak">Jarak Terdekat</option>
          <option value="nama">Nama A-Z</option>
        </select>
      </div>
    </div>
  )
}
