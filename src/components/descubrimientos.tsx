"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export function Descubrimientos() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="bg-negro-fondo py-20 md:py-32">
      <div ref={ref} className="mx-auto max-w-5xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="font-serif text-4xl text-dorado md:text-6xl">
            DESCUBRIMIENTOS
          </h2>
          <div
            className="mt-4 h-px w-24"
            style={{
              background: "linear-gradient(90deg, #E7BB70 0%, transparent 100%)",
            }}
          />
          <p className="mt-4 font-mono text-sm font-light text-gris-texto">
            LO QUE VAS A VIVIR EN ESTOS 4 DÍAS
          </p>
        </motion.div>

        <motion.div
          className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {descubrimientos.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={cardVariants}
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
          })}
        </motion.div>
      </div>
    </section>
  );
}
