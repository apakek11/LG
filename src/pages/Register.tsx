import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthLayout } from '../components/AuthLayout'
import { FormField } from '../components/FormField'
import { Icon } from '../components/Icon'
import { useAuth } from '../hooks/useAuth'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface FormErrors {
  nama?: string
  email?: string
  password?: string
  konfirmasi?: string
}

export function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [nama, setNama] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [konfirmasi, setKonfirmasi] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [formError, setFormError] = useState('')
  const [infoMessage, setInfoMessage] = useState('')
  const [mengirim, setMengirim] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setFormError('')
    setInfoMessage('')

    const nextErrors: FormErrors = {}
    if (!nama.trim()) nextErrors.nama = 'Nama wajib diisi.'
    if (!email.trim()) nextErrors.email = 'Email wajib diisi.'
    else if (!EMAIL_REGEX.test(email)) nextErrors.email = 'Format email tidak valid.'
    if (!password) nextErrors.password = 'Password wajib diisi.'
    else if (password.length < 6) nextErrors.password = 'Password minimal 6 karakter.'
    if (konfirmasi !== password) nextErrors.konfirmasi = 'Konfirmasi password tidak sama.'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setMengirim(true)
    const result = await register(nama.trim(), email, password)
    setMengirim(false)

    if (!result.success) {
      setFormError(result.error ?? 'Gagal mendaftar, coba lagi.')
      return
    }

    if (result.requiresEmailConfirmation) {
      setInfoMessage('Akun berhasil dibuat! Cek email kamu untuk konfirmasi, lalu masuk.')
      return
    }

    navigate('/', { replace: true })
  }

  return (
    <AuthLayout
      title="Buat Akun Lokal Gem"
      subtitle="Daftar untuk mulai menyimpan favorit dan berbagi ulasan tempat nongkrongmu."
      footer={
        <p className="text-body-md text-on-surface-variant text-center">
          Sudah punya akun?{' '}
          <Link to="/login" className="text-secondary font-medium hover:underline">
            Masuk di sini
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

        {infoMessage && (
          <div className="flex items-center gap-space-sm bg-secondary-fixed/40 text-on-secondary-fixed px-4 py-3 rounded-xl text-body-sm">
            <Icon name="mark_email_read" className="text-[18px]" />
            <span>{infoMessage}</span>
          </div>
        )}

        <FormField icon="person" label="Nama Lengkap" value={nama} onChange={setNama} placeholder="Nama kamu" error={errors.nama} />

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
          placeholder="Minimal 6 karakter"
          autoComplete="new-password"
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

        <FormField
          icon="lock_reset"
          label="Konfirmasi Password"
          type={showPassword ? 'text' : 'password'}
          value={konfirmasi}
          onChange={setKonfirmasi}
          placeholder="Ulangi password"
          autoComplete="new-password"
          error={errors.konfirmasi}
        />

        <button
          type="submit"
          disabled={mengirim}
          className="w-full bg-secondary hover:bg-secondary-container disabled:opacity-60 disabled:cursor-not-allowed text-on-secondary px-8 py-4 rounded-xl text-label-lg font-medium transition-all shadow-md mt-space-sm"
        >
          {mengirim ? 'Memproses...' : 'Daftar'}
        </button>
      </form>
    </AuthLayout>
  )
}
