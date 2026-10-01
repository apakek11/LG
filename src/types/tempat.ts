export interface Kategori {
  id: string
  nama: string
  icon: string
  jumlahTempat: number
}

export interface Tempat {
  id: string
  namaTempat: string
  deskripsi: string
  alamat: string
  kategori: string
  suasana: string
  hargaLabel: string
  foto: string
  rating: number
  jumlahReview: number
  fasilitas: string[]
  jamBuka: string
  jamTutup: string
  latitude: number
  longitude: number
}

export interface Review {
  id: string
  idTempat: string
  namaUser: string
  inisial: string
  tempatDikunjungi: string
  komentar: string
  rating: number
}
