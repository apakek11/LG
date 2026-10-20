import { useMemo, useState } from 'react'
import { AdminLayout, StatusMuat } from '../../components/admin/AdminLayout'
import { Icon } from '../../components/Icon'
import { useAuth } from '../../hooks/useAuth'
import { useMuatData } from '../../hooks/useMuatData'
import { fetchPengguna, updateRolePengguna, type PenggunaRow } from '../../lib/api/admin'

const FORMAT_TANGGAL = new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium' })

export function AdminPengguna() {
  const { user } = useAuth()
  const { data, setData, loading, error } = useMuatData(fetchPengguna, [])
  const [q, setQ] = useState('')
  const [mengubahId, setMengubahId] = useState<string | null>(null)
  const [pesanAksi, setPesanAksi] = useState('')

  const hasil = useMemo(() => {
    const kata = q.trim().toLowerCase()
    if (!kata) return data
    return data.filter((item) => item.nama.toLowerCase().includes(kata) || item.email.toLowerCase().includes(kata))
  }, [data, q])

  const jumlahAdmin = data.filter((item) => item.role === 'admin').length

  async function ubahRole(pengguna: PenggunaRow) {
    const roleBaru = pengguna.role === 'admin' ? 'user' : 'admin'
    setMengubahId(pengguna.id)
    try {
      await updateRolePengguna(pengguna.id, roleBaru)
      setData((prev) => prev.map((item) => (item.id === pengguna.id ? { ...item, role: roleBaru } : item)))
      setPesanAksi(`${pengguna.nama} sekarang ${roleBaru === 'admin' ? 'admin' : 'pengguna biasa'}.`)
    } catch (err) {
      setPesanAksi(`Gagal mengubah role: ${(err as Error).message}`)
    } finally {
      setMengubahId(null)
    }
  }

  return (
    <AdminLayout title="Pengguna" description={`${data.length} akun terdaftar, ${jumlahAdmin} di antaranya admin.`}>
      <div className="flex items-center gap-space-sm px-4 py-3 bg-surface-container-low rounded-xl border border-outline-variant/30 max-w-md">
        <Icon name="search" className="text-outline text-[20px]" />
        <input
          className="bg-transparent text-body-md text-on-surface outline-none w-full placeholder:text-outline"
          placeholder="Cari nama atau email..."
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
                <th className="px-space-lg py-3 font-medium">Pengguna</th>
                <th className="px-space-lg py-3 font-medium hidden md:table-cell">Bergabung</th>
                <th className="px-space-lg py-3 font-medium hidden sm:table-cell">Aktivitas</th>
                <th className="px-space-lg py-3 font-medium">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {hasil.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-space-lg py-space-xl text-center text-on-surface-variant">
                    Tidak ada pengguna yang cocok.
                  </td>
                </tr>
              )}
              {hasil.map((item) => {
                const diriSendiri = item.id === user?.id
                return (
                  <tr key={item.id}>
                    <td className="px-space-lg py-3">
                      <div className="flex items-center gap-space-md min-w-0">
                        <span className="w-9 h-9 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-bold shrink-0">
                          {item.nama.charAt(0).toUpperCase()}
                        </span>
                        <div className="min-w-0">
                          <p className="text-label-lg text-on-surface truncate">
                            {item.nama} {diriSendiri && <span className="text-on-surface-variant font-normal">(kamu)</span>}
                          </p>
                          <p className="text-body-sm text-on-surface-variant truncate">{item.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-space-lg py-3 hidden md:table-cell text-on-surface-variant whitespace-nowrap">
                      {FORMAT_TANGGAL.format(new Date(item.created_at))}
                    </td>
                    <td className="px-space-lg py-3 hidden sm:table-cell text-on-surface-variant whitespace-nowrap">
                      {item.jumlah_review} review · {item.jumlah_favorit} favorit
                    </td>
                    <td className="px-space-lg py-3">
                      <div className="flex items-center gap-space-sm">
                        <span
                          className={`text-label-md px-2.5 py-1 rounded-full ${
                            item.role === 'admin' ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface'
                          }`}
                        >
                          {item.role === 'admin' ? 'Admin' : 'User'}
                        </span>
                        {!diriSendiri && (
                          <button
                            type="button"
                            onClick={() => ubahRole(item)}
                            disabled={mengubahId === item.id}
                            className="text-label-md text-secondary hover:underline disabled:opacity-60 whitespace-nowrap"
                          >
                            {item.role === 'admin' ? 'Jadikan user' : 'Jadikan admin'}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  )
}
