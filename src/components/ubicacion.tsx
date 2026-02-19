"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const infoItems = [
  {
    icon: "M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z",
    title: "Aeropuerto más cercano",
    text: "Aeropuerto Internacional Presidente Perón (NQN) — 15 min en auto",
  },
  {
    icon: "M6 6h12a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zM6 16v2m12-2v2M7 12h2m6 0h2M4 9h16",
    title: "Terminal de ómnibus",
    text: "Terminal Neuquén — 20 min en auto",
  },
  {
    icon: "M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6",
    title: "Alojamiento",
    text: "Hoteles y cabañas disponibles en Plottier y Neuquén capital. Consultá por alojamiento grupal.",
  },
];

export function Ubicacion() {
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, amount: 0.5 });
  const contentInView = useInView(contentRef, { once: true, amount: 0.15 });

  return (
    <section id="ubicacion" className="bg-negro-suave py-20 md:py-32">
      <div className="mx-auto max-w-5xl px-4 lg:px-8">
        <div ref={headingRef}>
          <motion.h2
            className="font-serif text-4xl text-dorado md:text-6xl"
            initial={{ opacity: 0, x: -100 }}
            animate={headingInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 80, damping: 14 }}
          >
            UBICACIÓN
          </motion.h2>
          <motion.div
            className="gradient-line-dorado mt-4 h-px w-24"
            initial={{ scaleX: 0, originX: 0 }}
            animate={headingInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          />
        </div>

        <div ref={contentRef} className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
          {/* Info */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0 }}
            >
              <h3 className="font-sans text-lg font-bold text-foreground">
                Centro Cristiano Esperanza
              </h3>
              <p className="mt-2 font-mono text-sm text-gris-texto">
                Av. San Martín 440
                <br />
                Plottier, Neuquén, Argentina
                <br />
                CP 8316
              </p>
            </motion.div>

            <div className="space-y-3">
              {infoItems.map((item, i) => (
                <motion.div
                  key={item.title}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, y: 25 }}
                  animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mt-0.5 h-5 w-5 shrink-0 text-dorado">
                    <path d={item.icon} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div>
                    <p className="font-sans text-sm font-semibold text-foreground">
                      {item.title}
                    </p>
                    <p className="font-mono text-xs text-gris-texto">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="https://maps.google.com/?q=Centro+Cristiano+Esperanza+Plottier+Neuquen"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-dorado px-6 py-3 font-sans text-xs font-bold tracking-wider text-dorado transition-all hover:bg-dorado hover:text-black"
              initial={{ opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              VER EN GOOGLE MAPS
            </motion.a>
          </div>

          {/* Map embed */}
          <motion.div
            className="overflow-hidden border border-gris-oscuro"
            initial={{ opacity: 0, y: 30 }}
            animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <iframe
              src="https://maps.google.com/maps?q=Centro+Cristiano+Esperanza,+Av+San+Martin+440,+Plottier,+Neuquen,+Argentina&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="250"
              className="h-[250px] sm:h-[300px] md:h-[350px] w-full"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) grayscale(30%)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Centro Cristiano Esperanza"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
