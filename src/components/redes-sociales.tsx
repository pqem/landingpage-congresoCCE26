"use client";

import { useEffect, useRef, useState } from "react";

const redes = [
  {
    nombre: "Instagram",
    usuario: "@CCEPlottier",
    url: "https://instagram.com/CCEPlottier",
    svg: "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z",
  },
  {
    nombre: "Facebook",
    usuario: "Centro Cristiano Esperanza",
    url: "https://facebook.com/CCEPlottier",
    svg: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z",
  },
  {
    nombre: "YouTube",
    usuario: "CCE Plottier",
    url: "https://youtube.com/@CCEPlottier",
    svg: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
  {
    nombre: "WhatsApp",
    usuario: "+54 9 299 400-0000",
    url: "https://wa.me/5492994000000",
    svg: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z",
  },
];

export function RedesSociales() {
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
    <section id="redes" className="bg-negro-suave py-20 md:py-32">
      <div
        ref={ref}
        className={`mx-auto max-w-4xl px-4 text-center lg:px-8 transition-all duration-1000 ease-out ${
          visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <h2 className="font-serif text-4xl text-dorado md:text-6xl">
          SEGUINOS
        </h2>
        <div
          className="mx-auto mt-4 h-px w-24"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, #E7BB70 50%, transparent 100%)",
          }}
        />
        <p className="mt-4 font-mono text-sm font-light text-gris-texto">
          Mantenete conectado con toda la info del congreso
        </p>

        <div className="mt-12 grid grid-cols-1 gap-4 min-[400px]:grid-cols-2 md:grid-cols-4">
          {redes.map((red) => (
            <a
              key={red.nombre}
              href={red.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 border border-gris-oscuro p-4 transition-all hover:border-dorado/50 hover:bg-dorado/5 sm:p-6"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-8 w-8 text-gris-texto transition-colors group-hover:text-dorado"
              >
                <path d={red.svg} />
              </svg>
              <span className="font-sans text-xs font-bold text-foreground">
                {red.nombre}
              </span>
              <span className="font-mono text-xs text-gris-texto">
                {red.usuario}
              </span>
            </a>
          ))}
        </div>

        {/* Hashtag */}
        <p className="mt-10 font-serif text-2xl text-dorado/40 md:text-3xl">
          #ExpansiónSobrenatural
        </p>
      </div>
    </section>
  );
}
