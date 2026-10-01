import { createContext } from 'react'
import type { Koordinat } from '../utils/jarak'

export type LocationStatus = 'idle' | 'loading' | 'granted' | 'denied' | 'unsupported'

export interface LocationContextValue {
  coords: Koordinat | null
  status: LocationStatus
  requestLocation: () => void
}

export const LocationContext = createContext<LocationContextValue | null>(null)
