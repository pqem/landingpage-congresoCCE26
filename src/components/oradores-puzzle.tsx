"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";

const oradores = [
  {
    id: "cattaneo",
    nombre: "Aps. Daniel y Patricia Cattaneo",
    imagen: "/images/oradores/cattaneo.png",
    pareja: true,
    resena:
      "Pastor principal y apóstol de la Iglesia Redentor (Comunidad Redentor), fundada en 1945 en San Lorenzo, Santa Fe. Lidera una red de 16 templos en la provincia de Santa Fe. Reconocido por su creatividad e innovación ministerial, incluyendo iniciativas como la protesta 'culto-bar' durante la pandemia 2020. Ministerio integral: espiritual, emocional y físico.",
    area: { left: 22, top: 8, width: 30, height: 37 },
  },
  {
    id: "ale-maria",
    nombre: "Prs. Ale y María Chamorro",
    imagen: "/images/oradores/ale-maria.png",
    pareja: true,
    resena:
      "Pastores del Centro Cristiano Esperanza en Plottier, Neuquén. Sirven en el ministerio pastoral de la iglesia madre del CCE, liderando la congregación local con pasión y entrega.",
    area: { left: 58, top: 5, width: 27, height: 38 },
  },
  {
    id: "daniel-rosita",
    nombre: "Aps. Daniel y Rosita Chamorro",
    imagen: "/images/oradores/daniel-rosita.png",
    pareja: true,
    resena:
      "Fundadores del Centro Cristiano Esperanza en 1982, Plottier. Red apostólica con presencia en Argentina, España, Italia, EE.UU., India y África. Más de 40 años de ministerio pastoral. Obras pioneras: FM Esperanza (primera radio cristiana FM del país, 1988), instituciones educativas, centros de salud. Conferencistas internacionales.",
    area: { left: 18, top: 42, width: 32, height: 35 },
  },
  {
    id: "belart",
    nombre: "Pr. Sergio Belart",
    imagen: "/images/oradores/belart.png",
    pareja: false,
    resena:
      "Pastor de la Iglesia Cristiana 'Cita con la Vida' en Córdoba. Abogado (UNC). Director del Congreso Internacional de Jóvenes (Semana Santa, Córdoba, desde 1994). Lidera 'Jóvenes con Propósito' (5.000+ jóvenes). Conferencista internacional en más de 20 países. Autor de 'El Pastor de Jóvenes' y 'Generación de Relevo'.",
    area: { left: 48, top: 55, width: 22, height: 38 },
  },
  {
    id: "rodriguez",
    nombre: "Pr. Alejandro Rodríguez",
    imagen: "/images/oradores/rodriguez.png",
    pareja: false,
    resena:
      "Misionero y presidente de JUCUM Argentina (Juventud Con Una Misión), organización presente en 172 países. Junto a su esposa Martha refundó la obra de JUCUM Argentina en 1989. Ha formado y enviado cientos de misioneros transculturales. Conferencista en los 5 continentes. JUCUM Argentina cuenta con más de 700 obreros y múltiples bases.",
    area: { left: 74, top: 58, width: 20, height: 35 },
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
      <div className="animate-fade-in-up w-full max-w-lg border border-dorado/30 bg-negro-suave p-6 md:p-8">
        <div className={`relative mx-auto w-full max-w-sm overflow-hidden border-2 border-dorado/40 ${
          orador.pareja ? "aspect-[4/3]" : "aspect-[3/4]"
        }`}>
          <Image
            src={orador.imagen}
            alt={orador.nombre}
            fill
            className="object-cover object-center"
          />
        </div>

        <h3 className="mt-6 font-serif text-2xl text-dorado md:text-3xl">
          {orador.nombre}
        </h3>

        <div
          className="mt-3 h-px w-16"
          style={{
            background: "linear-gradient(90deg, #E7BB70 0%, transparent 100%)",
          }}
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

  return (
    <>
      <section id="oradores" className="relative py-20 md:py-32">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          {/* Puzzle image with clickable overlays */}
          <div className="relative w-full">
            <Image
              src="/images/puzzle-oradores.png"
              alt="Oradores del Congreso CCE 2026"
              width={1200}
              height={900}
              className="h-auto w-full"
            />

            {/* Invisible clickable areas over each speaker */}
            {oradores.map((orador) => (
              <button
                key={orador.id}
                onClick={() => setSelectedOrador(orador)}
                className="absolute cursor-pointer"
                style={{
                  left: `${orador.area.left}%`,
                  top: `${orador.area.top}%`,
                  width: `${orador.area.width}%`,
                  height: `${orador.area.height}%`,
                }}
                aria-label={`Ver reseña de ${orador.nombre}`}
              />
            ))}
          </div>

          <p className="mt-6 text-center font-mono text-xs font-light text-gris-texto/60">
            Hacé clic en cada orador para conocer más
          </p>
        </div>
      </section>

      {selectedOrador && (
        <OradorModal orador={selectedOrador} onClose={handleClose} />
      )}
    </>
  );
}
