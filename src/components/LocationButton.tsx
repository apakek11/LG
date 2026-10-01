import { useUserLocation } from '../hooks/useUserLocation'
import { Icon } from './Icon'

export function LocationButton() {
  const { status, requestLocation } = useUserLocation()

  if (status === 'unsupported') return null

  if (status === 'granted') {
    return (
      <span className="flex items-center gap-1 bg-secondary-fixed/40 text-on-secondary-fixed px-3 py-1.5 rounded-full text-body-sm font-medium">
        <Icon name="my_location" className="text-[16px]" />
        Diurutkan dari lokasimu
      </span>
    )
  }

  return (
    <button
      type="button"
      onClick={requestLocation}
      disabled={status === 'loading'}
      className="flex items-center gap-1 bg-surface-container-low hover:bg-surface-container px-3 py-1.5 rounded-full text-body-sm text-on-surface-variant hover:text-on-surface transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
    >
      <Icon name="my_location" className="text-[16px]" />
      {status === 'loading'
        ? 'Mencari lokasi...'
        : status === 'denied'
          ? 'Izin lokasi ditolak, coba lagi'
          : 'Aktifkan Lokasi Saya'}
    </button>
  )
}
