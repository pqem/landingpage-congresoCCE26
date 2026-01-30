'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'

export default function HeroExact() {
  const prefersReducedMotion = useReducedMotion()
  const reduced = prefersReducedMotion ?? false

  // Variantes de animación
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: reduced ? 0.3 : 0.8,
        delay: reduced ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (delay: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: reduced ? 0.3 : 1.2,
        delay: reduced ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  }

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-black">
      {/* Fondo gradiente */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #000000 0%, #0A0A0A 60%, #332B1A 100%)',
        }}
      />

      {/* SVG Dorado - Forma curva */}
      <motion.div
        className="absolute"
        style={{
          left: '-16%',
          top: '6%',
          width: '74%',
          height: '92%',
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reduced ? 0.3 : 1.5, delay: reduced ? 0 : 0.3 }}
      >
        <Image
          src="/images/hero/formas-doradas.svg"
          alt="Forma decorativa dorada"
          fill
          className="object-contain"
          style={{ filter: 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.3))' }}
          priority
        />
      </motion.div>

      {/* Logo CCE */}
      <motion.div
        className="absolute"
        style={{
          right: '4.4%',
          top: '12.4%',
          width: '5.4%',
          height: '7.4%',
        }}
        custom={0.5}
        variants={scaleIn}
        initial="hidden"
        animate="visible"
      >
        <Image
          src="/images/logo/logo-cce-color.svg"
          alt="Logo CCE"
          fill
          className="object-contain"
          priority
        />
      </motion.div>

      {/* Composición de título - imagen con todo el texto */}
      <motion.div
        className="absolute"
        style={{
          left: '12%',
          top: '18%',
          width: '76%',
          height: '56%',
        }}
        custom={0.6}
        variants={scaleIn}
        initial="hidden"
        animate="visible"
      >
        <Image
          src="/images/hero/composicion-titulo.png"
          alt="Congreso CCE ARG. 2026 - Expansión Sobrenatural"
          fill
          className="object-contain"
          priority
        />
      </motion.div>

      {/* Organizador CENTRO CRISTIANO ESPERANZA */}
      <motion.div
        className="absolute font-[family-name:var(--font-montserrat)] font-semibold text-white uppercase"
        style={{
          left: '4%',
          top: '83%',
          fontSize: 'clamp(0.75rem, 2.4vh, 1.5rem)',
          letterSpacing: '0.08em',
          lineHeight: '1.1',
        }}
        custom={1.4}
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        <div>CENTRO</div>
        <div>CRISTIANO</div>
        <div>ESPERANZA</div>
      </motion.div>

      {/* Línea decorativa dorada */}
      <motion.div
        className="absolute bg-[#D4AF37]"
        style={{
          right: '6.5%',
          bottom: '9.1%',
          width: '3%',
          height: '2px',
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: reduced ? 0.3 : 0.6, delay: reduced ? 0 : 1.6 }}
      />
    </section>
  )
}
