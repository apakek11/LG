import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { useAuth } from '../hooks/useAuth'
import { addFavorit, fetchFavoritIds, removeFavorit } from '../lib/api/favorit'
import { FavoritContext, type FavoritContextValue } from './favorit-context'

export function FavoritProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [favoritIds, setFavoritIds] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let aktif = true

    async function muat() {
      if (!user) {
        setFavoritIds(new Set())
        return
      }
      setLoading(true)
      try {
        const ids = await fetchFavoritIds(user.id)
        if (aktif) setFavoritIds(new Set(ids))
      } finally {
        if (aktif) setLoading(false)
      }
    }

    void muat()
    return () => {
      aktif = false
    }
  }, [user])

  const value = useMemo<FavoritContextValue>(
    () => ({
      favoritIds,
      loading,
      isFavorit: (id) => favoritIds.has(id),
      toggleFavorit: async (id) => {
        if (!user) return
        const sudahFavorit = favoritIds.has(id)

        setFavoritIds((prev) => {
          const next = new Set(prev)
          if (sudahFavorit) next.delete(id)
          else next.add(id)
          return next
        })

        try {
          if (sudahFavorit) {
            await removeFavorit(user.id, id)
          } else {
            await addFavorit(user.id, id)
          }
        } catch {
          // Rollback optimistic update kalau request ke Supabase gagal.
          setFavoritIds((prev) => {
            const next = new Set(prev)
            if (sudahFavorit) next.add(id)
            else next.delete(id)
            return next
          })
        }
      },
    }),
    [favoritIds, loading, user],
  )

  return <FavoritContext.Provider value={value}>{children}</FavoritContext.Provider>
}
