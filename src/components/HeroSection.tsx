import { useMemo, useState, type FormEvent } from 'react'
import { useKategoriList } from '../hooks/useKategoriList'
import { SEMUA_KATEGORI, SEMUA_SUASANA } from '../utils/filterTempat'
import { Icon } from './Icon'

export interface SearchFilters {
  lokasi: string
  suasana: string
  kategori: string
}

interface HeroSectionProps {
  onSearch: (filters: SearchFilters) => void
  suasanaOptions: string[]
}

export function HeroSection({ onSearch, suasanaOptions }: HeroSectionProps) {
  const { data: kategoriList } = useKategoriList()
  const kategoriOptions = useMemo(
    () => [SEMUA_KATEGORI, ...kategoriList.map((item) => item.nama)],
    [kategoriList],
  )

  const [lokasi, setLokasi] = useState('')
  const [suasana, setSuasana] = useState(SEMUA_SUASANA)
  const [kategori, setKategori] = useState(SEMUA_KATEGORI)

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    onSearch({ lokasi, suasana, kategori })
  }

  return (
    <section className="relative w-full overflow-hidden bg-primary-container text-on-primary-container py-space-xl px-6 lg:px-12">
      <div
        className="absolute inset-0 opacity-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCwMP4W5yVm4HU6U4GDPDt2Wmb6meRO9SBk0vhV3wtLON-xCiZpTEfPkTxz7IioYfbzEysrlF_uLfLz8bqrKQKSN0yem0VEZmBfIZg7YoPrBBnmHvO9ZdIwbqvDNM2in2RdS-Kwjht1jCflGk1Agr70blte6HNjhX_K7QiZIfVLZchAH39AvyStTl-mo83PWwbEOPxkJ1Lak6TOEqiGK23F_yX9-MehIy7M8d5b9LSxys4GAMYN6V6d')",
        }}
      />
      <div className="relative max-w-7xl mx-auto flex flex-col items-center text-center py-12 gap-space-lg">
        <div className="inline-flex items-center gap-space-sm bg-surface-container/20 backdrop-blur-md px-4 py-2 rounded-full text-label-md text-surface tracking-wide">
          <Icon name="auto_awesome" className="text-[16px] text-secondary-container" />
          <span>TEMUKAN PERMATA TERSEMBUNYI KOTA</span>
        </div>
        <h1 className="text-headline-xl text-on-primary max-w-3xl tracking-tight">
          Eksplorasi Tempat Nongkrong Otentik di Sekitarmu
        </h1>
        <p className="text-body-lg text-on-primary-container max-w-xl">
          Kurasi spot ngopi, rooftop estetik, dan ruang kerja paling nyaman yang belum banyak diketahui orang.
        </p>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-4xl bg-surface p-3 rounded-2xl shadow-xl flex flex-col md:flex-row items-center gap-space-sm mt-space-md"
        >
          <div className="flex items-center gap-space-sm w-full md:flex-1 px-4 py-3 bg-surface-container-low rounded-xl">
            <Icon name="location_on" className="text-secondary" />
            <div className="flex flex-col text-left w-full">
              <span className="text-label-md text-outline">Lokasi</span>
              <input
                className="bg-transparent text-body-md text-on-surface outline-none font-medium placeholder:text-outline w-full"
                placeholder="Pilih area / kota"
                type="text"
                value={lokasi}
                onChange={(event) => setLokasi(event.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-space-sm w-full md:flex-1 px-4 py-3 bg-surface-container-low rounded-xl">
            <Icon name="mood" className="text-secondary" />
            <div className="flex flex-col text-left w-full">
              <span className="text-label-md text-outline">Suasana</span>
              <select
                className="bg-transparent text-body-md text-on-surface outline-none font-medium w-full"
                value={suasana}
                onChange={(event) => setSuasana(event.target.value)}
              >
                {suasanaOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-space-sm w-full md:flex-1 px-4 py-3 bg-surface-container-low rounded-xl">
            <Icon name="category" className="text-secondary" />
            <div className="flex flex-col text-left w-full">
              <span className="text-label-md text-outline">Kategori</span>
              <select
                className="bg-transparent text-body-md text-on-surface outline-none font-medium w-full"
                value={kategori}
                onChange={(event) => setKategori(event.target.value)}
              >
                {kategoriOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full md:w-auto bg-secondary hover:bg-secondary-container text-on-secondary px-8 py-4 rounded-xl text-label-lg font-medium transition-all shadow-md flex items-center justify-center gap-space-sm"
          >
            <Icon name="search" className="text-[20px]" />
            <span>Cari</span>
          </button>
        </form>
      </div>
    </section>
  )
}
