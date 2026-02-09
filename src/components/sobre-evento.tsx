"use client";

import { useEffect, useRef, useState } from "react";

export function SobreEvento() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="evento" className="bg-negro-fondo py-20 md:py-32">
      <div
        ref={ref}
        className={`mx-auto max-w-4xl px-4 lg:px-8 ${
          visible ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        {/* Section title */}
        <h2 className="font-serif text-4xl text-dorado md:text-6xl">
          SOBRE EL EVENTO
        </h2>
        <div
          className="mt-4 h-px w-24"
          style={{
            background: "linear-gradient(90deg, #E7BB70 0%, transparent 100%)",
          }}
        />

        {/* Content */}
        <div className="mt-10 flex flex-col gap-6">
          <p className="font-mono text-base font-light leading-relaxed text-gris-texto md:text-lg">
            El Congreso CCE Argentina 2026 es un encuentro de cuatro días donde
            la presencia de Dios transforma vidas. Bajo el lema{" "}
            <span className="font-semibold text-dorado">
              &quot;Expansión Sobrenatural&quot;
            </span>
            , creemos que esta temporada 2026–2030 marca el inicio de algo
            extraordinario.
          </p>
          <p className="font-mono text-base font-light leading-relaxed text-gris-texto md:text-lg">
            Viví una experiencia de adoración poderosa, enseñanza bíblica
            transformadora y comunidad genuina. Oradores de toda Argentina se
            reúnen en Plottier, Neuquén, para declarar que no es por el poder ni
            por la fuerza, sino por Su Espíritu.
          </p>
          <p className="font-mono text-base font-light leading-relaxed text-foreground md:text-lg">
            Cuatro días que van a cambiar tu vida. ¿Estás listo para la
            expansión?
          </p>
        </div>

        {/* Info cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            { value: "4", label: "DÍAS DE EVENTO" },
            { value: "8+", label: "ORADORES" },
            { value: "∞", label: "EXPECTATIVA DE DIOS" },
          ].map((item) => (
            <div
              key={item.label}
              className="border border-gris-oscuro p-6 transition-colors hover:border-dorado/40"
            >
              <p className="font-serif text-3xl text-dorado">{item.value}</p>
              <p className="mt-1 font-mono text-sm text-gris-texto">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
