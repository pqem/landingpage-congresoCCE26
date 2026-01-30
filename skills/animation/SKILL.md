---
name: animation
description: Guía de animaciones con Framer Motion para el Congreso CCE 2026. Entrada épica, transiciones y micro-interacciones.
scope: root
metadata.auto_invoke: ["animación", "motion", "framer", "transición", "entrada épica", "efecto"]
allowed_tools: [read, write]
---

# Animaciones - Congreso CCE 2026

## Framer Motion Setup

```tsx
import { motion } from 'framer-motion'

// Componente animado básico
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Contenido
</motion.div>
```

## Entrada Épica (Opciones)

### A) Revelación por expansión de luz (Recomendada)
```tsx
const variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 1.5, ease: "easeOut" }
  }
}
```

### B) Forma dorada que crece
```tsx
// SVG stroke-dashoffset animation
const pathVariants = {
  hidden: { pathLength: 0 },
  visible: {
    pathLength: 1,
    transition: { duration: 2, ease: "easeInOut" }
  }
}
```

## Transiciones de Sección

```tsx
// Fade in al hacer scroll
const sectionVariants = {
  offscreen: { opacity: 0, y: 50 },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
}

<motion.section
  initial="offscreen"
  whileInView="onscreen"
  viewport={{ once: true, amount: 0.3 }}
  variants={sectionVariants}
>
```

## Stagger para Listas

```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
}
```

## Hover Effects

```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 400 }}
>
```

## Accesibilidad

```tsx
// Respetar preferencias del usuario
const prefersReducedMotion =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const animationProps = prefersReducedMotion
  ? {}
  : { initial, animate, transition }
```

## Principios

1. **Duración**: 0.3s - 0.8s para transiciones, 1.5s - 3s para entrada épica
2. **Easing**: `easeOut` para entradas, `easeInOut` para loops
3. **Performance**: Animar `opacity` y `transform`, evitar `width/height`
4. **Propósito**: Cada animación debe guiar la atención o dar feedback
