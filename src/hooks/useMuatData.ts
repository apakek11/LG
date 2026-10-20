import { useCallback, useEffect, useState } from 'react'

// Pola loading/error/data yang sama dipakai di banyak halaman admin.
// `muatUlang` dipanggil setelah aksi tulis (hapus, ubah role) supaya data segar.
export function useMuatData<T>(loader: () => Promise<T>, awal: T) {
  const [data, setData] = useState<T>(awal)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [versi, setVersi] = useState(0)

  useEffect(() => {
    let aktif = true

    async function muat() {
      setLoading(true)
      setError(null)
      try {
        const hasil = await loader()
        if (aktif) setData(hasil)
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
    // loader sengaja tidak masuk dependency: selalu fungsi modul yang stabil.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [versi])

  const muatUlang = useCallback(() => setVersi((v) => v + 1), [])

  return { data, setData, loading, error, muatUlang }
}
