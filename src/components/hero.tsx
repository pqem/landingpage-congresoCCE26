"use client";

import { motion } from "framer-motion";
import { TITLE_D, YEAR_D, DATE_D, TAGLINE_D } from "./hero-paths";

// 1: Titulo — ENTRADA EXPLOSIVA: viene de abajo con scale y spring
const titleAnim = {
  initial: { y: 120, opacity: 0, scale: 0.75 },
  animate: { y: 0, opacity: 1, scale: 1 },
  transition: {
    duration: 1,
    delay: 0.1,
    type: "spring" as const,
    stiffness: 80,
    damping: 12,
  },
};

// 2: Ano — SCALE PUNCH desde pequeno con rebote
const yearAnim = {
  initial: { y: 80, opacity: 0, scale: 0.5 },
  animate: { y: 0, opacity: 1, scale: 1 },
  transition: {
    duration: 0.9,
    delay: 0.4,
    type: "spring" as const,
    stiffness: 100,
    damping: 14,
  },
};

// 3: Fecha — SLIDE RAPIDO desde la derecha
const dateAnim = {
  initial: { x: 200, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: {
    duration: 0.6,
    delay: 0.7,
    type: "spring" as const,
    stiffness: 120,
    damping: 15,
  },
};

// 4: Lema — EXPAND IN desde scale grande, se contrae al tamano real
const taglineAnim = {
  initial: { scale: 1.5, opacity: 0, y: -30 },
  animate: { scale: 1, opacity: 1, y: 0 },
  transition: {
    duration: 0.7,
    delay: 1.0,
    type: "spring" as const,
    stiffness: 90,
    damping: 10,
  },
};

// Curva dorada decorativa del diseno Corel (coordenadas landscape originales)
const GOLDEN_CURVE_D =
  "M-4300.38 6021.33c5862.87,-2682.06 7942.95,-2561.9 8262.79,-2037.11 464.71,762.45 -3075.18,3341.58 -6537.99,7434.03 7626.8,-2329.01 11235.37,-4774.93 12305.66,-2218.89 1539.6,3676.86 -10353.84,9592.05 -15866.51,12241.84";

// Animacion de la curva — dibujo progresivo
const curveAnim = {
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 },
  transition: { duration: 2, delay: 0.2, ease: "easeInOut" as const },
};

// Offset para convertir coordenadas portrait -> landscape (original Corel)
const LANDSCAPE_OFFSET = "translate(4574.25,-4712.14)";

// Desktop landscape viewBox: 16:9 crop centrado en el area de texto
// x=-5000 incluye inicio de curva dorada, width=28000 cubre hasta MARZO 20 AL 23
const DESKTOP_VIEWBOX = "3000 2000 28000 15750";
const PORTRAIT_VIEWBOX = "0 0 21000 29700";

const ARIA_LABEL = "CONGRESO CCE ARG. 2026 - MARZO 20 AL 23 - EXPANSION SOBRENATURAL";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex h-[100svh] min-h-[500px] items-center justify-center"
    >
      {/* Mobile: portrait layout (sin cambios) */}
      <div className="relative z-10 w-full max-w-3xl px-6 lg:hidden">
        <svg
          viewBox={PORTRAIT_VIEWBOX}
          className="h-auto w-full"
          aria-label={ARIA_LABEL}
          role="img"
        >
          <motion.g {...titleAnim}>
            <path fill="#FEFEFE" fillRule="nonzero" d={TITLE_D} />
          </motion.g>
          <motion.g {...yearAnim}>
            <path fill="#F8F0DD" fillRule="nonzero" d={YEAR_D} />
          </motion.g>
          <motion.g {...dateAnim}>
            <path fill="#E7BB70" fillRule="nonzero" stroke="#E7BB70" strokeWidth="7.62" strokeMiterlimit="22.9256" d={DATE_D} />
          </motion.g>
          <motion.g {...taglineAnim}>
            <path fill="#E7BB70" fillRule="nonzero" stroke="#E7BB70" strokeWidth="7.62" strokeMiterlimit="22.9256" d={TAGLINE_D} />
          </motion.g>
        </svg>
      </div>

      {/* Desktop: landscape layout matching Corel design */}
      <div className="relative z-10 hidden h-full w-full lg:flex lg:items-center lg:justify-center">
        <svg
          viewBox={DESKTOP_VIEWBOX}
          className="h-[90%] w-auto max-w-full"
          preserveAspectRatio="xMidYMid meet"
          overflow="visible"
          aria-label={ARIA_LABEL}
          role="img"
        >
          {/* Curva dorada — ya en coordenadas landscape */}
          <motion.path
            d={GOLDEN_CURVE_D}
            fill="none"
            stroke="var(--color-dorado)"
            strokeWidth="1270"
            strokeMiterlimit="22.9256"
            strokeLinecap="round"
            {...curveAnim}
          />

          {/* Texto — translate convierte de portrait a landscape */}
          <g transform={LANDSCAPE_OFFSET}>
            <motion.g {...titleAnim}>
              <path fill="#FEFEFE" fillRule="nonzero" d={TITLE_D} />
            </motion.g>
            <motion.g {...yearAnim}>
              <path fill="#F8F0DD" fillRule="nonzero" d={YEAR_D} />
            </motion.g>
            <motion.g {...dateAnim}>
              <path fill="#E7BB70" fillRule="nonzero" stroke="#E7BB70" strokeWidth="7.62" strokeMiterlimit="22.9256" d={DATE_D} />
            </motion.g>
            <motion.g {...taglineAnim}>
              <path fill="#E7BB70" fillRule="nonzero" stroke="#E7BB70" strokeWidth="7.62" strokeMiterlimit="22.9256" d={TAGLINE_D} />
            </motion.g>
          </g>
        </svg>
      </div>
    </section>
  );
}
