import { useEffect, useState } from 'react'
import { fetchTempatList } from '../lib/api/tempat'
import type { Tempat } from '../types/tempat'

export function useTempatList() {
  const [data, setData] = useState<Tempat[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let aktif = true

    async function muat() {
      setLoading(true)
      try {
        const rows = await fetchTempatList()
        if (aktif) setData(rows)
      } catch (err) {
        if (aktif) setError((err as Error).message)
      } finally {
        if (aktif) setLoading(false)
      }
    }

    void muat()
    return () => {
      aktif = false
    }
  }, [])

  return { data, loading, error }
}
