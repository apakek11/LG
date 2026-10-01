import { useEffect, useState } from 'react'
import { fetchKategoriList } from '../lib/api/kategori'
import type { Kategori } from '../types/tempat'

export function useKategoriList() {
  const [data, setData] = useState<Kategori[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let aktif = true

    async function muat() {
      setLoading(true)
      try {
        const rows = await fetchKategoriList()
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
