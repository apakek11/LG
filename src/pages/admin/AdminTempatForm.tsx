import { useEffect, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AdminLayout, StatusMuat } from '../../components/admin/AdminLayout'
import { Icon } from '../../components/Icon'
import { PetaLokasi } from '../../components/PetaLokasi'
import { useKategoriList } from '../../hooks/useKategoriList'
import {
  buatSlug,
  fetchTempatInput,
  insertTempat,
  updateTempat,
  uploadFotoTempat,
  type TempatInput,
} from '../../lib/api/admin'
import { fetchTempatList } from '../../lib/api/tempat'

interface FormState {
  id: string
  nama_tempat: string
  deskripsi: string
  alamat: string
  kategori_id: string
  suasana: string
  harga_label: string
  foto: string[]
  fasilitas: string
  jam_buka: string
  jam_tutup: string
  latitude: string
  longitude: string
}

type FormErrors = Partial<Record<keyof FormState, string>>

const FORM_KOSONG: FormState = {
  id: '',
  nama_tempat: '',
  deskripsi: '',
  alamat: '',
  kategori_id: '',
  suasana: '',
  harga_label: '',
  foto: [],
  fasilitas: '',
  jam_buka: '08:00',
  jam_tutup: '22:00',
  latitude: '',
  longitude: '',
}

function keForm(input: TempatInput): FormState {
  return {
    ...input,
    fasilitas: input.fasilitas.join(', '),
    latitude: String(input.latitude),
    longitude: String(input.longitude),
  }
}

function validasi(form: FormState, modeBaru: boolean): FormErrors {
  const errors: FormErrors = {}
  const wajib: Array<[keyof FormState, string]> = [
    ['nama_tempat', 'Nama tempat'],
    ['alamat', 'Alamat'],
    ['kategori_id', 'Kategori'],
    ['suasana', 'Suasana'],
    ['harga_label', 'Kisaran harga'],
    ['deskripsi', 'Deskripsi'],
  ]
  for (const [field, label] of wajib) {
    if (!String(form[field]).trim()) errors[field] = `${label} wajib diisi.`
  }

  if (modeBaru && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(form.id)) {
    errors.id = 'Slug hanya huruf kecil, angka, dan tanda hubung.'
  }
  if (!form.jam_buka) errors.jam_buka = 'Jam buka wajib diisi.'
  if (!form.jam_tutup) errors.jam_tutup = 'Jam tutup wajib diisi.'

  const lat = Number(form.latitude)
  const lng = Number(form.longitude)
  if (form.latitude.trim() === '' || Number.isNaN(lat) || lat < -90 || lat > 90) {
    errors.latitude = 'Latitude harus angka antara -90 dan 90.'
  }
  if (form.longitude.trim() === '' || Number.isNaN(lng) || lng < -180 || lng > 180) {
    errors.longitude = 'Longitude harus angka antara -180 dan 180.'
  }
  if (form.foto.length === 0) errors.foto = 'Tambahkan minimal satu foto.'

  return errors
}

