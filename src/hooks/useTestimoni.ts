import { useEffect, useState } from 'react'
import { fetchTestimoni } from '../lib/api/testimoni'
import type { Testimoni } from '../types/testimoni'

export function useTestimoni() {
  const [data, setData] = useState<Testimoni[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let aktif = true

    async function muat() {
      setLoading(true)
      try {
        const rows = await fetchTestimoni()
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

  return { data, loading, error, setData }
}
