"use client";

import { useEffect, useRef, useState } from "react";

const planes = [
  {
    nombre: "INDIVIDUAL",
    precio: "$15.000",
    periodo: "por persona",
    beneficios: [
      "Acceso a las 4 jornadas completas",
      "Material del congreso",
      "Certificado de asistencia",
      "Acceso a talleres",
    ],
    destacado: false,
  },
  {
    nombre: "GRUPAL",
    precio: "$12.000",
    periodo: "por persona (5+ personas)",
    beneficios: [
      "Acceso a las 4 jornadas completas",
      "Material del congreso",
      "Certificado de asistencia",
      "Acceso a talleres",
      "Ubicación preferencial",
      "Almuerzo de confraternidad incluido",
    ],
    destacado: true,
  },
  {
    nombre: "LÍDER / PASTOR",
    precio: "$10.000",
    periodo: "por persona",
    beneficios: [
      "Acceso a las 4 jornadas completas",
      "Material del congreso",
      "Certificado de asistencia",
      "Acceso a talleres",
      "Desayuno de líderes (Sábado)",
      "Meet & greet con oradores",
    ],
    destacado: false,
  },
];

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
    <section id="inscripcion" className="bg-negro-fondo py-20 md:py-32">
      <div
        ref={ref}
        className={`mx-auto max-w-5xl px-4 lg:px-8 transition-all duration-1000 ease-out ${
          visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="text-center">
          <h2 className="font-serif text-4xl text-dorado md:text-6xl">
            INSCRIPCIÓN
          </h2>
          <div
            className="mx-auto mt-4 h-px w-24"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, #E7BB70 50%, transparent 100%)",
            }}
          />
          <p className="mt-4 font-mono text-sm font-light text-gris-texto">
            Asegurá tu lugar — Cupos limitados
          </p>
        </div>

        {/* Pricing cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {planes.map((plan) => (
            <div
              key={plan.nombre}
              className={`relative flex flex-col border p-6 transition-all hover:border-dorado/60 md:p-8 ${
                plan.destacado
                  ? "border-dorado bg-dorado/5"
                  : "border-gris-oscuro"
              }`}
            >
              {plan.destacado && (
                <span className="absolute -top-3 left-6 bg-dorado px-3 py-1 font-sans text-[10px] font-bold tracking-wider text-black">
                  RECOMENDADO
                </span>
              )}

              <h3 className="font-sans text-sm font-bold tracking-wider text-foreground">
                {plan.nombre}
              </h3>

              <div className="mt-4">
                <span className="font-serif text-4xl text-dorado">
                  {plan.precio}
                </span>
                <span className="ml-2 font-mono text-xs text-gris-texto">
                  {plan.periodo}
                </span>
              </div>

              <ul className="mt-6 flex-1 space-y-3">
                {plan.beneficios.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2 font-mono text-xs text-gris-texto"
                  >
                    <span className="mt-0.5 text-dorado">&#10003;</span>
                    {b}
                  </li>
                ))}
              </ul>

              <a
                href="https://wa.me/5492994000000?text=Hola!%20Quiero%20inscribirme%20al%20Congreso%20CCE%202026%20-%20Plan%20"
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-8 block py-3 text-center font-sans text-sm font-bold tracking-wider transition-all ${
                  plan.destacado
                    ? "bg-dorado text-black hover:bg-dorado-claro"
                    : "border border-dorado text-dorado hover:bg-dorado hover:text-black"
                }`}
              >
                INSCRIBIRME
              </a>
            </div>
          ))}
        </div>

        {/* Payment info */}
        <div className="mt-12 border border-gris-oscuro p-6 text-center">
          <p className="font-sans text-sm font-semibold text-foreground">
            Medios de pago
          </p>
          <p className="mt-2 font-mono text-xs text-gris-texto">
            Transferencia bancaria · Mercado Pago · Efectivo en la iglesia
          </p>
          <p className="mt-3 font-mono text-xs text-dorado/60">
            Consultas: plottier@ccesperanza.org · Tel: +54 9 299 504-6674
          </p>
        </div>
      </div>
    </section>
  );
}
