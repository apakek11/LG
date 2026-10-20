import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AdminLayout, StatusMuat } from '../../components/admin/AdminLayout'
import { Icon } from '../../components/Icon'
import { useMuatData } from '../../hooks/useMuatData'
import { deleteReview, fetchReviewAdmin } from '../../lib/api/admin'

const FORMAT_TANGGAL = new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' })

export function AdminReview() {
  const { data, setData, loading, error } = useMuatData(fetchReviewAdmin, [])
  const [q, setQ] = useState('')
  const [ratingFilter, setRatingFilter] = useState(0)
  const [menghapusId, setMenghapusId] = useState<string | null>(null)
  const [pesanAksi, setPesanAksi] = useState('')

  const hasil = useMemo(() => {
    const kata = q.trim().toLowerCase()
    return data.filter((item) => {
      const cocokKata =
        !kata ||
        item.komentar.toLowerCase().includes(kata) ||
        item.nama_user.toLowerCase().includes(kata) ||
        (item.tempat?.nama_tempat ?? '').toLowerCase().includes(kata)
      return cocokKata && (ratingFilter === 0 || item.rating === ratingFilter)
    })
  }, [data, q, ratingFilter])

  async function hapus(id: string) {
    setMenghapusId(id)
    try {
      await deleteReview(id)
      setData((prev) => prev.filter((item) => item.id !== id))
      setPesanAksi('Review dihapus. Rating tempat dihitung ulang otomatis.')
    } catch (err) {
      setPesanAksi(`Gagal menghapus: ${(err as Error).message}`)
    } finally {
      setMenghapusId(null)
    }
  }

  return (
    <AdminLayout title="Kelola Review" description="Pantau dan hapus review yang tidak pantas atau spam.">
      <div className="flex flex-col sm:flex-row gap-space-sm">
        <div className="flex items-center gap-space-sm px-4 py-3 bg-surface-container-low rounded-xl border border-outline-variant/30 flex-1 max-w-md">
          <Icon name="search" className="text-outline text-[20px]" />
          <input
            className="bg-transparent text-body-md text-on-surface outline-none w-full placeholder:text-outline"
            placeholder="Cari isi review, nama, atau tempat..."
            value={q}
            onChange={(event) => setQ(event.target.value)}
          />
        </div>
        <select
          className="px-4 py-3 bg-surface-container-low rounded-xl border border-outline-variant/30 text-body-md text-on-surface"
          value={ratingFilter}
          onChange={(event) => setRatingFilter(Number(event.target.value))}
          aria-label="Filter rating"
        >
          <option value={0}>Semua rating</option>
          {[5, 4, 3, 2, 1].map((nilai) => (
            <option key={nilai} value={nilai}>
              {nilai} bintang
            </option>
          ))}
        </select>
      </div>

      {pesanAksi && (
        <div className="flex items-center justify-between gap-space-sm bg-secondary-fixed/40 text-on-secondary-fixed px-4 py-3 rounded-xl text-body-sm">
          <span>{pesanAksi}</span>
          <button type="button" onClick={() => setPesanAksi('')} aria-label="Tutup pesan">
            <Icon name="close" className="text-[18px]" />
          </button>
        </div>
      )}

      <StatusMuat loading={loading} error={error} />

      {!loading && !error && (
        <>
          <p className="text-body-sm text-on-surface-variant">{hasil.length} review</p>
          {hasil.length === 0 ? (
            <p className="py-space-xl text-center text-on-surface-variant">Tidak ada review yang cocok.</p>
          ) : (
            <ul className="flex flex-col gap-space-sm">
              {hasil.map((item) => (
                <li
                  key={item.id}
                  className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-space-lg flex flex-col sm:flex-row sm:items-start gap-space-md"
                >
                  <div className="flex-1 min-w-0 flex flex-col gap-1">
                    <div className="flex flex-wrap items-center gap-x-space-sm gap-y-1">
                      <span className="text-label-lg text-on-surface">{item.nama_user}</span>
                      <span className="flex items-center text-amber-500" aria-label={`${item.rating} dari 5 bintang`}>
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Icon key={index} name="star" filled={index < item.rating} className="text-[14px]" />
                        ))}
                      </span>
                      <span className="text-body-sm text-on-surface-variant">
                        {FORMAT_TANGGAL.format(new Date(item.created_at))}
                      </span>
                    </div>
                    <Link to={`/tempat/${item.tempat_id}`} className="text-body-sm text-secondary hover:underline w-fit">
                      {item.tempat?.nama_tempat ?? item.tempat_id}
                    </Link>
                    <p className="text-body-md text-on-surface-variant mt-1">{item.komentar}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => hapus(item.id)}
                    disabled={menghapusId === item.id}
                    className="flex items-center gap-1 self-start px-3 py-2 rounded-lg text-label-lg text-error hover:bg-error-container disabled:opacity-60"
                  >
                    <Icon name="delete" className="text-[18px]" />
                    {menghapusId === item.id ? 'Menghapus...' : 'Hapus'}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </AdminLayout>
  )
}
