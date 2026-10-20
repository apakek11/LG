import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AdminLayout, StatusMuat } from '../../components/admin/AdminLayout'
import { Icon } from '../../components/Icon'
import { useMuatData } from '../../hooks/useMuatData'
import { deleteTempat, fetchTempatAdmin, type TempatAdminRow } from '../../lib/api/admin'

export function AdminTempat() {
  const { data, setData, loading, error } = useMuatData(fetchTempatAdmin, [])
  const [q, setQ] = useState('')
  const [akanDihapus, setAkanDihapus] = useState<TempatAdminRow | null>(null)
  const [menghapus, setMenghapus] = useState(false)
  const [pesanAksi, setPesanAksi] = useState('')

  const hasil = useMemo(() => {
    const kata = q.trim().toLowerCase()
    if (!kata) return data
    return data.filter(
      (item) => item.nama_tempat.toLowerCase().includes(kata) || item.alamat.toLowerCase().includes(kata),
    )
  }, [data, q])

  async function konfirmasiHapus() {
    if (!akanDihapus) return
    setMenghapus(true)
    try {
      await deleteTempat(akanDihapus.id)
      setData((prev) => prev.filter((item) => item.id !== akanDihapus.id))
      setPesanAksi(`"${akanDihapus.nama_tempat}" dihapus beserta review dan favoritnya.`)
      setAkanDihapus(null)
    } catch (err) {
      setPesanAksi(`Gagal menghapus: ${(err as Error).message}`)
    } finally {
      setMenghapus(false)
    }
  }

  return (
    <AdminLayout
      title="Kelola Tempat"
      description="Tambah, ubah, atau hapus data tempat nongkrong."
      actions={
        <Link
          to="/admin/tempat/baru"
          className="flex items-center gap-space-sm bg-secondary hover:bg-secondary-container text-on-secondary px-5 py-3 rounded-xl text-label-lg font-medium transition-colors w-fit"
        >
          <Icon name="add" className="text-[18px]" /> Tambah Tempat
        </Link>
      }
    >
      <div className="flex items-center gap-space-sm px-4 py-3 bg-surface-container-low rounded-xl border border-outline-variant/30 max-w-md">
        <Icon name="search" className="text-outline text-[20px]" />
        <input
          className="bg-transparent text-body-md text-on-surface outline-none w-full placeholder:text-outline"
          placeholder="Cari nama atau alamat..."
          value={q}
          onChange={(event) => setQ(event.target.value)}
        />
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
        <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl overflow-x-auto">
          <table className="w-full text-left text-body-md">
            <thead className="text-label-md text-on-surface-variant uppercase tracking-wider border-b border-outline-variant/20">
              <tr>
                <th className="px-space-lg py-3 font-medium">Tempat</th>
                <th className="px-space-lg py-3 font-medium hidden md:table-cell">Kategori</th>
                <th className="px-space-lg py-3 font-medium">Rating</th>
                <th className="px-space-lg py-3 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {hasil.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-space-lg py-space-xl text-center text-on-surface-variant">
                    {data.length === 0 ? 'Belum ada tempat. Tambahkan yang pertama.' : 'Tidak ada tempat yang cocok.'}
                  </td>
                </tr>
              )}
              {hasil.map((item) => (
                <tr key={item.id} className="hover:bg-surface-container-low/60">
                  <td className="px-space-lg py-3">
                    <div className="flex items-center gap-space-md min-w-0">
                      {item.foto[0] ? (
                        <img src={item.foto[0]} alt="" className="w-12 h-12 rounded-xl object-cover shrink-0" />
                      ) : (
                        <span className="w-12 h-12 rounded-xl bg-surface-container shrink-0" />
                      )}
                      <div className="min-w-0">
                        <p className="text-label-lg text-on-surface truncate">{item.nama_tempat}</p>
                        <p className="text-body-sm text-on-surface-variant truncate max-w-xs">{item.alamat}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-space-lg py-3 hidden md:table-cell text-on-surface-variant">
                    {item.kategori?.nama ?? '-'}
                  </td>
                  <td className="px-space-lg py-3 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1">
                      <Icon name="star" filled className="text-[16px] text-amber-500" />
                      {Number(item.rating).toFixed(1)}
                      <span className="text-on-surface-variant text-body-sm">({item.jumlah_review})</span>
                    </span>
                  </td>
                  <td className="px-space-lg py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        to={`/tempat/${item.id}`}
                        className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container"
                        aria-label={`Lihat ${item.nama_tempat}`}
                        title="Lihat halaman publik"
                      >
                        <Icon name="visibility" className="text-[20px]" />
                      </Link>
                      <Link
                        to={`/admin/tempat/${item.id}`}
                        className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container"
                        aria-label={`Ubah ${item.nama_tempat}`}
                        title="Ubah"
                      >
                        <Icon name="edit" className="text-[20px]" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => setAkanDihapus(item)}
                        className="p-2 rounded-lg text-error hover:bg-error-container"
                        aria-label={`Hapus ${item.nama_tempat}`}
                        title="Hapus"
                      >
                        <Icon name="delete" className="text-[20px]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {akanDihapus && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="judul-hapus"
        >
          <div className="bg-surface-container-lowest rounded-2xl p-space-lg max-w-md w-full flex flex-col gap-space-md shadow-xl">
            <h2 id="judul-hapus" className="text-headline-sm text-on-surface">
              Hapus {akanDihapus.nama_tempat}?
            </h2>
            <p className="text-body-md text-on-surface-variant">
              {akanDihapus.jumlah_review} review dan semua favorit untuk tempat ini ikut terhapus. Tindakan ini tidak
              bisa dibatalkan.
            </p>
            <div className="flex justify-end gap-space-sm">
              <button
                type="button"
                onClick={() => setAkanDihapus(null)}
                disabled={menghapus}
                className="px-5 py-2.5 rounded-xl text-label-lg text-on-surface hover:bg-surface-container-low"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={konfirmasiHapus}
                disabled={menghapus}
                className="px-5 py-2.5 rounded-xl text-label-lg bg-error text-on-error disabled:opacity-60"
              >
                {menghapus ? 'Menghapus...' : 'Hapus'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
