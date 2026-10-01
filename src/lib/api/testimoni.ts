import { supabase } from '../supabaseClient'
import type { Testimoni } from '../../types/testimoni'

interface TestimoniRow {
  id: string
  nama_user: string
  rating: number
  komentar: string
}

function mapTestimoni(row: TestimoniRow): Testimoni {
  return {
    id: row.id,
    namaUser: row.nama_user,
    inisial: row.nama_user.charAt(0).toUpperCase(),
    rating: row.rating,
    komentar: row.komentar,
  }
}

export async function fetchTestimoni(limit = 20): Promise<Testimoni[]> {
  const { data, error } = await supabase
    .from('testimoni')
    .select('id, nama_user, rating, komentar')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return (data as unknown as TestimoniRow[]).map(mapTestimoni)
}

export async function insertTestimoni(params: {
  userId: string
  namaUser: string
  rating: number
  komentar: string
}): Promise<Testimoni> {
  const { data, error } = await supabase
    .from('testimoni')
    .insert({
      user_id: params.userId,
      nama_user: params.namaUser,
      rating: params.rating,
      komentar: params.komentar,
    })
    .select('id, nama_user, rating, komentar')
    .single()

  if (error) throw error
  return mapTestimoni(data as unknown as TestimoniRow)
}
