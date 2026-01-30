import { CONGRESO, MENSAJE, PONENTES } from '@/data/congreso-data'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Título principal */}
        <h1 className="font-[family-name:var(--font-druk)] text-6xl md:text-8xl lg:text-9xl text-white tracking-tight">
          {CONGRESO.tituloPrincipal}
          <br />
          <span className="text-gradient-gold">{CONGRESO.tituloSecundario}</span>
        </h1>

        {/* Año */}
        <p className="font-[family-name:var(--font-mango)] text-4xl md:text-6xl lg:text-7xl text-white/90 mt-2">
          {CONGRESO.año}
        </p>

        {/* Tema */}
        <p className="font-[family-name:var(--font-montserrat)] text-xl md:text-2xl text-[var(--color-dorado)] mt-8 tracking-[0.3em] uppercase">
          {CONGRESO.tema}
        </p>

        {/* Fechas */}
        <p className="font-[family-name:var(--font-montserrat)] text-lg md:text-xl text-white/80 mt-4">
          {CONGRESO.fechas}
        </p>
      </section>

      {/* Cita Section */}
      <section className="py-20 px-4 text-center">
        <blockquote className="max-w-3xl mx-auto">
          <p className="font-[family-name:var(--font-montserrat)] text-2xl md:text-3xl text-white/90 italic">
            "{MENSAJE.cita}"
          </p>
          <cite className="block mt-4 text-[var(--color-dorado)] not-italic">
            {MENSAJE.referencia}
          </cite>
        </blockquote>
      </section>

      {/* Ponentes Section */}
      <section className="py-20 px-4">
        <h2 className="font-[family-name:var(--font-druk)] text-4xl md:text-5xl text-center text-white mb-12">
          PONENTES
        </h2>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {PONENTES.map((ponente) => (
            <div key={ponente.nombre} className="text-center">
              <p className="font-[family-name:var(--font-gotham)] text-lg text-white">
                {ponente.titulo} {ponente.nombre}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
