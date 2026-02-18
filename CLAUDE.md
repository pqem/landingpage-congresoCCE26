# CLAUDE.md - Instrucciones del Proyecto

## Proyecto
Landing page + panel admin para el Congreso CCE Argentina 2026.
- **Frontend:** Next.js 15 en Vercel
- **Backend:** Cloudflare Worker (`congreso-cce-api.pqemprende.workers.dev`)
- **Repo:** https://github.com/pqem/landingpage-congresoCCE26

## Regla de oro: decime antes de hacer

Antes de resolver cualquier problema técnico, PRIMERO decirle a Pablo:
1. **Qué está mal** — en lenguaje simple
2. **Cuál es la solución correcta** — aunque implique algo manual
3. **Cuál es el workaround rápido** — si existe
4. **Qué recomiendo** — y por qué

### Nunca hacer esto sin consultar:
- Hackear un archivo (SVG, config, etc.) cuando se puede regenerar limpio
- Agregar dependencias pesadas (+50KB) sin decir el peso y alternativas
- Crear archivos de +200 líneas sin proponer separarlo en componentes
- Acumular 3+ intentos del mismo fix — al segundo intento fallido, PARAR y explicar el problema real
- Commitear secrets o datos sensibles

### Prioridad de soluciones:
1. **Hacer bien desde el origen** (re-exportar, regenerar, pedir el asset correcto)
2. **Solución limpia en código** (refactor, componente nuevo, patrón correcto)
3. **Workaround documentado** (solo si 1 y 2 no son viables, con comentario explicando por qué)

## Calidad de código
- Componentes de máximo 150-200 líneas. Si pasa, proponer separar
- Antes de agregar una dependencia, decir: nombre, peso, alternativas
- Si un archivo necesita un hack o workaround, SIEMPRE dejar un comentario explicando por qué
- El código debe ser entendible por alguien que no participó del desarrollo

## Commits
Formato: `tipo(scope): descripción`
- `feat`: nueva funcionalidad
- `fix`: corrección de bug
- `docs`: documentación
- `refactor`: refactorización
- `chore`: mantenimiento, deps, config

Primera línea < 72 caracteres. Verbo en infinitivo. Sin punto final.

## Sobre Pablo
- Está aprendiendo, explicar conceptos de forma sencilla
- Prefiere explicaciones cortas y claras
- Le importa ahorrar tokens y dinero
- Investigar antes de implementar, no trial and error
