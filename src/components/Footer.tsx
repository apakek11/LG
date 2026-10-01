export function Footer() {
  return (
    <footer className="w-full bg-surface-container-low py-space-xl">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-space-md">
        <div className="text-headline-sm text-primary">Lokal Gem</div>
        <div className="text-body-sm text-on-surface-variant">
          © {new Date().getFullYear()} Lokal Gem. Temukan permata tersembunyi di kotamu.
        </div>
      </div>
    </footer>
  )
}
