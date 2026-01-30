# Design Specs - Congreso CCE 2026

## Referencias
- `data/reference/b.jpg` (3404x2219 px)
- `data/reference/d.jpg` (3408x2221 px)

## Archivos de salida
- Tokens base: `data/design-tokens.json`
- Layout hero: `data/design-spec-hero.json`
- Layout oradores: `data/design-spec-speakers.json`

## Convenciones
- `framePct` usa porcentajes respecto al artboard.
- `sizePctH` es porcentaje de la altura del artboard.
- `precision: "approx"` indica valores iniciales que deben refinarse.

## Hero (b.jpg)
- Fondo negro con gradiente a marron oscuro en la base.
- Trazo dorado curvo de gran escala (usar `public/images/hero/formas-doradas.svg`).
- Titulo principal con Druk XCond Super, alto y comprimido.
- Fecha en dorado y anio 2026 en Mango Grotesque delgado.
- Logo CCE en oro arriba a la derecha.
- Microtexto "Centro Cristiano Esperanza" abajo a la izquierda.

## Oradores (d.jpg)
- Mantiene fondo y trazo dorado del hero.
- Titulo compacto en la esquina superior izquierda.
- Grilla de 4 tarjetas con borde dorado y fotos en B/N.
- Etiquetas de oradores en blanco con Gotham Pro.

## Como refinar
1. Abrir la referencia en Figma/Photopea con el tamano exacto.
2. Medir cada elemento en px y convertir a porcentaje.
3. Ajustar `framePct` y `sizePctH` para fidelidad total.
4. Exportar SVGs adicionales si aparecen nuevas formas.
