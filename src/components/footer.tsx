import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-dorado/10 bg-negro-fondo py-8 md:py-12">
      <div className="mx-auto max-w-5xl px-4 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
          {/* Brand */}
          <div className="flex flex-col items-start gap-4">
            <Image
              src="/images/logo-cce-color.png"
              alt="CCE"
              width={724}
              height={820}
              className="h-16 w-auto md:h-20"
            />
            <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-foreground/80">
              Centro Cristiano
              <br />
              Esperanza
            </p>
            <p className="font-mono text-xs text-gris-texto">
              Desde 1982 en Plottier, Neuquén
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="font-sans text-xs font-bold tracking-wider text-dorado">
              ENLACES
            </p>
            <nav className="mt-4 flex flex-col gap-2">
              {[
                { label: "Inicio", href: "#inicio" },
                { label: "Sobre el evento", href: "#evento" },
                { label: "Oradores", href: "#oradores" },
                { label: "Programa", href: "#programa" },
                { label: "Inscripción", href: "#inscripcion" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-mono text-xs text-gris-texto transition-colors hover:text-dorado"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="font-sans text-xs font-bold tracking-wider text-dorado">
              CONTACTO
            </p>
            <div className="mt-4 space-y-2 font-mono text-xs text-gris-texto">
              <p>plottier@ccesperanza.org</p>
              <p>Tel: +54 9 299 504-6674</p>
              <p>Av. San Martín 440</p>
              <p>Plottier, Neuquén, Argentina</p>
            </div>
            <a
              href="https://www.ccesperanza.org"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block font-sans text-xs font-semibold tracking-wider text-foreground/80 transition-colors hover:text-dorado"
            >
              WWW.CCESPERANZA.ORG
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-gris-oscuro/50 pt-6 text-center md:flex md:items-center md:justify-between md:text-left">
          <p className="font-mono text-xs text-gris-texto/60">
            © 2026 Centro Cristiano Esperanza. Todos los derechos reservados.
          </p>
          <p className="mt-1 font-mono text-xs text-gris-texto/40 md:mt-0">
            Congreso CCE Argentina 2026 — Expansión Sobrenatural
          </p>
        </div>
      </div>
    </footer>
  );
}
