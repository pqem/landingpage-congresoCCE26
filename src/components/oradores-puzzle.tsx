"use client";

import Image from "next/image";
import { useEffect, useState, useCallback, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollSVGPath from "./scroll-svg-path";

const oradores = [
  {
    id: "cattaneo",
    nombre: "Aps. Daniel y Patricia Cattaneo",
    imagen: "/images/oradores/cattaneo.png",
    resena:
      "Pastor principal y apóstol de la Iglesia Redentor (Comunidad Redentor), fundada en 1945 en San Lorenzo, Santa Fe. Lidera una red de 16 templos en la provincia de Santa Fe. Reconocido por su creatividad e innovación ministerial, incluyendo iniciativas como la protesta 'culto-bar' durante la pandemia 2020. Ministerio integral: espiritual, emocional y físico.",
    area: { left: 33.0, top: 16.8, width: 29.0, height: 23.4 },
    areaMobile: { left: 2, top: 28, width: 46, height: 18 },
  },
  {
    id: "ale-maria",
    nombre: "Prs. Ale y María Chamorro",
    imagen: "/images/oradores/ale-maria.png",
    resena:
      "Pastores del Centro Cristiano Esperanza en Plottier, Neuquén. Sirven en el ministerio pastoral de la iglesia madre del CCE, liderando la congregación local con pasión y entrega.",
    area: { left: 62.8, top: 16.8, width: 18.0, height: 37.5 },
    areaMobile: { left: 51, top: 25, width: 43, height: 22 },
  },
  {
    id: "daniel-rosita",
    nombre: "Aps. Daniel y Rosita Chamorro",
    imagen: "/images/oradores/daniel-rosita.png",
    resena:
      "Fundadores del Centro Cristiano Esperanza en 1982, Plottier. Red apostólica con presencia en Argentina, España, Italia, EE.UU., India y África. Más de 40 años de ministerio pastoral. Obras pioneras: FM Esperanza (primera radio cristiana FM del país, 1988), instituciones educativas, centros de salud. Conferencistas internacionales.",
    area: { left: 33.0, top: 41.3, width: 29.0, height: 23.3 },
    areaMobile: { left: 2, top: 49, width: 46, height: 18 },
  },
  {
    id: "belart",
    nombre: "Pr. Sergio Belart",
    imagen: "/images/oradores/belart.png",
    resena:
      "Pastor de la Iglesia Cristiana 'Cita con la Vida' en Córdoba. Abogado (UNC). Director del Congreso Internacional de Jóvenes (Semana Santa, Córdoba, desde 1994). Lidera 'Jóvenes con Propósito' (5.000+ jóvenes). Conferencista internacional en más de 20 países. Autor de 'El Pastor de Jóvenes' y 'Generación de Relevo'.",
    area: { left: 62.8, top: 55.5, width: 18.0, height: 37.5 },
    areaMobile: { left: 27, top: 70, width: 36, height: 20 },
  },
  {
    id: "rodriguez",
    nombre: "Pr. Alejandro Rodríguez",
    imagen: "/images/oradores/rodriguez.png",
    resena:
      "Misionero y presidente de JUCUM Argentina (Juventud Con Una Misión), organización presente en 172 países. Junto a su esposa Martha refundó la obra de JUCUM Argentina en 1989. Ha formado y enviado cientos de misioneros transculturales. Conferencista en los 5 continentes. JUCUM Argentina cuenta con más de 700 obreros y múltiples bases.",
    area: { left: 81.9, top: 55.5, width: 18.1, height: 37.5 },
    areaMobile: { left: 66, top: 70, width: 30, height: 22 },
  },
];

function OradorModal({
  orador,
  onClose,
}: {
  orador: (typeof oradores)[0];
  onClose: () => void;
}) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="modal-overlay fixed inset-0 z-[100] flex cursor-pointer items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div className="animate-fade-in-up relative w-full max-w-lg max-h-[90vh] overflow-y-auto border border-dorado/30 bg-negro-suave p-4 sm:p-6 md:p-8" onClick={(e) => { if (window.innerWidth >= 768) e.stopPropagation(); }}>
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 hidden h-10 w-10 items-center justify-center border border-gris-oscuro bg-negro-suave font-sans text-lg text-gris-texto transition-colors hover:border-dorado hover:text-dorado md:flex"
          aria-label="Cerrar"
        >
          ✕
        </button>
        <div className="mx-auto w-full max-w-[280px] sm:max-w-sm">
          <Image
            src={orador.imagen}
            alt={orador.nombre}
            width={600}
            height={600}
            className="h-auto w-full"
          />
          {/* Golden line below photo */}
          <div className="h-[5px] w-full bg-dorado" />
        </div>

        <h3 className="mt-6 font-serif text-xl text-dorado sm:text-2xl md:text-3xl">
          {orador.nombre}
        </h3>

        <div
          className="gradient-line-dorado mt-3 h-px w-16"
        />

        <p className="mt-4 font-mono text-sm font-light leading-relaxed text-gris-texto md:text-base">
          {orador.resena}
        </p>
      </div>
    </div>
  );
}