export function AdminTempatForm() {
  const { id: idEdit } = useParams<{ id: string }>()
  const modeBaru = !idEdit
  const navigate = useNavigate()
  const { data: kategoriList } = useKategoriList()

  const [form, setForm] = useState<FormState>(FORM_KOSONG)
  const [slugManual, setSlugManual] = useState(false)
  const [suasanaOptions, setSuasanaOptions] = useState<string[]>([])
  const [errors, setErrors] = useState<FormErrors>({})
  const [formError, setFormError] = useState('')
  const [memuat, setMemuat] = useState(!modeBaru)
  const [muatError, setMuatError] = useState<string | null>(null)
  const [menyimpan, setMenyimpan] = useState(false)
  const [mengunggah, setMengunggah] = useState(false)
  const [urlFotoBaru, setUrlFotoBaru] = useState('')

  useEffect(() => {
    let aktif = true
    fetchTempatList()
      .then((rows) => {
        if (aktif) setSuasanaOptions(Array.from(new Set(rows.map((row) => row.suasana))).sort())
      })
      .catch(() => {
        // daftar saran suasana opsional, abaikan kalau gagal
      })
    return () => {
      aktif = false
    }
  }, [])

  useEffect(() => {
    if (!idEdit) return
    let aktif = true

    async function muat() {
      setMemuat(true)
      try {
        const data = await fetchTempatInput(idEdit as string)
        if (!aktif) return
        if (!data) setMuatError('Tempat tidak ditemukan.')
        else setForm(keForm(data))
      } catch (err) {
        if (aktif) setMuatError((err as Error).message)
      } finally {
        if (aktif) setMemuat(false)
      }
    }

    void muat()
    return () => {
      aktif = false
    }
  }, [idEdit])

  function ubah<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((prev) => {
      const next = { ...prev, [field]: value }
      if (field === 'nama_tempat' && modeBaru && !slugManual) next.id = buatSlug(String(value))
      return next
    })
  }

  async function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? [])
    event.target.value = ''
    if (files.length === 0) return

    const bukanGambar = files.find((file) => !file.type.startsWith('image/'))
    if (bukanGambar) {
      setErrors((prev) => ({ ...prev, foto: `${bukanGambar.name} bukan file gambar.` }))
      return
    }

    setMengunggah(true)
    setErrors((prev) => ({ ...prev, foto: undefined }))
    try {
      const urls = await Promise.all(files.map((file) => uploadFotoTempat(form.id, file)))
      setForm((prev) => ({ ...prev, foto: [...prev.foto, ...urls] }))
    } catch (err) {
      setErrors((prev) => ({ ...prev, foto: `Upload gagal: ${(err as Error).message}` }))
    } finally {
      setMengunggah(false)
    }
  }

  function tambahUrlFoto() {
    const url = urlFotoBaru.trim()
    if (!/^https?:\/\/\S+$/.test(url)) {
      setErrors((prev) => ({ ...prev, foto: 'URL foto harus diawali http:// atau https://' }))
      return
    }
    setForm((prev) => ({ ...prev, foto: [...prev.foto, url] }))
    setUrlFotoBaru('')
    setErrors((prev) => ({ ...prev, foto: undefined }))
  }

  function jadikanUtama(index: number) {
    setForm((prev) => {
      const foto = [...prev.foto]
      const [dipilih] = foto.splice(index, 1)
      return { ...prev, foto: [dipilih, ...foto] }
    })
  }

  function hapusFoto(index: number) {
    setForm((prev) => ({ ...prev, foto: prev.foto.filter((_, i) => i !== index) }))
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setFormError('')

    const nextErrors = validasi(form, modeBaru)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setFormError('Masih ada isian yang belum benar. Cek tanda merah di bawah.')
      return
    }

    const payload: Omit<TempatInput, 'id'> = {
      nama_tempat: form.nama_tempat.trim(),
      deskripsi: form.deskripsi.trim(),
      alamat: form.alamat.trim(),
      kategori_id: form.kategori_id,
      suasana: form.suasana.trim(),
      harga_label: form.harga_label.trim(),
      foto: form.foto,
      fasilitas: form.fasilitas
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      jam_buka: form.jam_buka,
      jam_tutup: form.jam_tutup,
      latitude: Number(form.latitude),
      longitude: Number(form.longitude),
    }

    setMenyimpan(true)
    try {
      if (modeBaru) await insertTempat({ id: form.id, ...payload })
      else await updateTempat(idEdit as string, payload)
      navigate('/admin/tempat')
    } catch (err) {
      setFormError(`Gagal menyimpan: ${(err as Error).message}`)
    } finally {
      setMenyimpan(false)
    }
  }

  const lat = Number(form.latitude)
  const lng = Number(form.longitude)
  const koordinatValid =
    form.latitude.trim() !== '' && form.longitude.trim() !== '' && !Number.isNaN(lat) && !Number.isNaN(lng)

  return (
    <AdminLayout
      title={modeBaru ? 'Tambah Tempat' : 'Ubah Tempat'}
      description={modeBaru ? 'Isi data lengkap tempat nongkrong baru.' : form.nama_tempat}
      actions={
        <Link to="/admin/tempat" className="flex items-center gap-1 text-label-lg text-on-surface-variant hover:text-on-surface">
          <Icon name="arrow_back" className="text-[18px]" /> Kembali ke daftar
        </Link>
      }
    >
      <StatusMuat loading={memuat} error={muatError} />

      {!memuat && !muatError && (
        <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 lg:grid-cols-3 gap-space-lg items-start">
          <div className="lg:col-span-2 flex flex-col gap-space-lg">
            {formError && (
              <div className="flex items-center gap-space-sm bg-error-container text-on-error-container px-4 py-3 rounded-xl text-body-sm">
                <Icon name="error" className="text-[18px]" />
                <span>{formError}</span>
              </div>
            )}

            <Bagian judul="Informasi dasar">
              <Isian label="Nama tempat" error={errors.nama_tempat}>
                <input
                  className={kelasInput(errors.nama_tempat)}
                  value={form.nama_tempat}
                  onChange={(event) => ubah('nama_tempat', event.target.value)}
                  placeholder="Kopi Seduhan Senja"
                />
              </Isian>

              <Isian
                label="Slug URL"
                error={errors.id}
                bantuan={modeBaru ? `Alamat halaman: /tempat/${form.id || '...'}` : 'Slug tidak bisa diubah setelah dibuat.'}
              >
                <input
                  className={kelasInput(errors.id)}
                  value={form.id}
                  disabled={!modeBaru}
                  onChange={(event) => {
                    setSlugManual(true)
                    ubah('id', event.target.value)
                  }}
                />
              </Isian>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                <Isian label="Kategori" error={errors.kategori_id}>
                  <select
                    className={kelasInput(errors.kategori_id)}
                    value={form.kategori_id}
                    onChange={(event) => ubah('kategori_id', event.target.value)}
                  >
                    <option value="">Pilih kategori</option>
                    {kategoriList.map((kategori) => (
                      <option key={kategori.id} value={kategori.id}>
                        {kategori.nama}
                      </option>
                    ))}
                  </select>
                </Isian>

                <Isian label="Suasana" error={errors.suasana}>
                  <input
                    className={kelasInput(errors.suasana)}
                    list="saran-suasana"
                    value={form.suasana}
                    onChange={(event) => ubah('suasana', event.target.value)}
                    placeholder="Cozy & Aesthetic"
                  />
                  <datalist id="saran-suasana">
                    {suasanaOptions.map((option) => (
                      <option key={option} value={option} />
                    ))}
                  </datalist>
                </Isian>
              </div>

              <Isian label="Deskripsi" error={errors.deskripsi}>
                <textarea
                  rows={4}
                  className={kelasInput(errors.deskripsi)}
                  value={form.deskripsi}
                  onChange={(event) => ubah('deskripsi', event.target.value)}
                  placeholder="Ceritakan suasana, menu andalan, dan apa yang bikin tempat ini beda."
                />
              </Isian>
            </Bagian>

            <Bagian judul="Harga, jam & fasilitas">
              <Isian label="Kisaran harga" error={errors.harga_label}>
                <input
                  className={kelasInput(errors.harga_label)}
                  value={form.harga_label}
                  onChange={(event) => ubah('harga_label', event.target.value)}
                  placeholder="Rp 25k - Rp 50k"
                />
              </Isian>

              <div className="grid grid-cols-2 gap-space-md">
                <Isian label="Jam buka" error={errors.jam_buka}>
                  <input
                    type="time"
                    className={kelasInput(errors.jam_buka)}
                    value={form.jam_buka}
                    onChange={(event) => ubah('jam_buka', event.target.value)}
                  />
                </Isian>
                <Isian label="Jam tutup" error={errors.jam_tutup}>
                  <input
                    type="time"
                    className={kelasInput(errors.jam_tutup)}
                    value={form.jam_tutup}
                    onChange={(event) => ubah('jam_tutup', event.target.value)}
                  />
                </Isian>
              </div>

              <Isian label="Fasilitas" bantuan="Pisahkan dengan koma, mis. WiFi, Colokan, AC, Outdoor">
                <input
                  className={kelasInput()}
                  value={form.fasilitas}
                  onChange={(event) => ubah('fasilitas', event.target.value)}
                />
              </Isian>
            </Bagian>

            <Bagian judul="Lokasi">
              <Isian label="Alamat" error={errors.alamat}>
                <textarea
                  rows={2}
                  className={kelasInput(errors.alamat)}
                  value={form.alamat}
                  onChange={(event) => ubah('alamat', event.target.value)}
                />
              </Isian>
              <div className="grid grid-cols-2 gap-space-md">
                <Isian label="Latitude" error={errors.latitude}>
                  <input
                    inputMode="decimal"
                    className={kelasInput(errors.latitude)}
                    value={form.latitude}
                    onChange={(event) => ubah('latitude', event.target.value)}
                    placeholder="-6.2441"
                  />
                </Isian>
                <Isian label="Longitude" error={errors.longitude}>
                  <input
                    inputMode="decimal"
                    className={kelasInput(errors.longitude)}
                    value={form.longitude}
                    onChange={(event) => ubah('longitude', event.target.value)}
                    placeholder="106.8001"
                  />
                </Isian>
              </div>
              <p className="text-body-sm text-on-surface-variant">
                Cara cepat: klik kanan titik tempat di Google Maps, lalu klik angka koordinat untuk menyalinnya.
              </p>
              {koordinatValid && <PetaLokasi latitude={lat} longitude={lng} judul={form.nama_tempat || 'tempat baru'} className="h-56" />}
            </Bagian>
          </div>

          <div className="flex flex-col gap-space-lg lg:sticky lg:top-6">
            <Bagian judul="Foto">
              {form.foto.length > 0 && (
                <ul className="grid grid-cols-2 gap-space-sm">
                  {form.foto.map((url, index) => (
                    <li key={url} className="relative group rounded-xl overflow-hidden aspect-[4/3] bg-surface-container">
                      <img src={url} alt={`Foto ${index + 1}`} className="w-full h-full object-cover" />
                      {index === 0 && (
                        <span className="absolute top-2 left-2 bg-secondary text-on-secondary text-label-md px-2 py-0.5 rounded-full">
                          Utama
                        </span>
                      )}
                      <div className="absolute bottom-2 right-2 flex gap-1">
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => jadikanUtama(index)}
                            className="bg-surface/90 p-1.5 rounded-full text-on-surface"
                            aria-label="Jadikan foto utama"
                            title="Jadikan foto utama"
                          >
                            <Icon name="star" className="text-[16px]" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => hapusFoto(index)}
                          className="bg-surface/90 p-1.5 rounded-full text-error"
                          aria-label="Hapus foto"
                          title="Hapus foto"
                        >
                          <Icon name="close" className="text-[16px]" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              <label
                className={`flex flex-col items-center justify-center gap-1 border-2 border-dashed rounded-xl py-space-lg cursor-pointer text-center transition-colors ${
                  errors.foto ? 'border-error' : 'border-outline-variant hover:border-secondary'
                }`}
              >
                <Icon name={mengunggah ? 'progress_activity' : 'add_photo_alternate'} className={`text-[28px] text-secondary ${mengunggah ? 'animate-spin' : ''}`} />
                <span className="text-label-lg text-on-surface">{mengunggah ? 'Mengunggah...' : 'Unggah foto'}</span>
                <span className="text-body-sm text-on-surface-variant">JPG/PNG/WebP, bisa pilih beberapa</span>
                <input type="file" accept="image/*" multiple className="sr-only" onChange={handleUpload} disabled={mengunggah} />
              </label>

              <div className="flex gap-space-sm">
                <input
                  className={kelasInput()}
                  value={urlFotoBaru}
                  onChange={(event) => setUrlFotoBaru(event.target.value)}
                  placeholder="atau tempel URL foto"
                />
                <button
                  type="button"
                  onClick={tambahUrlFoto}
                  className="px-4 rounded-xl bg-surface-container text-label-lg text-on-surface hover:bg-surface-container-high"
                >
                  Tambah
                </button>
              </div>
              {errors.foto && <span className="text-body-sm text-error">{errors.foto}</span>}
            </Bagian>

            <button
              type="submit"
              disabled={menyimpan || mengunggah}
              className="w-full bg-secondary hover:bg-secondary-container disabled:opacity-60 disabled:cursor-not-allowed text-on-secondary px-8 py-4 rounded-xl text-label-lg font-medium transition-colors"
            >
              {menyimpan ? 'Menyimpan...' : modeBaru ? 'Simpan Tempat Baru' : 'Simpan Perubahan'}
            </button>
          </div>
        </form>
      )}
    </AdminLayout>
  )
}

function kelasInput(error?: string) {
  return `w-full bg-surface-container-low text-body-md text-on-surface rounded-xl px-4 py-3 border outline-none placeholder:text-outline disabled:opacity-60 ${
    error ? 'border-error' : 'border-outline-variant/30 focus:border-outline'
  }`
}

function Bagian({ judul, children }: { judul: string; children: ReactNode }) {
  return (
    <section className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-space-lg flex flex-col gap-space-md">
      <h2 className="text-headline-sm text-on-surface">{judul}</h2>
      {children}
    </section>
  )
}

function Isian({ label, error, bantuan, children }: { label: string; error?: string; bantuan?: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-space-xs">
      <span className="text-label-lg text-on-surface font-medium">{label}</span>
      {children}
      {error ? (
        <span className="text-body-sm text-error">{error}</span>
      ) : (
        bantuan && <span className="text-body-sm text-on-surface-variant">{bantuan}</span>
      )}
    </label>
  )
}
