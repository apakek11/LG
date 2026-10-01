import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY belum diatur. Salin .env.example ke .env.local lalu isi dengan URL dan anon key project Supabase "supabase_LocalGem" kamu (Project Settings > API).',
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
