"use client";

import { useEffect, useRef, useState } from "react";

export function Inscripcion() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="inscripcion" className="bg-negro-fondo py-16 sm:py-20 md:py-32">
      <div
        ref={ref}
        className={`mx-auto max-w-5xl px-4 lg:px-8 transition-all duration-1000 ease-out ${
          visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="text-center">
          <h2 className="font-serif text-3xl text-dorado sm:text-4xl md:text-5xl lg:text-6xl">
            INSCRIPCIÓN
          </h2>
          <div
            className="gradient-line-dorado-center mx-auto mt-4 h-px w-24"
          />

          <p className="mx-auto mt-8 max-w-xl font-mono text-base font-light leading-relaxed text-gris-texto">
            Completá el formulario y asegurá tu lugar en el
            Congreso CCE Argentina 2026.
            La inscripción es{" "}
            <span className="font-semibold text-dorado">totalmente gratuita</span>.
          </p>

          <a
            href="/inscripcion"
            className="animate-pulse-glow mt-10 inline-block bg-dorado px-6 py-3 font-sans text-sm font-bold tracking-widest text-black transition-all hover:bg-dorado-claro md:px-10 md:py-4 md:text-base"
          >
            INSCRIBIRME AHORA
          </a>

          <p className="mt-8 font-mono text-xs text-dorado/60">
            Consultas: plottier@ccesperanza.org · Tel: +54 9 299 504-6674
          </p>
        </div>
      </div>
    </section>
  );
}
