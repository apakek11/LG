import { supabase } from '../supabaseClient'
import type { Review } from '../../types/tempat'

interface ReviewRow {
  id: string
  tempat_id: string
  user_id: string | null
  nama_user: string
  rating: number
  komentar: string
}

const REVIEW_SELECT = 'id, tempat_id, user_id, nama_user, rating, komentar'

function mapReview(row: ReviewRow, tempatDikunjungi = ''): Review {
  return {
    id: row.id,
    idTempat: row.tempat_id,
    userId: row.user_id,
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
    .select(REVIEW_SELECT)
    .eq('tempat_id', tempatId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data as unknown as ReviewRow[]).map((row) => mapReview(row))
}

export async function fetchUlasanTerbaru(limit = 3): Promise<Review[]> {
  const { data, error } = await supabase
    .from('review')
    .select(`${REVIEW_SELECT}, tempat:tempat_id(nama_tempat)`)
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
    .select(REVIEW_SELECT)
    .single()

  if (error?.code === '23505') throw new Error('Kamu sudah pernah mengulas tempat ini. Ubah ulasan lamamu saja.')
  if (error) throw error
  return mapReview(data as unknown as ReviewRow)
}

export async function updateReview(id: string, params: { rating: number; komentar: string }): Promise<Review> {
  const { data, error } = await supabase
    .from('review')
    .update({ rating: params.rating, komentar: params.komentar })
    .eq('id', id)
    .select(REVIEW_SELECT)
    .single()

  if (error) throw error
  return mapReview(data as unknown as ReviewRow)
}
