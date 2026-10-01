import { createContext } from 'react'

export interface AuthUser {
  id: string
  nama: string
  email: string
}

export interface AuthResult {
  success: boolean
  error?: string
  requiresEmailConfirmation?: boolean
}

export interface AuthContextValue {
  user: AuthUser | null
  loading: boolean
  login: (email: string, password: string) => Promise<AuthResult>
  register: (nama: string, email: string, password: string) => Promise<AuthResult>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)
