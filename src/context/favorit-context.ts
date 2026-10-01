import { createContext } from 'react'

export interface FavoritContextValue {
  favoritIds: Set<string>
  loading: boolean
  isFavorit: (id: string) => boolean
  toggleFavorit: (id: string) => Promise<void>
}

export const FavoritContext = createContext<FavoritContextValue | null>(null)
