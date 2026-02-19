"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

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
  const headingRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, amount: 0.5 });
  const tabsInView = useInView(tabsRef, { once: true, amount: 0.3 });
  const [diaActivo, setDiaActivo] = useState(0);

  return (
    <section id="programa" className="bg-negro-fondo py-20 md:py-32">
      <div className="mx-auto max-w-5xl px-4 lg:px-8">
        <div ref={headingRef}>
          <motion.h2
            className="font-serif text-4xl text-dorado md:text-6xl"
            initial={{ opacity: 0, x: -100 }}
            animate={headingInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 80, damping: 14 }}
          >
            PROGRAMA
          </motion.h2>
          <motion.div
            className="gradient-line-dorado mt-4 h-px w-24"
            initial={{ scaleX: 0, originX: 0 }}
            animate={headingInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          />
        </div>

        {/* Day selector tabs */}
        <div ref={tabsRef} className="mt-10 grid grid-cols-4 gap-2">
          {dias.map((d, i) => (
            <motion.button
              key={d.dia}
              onClick={() => setDiaActivo(i)}
              initial={{ opacity: 0, y: 20 }}
              animate={tabsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
              className={`border px-1 py-2.5 font-sans text-[10px] font-bold tracking-wider transition-all sm:px-5 sm:py-3 sm:text-xs md:text-sm ${
                diaActivo === i
                  ? "border-dorado bg-dorado text-black"
                  : "border-gris-oscuro text-gris-texto hover:border-dorado/50 hover:text-dorado"
              }`}
            >
              {d.dia}
            </motion.button>
          ))}
        </div>

        {/* Schedule */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={tabsInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="mb-6 font-mono text-xs text-dorado/60">
            {dias[diaActivo].fecha}
          </p>
          <div className="space-y-0">
            {dias[diaActivo].actividades.map((act, i) => (
              <motion.div
                key={`${diaActivo}-${i}`}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
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
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