export function OradoresPuzzle() {
  const [selectedOrador, setSelectedOrador] = useState<
    (typeof oradores)[0] | null
  >(null);
  const handleClose = useCallback(() => setSelectedOrador(null), []);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0.1, 0.3], [60, 0]);

  return (
    <>
      <section
        id="oradores"
        ref={sectionRef}
        className="relative overflow-x-clip py-20 md:py-32"
      >
        {/* Golden decorative curve - scroll-driven, works on iOS Safari */}
        <ScrollSVGPath
          d="M3190.54 7829.2c5862.87,-2682.06 7942.95,-2561.9 8262.79,-2037.11 464.71,762.45 -3075.18,3341.58 -6537.99,7434.03 7626.8,-2329.01 11235.37,-4774.93 12305.66,-2218.89 1539.6,3676.86 -10353.84,9592.05 -15866.51,12241.84"
          pathLength={60000}
          stroke="var(--color-dorado)"
          strokeWidth={1270}
          viewBox="0 0 18718 28729.7"
          scrollRange={[0.25, 0.6]}
          className="absolute -left-[30%] top-[58%] z-[1] h-[100%] pointer-events-none sm:top-[15%] md:top-[10%] sm:-left-[25%] md:-left-[10%]"
          svgClassName="h-[55%] w-auto opacity-90 sm:h-[100%] md:h-[120%]"
          preserveAspectRatio="xMinYMin meet"
        />
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          {/* Desktop puzzle */}
          <motion.div
            className="relative hidden w-full md:block"
            style={{ aspectRatio: "2438 / 1886", opacity, y }}
          >
            <Image
              src="/images/puzzle1.png"
              alt="Oradores del Congreso CCE 2026"
              width={2438}
              height={1886}
              className="h-auto w-full"
              priority
            />
            {oradores.map((orador) => (
              <button
                key={orador.id}
                onClick={() => setSelectedOrador(orador)}
                className="absolute z-10 cursor-pointer min-w-[44px] min-h-[44px]"
                style={{
                  left: `${orador.area.left}%`,
                  top: `${orador.area.top}%`,
                  width: `${orador.area.width}%`,
                  height: `${orador.area.height}%`,
                }}
                aria-label={`Ver reseña de ${orador.nombre}`}
              />
            ))}
          </motion.div>

          {/* Mobile puzzle */}
          <motion.div
            className="relative w-full md:hidden"
            style={{ aspectRatio: "1638 / 2442", opacity, y }}
          >
            <Image
              src="/images/puzzle-movil.png"
              alt="Oradores del Congreso CCE 2026"
              width={1638}
              height={2442}
              className="h-auto w-full"
              priority
            />
            {oradores.map((orador) => (
              <button
                key={orador.id}
                onClick={() => setSelectedOrador(orador)}
                className="absolute z-10 cursor-pointer min-w-[44px] min-h-[44px]"
                style={{
                  left: `${orador.areaMobile.left}%`,
                  top: `${orador.areaMobile.top}%`,
                  width: `${orador.areaMobile.width}%`,
                  height: `${orador.areaMobile.height}%`,
                }}
                aria-label={`Ver reseña de ${orador.nombre}`}
              />
            ))}
          </motion.div>

          <p className="mt-6 text-center font-mono text-sm font-light text-gris-texto/60 sm:text-xs">
            Tocá cada orador para conocer más
          </p>
        </div>
      </section>

      {selectedOrador && (
        <OradorModal orador={selectedOrador} onClose={handleClose} />
      )}
    </>
  );
}
