import { Link } from 'react-router-dom'
import { useKategoriList } from '../hooks/useKategoriList'
import { Icon } from './Icon'

export function CategorySection() {
  const { data: kategoriList, loading } = useKategoriList()

  if (loading || kategoriList.length === 0) return null

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-space-xl w-full">
      <div className="flex justify-between items-end mb-space-lg">
        <div>
          <span className="text-label-md text-secondary font-bold tracking-wider uppercase">Eksplor Kategori</span>
          <h2 className="text-headline-lg text-on-surface mt-1">Kategori Populer</h2>
        </div>
        <Link to="/kategori" className="text-label-lg text-secondary hover:underline flex items-center gap-1 font-medium">
          Lihat Semua <Icon name="arrow_forward" className="text-[16px]" />
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md">
        {kategoriList.map((kategori) => (
          <Link
            key={kategori.id}
            to={`/kategori?nama=${encodeURIComponent(kategori.nama)}`}
            className="group relative overflow-hidden rounded-2xl p-6 bg-surface-container-low hover:bg-primary-container transition-all cursor-pointer shadow-sm hover:shadow-xl flex flex-col justify-between h-48 text-left"
          >
            <div className="absolute right-[-20px] bottom-[-20px] opacity-10 group-hover:opacity-25 transition-opacity">
              <Icon name={kategori.icon} className="text-[120px] text-on-surface" />
            </div>
            <div className="w-12 h-12 rounded-xl bg-secondary-fixed flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
              <Icon name={kategori.icon} className="text-[24px]" />
            </div>
            <div>
              <h3 className="text-headline-sm text-on-surface group-hover:text-on-primary transition-colors">
                {kategori.nama}
              </h3>
              <p className="text-body-sm text-on-surface-variant group-hover:text-on-primary-container transition-colors mt-1">
                {kategori.jumlahTempat} Tempat Pilihan
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
