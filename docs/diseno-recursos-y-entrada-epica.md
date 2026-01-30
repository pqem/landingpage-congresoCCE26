# Diseño, recursos gráficos y entrada épica

Documento de referencia para replicar el diseño del Congreso CCE ARG. 2026 en la landing page y definir la entrada épica "Expansión Sobrenatural".

---

## 1. Datos y recursos (ya guardados)

### Datos de contenido
Los textos, fechas, ponentes, colores y fuentes están en:

- **`data/congreso-data.ts`** – para uso en código (TypeScript/React)
- **`data/congreso-data.json`** – para uso genérico o CMS

Incluyen: título del congreso, fechas, tema, organizador, cita (Zacarías 4.6), web, hashtag, redes, lista de ponentes, paleta de colores y fuentes (Druk, Mango Grotesque, Montserrat, Gotham Pro).

### Recursos gráficos (imágenes)
- **Rutas en código:** `data/assets.ts` (LOGO, HERO, ORADORES, ORADORES_POR_PONENTE).
- **Archivos:** `public/images/` — `logo/` (logo CCE blanco y color), `hero/` (formas doradas, composición título), `oradores/` (fotos B&N de oradores, pares y versiones "only").
- **Inventario:** `public/images/README.md`.

---

## 2. Recursos gráficos (especificación) para el mismo diseño

Para que la landing se vea **igual de pro** que el material gráfico, conviene tener estos recursos:

### Imprescindibles

| Recurso | Formato ideal | Uso en la landing | Estado |
|--------|----------------|-------------------|--------|
| **Logo CCE** (blanco y color) | PNG (listo); SVG si se tiene | Header, favicon | ✅ En `public/images/logo/` |
| **Formas curvas doradas** | PNG (listo); SVG si se tiene | Hero, fondos, entrada épica | ✅ En `public/images/hero/formas-doradas.png` |
| **Texto "CENTRO CRISTIANO ESPERANZA"** | Fuente Montserrat / Gotham | Footer, créditos | Texto en código |

### Muy recomendables

| Recurso | Formato ideal | Uso |
|--------|----------------|-----|
| **Fotos de oradores** | PNG (recortadas, B&N, borde dorado) | Sección ponentes | ✅ En `public/images/oradores/` |
| **Fuentes exactas** | Archivos .woff2/.ttf para Druk, Mango Grotesque, Gotham Pro | Ver § Tipografía más abajo |
| **Códigos de color exactos** | HEX/RGB del dorado y del degradado | CSS/Tailwind para coincidir con el diseño |

### Opcionales

- Patrón de líneas curvas radiantes (si existe como asset) para fondos.
- Favicon: puede derivarse del logo CCE en SVG.

**Resumen:** Con **logo CCE en SVG** y **formas doradas en SVG** (o PNG de alta res.) se puede replicar el diseño de forma fiel y escalable.

### Tipografía (fuentes del diseño)

