'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { CONGRESO } from '@/data/congreso-data'

const PARTICLE_COUNT = 16

function Particles({ reduced }: { reduced: boolean }) {
  if (reduced) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${(i * 7 + 10) % 90}%`,
            top: `${(i * 11 + 5) % 90}%`,
            backgroundColor: i % 3 === 0 ? '#D4AF37' : '#FFFFFF',
          }}
          initial={{
            scale: 0,
            opacity: 0,
            x: '50vw',
            y: '50vh',
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.6, 0.2],
            x: 0,
            y: [0, -30, 0],
          }}
          transition={{
            duration: 4 + (i % 3),
            delay: 0.5 + i * 0.1,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

function AnimatedGradient({ reduced }: { reduced: boolean }) {
  if (reduced) {
    return (
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, #332B1A 0%, #1a1a0a 40%, #000 100%)',
        }}
      />
    )
  }

  return (
    <motion.div
      className="absolute inset-0"
      initial={{
        background: 'radial-gradient(circle at 50% 50%, #D4AF37 0%, #000 0%, #000 100%)',
      }}
      animate={{
        background: [
          'radial-gradient(circle at 50% 50%, #D4AF3730 0%, #332B1A 40%, #000 100%)',
          'radial-gradient(circle at 60% 40%, #D4AF3720 0%, #332B1A 40%, #000 100%)',
          'radial-gradient(circle at 40% 60%, #D4AF3720 0%, #332B1A 40%, #000 100%)',
          'radial-gradient(circle at 50% 50%, #D4AF3730 0%, #332B1A 40%, #000 100%)',
        ],
      }}
      transition={{
        duration: 8,
        delay: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

export default function HeroEpic() {
  const prefersReducedMotion = useReducedMotion()
  const reduced = prefersReducedMotion ?? false

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: reduced ? 0 : 1.5,
      },
    },
  }

  const titleVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: reduced ? 0.3 : 1.2,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  const subtitleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduced ? 0.3 : 0.8,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fondo animado */}
      <AnimatedGradient reduced={reduced} />

      {/* Partículas */}
      <Particles reduced={reduced} />

      {/* Contenido */}
      <motion.div
        className="relative z-10 text-center px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Título principal */}
        <motion.h1
          className="font-[family-name:var(--font-druk)] text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-white tracking-tight leading-none"
          variants={titleVariants}
        >
          {CONGRESO.tituloPrincipal}
          <br />
          <span className="text-gradient-gold">{CONGRESO.tituloSecundario}</span>
        </motion.h1>

        {/* Año */}
        <motion.p
          className="font-[family-name:var(--font-mango)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white/90 mt-2"
          variants={subtitleVariants}
        >
          {CONGRESO.año}
        </motion.p>

        {/* Tema */}
        <motion.p
          className="font-[family-name:var(--font-montserrat)] text-lg sm:text-xl md:text-2xl text-[var(--color-dorado)] mt-8 tracking-[0.2em] sm:tracking-[0.3em] uppercase font-semibold"
          variants={subtitleVariants}
        >
          {CONGRESO.tema}
        </motion.p>

        {/* Fechas */}
        <motion.p
          className="font-[family-name:var(--font-montserrat)] text-base sm:text-lg md:text-xl text-white/80 mt-4"
          variants={subtitleVariants}
        >
          {CONGRESO.fechas}
        </motion.p>
      </motion.div>

      {/* Forma dorada decorativa */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-32 pointer-events-none"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 0.3, y: 0 }}
        transition={{ delay: reduced ? 0 : 2.5, duration: 1 }}
      >
        <div
          className="w-full h-full"
          style={{
            background: 'linear-gradient(to top, #D4AF3720 0%, transparent 100%)',
          }}
        />
      </motion.div>
    </section>
  )
}
