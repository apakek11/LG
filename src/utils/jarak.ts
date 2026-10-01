export interface Koordinat {
  lat: number
  lng: number
}

// Dipakai sebagai titik referensi default (Monas, Jakarta Pusat) selama
// pengguna belum mengizinkan akses lokasi perangkatnya.
export const PUSAT_KOTA: Koordinat = { lat: -6.1754, lng: 106.8272 }

export function hitungJarakKm(lat: number, lng: number, origin: Koordinat = PUSAT_KOTA): number {
  const R = 6371
  const toRad = (deg: number) => (deg * Math.PI) / 180

  const dLat = toRad(lat - origin.lat)
  const dLng = toRad(lng - origin.lng)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(origin.lat)) * Math.cos(toRad(lat)) * Math.sin(dLng / 2) ** 2

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export function formatJarak(km: number): string {
  return km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`
}
