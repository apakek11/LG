import { useContext } from 'react'
import { LocationContext } from '../context/location-context'

export function useUserLocation() {
  const context = useContext(LocationContext)
  if (!context) {
    throw new Error('useUserLocation harus dipakai di dalam LocationProvider')
  }
  return context
}
