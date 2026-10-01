import { supabase } from '../supabaseClient'

export async function fetchFavoritIds(userId: string): Promise<string[]> {
  const { data, error } = await supabase.from('favorit').select('tempat_id').eq('user_id', userId)

  if (error) throw error
  return (data ?? []).map((row) => row.tempat_id as string)
}

export async function addFavorit(userId: string, tempatId: string): Promise<void> {
  const { error } = await supabase.from('favorit').insert({ user_id: userId, tempat_id: tempatId })
  if (error) throw error
}

export async function removeFavorit(userId: string, tempatId: string): Promise<void> {
  const { error } = await supabase.from('favorit').delete().eq('user_id', userId).eq('tempat_id', tempatId)
  if (error) throw error
}
