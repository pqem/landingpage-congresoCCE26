import type { Metadata } from 'next'
import './globals.css'
import SessionProvider from "@/components/SessionProvider";

const description = 'Congreso CCE Argentina 2026 — Expansión Sobrenatural. 20 al 22 de marzo de 2026 en Plottier, Neuquén, Patagonia Argentina. ¡Inscribite!';

export const metadata: Metadata = {
  title: 'Congreso CCE Argentina 2026 — Expansión Sobrenatural',
  description,
  keywords: ['congreso', 'cce', 'esperanza', 'argentina', '2026', 'expansión sobrenatural'],
  metadataBase: new URL('https://congreso.ccesperanza.org'),
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'CCE 2026',
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Congreso CCE Argentina 2026 — Expansión Sobrenatural',
    description,
    url: 'https://congreso.ccesperanza.org',
    siteName: 'Congreso CCE Argentina 2026',
    type: 'website',
    locale: 'es_AR',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Congreso CCE Argentina 2026 — Expansión Sobrenatural',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Congreso CCE Argentina 2026 — Expansión Sobrenatural',
    description,
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="apple-touch-icon" href="/images/logo-cce-color.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="antialiased">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
