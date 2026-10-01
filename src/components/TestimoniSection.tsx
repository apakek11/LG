import { useMemo, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useTestimoni } from '../hooks/useTestimoni'
import { insertTestimoni } from '../lib/api/testimoni'
import { Icon } from './Icon'
import { StarRatingInput } from './StarRatingInput'

export function TestimoniSection() {
  const { user } = useAuth()
  const { data: testimoni, loading, setData } = useTestimoni()

  const [rating, setRating] = useState(5)
  const [komentar, setKomentar] = useState('')
  const [mengirim, setMengirim] = useState(false)

  const rataRata = useMemo(() => {
    if (testimoni.length === 0) return 0
    return testimoni.reduce((total, item) => total + item.rating, 0) / testimoni.length
  }, [testimoni])

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!user || !komentar.trim()) return

    setMengirim(true)
    try {
      const testimoniBaru = await insertTestimoni({
        userId: user.id,
        namaUser: user.nama,
        rating,
        komentar: komentar.trim(),
      })
      setData((prev) => [testimoniBaru, ...prev])
      setKomentar('')
      setRating(5)
    } finally {
      setMengirim(false)
    }
  }

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-space-xl w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-space-lg gap-space-md">
        <div>
          <span className="text-label-md text-secondary font-bold tracking-wider uppercase">Testimoni</span>
          <h2 className="text-headline-lg text-on-surface mt-1">Apa Kata Pengguna tentang Lokal Gem</h2>
        </div>
        {testimoni.length > 0 && (
          <div className="flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-xl shadow-sm">
            <Icon name="star" filled className="text-[18px] text-amber-500" />
            <span className="text-label-lg font-bold text-on-surface">{rataRata.toFixed(1)}</span>
            <span className="text-body-sm text-on-surface-variant">({testimoni.length} testimoni)</span>
          </div>
        )}
      </div>

      {user ? (
        <form
          onSubmit={handleSubmit}
          className="bg-surface-container-low rounded-2xl p-space-lg flex flex-col gap-space-sm mb-space-lg"
        >
          <span className="text-label-lg font-medium text-on-surface">Beri rating & komentar untuk Lokal Gem</span>
          <StarRatingInput value={rating} onChange={setRating} />
          <textarea
            value={komentar}
            onChange={(event) => setKomentar(event.target.value)}
            placeholder="Menurutmu, Lokal Gem sejauh ini bagaimana?"
            rows={3}
            className="bg-surface text-body-md text-on-surface outline-none placeholder:text-outline w-full rounded-xl px-4 py-3 border border-outline-variant/30"
          />
          <button
            type="submit"
            disabled={!komentar.trim() || mengirim}
            className="self-end bg-secondary hover:bg-secondary-container disabled:opacity-50 disabled:cursor-not-allowed text-on-secondary px-5 py-2.5 rounded-xl text-label-md font-medium transition-colors"
          >
            {mengirim ? 'Mengirim...' : 'Kirim Testimoni'}
          </button>
        </form>
      ) : (
        <div className="bg-surface-container-low rounded-2xl p-space-lg flex items-center justify-between gap-space-md mb-space-lg flex-wrap">
          <span className="text-body-md text-on-surface-variant">Masuk untuk memberi rating dan komentar tentang website ini.</span>
          <Link
            to="/login"
            state={{ from: '/' }}
            className="bg-primary hover:bg-primary-container text-on-primary px-5 py-2.5 rounded-xl text-label-md font-medium transition-colors"
          >
            Masuk
          </Link>
        </div>
      )}

      {loading ? (
        <p className="text-body-md text-on-surface-variant flex items-center gap-space-sm">
          <Icon name="progress_activity" className="animate-spin" /> Memuat testimoni...
        </p>
      ) : testimoni.length === 0 ? (
        <p className="text-body-md text-on-surface-variant">Belum ada testimoni. Jadilah yang pertama!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
          {testimoni.map((item) => (
            <div
              key={item.id}
              className="bg-surface p-6 rounded-2xl shadow-sm flex flex-col justify-between gap-space-md border border-outline-variant/10"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center font-bold text-on-secondary-fixed">
                  {item.inisial}
                </div>
                <h4 className="text-label-lg font-bold text-on-surface">{item.namaUser}</h4>
              </div>
              <p className="text-body-md text-on-surface-variant italic">"{item.komentar}"</p>
              <div className="flex items-center gap-1 text-amber-500">
                {Array.from({ length: item.rating }).map((_, index) => (
                  <Icon key={index} name="star" filled className="text-[16px]" />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
