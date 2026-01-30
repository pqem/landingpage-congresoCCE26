import { MENSAJE, PONENTES } from '@/data/congreso-data'
import HeroExact from '@/components/HeroExact'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero con diseño exacto basado en imagen de referencia */}
      <HeroExact />

      {/* Cita Section */}
      <section className="py-20 px-4 text-center">
        <blockquote className="max-w-3xl mx-auto">
          <p className="font-[family-name:var(--font-montserrat)] text-2xl md:text-3xl text-white/90 italic">
            &ldquo;{MENSAJE.cita}&rdquo;
          </p>
          <cite className="block mt-4 text-[var(--color-dorado)] not-italic font-semibold">
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
