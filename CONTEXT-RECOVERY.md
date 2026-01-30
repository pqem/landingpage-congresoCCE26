# Context Recovery - Estado Actual

**Última actualización:** 2026-01-30 21:30 UTC

## 🎯 Proyecto Activo

**Nombre:** landingpage-congresoCCE26
**Ubicación:** /home/pablo/landingpage_congresoCCE26
**Descripción:** Landing page para el Congreso CCE Argentina 2026 - Expansión Sobrenatural

## 📦 Estado del Repositorio

**Branch:** main
**Remote:** https://github.com/pqem/landingpage-congresoCCE26
**Working tree:** con cambios pendientes (entrada épica)

## ✅ Última Tarea Completada

**Entrada épica animada (Big Bang + partículas)**

- Componente `HeroEpic.tsx` con Framer Motion
- 16 partículas doradas/blancas animadas
- Gradiente radial animado (expansión desde centro)
- Secuencia de revelación: fondo → partículas → título → subtítulos
- Soporte `prefers-reduced-motion` (accesibilidad)
- 7 skills sincronizadas (+ context-recovery)

## 🔜 Próximo Paso

Opciones pendientes:
1. Agregar imágenes de ponentes con componentes
2. Crear footer con redes sociales
3. Forma dorada SVG decorativa

## 📝 Decisiones Recientes

**2026-01-30:**
- Entrada épica: Opción A+C (gradiente expandible + partículas)
- Timing: 1.5s delay para contenido, partículas desde 0.5s
- Partículas: 16 en desktop (reducir en móvil si hay lag)
- Reducción de animaciones respetada con `useReducedMotion`

## 🐛 Issues Conocidos

- Warning: @next/swc version mismatch (no afecta build)

## 💡 Notas

- Componente hero en `src/components/HeroEpic.tsx`
- Datos del congreso en `data/congreso-data.ts`
- Especificación de diseño en `docs/diseno-recursos-y-entrada-epica.md`

---

*Si perdés contexto, leé este archivo primero.*
