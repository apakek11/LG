import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { LocationContext, type LocationStatus } from './location-context'
import type { Koordinat } from '../utils/jarak'

export function LocationProvider({ children }: { children: ReactNode }) {
  const [coords, setCoords] = useState<Koordinat | null>(null)
  const [status, setStatus] = useState<LocationStatus>('idle')

  const requestLocation = useCallback(() => {
    if (!('geolocation' in navigator)) {
      setStatus('unsupported')
      return
    }

    setStatus('loading')
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({ lat: position.coords.latitude, lng: position.coords.longitude })
        setStatus('granted')
      },
      () => {
        setStatus('denied')
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 5 * 60 * 1000 },
    )
  }, [])

  useEffect(() => {
    if (!('permissions' in navigator)) return
    let aktif = true

    navigator.permissions
      .query({ name: 'geolocation' })
      .then((result) => {
        if (aktif && result.state === 'granted') requestLocation()
      })
      .catch(() => {
        // abaikan kalau Permissions API tidak didukung
      })

    return () => {
      aktif = false
    }
  }, [requestLocation])

  const value = useMemo(() => ({ coords, status, requestLocation }), [coords, status, requestLocation])

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>
}
