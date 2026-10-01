import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { supabase } from '../lib/supabaseClient'
import { AuthContext, type AuthResult, type AuthUser } from './auth-context'

async function muatProfil(userId: string, email: string): Promise<AuthUser> {
  const { data } = await supabase.from('profiles').select('nama').eq('id', userId).maybeSingle()
  return { id: userId, email, nama: data?.nama ?? email.split('@')[0] }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let aktif = true

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!aktif) return
      if (session?.user) {
        const profil = await muatProfil(session.user.id, session.user.email ?? '')
        if (aktif) setUser(profil)
      }
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!aktif) return
      if (session?.user) {
        const profil = await muatProfil(session.user.id, session.user.email ?? '')
        if (aktif) setUser(profil)
      } else {
        setUser(null)
      }
    })

    return () => {
      aktif = false
      listener.subscription.unsubscribe()
    }
  }, [])

  const value = useMemo(
    () => ({
      user,
      loading,
      login: async (email: string, password: string): Promise<AuthResult> => {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) return { success: false, error: error.message }
        return { success: true }
      },
      register: async (nama: string, email: string, password: string): Promise<AuthResult> => {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { nama } },
        })
        if (error) return { success: false, error: error.message }
        if (!data.session) {
          return { success: true, requiresEmailConfirmation: true }
        }
        return { success: true }
      },
      logout: async () => {
        await supabase.auth.signOut()
      },
    }),
    [user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
