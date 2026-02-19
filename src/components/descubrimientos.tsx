"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ScrollSVGPath from "./scroll-svg-path";
import {
  Flame,
  BookOpen,
  Users,
  Sparkles,
  Compass,
  Heart,
  type LucideIcon,
} from "lucide-react";

const descubrimientos: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: Flame,
    title: "Adoración Poderosa",
    description:
      "Noches de adoración intensa donde la presencia de Dios transforma cada corazón.",
  },
  {
    icon: BookOpen,
    title: "Palabra Revelada",
    description:
      "Enseñanza bíblica profunda que va a desafiar tu fe y expandir tu visión.",
  },
  {
    icon: Users,
    title: "Comunidad Genuina",
    description:
      "Conectá con creyentes de toda Argentina que comparten la misma pasión.",
  },
  {
    icon: Sparkles,
    title: "Milagros y Sanidades",
    description:
      "Espacios de ministración donde lo sobrenatural se manifiesta.",
  },
  {
    icon: Compass,
    title: "Dirección Profética",
    description:
      "Palabra profética para esta nueva temporada 2026-2030 de expansión.",
  },
  {
    icon: Heart,
    title: "Transformación Personal",
    description:
      "No vas a volver igual. Estos 4 días van a marcar un antes y un después.",
  },
];

function Card({
  item,
  index,
}: {
  item: (typeof descubrimientos)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  const Icon = item.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: -100, rotate: -3 }}
      animate={
        isInView ? { opacity: 1, x: 0, rotate: 0 } : { opacity: 0, x: -100, rotate: -3 }
      }
      transition={{
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 14,
        delay: index * 0.08,
      }}
      className="border border-gris-oscuro p-6 transition-colors hover:border-dorado/40"
    >
      <Icon size={28} className="text-dorado" />
      <h3 className="mt-4 font-serif text-xl text-foreground">
        {item.title}
      </h3>
      <p className="mt-3 font-mono text-sm font-light leading-relaxed text-gris-texto">
        {item.description}
      </p>
    </motion.div>
  );
}

export function Descubrimientos() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="overflow-x-clip bg-negro-fondo py-16 sm:py-20 md:py-32">
      <div ref={ref} className="mx-auto max-w-5xl px-4 lg:px-8">
        <motion.h2
          className="font-serif text-4xl text-dorado md:text-6xl"
          initial={{ opacity: 0, x: -100 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 80, damping: 14 }}
        >
          LA EXPERIENCIA
        </motion.h2>
        <motion.div
          className="gradient-line-dorado mt-4 h-px w-24"
          initial={{ scaleX: 0, originX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        />
        <motion.p
          className="mt-4 font-mono text-sm font-light text-gris-texto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          LO QUE VAS A VIVIR EN ESTOS 4 DÍAS
        </motion.p>

        <div className="relative mt-10">
          {/* Línea dorada scroll-driven — solo mobile */}
          <ScrollSVGPath
            d="M 100 0 C 170 80, 180 180, 120 280 S 30 380, 100 480 S 180 580, 120 680 S 30 780, 100 880 S 170 980, 130 1100 Q 140 1160, 130 1200"
            pathLength={2000}
            stroke="var(--color-dorado)"
            strokeWidth={3}
            viewBox="0 0 200 1200"
            scrollRange={[0.15, 0.75]}
            className="pointer-events-none absolute -right-2 top-0 z-0 h-full w-16 md:hidden"
            svgClassName="h-full w-full opacity-60"
            preserveAspectRatio="none"
          />
          <div className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {descubrimientos.map((item, index) => (
              <Card key={item.title} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
