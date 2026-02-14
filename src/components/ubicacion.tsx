"use client";

import { useEffect, useRef, useState } from "react";

export function Ubicacion() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="ubicacion" className="bg-negro-suave py-20 md:py-32">
      <div
        ref={ref}
        className={`mx-auto max-w-5xl px-4 lg:px-8 transition-all duration-1000 ease-out ${
          visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <h2 className="font-serif text-4xl text-dorado md:text-6xl">
          UBICACIÓN
        </h2>
        <div
          className="mt-4 h-px w-24"
          style={{
            background: "linear-gradient(90deg, #E7BB70 0%, transparent 100%)",
          }}
        />

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
          {/* Info */}
          <div className="space-y-6">
            <div>
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
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mt-0.5 h-5 w-5 shrink-0 text-dorado">
                  <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  <p className="font-sans text-sm font-semibold text-foreground">
                    Aeropuerto más cercano
                  </p>
                  <p className="font-mono text-xs text-gris-texto">
                    Aeropuerto Internacional Presidente Perón (NQN) — 15 min en auto
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mt-0.5 h-5 w-5 shrink-0 text-dorado">
                  <path d="M6 6h12a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zM6 16v2m12-2v2M7 12h2m6 0h2M4 9h16" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  <p className="font-sans text-sm font-semibold text-foreground">
                    Terminal de ómnibus
                  </p>
                  <p className="font-mono text-xs text-gris-texto">
                    Terminal Neuquén — 20 min en auto
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mt-0.5 h-5 w-5 shrink-0 text-dorado">
                  <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  <p className="font-sans text-sm font-semibold text-foreground">
                    Alojamiento
                  </p>
                  <p className="font-mono text-xs text-gris-texto">
                    Hoteles y cabañas disponibles en Plottier y Neuquén capital.
                    Consultá por alojamiento grupal.
                  </p>
                </div>
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=Centro+Cristiano+Esperanza+Plottier+Neuquen"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-dorado px-6 py-3 font-sans text-xs font-bold tracking-wider text-dorado transition-all hover:bg-dorado hover:text-black"
            >
              VER EN GOOGLE MAPS
            </a>
          </div>

          {/* Map embed */}
          <div className="overflow-hidden border border-gris-oscuro">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3093.5!2d-68.23!3d-38.96!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDU3JzM2LjAiUyA2OMKwMTMnNDguMCJX!5e0!3m2!1ses!2sar!4v1700000000000!5m2!1ses!2sar"
              width="100%"
              height="250"
              className="h-[250px] sm:h-[300px] md:h-[350px] w-full"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) grayscale(30%)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Centro Cristiano Esperanza"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
