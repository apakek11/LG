import { Link } from 'react-router-dom'
import { AdminLayout, StatusMuat } from '../../components/admin/AdminLayout'
import { Icon } from '../../components/Icon'
import { useMuatData } from '../../hooks/useMuatData'
import { fetchReviewAdmin, fetchStatistikAdmin, type StatistikAdmin } from '../../lib/api/admin'

const STAT_KOSONG: StatistikAdmin = { jumlahTempat: 0, jumlahReview: 0, jumlahPengguna: 0, jumlahTestimoni: 0 }

export function AdminDashboard() {
  const statistik = useMuatData(fetchStatistikAdmin, STAT_KOSONG)
  const review = useMuatData(fetchReviewAdmin, [])

  const kartu = [
    { label: 'Tempat terdaftar', nilai: statistik.data.jumlahTempat, icon: 'storefront', to: '/admin/tempat' },
    { label: 'Review tempat', nilai: statistik.data.jumlahReview, icon: 'rate_review', to: '/admin/review' },
    { label: 'Pengguna', nilai: statistik.data.jumlahPengguna, icon: 'group', to: '/admin/pengguna' },
    { label: 'Testimoni website', nilai: statistik.data.jumlahTestimoni, icon: 'forum', to: '/' },
  ]

  return (
    <AdminLayout
      title="Dashboard"
      description="Ringkasan data Lokal Gem."
      actions={
        <Link
          to="/admin/tempat/baru"
          className="flex items-center gap-space-sm bg-secondary hover:bg-secondary-container text-on-secondary px-5 py-3 rounded-xl text-label-lg font-medium transition-colors w-fit"
        >
          <Icon name="add" className="text-[18px]" /> Tambah Tempat
        </Link>
      }
    >
      <StatusMuat loading={statistik.loading} error={statistik.error} />

      {!statistik.loading && !statistik.error && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-space-md">
          {kartu.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-space-lg flex flex-col gap-space-md hover:shadow-md transition-shadow"
            >
              <span className="w-10 h-10 rounded-xl bg-secondary-fixed text-secondary flex items-center justify-center">
                <Icon name={item.icon} className="text-[22px]" />
              </span>
              <div>
                <p className="text-headline-lg text-on-surface">{item.nilai}</p>
                <p className="text-body-sm text-on-surface-variant">{item.label}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      <section className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-space-lg flex flex-col gap-space-md">
        <div className="flex items-center justify-between">
          <h2 className="text-headline-sm text-on-surface">Review terbaru</h2>
          <Link to="/admin/review" className="text-label-lg text-secondary hover:underline font-medium">
            Lihat semua
          </Link>
        </div>
        <StatusMuat loading={review.loading} error={review.error} />
        {!review.loading && !review.error && review.data.length === 0 && (
          <p className="text-body-md text-on-surface-variant">Belum ada review masuk.</p>
        )}
        <ul className="flex flex-col divide-y divide-outline-variant/20">
          {review.data.slice(0, 5).map((item) => (
            <li key={item.id} className="py-space-sm flex items-start justify-between gap-space-md">
              <div className="min-w-0">
                <p className="text-label-lg text-on-surface">
                  {item.nama_user}
                  <span className="text-on-surface-variant font-normal"> di </span>
                  <Link to={`/tempat/${item.tempat_id}`} className="hover:underline">
                    {item.tempat?.nama_tempat ?? item.tempat_id}
                  </Link>
                </p>
                <p className="text-body-sm text-on-surface-variant truncate">{item.komentar}</p>
              </div>
              <span className="flex items-center gap-1 text-label-md text-on-surface shrink-0">
                <Icon name="star" filled className="text-[16px] text-amber-500" />
                {item.rating}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </AdminLayout>
  )
}
