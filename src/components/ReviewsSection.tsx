import { useEffect, useState } from 'react'
import { fetchUlasanTerbaru } from '../lib/api/review'
import type { Review } from '../types/tempat'
import { Icon } from './Icon'

export function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([])

  useEffect(() => {
    let aktif = true
    fetchUlasanTerbaru(3)
      .then((data) => {
        if (aktif) setReviews(data)
      })
      .catch(() => {
        // biarkan kosong kalau gagal memuat, section akan disembunyikan
      })
    return () => {
      aktif = false
    }
  }, [])

  if (reviews.length === 0) return null

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-space-xl w-full bg-surface-container-low rounded-3xl my-space-xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-space-lg gap-space-md">
        <div>
          <span className="text-label-md text-secondary font-bold tracking-wider uppercase">Ulasan Komunitas</span>
          <h2 className="text-headline-lg text-on-surface mt-1">Kata Mereka yang Sudah Berkunjung</h2>
        </div>
        <div className="flex items-center gap-2 bg-surface px-4 py-2 rounded-xl shadow-sm">
          <Icon name="verified" className="text-secondary" />
          <span className="text-label-lg font-medium text-on-surface">100% Ulasan Terverifikasi</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
        {reviews.map((review) => (
          <div key={review.id} className="bg-surface p-6 rounded-2xl shadow-sm flex flex-col justify-between gap-space-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center font-bold text-on-secondary-fixed">
                {review.inisial}
              </div>
              <div>
                <h4 className="text-label-lg font-bold text-on-surface">{review.namaUser}</h4>
                <p className="text-body-sm text-outline">Mengunjungi {review.tempatDikunjungi}</p>
              </div>
            </div>
            <p className="text-body-md text-on-surface-variant italic">"{review.komentar}"</p>
            <div className="flex items-center gap-1 text-amber-500">
              {Array.from({ length: review.rating }).map((_, index) => (
                <Icon key={index} name="star" filled className="text-[16px]" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
