import { supabase } from '../supabaseClient'
import type { Kategori } from '../../types/tempat'

interface KategoriRow {
  id: string
  nama: string
  icon: string
  urutan: number
  tempat: { count: number }[]
}

export async function fetchKategoriList(): Promise<Kategori[]> {
  const { data, error } = await supabase
    .from('kategori')
    .select('id, nama, icon, urutan, tempat(count)')
    .order('urutan')

  if (error) throw error
  return (data as unknown as KategoriRow[]).map((row) => ({
    id: row.id,
    nama: row.nama,
    icon: row.icon,
    jumlahTempat: row.tempat?.[0]?.count ?? 0,
  }))
}
