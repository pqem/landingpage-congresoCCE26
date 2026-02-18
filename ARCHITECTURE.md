# Arquitectura - Congreso CCE 2026

## Qué es
Landing page pública + panel de administración para el Congreso CCE Argentina 2026 ("Expansión Sobrenatural"). Permite a los asistentes inscribirse online y a los organizadores ver estadísticas y gestionar inscripciones.

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Framework | Next.js 15 (App Router) |
| UI | React 19, Tailwind CSS 4 |
| Lenguaje | TypeScript 5 |
| Autenticación | NextAuth 4 (Google OAuth) |
| Gráficos admin | Recharts 3 |
| Animaciones | Framer Motion 11 |
| Iconos | Lucide React |
| Deploy frontend | Vercel |
| Deploy backend | Cloudflare Workers (D1 database) |

## Estructura de carpetas

```
src/
├── app/
│   ├── page.tsx                    # Landing page principal
│   ├── layout.tsx                  # Layout raíz (fonts, metadata, SessionProvider)
│   ├── globals.css                 # Variables CSS, animaciones, tema
│   ├── inscripcion/
│   │   └── page.tsx                # Formulario de inscripción
│   ├── admin/
│   │   ├── page.tsx                # Dashboard admin (stats + inscriptos)
│   │   └── login/page.tsx          # Login admin con Google OAuth
│   └── api/                        # API routes (proxies al backend)
│       ├── inscripcion/route.ts    # POST inscripción pública
│       ├── auth/[...nextauth]/     # NextAuth endpoints
│       └── admin/                  # Endpoints protegidos
│           ├── stats/route.ts
│           ├── inscripciones/route.ts
│           ├── inscripciones/[id]/route.ts
│           └── export/route.ts
├── components/
│   ├── admin/                      # Componentes del panel admin
│   ├── inscripcion/                # Componentes del formulario
│   └── *.tsx                       # Componentes de la landing
└── lib/
    └── auth.ts                     # Configuración NextAuth + verificación admin

public/
├── fonts/                          # Druk, Gotham, MangoGrotesque
├── images/
└── Logo_cce_*.svg                  # Logos del escudo CCE

docs/
├── design-specs.md                 # Especificaciones de diseño
├── diseno-recursos-y-entrada-epica.md
├── reference/                      # Imágenes de referencia
└── skills/                         # Guías para agentes de IA
```

## Componentes

### Landing (`src/components/`)

| Componente | Qué hace |
|---|---|
| `header.tsx` | Barra de navegación fija con logo y links |
| `hero.tsx` | Sección hero con fondo y partículas |
| `hero-content.tsx` | Contenido del hero (título, subtítulo, CTA) |
| `countdown.tsx` | Cuenta regresiva al evento |
| `sobre-evento.tsx` | Descripción del congreso |
| `oradores-puzzle.tsx` | Grid de oradores con efecto puzzle |
| `programa.tsx` | Cronograma del evento |
| `descubrimientos.tsx` | Sección de highlights |
| `inscripcion.tsx` | CTA de inscripción en la landing |
| `ubicacion.tsx` | Mapa y dirección del evento |
| `redes-sociales.tsx` | Links a redes sociales |
| `footer.tsx` | Pie de página |
| `fixed-background.tsx` | Fondo fijo con gradiente |
| `floating-particles.tsx` | Partículas doradas decorativas |
| `scroll-svg-path.tsx` | Path SVG que se dibuja al scrollear |
| `whatsapp-button.tsx` | Botón flotante de WhatsApp |
| `SessionProvider.tsx` | Wrapper de NextAuth SessionProvider |

### Admin (`src/components/admin/`)

| Componente | Qué hace |
|---|---|
| `types.ts` | Interfaces: Stats, Inscripto, PaginatedResponse |
| `AdminHeader.tsx` | Header con logo, usuario, nav mobile |
| `StatCards.tsx` | 4 tarjetas de estadísticas |
| `DashboardCharts.tsx` | Gráficos: dona (alojamiento), área (tendencia), barras (ciudad/iglesia) |
| `SearchBar.tsx` | Input de búsqueda + botón exportar CSV |
| `InscriptosTable.tsx` | Tabla desktop con filas expandibles |
| `InscriptoCard.tsx` | Cards mobile con detalle expandible |
| `FamiliaresDetail.tsx` | Detalle de familiares (compartido entre tabla y cards) |
| `Pagination.tsx` | Controles de paginación |

### Inscripción (`src/components/inscripcion/`)

| Componente | Qué hace |
|---|---|
| `types.ts` | Tipos: Alojamiento, Familiar |
| `styles.ts` | Clases CSS compartidas (input, label) |
| `SuccessScreen.tsx` | Pantalla de confirmación post-inscripción |
| `AlojamientoToggle.tsx` | Toggle Sí/No para alojamiento |
| `FamiliarForm.tsx` | Formulario individual de un familiar |
| `FamiliaresSection.tsx` | Sección completa: lista de familiares + add/remove |

## API Routes

Todas las rutas admin son **proxies autenticados** al backend de Cloudflare Workers. La autenticación se verifica con NextAuth en el servidor antes de reenviar la request.

| Ruta | Método | Auth | Qué hace |
|---|---|---|---|
| `/api/inscripcion` | POST | No | Registra una nueva inscripción |
| `/api/auth/[...nextauth]` | GET/POST | — | Endpoints de NextAuth (login/logout/session) |
| `/api/admin/stats` | GET | Sí | Estadísticas generales (totales, por ciudad, por iglesia, por día) |
| `/api/admin/inscripciones` | GET | Sí | Lista paginada de inscriptos (soporta búsqueda) |
| `/api/admin/inscripciones/[id]` | GET | Sí | Detalle de un inscripto |
| `/api/admin/inscripciones/[id]` | DELETE | Sí | Elimina una inscripción |
| `/api/admin/export` | GET | Sí | Exporta todos los inscriptos (para CSV) |

## Flujo de autenticación

1. Admin accede a `/admin/login`
2. Click en "Iniciar sesión con Google" → NextAuth → Google OAuth
3. Callback verifica que el email esté en la lista de admins autorizados (vía Cloudflare Worker)
4. Si autorizado → sesión creada → redirect a `/admin`
5. Las API routes del admin verifican la sesión y reenvían al Worker con `X-API-Key` + `X-Admin-Email`

## Variables de entorno

```env
# NextAuth
NEXTAUTH_URL=
NEXTAUTH_SECRET=

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Backend API
NEXT_PUBLIC_API_URL=
ADMIN_API_KEY=
```

## Deploy

- **Frontend (Vercel):** Push a `main` → deploy automático
- **Backend (Cloudflare Workers):** Repo separado (`congreso-cce-worker/`), deploy con `wrangler deploy`
