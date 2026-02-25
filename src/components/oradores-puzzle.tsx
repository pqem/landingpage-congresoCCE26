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
    area: { left: 18.7, top: 3.5, width: 27.0, height: 19.1 },
    areaMobile: { left: 1.8, top: 24.1, width: 41.5, height: 14.6 },
  },
  {
    id: "ale-maria",
    nombre: "Prs. Ale y María Chamorro",
    imagen: "/images/oradores/ale-maria.png",
    resena:
      "Pastores del Centro Cristiano Esperanza en Plottier, Neuquén. Sirven en el ministerio pastoral de la iglesia madre del CCE, liderando la congregación local con pasión y entrega.",
    area: { left: 47.5, top: 3.5, width: 22.4, height: 19.1 },
    areaMobile: { left: 47.0, top: 21.8, width: 42.0, height: 16.5 },
  },
  {
    id: "daniel-rosita",
    nombre: "Aps. Daniel y Rosita Chamorro",
    imagen: "/images/oradores/daniel-rosita.png",
    resena:
      "Fundadores del Centro Cristiano Esperanza en 1982, Plottier. Red apostólica con presencia en Argentina, España, Italia, EE.UU., India y África. Más de 40 años de ministerio pastoral. Obras pioneras: FM Esperanza (primera radio cristiana FM del país, 1988), instituciones educativas, centros de salud. Conferencistas internacionales.",
    area: { left: 18.7, top: 24.5, width: 27.0, height: 19.1 },
    areaMobile: { left: 1.8, top: 39.9, width: 41.5, height: 14.5 },
  },
  {
    id: "belart",
    nombre: "Pr. Sergio Belart",
    imagen: "/images/oradores/belart.png",
    resena:
      "Pastor de la Iglesia Cristiana 'Cita con la Vida' en Córdoba. Abogado (UNC). Director del Congreso Internacional de Jóvenes (Semana Santa, Córdoba, desde 1994). Lidera 'Jóvenes con Propósito' (5.000+ jóvenes). Conferencista internacional en más de 20 países. Autor de 'El Pastor de Jóvenes' y 'Generación de Relevo'.",
    area: { left: 36.5, top: 46.1, width: 17.8, height: 21.4 },
    areaMobile: { left: 26.6, top: 55.7, width: 24.8, height: 15.8 },
  },
  {
    id: "rodriguez",
    nombre: "Pr. Alejandro Rodríguez",
    imagen: "/images/oradores/rodriguez.png",
    resena:
      "Misionero y presidente de JUCUM Argentina (Juventud Con Una Misión), organización presente en 172 países. Junto a su esposa Martha refundó la obra de JUCUM Argentina en 1989. Ha formado y enviado cientos de misioneros transculturales. Conferencista en los 5 continentes. JUCUM Argentina cuenta con más de 700 obreros y múltiples bases.",
    area: { left: 56.2, top: 46.1, width: 16.9, height: 21.4 },
    areaMobile: { left: 53.4, top: 55.7, width: 23.7, height: 15.8 },
  },
  {
    id: "rafael-pedace",
    nombre: "Rafael Pedace",
    imagen: "/images/oradores/rafael-pedace.png",
    resena:
      "Empresario y líder espiritual argentino. Fundador de TodoMúsica S.A. (1984), compañía líder en distribución de instrumentos musicales y equipos de sonido profesional, representando a más de 30 marcas internacionales. Contador Público y conferencista en foros de liderazgo y negocios. Integrante de la mesa ejecutiva de la Comunidad PEC (Profesionales y Empresarios Cristianos). Pastor y fundador del ministerio 'Una Vida Mejor' en Buenos Aires. Vicepresidente de Relaciones Externas de ACIERA.",
    area: { left: 54.8, top: 69.6, width: 16.4, height: 26.3 },
    areaMobile: { left: 47.0, top: 72.9, width: 22.7, height: 17.3 },
  },
  {
    id: "debora-pedace",
    nombre: "Lic. Débora Pedace",
    imagen: "/images/oradores/debora-pedace.png",
    resena:
      "Psicóloga clínica y conferencista, directora del Centro Terapéutico Integral (CTI) en Argentina. Especializada en psicología preventiva, gestión de emociones, ansiedad y salud mental. Autora de 'Yo me cuido' y 'Selfcare Workbook'. Conduce el podcast 'Yo Me Cuido' y colabora en medios como Radio Perfil y Radio La Red. Utiliza plataformas digitales para difundir herramientas prácticas de bienestar emocional con un enfoque pedagógico y accesible.",
    area: { left: 73.1, top: 69.6, width: 16.4, height: 26.3 },
    areaMobile: { left: 71.2, top: 72.9, width: 22.7, height: 18.9 },
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
          strokeWidth={1143}
          viewBox="0 0 18718 28729.7"
          scrollRange={[0.25, 0.6]}
          className="absolute -left-[40%] top-[58%] z-[1] h-[100%] pointer-events-none sm:top-[15%] md:top-[10%] sm:-left-[35%] md:-left-[26%]"
          svgClassName="h-[55%] w-auto opacity-90 sm:h-[100%] md:h-[120%]"
          preserveAspectRatio="xMinYMin meet"
        />
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          {/* Desktop puzzle */}
          <motion.div
            className="relative hidden w-full md:block"
            style={{ aspectRatio: "2189 / 1940", opacity, y }}
          >
            <Image
              src="/images/puzzle1.png"
              alt="Oradores del Congreso CCE 2026"
              width={2189}
              height={1940}
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
            style={{ aspectRatio: "1570 / 2482", opacity, y }}
          >
            <Image
              src="/images/puzzle-movil.png"
              alt="Oradores del Congreso CCE 2026"
              width={1570}
              height={2482}
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
