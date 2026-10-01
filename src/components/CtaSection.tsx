export function CtaSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-space-xl w-full text-center">
      <div className="bg-primary-container text-on-primary-container rounded-3xl p-12 relative overflow-hidden flex flex-col items-center gap-space-md shadow-xl">
        <div
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAn0E_LwM3nM9M_mOvfHfryL7NxZw_7BiwDDYdEoGizdjK7eDAIJv0MElkvJSdynrs0BbtUHchMLwiy_TALXK9bjT7Ip7Ral7_Sfvzv9ZBtrMUTBukEBZsqbOFtVEZwpjBpCbvPpZFSQVjPAmb5Yxa5U511OeL_eOmnw4HiOF1lqRMWYhoM9dTvyBY_UDqBsjePuzQhGalLW1Iw29cKmORs9gCyv9YZ-t8tOyrfYDIlny8L95l0gU94')",
          }}
        />
        <h2 className="text-headline-lg text-on-primary max-w-xl">
          Punya Tempat Nongkrong Favorit yang Belum Terdaftar?
        </h2>
        <p className="text-body-lg text-on-primary-container max-w-md">
          Daftarkan permata tersembunyi versimu dan bagikan ke komunitas pencinta tempat nongkrong lainnya.
        </p>
        <button
          type="button"
          className="bg-secondary hover:bg-secondary-container text-on-secondary px-8 py-4 rounded-xl text-label-lg font-medium transition-all shadow-lg mt-2"
        >
          Rekomendasikan Tempat
        </button>
      </div>
    </section>
  )
}
