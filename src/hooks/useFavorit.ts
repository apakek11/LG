import { useContext } from 'react'
import { FavoritContext } from '../context/favorit-context'

export function useFavorit() {
  const context = useContext(FavoritContext)
  if (!context) {
    throw new Error('useFavorit harus dipakai di dalam FavoritProvider')
  }
  return context
}
