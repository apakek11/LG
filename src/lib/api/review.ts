import { supabase } from '../supabaseClient'
import type { Review } from '../../types/tempat'

interface ReviewRow {
  id: string
  tempat_id: string
  nama_user: string
  rating: number
  komentar: string
}

function mapReview(row: ReviewRow, tempatDikunjungi = ''): Review {
  return {
    id: row.id,
    idTempat: row.tempat_id,
    namaUser: row.nama_user,
    inisial: row.nama_user.charAt(0).toUpperCase(),
    tempatDikunjungi,
    komentar: row.komentar,
    rating: row.rating,
  }
}

export async function fetchReviewsByTempat(tempatId: string): Promise<Review[]> {
  const { data, error } = await supabase
    .from('review')
    .select('id, tempat_id, nama_user, rating, komentar')
    .eq('tempat_id', tempatId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data as unknown as ReviewRow[]).map((row) => mapReview(row))
}

export async function fetchUlasanTerbaru(limit = 3): Promise<Review[]> {
  const { data, error } = await supabase
    .from('review')
    .select('id, tempat_id, nama_user, rating, komentar, tempat:tempat_id(nama_tempat)')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return (data as unknown as (ReviewRow & { tempat: { nama_tempat: string } | null })[]).map((row) =>
    mapReview(row, row.tempat?.nama_tempat ?? ''),
  )
}

export async function insertReview(params: {
  tempatId: string
  userId: string
  namaUser: string
  rating: number
  komentar: string
}): Promise<Review> {
  const { data, error } = await supabase
    .from('review')
    .insert({
      tempat_id: params.tempatId,
      user_id: params.userId,
      nama_user: params.namaUser,
      rating: params.rating,
      komentar: params.komentar,
    })
    .select('id, tempat_id, nama_user, rating, komentar')
    .single()

  if (error) throw error
  return mapReview(data as unknown as ReviewRow)
}
