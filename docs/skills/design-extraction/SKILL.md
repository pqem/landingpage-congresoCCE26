---
name: design-extraction
description: Flujo para convertir imagenes de referencia en especificaciones medibles (layout, tipografia, color, SVG) y tokens reutilizables.
scope: root
metadata.auto_invoke: ["extraer", "especificaciones", "tokens", "layout", "imagen", "fidelidad", "design tokens"]
allowed_tools: [read, write]
---

# Extraccion de Diseno - Congreso CCE 2026

## Objetivo
Convertir artes graficas en datos exactos (posicion, tipografia, color, SVG) para reconstruir el layout en web con alta fidelidad.

## Flujo recomendado
1. **Preparar el artboard**
   - Usa `data/reference/*.jpg` como referencia.
   - Verifica tamano exacto con `file` en la terminal.
   - Crea el frame en Figma/Photopea con ese tamano.

2. **Medir layout**
   - Dibuja cajas sobre cada elemento (texto, logo, cards, lineas).
   - Exporta o anota `x`, `y`, `width`, `height` en px.
   - Convierte a porcentaje: `pct = (px / artboard) * 100`.

3. **Tipografia**
   - Identifica familia/peso/size/leading/tracking.
   - Usa fuentes existentes en `public/fonts`.
   - Guarda la info en `data/design-tokens.json`.

4. **Color**
   - Muestrea con color picker del editor.
   - Registra hex exactos en `data/design-tokens.json`.

5. **SVG / formas**
   - Reusa assets existentes (`public/images/hero/formas-doradas.svg`).
   - Si falta una forma, exporta el path y guarda en `data/design-spec-*.json`.

6. **Guardar specs**
   - `data/design-spec-hero.json`
   - `data/design-spec-speakers.json`
   - `docs/design-specs.md`

## Formato base (JSON)
```json
{
  "id": "hero",
  "source": "data/reference/b.jpg",
  "artboard": { "width": 3404, "height": 2219, "unit": "px" },
  "precision": "approx",
  "layers": [
    {
      "id": "title",
      "type": "text",
      "content": "CONGRESO",
      "style": "heroTitle",
      "framePct": { "x": 33, "y": 22, "w": 31, "h": 20 }
    }
  ]
}
```

## Validacion rapida
- Superpone el layout web encima del JPG para verificar proporciones.
- Si algo se ve fuera de lugar, ajusta `framePct` y tracking.

## Salida esperada
- Tokens de color/tipografia en `data/design-tokens.json`.
- Layouts medibles en `data/design-spec-hero.json` y `data/design-spec-speakers.json`.
- Notas y decisiones en `docs/design-specs.md`.
