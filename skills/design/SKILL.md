---
name: design
description: Guía de diseño visual del Congreso CCE 2026. Colores, tipografía, espaciado y componentes.
scope: root
metadata.auto_invoke: ["diseño", "UI", "colores", "tipografía", "layout", "componentes"]
allowed_tools: [read, write]
---

# Design System - Congreso CCE 2026

## Paleta de Colores

| Color | Hex | Uso |
|-------|-----|-----|
| Negro | `#000000` | Fondo principal |
| Marrón oscuro | `#332B1A` | Gradiente de fondo (fin) |
| Blanco | `#FFFFFF` | Texto principal |
| Dorado | `#D4AF37` | Acentos, CTAs |
| Dorado claro | `#EADDA6` | Highlights, gradientes |
| Dorado oscuro | `#B2975B` | Sombras, bordes |
| Dorado bronce | `#A0875C` | Detalles secundarios |
| Dorado ocre | `#C19E5D` | Variación cálida |

## Tipografía

| Elemento | Fuente | Peso | Uso |
|----------|--------|------|-----|
| Título principal | Druk XCond Super Trial | 700 | "CONGRESO CCE ARG." |
| Año | Mango Grotesque Thin | 100 | "2026" |
| Subtítulos | Montserrat | 400/600 | Fechas, tema, lema |
| Oradores | Gotham Pro | 700 | Nombres de ponentes |

## Espaciado

- **Secciones**: `py-20` (80px vertical)
- **Contenedor**: `max-w-4xl mx-auto`
- **Entre elementos**: `mt-4` a `mt-8` según jerarquía

## Componentes

### Hero
- Centrado vertical y horizontal
- Título grande escalado responsivamente
- Gradiente dorado en texto secundario

### Cards de Ponentes
- Grid 2x4 en desktop, 2x2 en móvil
- Texto centrado, foto opcional
- Hover con efecto dorado

### Cita
- Blockquote con comillas estilizadas
- Referencia en dorado
- Max-width 3xl

## Principios

1. **Elegancia sobria**: Negro + dorado = lujo sin excesos
2. **Jerarquía clara**: Tamaños de fuente muy diferentes
3. **Espacios generosos**: Dejar respirar los elementos
4. **Mobile-first**: Diseñar para móvil, escalar a desktop