| Uso en el diseño | Fuente | Disponibilidad web |
|------------------|--------|--------------------|
| **Título principal** ("CONGRESO CCE ARG.") | **Druk XCond Super Trial** | Comercial; requiere archivos .woff2/.ttf (self-host con `@font-face`) |
| **Año** ("2026", pegado al título) | **Mango Grotesque Thin** | Comercial / Fontshare; self-host si tienes licencia |
| **Subtítulos** (EXPANSIÓN SOBRENATURAL, fechas, lema) | **Montserrat** | [Google Fonts](https://fonts.google.com/specimen/Montserrat) ✅ |
| **Nombres de oradores** (en las fotos) | **Gotham Pro** | Comercial (Hoefler&Co); self-host con archivos licenciados |

Para la landing: si tienes los archivos de **Druk XCond Super**, **Mango Grotesque Thin** y **Gotham Pro**, se añaden en `public/fonts/` y se cargan con `@font-face` en CSS. **Montserrat** se puede cargar desde Google Fonts o self-host. Si no tienes licencia de las comerciales, se usan fallbacks (ej. Bebas Neue/Oswald para título, system-ui para oradores).

### Uso en instancia privada (demo) y licencias para ONG/iglesia

- **Instancia privada / demo:** Podemos usar las fuentes que ya tienes (incluidas las versiones *Trial*) en un entorno **privado o interno** (por ejemplo staging, preview, o sitio en un subdominio restringido) **solo para mostrar el diseño** a la institución y decidir si comprar licencia. Muchas fuentes Trial permiten uso de prueba o evaluación; el uso público en producción suele requerir licencia.
- **ONG / iglesia (sin fines de lucro):** El congreso lo realiza una institución sin fines de lucro (iglesia). Eso **suele ayudar** con las fuentes:
  - Varios foundries ofrecen **licencias gratuitas o con descuento** para organizaciones sin fines de lucro, religiosas o educativas.
  - Conviene consultar las políticas de **no-profit / religious / educational** de cada fuente cuando decidan publicar el sitio:
    - **Druk** (Fontsmith / Commercial Type): consultar licencias para uso religioso / NPO.
    - **Gotham** (Hoefler&Co): suelen tener programas para instituciones.
    - **Mango Grotesque** (Fontshare u otro): revisar si aplica licencia gratuita o NPO.
  - **Montserrat** (Google Fonts) es de uso libre (SIL OFL); no hace falta comprar.

**Resumen:** Usar las fuentes en una instancia privada para mostrar el diseño está bien para evaluar. Para el sitio público final, revisar licencias y solicitar opciones para **organizaciones sin fines de lucro / iglesias** antes de comprar.

**Configuración técnica (demo):**
- Colocar archivos de fuentes en **`public/fonts/`** (nombres sugeridos en `public/fonts/README.md`).
- El proyecto carga **`/fonts/fonts.css`** (o se importan los `@font-face` desde el CSS global). Las variables `FUENTES` en `data/congreso-data.ts` usan los mismos `font-family` que en ese CSS.

---

## 3. Entrada épica – Temática "Expansión Sobrenatural"

Objetivo: una **primera pantalla (hero) impactante** que transmita “expansión” y “sobrenatural” sin sacrificar rendimiento ni claridad.

### Criterios de diseño

- **Corto:** 3–5 segundos; después el contenido debe estar estable.
- **Ligero:** prioridad a CSS y SVG; WebGL/partículas solo si se optimiza bien.
- **Coherente:** misma paleta (negro, blanco, dorado) y elementos del cartel (formas, logo).
- **Accesible:** respetar `prefers-reduced-motion` (reducir o desactivar animaciones).

---

## 4. Opciones de entrada épica (analizadas)

### Opción A: Revelación por expansión de luz (recomendada)

**Idea:** Pantalla negra → un punto o el logo CCE en el centro → una luz/onda dorada se expande desde el centro y revela título, lema y formas doradas.

**Por qué encaja:** Literalmente “expansión”; usa el dorado del diseño; sensación de revelación/sobrenatural.

**Técnica:** CSS (`clip-path`, `transform`, `opacity`) + SVG de las formas. Opcional: partículas muy ligeras (CSS o canvas simple).

**Complejidad:** Media. **Rendimiento:** Alto si se limita a CSS + SVG.

---

### Opción B: Forma dorada que “crece” y descubre el contenido

**Idea:** La gran forma curva dorada del cartel aparece desde un punto (p. ej. abajo-izquierda) y “crece” o se dibuja (stroke-dashoffset) mientras el texto surge con fade-in.

**Por qué encaja:** Reutiliza el elemento más reconocible del diseño y refuerza “expansión” de forma visual directa.

**Técnica:** Animación SVG (path con `stroke-dasharray` / `stroke-dashoffset`) + CSS para el texto.

**Complejidad:** Media. **Rendimiento:** Muy bueno.

---

### Opción C: Partículas/nebula dorada que se expande

**Idea:** Fondo negro con partículas doradas (o estrellas tenues) que se expanden desde el centro; al disiparse, aparece el título “CONGRESO CCE ARG. 2026” y “EXPANSIÓN SOBRENATURAL”.

**Por qué encaja:** Sensación cósmica/etérea; “expansión” como dispersión de energía.

**Técnica:** particles.js, Three.js o canvas 2D; mantener baja cantidad de partículas para móviles.

**Complejidad:** Alta. **Rendimiento:** Media; hay que optimizar para móvil.

---

### Opción D: Portal que se abre (máximo impacto visual)

**Idea:** Un “portal” o grieta de luz dorada se abre en el centro y revela el contenido; las formas del diseño pueden ser el borde del portal.

**Por qué encaja:** Muy “sobrenatural” y memorable.

**Técnica:** `clip-path` o máscaras SVG animadas; opcional video corto de fondo o WebGL.

**Complejidad:** Alta. **Rendimiento:** Depende de la implementación (CSS/SVG = bien; WebGL = revisar en móvil).

---

### Opción E: Entrada tipográfica (mínima y elegante)

**Idea:** Pantalla negra; el título aparece con un efecto sutil (por ejemplo “escritura” con clip o glow que recorre las letras); luego el lema y las formas con fade-in.

**Por qué encaja:** Pro y sobrio; “expansión” sugerida por la aparición progresiva del mensaje.

**Técnica:** Solo CSS (+ quizá un poco de JS para la secuencia).

**Complejidad:** Baja. **Rendimiento:** Muy alto.

---

## 5. Recomendación

- **Para equilibrio impacto / esfuerzo / rendimiento:** **Opción A (Revelación por expansión de luz)** o **Opción B (Forma dorada que crece)**.
- **Para máximo impacto** y si puedes invertir en optimización: **Opción C (Partículas)** o **Opción D (Portal)**.
- **Si priorizas simplicidad y velocidad:** **Opción E (Entrada tipográfica)**.

Se puede combinar, por ejemplo: **A + B** (luz que se expande y, a la vez, la forma dorada se dibuja), manteniendo la duración total en 3–5 segundos.

---

## 6. Especificación técnica – Estética color-trends-2026 (Big Bang + partículas)

Referencia: [pqem/color-trends-2026](https://github.com/pqem/color-trends-2026). Se adapta la estética de **HeroImmersive** y **ClaudeReveal** al congreso (negro/dorado, expansión sobrenatural, con gusto y sutileza).

### 6.1 Fondo degradado (HeroImmersive)

- **Técnica:** `radial-gradient` animado con Framer Motion (`animate.background`).
- **Estructura del gradiente:**  
  `radial-gradient(circle at X% Y%, color1 0%, color2 40%, #000 100%)`
- **Animación:** El centro del gradiente se mueve en loop (ej. 50% 50% → 65% 35% → 35% 65% → 50% 50%) con `duration: 8`, `ease: 'easeInOut'`, `repeat: Infinity`.
- **Adaptación congreso:** Un solo color “activo” dorado en lugar de rotar entre varios. Para el **Big Bang**, la secuencia inicial puede ser: empezar con un círculo muy pequeño en el centro (ej. 0% de radio visible) y animar a un radial-gradient que “explota” hasta cubrir la pantalla (primeros 2–3 s), luego mantener un loop sutil de movimiento del centro (como en color-trends) para que no sea estático.

### 6.2 Partículas (HeroImmersive + ClaudeReveal)

- **Implementación:** `motion.div` (Framer Motion), no canvas/WebGL, para mantener coherencia con el repo y buen rendimiento con pocas partículas.
- **Cantidad:** 12–20 partículas en hero (como HeroImmersive); en móvil reducir a 8–10.
- **Estilo:** `absolute`, `w-1 h-1` o `w-2 h-2`, `rounded-full`, color dorado/blanco con opacidad (ej. `#D4AF3780` o `rgba(255,255,255,0.6)`).
- **Posición:** Distribución en % (ej. `left: (i * 8) % 100`, `top: (i * 12) % 100`) o ligeramente aleatoria para no verse en rejilla.
- **Animación por partícula:**  
  `y: [0, -30, 0]` (o -40 para más amplitud),  
  `opacity: [0.2, 0.6, 0.2]` (o [0.15, 0.5, 0.15] más sutil),  
  `scale: [1, 1.5, 1]`.  
  `duration: 4 + (i % 3)`, `delay: i * 0.2`, `repeat: Infinity`.
- **Big Bang:** En la entrada, las partículas pueden empezar agrupadas cerca del centro (scale 0, opacity 0) y animar a sus posiciones finales con `transition.duration` ~1.5–2 s, luego pasar al loop infinito anterior. Así se siente “explosión que se expande” y después “flotar sutil”.

### 6.3 Secuencia de entrada épica (Big Bang + revelación)

1. **0–0.5 s:** Pantalla negra (o con logo CCE muy tenue en el centro).
2. **0.5–2.5 s:** “Explosión”: el radial-gradient dorado crece desde el centro (de tamaño 0 a cubrir la vista); al mismo tiempo las partículas “salen” del centro hacia sus posiciones y empiezan el loop suave.
3. **2–3.5 s:** El título “CONGRESO CCE ARG. 2026” y el lema “EXPANSIÓN SOBRENATURAL” hacen fade-in + ligero scale (estilo HeroImmersive: `initial opacity:0, y:100, scale:0.8` → `animate opacity:1, y:0, scale:1`, `duration: 1.2`, `ease: [0.16, 1, 0.3, 1]`).
4. **3.5 s en adelante:** Contenido estable; el fondo sigue con el movimiento sutil del centro del gradiente (opcional) y las partículas en su loop. Si hay forma dorada SVG, puede hacer fade-in o stroke-dashoffset en paralelo al texto.

### 6.4 Stack sugerido para esta estética

- **Animaciones:** Framer Motion (como en color-trends-2026) para gradiente animado, partículas y secuencia del hero.
- **Estilos:** Tailwind para layout y colores (negro, dorado, blancos con opacidad).
- **Accesibilidad:** Respetar `prefers-reduced-motion`: desactivar o simplificar animaciones (solo fade-in del texto, sin partículas ni movimiento de gradiente).

### 6.5 Resumen de archivos de referencia

| Archivo en color-trends-2026 | Uso en congreso |
|------------------------------|------------------|
| `HeroImmersive.tsx` (gradiente radial animado, 12 partículas, contenido central) | Base del hero: mismo patrón con paleta negro/dorado y secuencia Big Bang. |
| `ClaudeReveal.tsx` (gradiente estático + 30 partículas, typewriter) | Referencia de partículas en zona con gradiente; no hace falta typewriter. |
| `utils/animations.ts` (fadeInUp, pulseInfinite, etc.) | Reutilizar variantes para título, lema y CTA. |
| `index.css` (keyframes float, pulse-glow, gradient-shift, prefers-reduced-motion) | Reutilizar lógica de reduced-motion y, si se quiere, keyframes auxiliares. |

---

## 7. Próximos pasos

1. Recursos: logo CCE y formas doradas en **SVG**; fotos oradores en **PNG**.
2. Montar proyecto (Next.js + Tailwind + Framer Motion) e implementar hero con la secuencia Big Bang + partículas + degradado según §6.
3. Añadir forma dorada SVG (cuando esté) y resto de secciones (ponentes, cita, footer).
