import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthLayout } from '../components/AuthLayout'
import { FormField } from '../components/FormField'
import { Icon } from '../components/Icon'
import { useAuth } from '../hooks/useAuth'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [formError, setFormError] = useState('')
  const [mengirim, setMengirim] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setFormError('')

    const nextErrors: typeof errors = {}
    if (!email.trim()) nextErrors.email = 'Email wajib diisi.'
    else if (!EMAIL_REGEX.test(email)) nextErrors.email = 'Format email tidak valid.'
    if (!password) nextErrors.password = 'Password wajib diisi.'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setMengirim(true)
    const result = await login(email, password)
    setMengirim(false)

    if (!result.success) {
      setFormError(result.error ?? 'Gagal masuk, coba lagi.')
      return
    }

    const redirectTo = (location.state as { from?: string } | null)?.from ?? '/'
    navigate(redirectTo, { replace: true })
  }

  return (
    <AuthLayout
      title="Selamat Datang Kembali"
      subtitle="Masuk untuk menyimpan favorit dan memberi ulasan tempat nongkronmu."
      footer={
        <p className="text-body-md text-on-surface-variant text-center">
          Belum punya akun?{' '}
          <Link to="/register" className="text-secondary font-medium hover:underline">
            Daftar di sini
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">
        {formError && (
          <div className="flex items-center gap-space-sm bg-error-container text-on-error-container px-4 py-3 rounded-xl text-body-sm">
            <Icon name="error" className="text-[18px]" />
            <span>{formError}</span>
          </div>
        )}

        <FormField
          icon="mail"
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="nama@email.com"
          autoComplete="email"
          error={errors.email}
        />

        <FormField
          icon="lock"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={setPassword}
          placeholder="Masukkan password"
          autoComplete="current-password"
          error={errors.password}
          rightSlot={
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="text-outline hover:text-on-surface"
              aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
            >
              <Icon name={showPassword ? 'visibility_off' : 'visibility'} className="text-[20px]" />
            </button>
          }
        />

        <button
          type="submit"
          disabled={mengirim}
          className="w-full bg-secondary hover:bg-secondary-container disabled:opacity-60 disabled:cursor-not-allowed text-on-secondary px-8 py-4 rounded-xl text-label-lg font-medium transition-all shadow-md mt-space-sm"
        >
          {mengirim ? 'Memproses...' : 'Masuk'}
        </button>
      </form>
    </AuthLayout>
  )
}
