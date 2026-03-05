import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad — Congreso CCE Argentina 2026",
  description: "Política de privacidad y tratamiento de datos personales del Congreso CCE Argentina 2026.",
};

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen bg-negro-fondo py-12">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center font-sans text-xs font-bold tracking-wider text-gris-texto transition-colors hover:text-dorado"
        >
          ← Volver al inicio
        </Link>

        <article className="mt-8 space-y-8 font-mono text-sm text-gris-texto">
          <header>
            <h1 className="font-serif text-3xl text-dorado">POLÍTICA DE PRIVACIDAD</h1>
            <p className="mt-2 text-xs text-gris-texto/60">Última actualización: marzo de 2026</p>
          </header>

          <section className="space-y-3">
            <h2 className="font-sans text-sm font-bold uppercase tracking-widest text-foreground">1. Responsable del tratamiento</h2>
            <p>
              <strong className="text-foreground">Centro Cristiano Esperanza (CCE)</strong><br />
              Avenida San Martín 440, Plottier, Neuquén, Argentina<br />
              Email: plottier@ccesperanza.org
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-sans text-sm font-bold uppercase tracking-widest text-foreground">2. Datos que recopilamos</h2>
            <p>Al completar el formulario de inscripción al Congreso CCE Argentina 2026, recopilamos:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Nombre y apellido</li>
              <li>Edad</li>
              <li>Número de teléfono</li>
              <li>Ciudad de residencia</li>
              <li>Localidad de iglesia de pertenencia</li>
              <li>Datos de familiares que asistan junto al inscripto (si corresponde)</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-sans text-sm font-bold uppercase tracking-widest text-foreground">3. Finalidad del tratamiento</h2>
            <p>Los datos recopilados se utilizan exclusivamente para:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Gestionar y confirmar tu inscripción al congreso</li>
              <li>Enviarte comunicaciones relacionadas al evento vía WhatsApp</li>
              <li>Organizar la logística de alojamiento cuando corresponda</li>
            </ul>
            <p>No utilizamos tus datos para fines comerciales ni los cedemos a terceros ajenos al evento.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-sans text-sm font-bold uppercase tracking-widest text-foreground">4. Almacenamiento internacional</h2>
            <p>
              Los datos se almacenan en servidores de Vercel Inc. y Cloudflare Inc., ambas empresas con sede en Estados Unidos. Estos proveedores cuentan con políticas de seguridad y privacidad propias. Al inscribirte, aceptás que tus datos sean procesados en dichos servidores internacionales.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-sans text-sm font-bold uppercase tracking-widest text-foreground">5. Menores de edad</h2>
            <p>
              Si sos menor de 18 años, tu inscripción implica que contás con la autorización de tu padre, madre o tutor legal para participar del evento y para el tratamiento de tus datos personales conforme a esta política.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-sans text-sm font-bold uppercase tracking-widest text-foreground">6. Tus derechos (Ley 25.326)</h2>
            <p>
              De acuerdo con la Ley 25.326 de Protección de Datos Personales de la República Argentina, tenés derecho a:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li><strong className="text-foreground">Acceso:</strong> conocer qué datos tuyos tenemos almacenados</li>
              <li><strong className="text-foreground">Rectificación:</strong> corregir datos inexactos o incompletos</li>
              <li><strong className="text-foreground">Supresión:</strong> solicitar la eliminación de tus datos</li>
            </ul>
            <p>
              Para ejercer cualquiera de estos derechos, escribinos a{" "}
              <a href="mailto:plottier@ccesperanza.org" className="text-dorado hover:underline">
                plottier@ccesperanza.org
              </a>
            </p>
            <p className="text-xs text-gris-texto/60">
              La Agencia de Acceso a la Información Pública (AAIP) es el organismo de control en materia de protección de datos personales en Argentina.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-sans text-sm font-bold uppercase tracking-widest text-foreground">7. Conservación de datos</h2>
            <p>
              Los datos se conservan durante el tiempo necesario para la gestión del evento y hasta 6 meses después de su finalización, plazo tras el cual son eliminados.
            </p>
          </section>

          <div className="border-t border-gris-oscuro/50 pt-6">
            <Link href="/" className="font-sans text-xs font-bold tracking-wider text-dorado hover:underline">
              ← Volver al inicio
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
