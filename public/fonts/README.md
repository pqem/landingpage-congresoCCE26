# Fuentes del Congreso CCE ARG. 2026

Uso en **instancia privada/demo** para mostrar el diseño; luego evaluar licencia para producción (la institución es ONG/iglesia; muchos foundries ofrecen opciones para sin fines de lucro).

## Cómo usar

1. **Coloca aquí** los archivos de fuentes que tengas (`.woff2`, `.woff` o `.ttf`):
   - **Druk XCond Super Trial** → título principal ("CONGRESO CCE ARG.")
   - **Mango Grotesque Thin** → año "2026"
   - **Gotham Pro** → nombres de oradores

2. **Montserrat** (subtítulos, fechas, lema) se puede cargar desde Google Fonts; no hace falta archivo aquí.

3. En el proyecto se carga el CSS de fuentes desde `styles/fonts.css` (o el archivo que importe los `@font-face`). Los nombres de archivo en ese CSS deben coincidir con los que pongas en esta carpeta.

4. Si no tienes algún archivo, la landing usará fuentes fallback (Bebas Neue/Oswald, system-ui) hasta que añadas el archivo o compres la licencia.

## Nombres de archivo sugeridos

Para que coincidan con `styles/fonts.css` (o el snippet de @font-face del proyecto):

| Fuente                 | Archivo sugerido (uno por formato) |
|------------------------|-----------------------------------|
| Druk XCond Super Trial | `druk-xcond-super-trial.woff2` (y `.woff` si hay) |
| Mango Grotesque Thin   | `mango-grotesque-thin.woff2` |
| Gotham Pro            | `gotham-pro.woff2` o `GothamPro.woff2` |

Puedes usar otros nombres; en ese caso actualiza las rutas en el CSS de `@font-face`.

## Licencias (producción)

- **Demo/privado:** uso de las fuentes que tengas (incl. Trial) en entorno privado para mostrar el diseño está bien.
- **Sitio público:** consultar con cada foundry opciones para **organizaciones sin fines de lucro / iglesias** (a menudo hay descuentos o licencias gratuitas).
- **Montserrat:** libre (Google Fonts, SIL OFL).

Ver también: `docs/diseno-recursos-y-entrada-epica.md` → sección "Uso en instancia privada (demo) y licencias para ONG/iglesia".
