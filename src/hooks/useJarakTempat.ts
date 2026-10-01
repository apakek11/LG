import type { Tempat } from '../types/tempat'
import { formatJarak, hitungJarakKm } from '../utils/jarak'
import { useUserLocation } from './useUserLocation'

export function useJarakTempat(tempat: Tempat | null) {
  const { coords } = useUserLocation()

  if (!tempat) {
    return { jarakKm: 0, label: '', dariLokasiPengguna: coords !== null }
  }

  const jarakKm = hitungJarakKm(tempat.latitude, tempat.longitude, coords ?? undefined)

  return {
    jarakKm,
    label: formatJarak(jarakKm),
    dariLokasiPengguna: coords !== null,
  }
}
