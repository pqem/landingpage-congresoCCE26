# Imágenes del Congreso CCE ARG. 2026

Recursos gráficos para la landing. Rutas usadas en código: ver `data/assets.ts`.

## Estructura

| Carpeta | Contenido |
|---------|-----------|
| **logo/** | Logo CCE: blanco (fondos oscuros), color/dorado. PNG ya incluidos; **SVG:** `logo-cce-blanco.svg`, `logo-cce-color.svg` |
| **hero/** | Formas doradas decorativas, composición de título. PNG ya incluidos; **SVG:** `formas-doradas.svg` |
| **oradores/** | Fotos B&N de oradores: pares con nombre en imagen y versiones "only" (solo foto, borde dorado) |

## Dónde guardar los SVG

- **Logo CCE:** `public/images/logo/`  
  - `logo-cce-blanco.svg`  
  - `logo-cce-color.svg`
- **Formas doradas:** `public/images/hero/`  
  - `formas-doradas.svg`

## Uso en la landing

- **Logo:** header (blanco sobre negro), favicon si se deriva del logo.
- **Formas doradas:** hero, fondo o transiciones (entrada épica).
- **Composición título:** referencia de maquetación; el título se suele maquetar con texto (fuentes Druk, Mango Grotesque, Montserrat).
- **Oradores:** sección ponentes; usar versiones "only" para tarjetas o grid, "juntos"/"cuadro" para bloques composición.

Fuentes de los nombres en fotos: **Gotham Pro** (ver `data/congreso-data.ts` → FUENTES).
