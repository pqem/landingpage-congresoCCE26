# Lo que estábamos haciendo - Congreso CCE 2026

## Proyecto
Landing page + panel admin para el Congreso CCE Argentina 2026.
- **Repo:** https://github.com/pqem/landingpage-congresoCCE26
- **Local:** `/home/pablo/landingpage-congresoCCE26`
- **Backend (Cloudflare Worker):** `/home/pablo/congreso-cce-worker/`
- **Deploy frontend:** Vercel
- **Deploy backend:** `https://congreso-cce-api.pqemprende.workers.dev`

## Estado actual
El panel admin (`/admin/login` y `/admin`) ya está implementado, funcionando y pusheado. Tiene la estética dorada de la landing, gráficos con recharts, mobile first. **Pero hay deuda técnica que necesita limpieza.**

## Mejoras pendientes (en orden)

### 1. Re-exportar el logo SVG desde CorelDRAW
**Problema:** El SVG original se exportó con canvas A4 (210mm x 297mm). Tuve que hackear el viewBox a mano para que se vea bien. Es un workaround feo.
**Solución:** Re-exportar desde CorelDRAW:
1. Abrir el archivo original del escudo en CorelDRAW
2. Seleccionar solo el escudo
3. Archivo → Exportar → SVG
4. Marcar "Solo selección" / desmarcar "Mantener tamaño de página"
5. Reemplazar `/public/Logo_cce_color_svg.svg` con el nuevo archivo

### 2. Separar `admin/page.tsx` en componentes
**Problema:** El archivo tiene 400+ líneas, todo junto. Difícil de mantener.
**Solución:** Separar en:
- `src/components/admin/AdminHeader.tsx` (~50 líneas) - Header con logo, email, logout
- `src/components/admin/StatCards.tsx` (~60 líneas) - Las 4 tarjetas de estadísticas
- `src/components/admin/Charts.tsx` (~120 líneas) - Gráficos de recharts (dona, área, barras)
- `src/components/admin/InscriptosTable.tsx` (~100 líneas) - Tabla desktop + cards mobile
- `src/app/admin/page.tsx` queda como orquestador (~100 líneas) - Solo state y composición

### 3. Evaluar si recharts es necesario
**Problema:** Recharts agrega ~130KB al bundle del admin.
**Alternativas:**
- Barras con divs de Tailwind (0KB extra)
- `lightweight-charts` (~40KB)
- Mantener recharts si los gráficos lo justifican
**Decisión pendiente.**

### 4. Verificar que `.env.local` NO esté commiteado
**Problema:** Tiene secrets de Google OAuth, NextAuth y API key del Worker.
**Acción:** Verificar que `.env.local` esté en `.gitignore`. Si se commiteo, hay que rotar los secrets.

### 5. Crear `ARCHITECTURE.md`
**Para que:** Cualquier persona que abra el repo entienda:
- Estructura del proyecto (Next.js frontend + Cloudflare Worker backend)
- Flujo de autenticación (NextAuth → Google OAuth → verificación contra Worker)
- Cómo funcionan las API proxies del admin
- Variables de entorno necesarias
- Cómo deployar (Vercel + Cloudflare)

## Decisión tomada: nueva regla en CLAUDE.md
Se agregó la sección "REGLA DE ORO: DECIME ANTES DE HACER" al CLAUDE.md para que en futuros proyectos Claude avise antes de aplicar workarounds, proponga la solución correcta, y consulte antes de agregar dependencias pesadas o crear archivos grandes.

## Cómo continuar
Retomar esta sesión con `claude --resume` y seguir con la mejora #1 (logo SVG). Después ir una por una en orden.
