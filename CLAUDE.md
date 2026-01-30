# landingpage_congresoCCE26

Landing page para el Congreso CCE Argentina 2026 - Expansión Sobrenatural

## Estructura del Proyecto
single

## Stack Tecnológico
- Next.js 15.1 (App Router, TypeScript)
- Tailwind CSS 4
- Framer Motion 11

## Convenciones

### Commits
Formato: `tipo(scope): descripción`
- `feat`: nueva funcionalidad
- `fix`: corrección de bug
- `docs`: documentación
- `refactor`: refactorización

### Archivos
- Nombres en kebab-case para archivos
- PascalCase para componentes

## Skills Reference
<!-- SKILL-SYNC:START -->
## Skills Reference
- [animation](skills/animation/SKILL.md) - Guía de animaciones con Framer Motion para el Congreso CCE 2026. Entrada épica, transiciones y micro-interacciones. (tools: read, write) (scope: root)
- [commits](skills/commits/SKILL.md) - Formato de commits convencionales. Usa cuando hagas commits o prepares cambios para commit. (tools: bash) (scope: root)
- [context-recovery](skills/context-recovery/SKILL.md) - Recuperación de contexto después de compactación de memoria del LLM. Lee CONTEXT-RECOVERY.md. (tools: read, write) (scope: root)
- [deployment](skills/deployment/SKILL.md) - Guía de deployment para Vercel/Netlify. Build, preview y producción. (tools: bash, read) (scope: root)
- [design](skills/design/SKILL.md) - Guía de diseño visual del Congreso CCE 2026. Colores, tipografía, espaciado y componentes. (tools: read, write) (scope: root)
- [docs](skills/docs/SKILL.md) - Crear y mantener documentación. Usa cuando escribas README, docs, o comentarios. (tools: read, write) (scope: root)
- [pr](skills/pr/SKILL.md) - Crear Pull Requests con formato consistente. Usa cuando prepares un PR. (tools: bash, read) (scope: root)

## Auto-invoke Skills
| Acción | Skill |
|--------|-------|
| animación | `animation` |
| colores | `design` |
| commits | `commits` |
| compactación | `context-recovery` |
| componentes | `design` |
| contexto perdido | `context-recovery` |
| deploy | `deployment` |
| diseño | `design` |
| docs | `docs` |
| documentación | `docs` |
| efecto | `animation` |
| entrada épica | `animation` |
| framer | `animation` |
| gh pr create | `pr` |
| git commit | `commits` |
| hosting | `deployment` |
| layout | `design` |
| mensaje de commit | `commits` |
| motion | `animation` |
| netlify | `deployment` |
| perdió memoria | `context-recovery` |
| PR | `pr` |
| producción | `deployment` |
| publicar | `deployment` |
| pull request | `pr` |
| qué estábamos haciendo | `context-recovery` |
| README | `docs` |
| summary unavailable | `context-recovery` |
| tipografía | `design` |
| transición | `animation` |
| UI | `design` |
| vercel | `deployment` |
<!-- SKILL-SYNC:END -->


## Contexto para el Agente

Nivel del usuario: 🌿 Intermedio

El usuario conoce lo básico. Puedes ser más directo pero explica decisiones arquitectónicas.

## Session Update

**Date:** 2026-01-30 (Update 3)
**Goal:** Crear un flujo para extraer especificaciones de diseno desde imagenes y generar tokens reutilizables.
**Completed:** 
- ✅ Nueva skill `design-extraction` creada
- ✅ Tokens base en `data/design-tokens.json` (colores, fuentes, estilos)
- ✅ Specs iniciales para hero y oradores en JSON
- ✅ Componente `HeroExact.tsx` implementado con posiciones exactas
- ✅ Hero integrado en `page.tsx` reemplazando el anterior
- ✅ **Cambio importante:** Reemplazados todos los textos del hero por la imagen `composicion-titulo.png` para fidelidad 100% al diseño gráfico
- ✅ Build exitoso sin errores
**Status:** Hero implementado usando la imagen de composición exacta del diseñador. Mantiene el SVG dorado, logo CCE, texto de organización y línea decorativa. El título principal ahora es una imagen PNG con transparencia para máxima fidelidad tipográfica.
**Next:** 
- Ajustar tamaño y posición de la imagen de composición si es necesario
- Implementar sección de Oradores (`SpeakersSection`) basada en `data/design-spec-speakers.json`
- Agregar responsive design para móvil
**Decisions:** 
- Usar imagen PNG con transparencia para el título en lugar de texto renderizado (fidelidad 100% al diseño)
- Mantener elementos interactivos (logo, organización) como SVG/texto
- Usar porcentajes relativos al artboard para posicionamiento
