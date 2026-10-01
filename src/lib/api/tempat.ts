import { supabase } from '../supabaseClient'
import type { Tempat } from '../../types/tempat'

interface TempatRow {
  id: string
  nama_tempat: string
  deskripsi: string
  alamat: string
  suasana: string
  harga_label: string
  foto: string[]
  fasilitas: string[]
  jam_buka: string
  jam_tutup: string
  latitude: number
  longitude: number
  rating: number
  jumlah_review: number
  kategori: { nama: string } | null
}

const TEMPAT_SELECT =
  'id, nama_tempat, deskripsi, alamat, suasana, harga_label, foto, fasilitas, jam_buka, jam_tutup, latitude, longitude, rating, jumlah_review, kategori:kategori_id(nama)'

function mapTempat(row: TempatRow): Tempat {
  return {
    id: row.id,
    namaTempat: row.nama_tempat,
    deskripsi: row.deskripsi,
    alamat: row.alamat,
    kategori: row.kategori?.nama ?? '',
    suasana: row.suasana,
    hargaLabel: row.harga_label,
    foto: row.foto[0] ?? '',
    rating: Number(row.rating),
    jumlahReview: row.jumlah_review,
    fasilitas: row.fasilitas,
    jamBuka: row.jam_buka.slice(0, 5),
    jamTutup: row.jam_tutup.slice(0, 5),
    latitude: row.latitude,
    longitude: row.longitude,
  }
}

export async function fetchTempatList(): Promise<Tempat[]> {
  const { data, error } = await supabase
    .from('tempat')
    .select(TEMPAT_SELECT)
    .order('rating', { ascending: false })

  if (error) throw error
  return (data as unknown as TempatRow[]).map(mapTempat)
}

export async function fetchTempatById(id: string): Promise<Tempat | null> {
  const { data, error } = await supabase.from('tempat').select(TEMPAT_SELECT).eq('id', id).maybeSingle()

  if (error) throw error
  return data ? mapTempat(data as unknown as TempatRow) : null
}
