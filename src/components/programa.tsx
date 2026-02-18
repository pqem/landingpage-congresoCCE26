"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const dias = [
  {
    dia: "VIERNES 20",
    fecha: "20 de Marzo",
    actividades: [
      { hora: "16:00", titulo: "Acreditación y bienvenida" },
      { hora: "18:00", titulo: "Apertura oficial", detalle: "Aps. Daniel y Rosita Chamorro" },
      { hora: "19:30", titulo: "Adoración en vivo" },
      { hora: "20:30", titulo: "Plenaria inaugural", detalle: "Aps. Daniel y Patricia Cattaneo" },
    ],
  },
  {
    dia: "SÁBADO 21",
    fecha: "21 de Marzo",
    actividades: [
      { hora: "09:00", titulo: "Desayuno de líderes" },
      { hora: "10:30", titulo: "Taller: Estrategias de expansión", detalle: "Pr. Alejandro Rodríguez" },
      { hora: "14:00", titulo: "Almuerzo libre" },
      { hora: "16:00", titulo: "Taller: Liderazgo generacional", detalle: "Pr. Sergio Belart" },
      { hora: "19:00", titulo: "Adoración en vivo" },
      { hora: "20:00", titulo: "Plenaria de noche", detalle: "Aps. Daniel y Rosita Chamorro" },
    ],
  },
  {
    dia: "DOMINGO 22",
    fecha: "22 de Marzo",
    actividades: [
      { hora: "10:00", titulo: "Servicio especial de adoración" },
      { hora: "11:30", titulo: "Plenaria", detalle: "Prs. Ale y María Chamorro" },
      { hora: "13:00", titulo: "Almuerzo de confraternidad" },
      { hora: "17:00", titulo: "Panel de oradores", detalle: "Todos los oradores" },
      { hora: "19:00", titulo: "Adoración en vivo" },
      { hora: "20:00", titulo: "Plenaria central", detalle: "Aps. Daniel y Patricia Cattaneo" },
    ],
  },
  {
    dia: "LUNES 23",
    fecha: "23 de Marzo",
    actividades: [
      { hora: "09:00", titulo: "Oración y consagración" },
      { hora: "10:30", titulo: "Plenaria de cierre", detalle: "Pr. Sergio Belart" },
      { hora: "12:00", titulo: "Comisión y envío", detalle: "Aps. Daniel y Rosita Chamorro" },
      { hora: "13:00", titulo: "Cierre y despedida" },
    ],
  },
];

export function Programa() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [diaActivo, setDiaActivo] = useState(0);

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
    <section id="programa" className="bg-negro-fondo py-20 md:py-32">
      <div
        ref={ref}
        className={`mx-auto max-w-5xl px-4 lg:px-8 transition-all duration-1000 ease-out ${
          visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <motion.h2
          className="font-serif text-4xl text-dorado md:text-6xl"
          initial={{ opacity: 0, y: 70, scale: 0.85 }}
          animate={visible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 70, scale: 0.85 }}
          transition={{ duration: 0.9, type: "spring", stiffness: 80, damping: 12 }}
        >
          PROGRAMA
        </motion.h2>
        <motion.div
          className="gradient-line-dorado mt-4 h-px w-24"
          initial={{ scaleX: 0, originX: 0 }}
          animate={visible ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        />

        {/* Day selector tabs */}
        <div className="mt-10 grid grid-cols-4 gap-2">
          {dias.map((d, i) => (
            <button
              key={d.dia}
              onClick={() => setDiaActivo(i)}
              className={`border px-1 py-2.5 font-sans text-[10px] font-bold tracking-wider transition-all sm:px-5 sm:py-3 sm:text-xs md:text-sm ${
                diaActivo === i
                  ? "border-dorado bg-dorado text-black"
                  : "border-gris-oscuro text-gris-texto hover:border-dorado/50 hover:text-dorado"
              }`}
            >
              {d.dia}
            </button>
          ))}
        </div>

        {/* Schedule */}
        <div className="mt-8">
          <p className="mb-6 font-mono text-xs text-dorado/60">
            {dias[diaActivo].fecha}
          </p>
          <div className="space-y-0">
            {dias[diaActivo].actividades.map((act, i) => (
              <div
                key={i}
                className="flex items-baseline gap-6 border-l border-gris-oscuro py-4 pl-6 transition-colors hover:border-dorado/50"
              >
                <span className="w-12 shrink-0 font-mono text-sm font-bold leading-none text-dorado sm:w-14 md:text-base">
                  {act.hora}
                </span>
                <div>
                  <p className="font-sans text-sm font-semibold leading-none text-foreground md:text-base">
                    {act.titulo}
                  </p>
                  {act.detalle && (
                    <p className="mt-1 font-mono text-xs text-gris-texto">
                      {act.detalle}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
