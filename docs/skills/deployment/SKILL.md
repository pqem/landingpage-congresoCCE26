---
name: deployment
description: Guía de deployment para Vercel/Netlify. Build, preview y producción.
scope: root
metadata.auto_invoke: ["deploy", "vercel", "netlify", "producción", "hosting", "publicar"]
allowed_tools: [bash, read]
---

# Deployment - Congreso CCE 2026

## Vercel (Recomendado para Next.js)

### Setup inicial
```bash
# Instalar Vercel CLI
npm i -g vercel

# Conectar proyecto
vercel

# Deploy a producción
vercel --prod
```

### Variables de entorno
```bash
# En Vercel Dashboard o CLI
vercel env add NEXT_PUBLIC_SITE_URL production
```

### Configuración (vercel.json)
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs"
}
```

## Netlify (Alternativa)

### Setup
```bash
# Instalar CLI
npm i -g netlify-cli

# Conectar
netlify init

# Deploy
netlify deploy --prod
```

### Configuración (netlify.toml)
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

## Pre-deploy Checklist

- [ ] `npm run build` sin errores
- [ ] `npm run lint` sin warnings críticos
- [ ] Imágenes optimizadas (WebP/AVIF)
- [ ] Meta tags configurados (SEO)
- [ ] Favicon y og:image presentes
- [ ] Variables de entorno configuradas
- [ ] Dominio configurado (DNS)

## Comandos útiles

```bash
# Build local para verificar
npm run build && npm run start

# Verificar tamaño del bundle
npx @next/bundle-analyzer

# Lighthouse audit
npx lighthouse https://tu-dominio.com --view
```

## Dominio Personalizado

### Vercel
1. Dashboard → Settings → Domains
2. Agregar dominio
3. Configurar DNS (CNAME o A record)

### DNS típico
```
CNAME  www   cname.vercel-dns.com
A      @     76.76.21.21
```

## Rollback

```bash
# Vercel - volver a deploy anterior
vercel rollback

# Ver historial
vercel ls
```

## Monitoreo

- **Vercel Analytics**: Automático en dashboard
- **Web Vitals**: `next/web-vitals` integrado
- **Errores**: Sentry o LogRocket (opcional)
