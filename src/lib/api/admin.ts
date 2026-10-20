import { supabase } from '../supabaseClient'

export interface TempatInput {
  id: string
  nama_tempat: string
  deskripsi: string
  alamat: string
  kategori_id: string
  suasana: string
  harga_label: string
  foto: string[]
  fasilitas: string[]
  jam_buka: string
  jam_tutup: string
  latitude: number
  longitude: number
}

export interface TempatAdminRow {
  id: string
  nama_tempat: string
  alamat: string
  foto: string[]
  rating: number
  jumlah_review: number
  updated_at: string
  kategori: { nama: string } | null
}

export interface ReviewAdminRow {
  id: string
  tempat_id: string
  nama_user: string
  rating: number
  komentar: string
  created_at: string
  tempat: { nama_tempat: string } | null
}

export interface PenggunaRow {
  id: string
  nama: string
  email: string
  role: 'user' | 'admin'
  created_at: string
  jumlah_review: number
  jumlah_favorit: number
}

export interface StatistikAdmin {
  jumlahTempat: number
  jumlahReview: number
  jumlahPengguna: number
  jumlahTestimoni: number
}

const BUCKET_FOTO = 'tempat-foto'

export function buatSlug(teks: string): string {
  return teks
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export async function fetchStatistikAdmin(): Promise<StatistikAdmin> {
  const hitung = (tabel: string) => supabase.from(tabel).select('*', { count: 'exact', head: true })
  const [tempat, review, testimoni, pengguna] = await Promise.all([
    hitung('tempat'),
    hitung('review'),
    hitung('testimoni'),
    supabase.rpc('admin_list_users'),
  ])

  const gagal = tempat.error ?? review.error ?? testimoni.error ?? pengguna.error
  if (gagal) throw gagal

  return {
    jumlahTempat: tempat.count ?? 0,
    jumlahReview: review.count ?? 0,
    jumlahTestimoni: testimoni.count ?? 0,
    jumlahPengguna: (pengguna.data as unknown[] | null)?.length ?? 0,
  }
}

export async function fetchTempatAdmin(): Promise<TempatAdminRow[]> {
  const { data, error } = await supabase
    .from('tempat')
    .select('id, nama_tempat, alamat, foto, rating, jumlah_review, updated_at, kategori:kategori_id(nama)')
    .order('updated_at', { ascending: false })

  if (error) throw error
  return data as unknown as TempatAdminRow[]
}

export async function fetchTempatInput(id: string): Promise<TempatInput | null> {
  const { data, error } = await supabase
    .from('tempat')
    .select(
      'id, nama_tempat, deskripsi, alamat, kategori_id, suasana, harga_label, foto, fasilitas, jam_buka, jam_tutup, latitude, longitude',
    )
    .eq('id', id)
    .maybeSingle()

  if (error) throw error
  if (!data) return null
  const row = data as TempatInput
  return { ...row, jam_buka: row.jam_buka.slice(0, 5), jam_tutup: row.jam_tutup.slice(0, 5) }
}

export async function insertTempat(input: TempatInput): Promise<void> {
  const { error } = await supabase.from('tempat').insert(input)
  if (error?.code === '23505') throw new Error(`Slug "${input.id}" sudah dipakai tempat lain. Ganti slug-nya.`)
  if (error) throw error
}

export async function updateTempat(id: string, input: Omit<TempatInput, 'id'>): Promise<void> {
  const { error } = await supabase.from('tempat').update(input).eq('id', id)
  if (error) throw error
}

export async function deleteTempat(id: string): Promise<void> {
  const { error } = await supabase.from('tempat').delete().eq('id', id)
  if (error) throw error
}

export async function uploadFotoTempat(tempatId: string, file: File): Promise<string> {
  const ekstensi = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
  const path = `${tempatId || 'baru'}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ekstensi}`

  const { error } = await supabase.storage.from(BUCKET_FOTO).upload(path, file, {
    cacheControl: '3600',
    contentType: file.type,
  })
  if (error) throw error

  return supabase.storage.from(BUCKET_FOTO).getPublicUrl(path).data.publicUrl
}

export async function fetchReviewAdmin(): Promise<ReviewAdminRow[]> {
  const { data, error } = await supabase
    .from('review')
    .select('id, tempat_id, nama_user, rating, komentar, created_at, tempat:tempat_id(nama_tempat)')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as unknown as ReviewAdminRow[]
}

export async function deleteReview(id: string): Promise<void> {
  const { error } = await supabase.from('review').delete().eq('id', id)
  if (error) throw error
}

export async function fetchPengguna(): Promise<PenggunaRow[]> {
  const { data, error } = await supabase.rpc('admin_list_users')
  if (error) throw error
  return (data as PenggunaRow[]).map((row) => ({
    ...row,
    jumlah_review: Number(row.jumlah_review),
    jumlah_favorit: Number(row.jumlah_favorit),
  }))
}

export async function updateRolePengguna(id: string, role: PenggunaRow['role']): Promise<void> {
  const { error } = await supabase.from('profiles').update({ role }).eq('id', id)
  if (error) throw error
}
