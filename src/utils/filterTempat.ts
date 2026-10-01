import type { Tempat } from '../types/tempat'
import { hitungJarakKm, type Koordinat } from './jarak'

export type Urutan = 'rating' | 'nama' | 'jarak'

export interface TempatFilter {
  q: string
  lokasi: string
  kategori: string
  suasana: string
}

export const SEMUA_KATEGORI = 'Semua Kategori'
export const SEMUA_SUASANA = 'Semua Suasana'

export function filterTempat(spots: Tempat[], filter: Partial<TempatFilter>): Tempat[] {
  const q = filter.q?.trim().toLowerCase() ?? ''
  const lokasi = filter.lokasi?.trim().toLowerCase() ?? ''
  const kategori = filter.kategori && filter.kategori !== SEMUA_KATEGORI ? filter.kategori : ''
  const suasana = filter.suasana && filter.suasana !== SEMUA_SUASANA ? filter.suasana : ''

  return spots.filter((tempat) => {
    const cocokKeyword =
      !q ||
      tempat.namaTempat.toLowerCase().includes(q) ||
      tempat.deskripsi.toLowerCase().includes(q) ||
      tempat.kategori.toLowerCase().includes(q) ||
      tempat.suasana.toLowerCase().includes(q)

    const cocokLokasi = !lokasi || tempat.alamat.toLowerCase().includes(lokasi)
    const cocokKategori = !kategori || tempat.kategori === kategori
    const cocokSuasana = !suasana || tempat.suasana === suasana

    return cocokKeyword && cocokLokasi && cocokKategori && cocokSuasana
  })
}

export function sortTempat(spots: Tempat[], urutan: Urutan, asalLokasi?: Koordinat): Tempat[] {
  const hasil = [...spots]
  switch (urutan) {
    case 'nama':
      return hasil.sort((a, b) => a.namaTempat.localeCompare(b.namaTempat))
    case 'jarak':
      return hasil.sort(
        (a, b) =>
          hitungJarakKm(a.latitude, a.longitude, asalLokasi) - hitungJarakKm(b.latitude, b.longitude, asalLokasi),
      )
    case 'rating':
    default:
      return hasil.sort((a, b) => b.rating - a.rating)
  }
}
