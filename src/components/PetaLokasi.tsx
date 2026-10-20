interface PetaLokasiProps {
  latitude: number
  longitude: number
  judul: string
  className?: string
}

// Embed OpenStreetMap: gratis, tanpa API key (blueprint FR-09).
export function PetaLokasi({ latitude, longitude, judul, className = 'h-72' }: PetaLokasiProps) {
  const delta = 0.006
  const bbox = [longitude - delta, latitude - delta, longitude + delta, latitude + delta].join(',')
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${latitude},${longitude}`

  return (
    <iframe
      title={`Peta lokasi ${judul}`}
      src={src}
      loading="lazy"
      className={`w-full rounded-2xl border border-outline-variant/30 bg-surface-container-low ${className}`}
    />
  )
}
