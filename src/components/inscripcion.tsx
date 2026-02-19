"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function Inscripcion() {
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, amount: 0.5 });
  const contentInView = useInView(contentRef, { once: true, amount: 0.3 });

  return (
    <section id="inscripcion" className="bg-negro-fondo py-16 sm:py-20 md:py-32">
      <div className="mx-auto max-w-5xl px-4 lg:px-8">
        <div className="text-center">
          <div ref={headingRef}>
            <motion.h2
              className="font-serif text-3xl text-dorado sm:text-4xl md:text-5xl lg:text-6xl"
              initial={{ opacity: 0, x: -100 }}
              animate={headingInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
              transition={{ duration: 0.7, type: "spring", stiffness: 80, damping: 14 }}
            >
              INSCRIPCIÓN
            </motion.h2>
            <motion.div
              className="gradient-line-dorado-center mx-auto mt-4 h-px w-24"
              initial={{ scaleX: 0 }}
              animate={headingInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            />
          </div>

          <div ref={contentRef}>
            <motion.p
              className="mx-auto mt-8 max-w-xl font-mono text-base font-light leading-relaxed text-gris-texto"
              initial={{ opacity: 0, y: 25 }}
              animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
              transition={{ duration: 0.5, delay: 0 }}
            >
              Completá el formulario y asegurá tu lugar en el
              Congreso CCE Argentina 2026.
              La inscripción es{" "}
              <span className="font-semibold text-dorado">totalmente gratuita</span>.
            </motion.p>

            <motion.a
              href="/inscripcion"
              className="animate-pulse-glow mt-10 inline-block bg-dorado px-6 py-3 font-sans text-sm font-bold tracking-widest text-black transition-all hover:bg-dorado-claro md:px-10 md:py-4 md:text-base"
              initial={{ opacity: 0, y: 25 }}
              animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              INSCRIBIRME AHORA
            </motion.a>

            <motion.p
              className="mt-8 font-mono text-xs text-dorado/60"
              initial={{ opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              Consultas: plottier@ccesperanza.org · Tel: +54 9 299 504-6674
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
