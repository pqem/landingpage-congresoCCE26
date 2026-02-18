"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function SobreEvento() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="evento" className="bg-negro-fondo py-16 sm:py-20 md:py-32">
      <div ref={ref} className="mx-auto max-w-4xl px-4 lg:px-8">
        {/* Section title */}
        <motion.h2
          className="font-serif text-3xl text-dorado sm:text-4xl md:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 80, scale: 0.85 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 80, scale: 0.85 }}
          transition={{ duration: 0.9, type: "spring", stiffness: 80, damping: 12 }}
        >
          SOBRE EL EVENTO
        </motion.h2>
        <motion.div
          className="gradient-line-dorado mt-4 h-px w-24"
          initial={{ scaleX: 0, originX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        />

        {/* Content */}
        <motion.div
          className="mt-10 flex flex-col gap-6"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
        >
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
        </motion.div>
      </div>
    </section>
  );
}
