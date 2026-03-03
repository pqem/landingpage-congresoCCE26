import type { Metadata } from 'next'
import './globals.css'
import SessionProvider from "@/components/SessionProvider";

export const metadata: Metadata = {
  title: 'Congreso CCE Argentina 2026 — Expansión Sobrenatural',
  description: '20 al 23 de marzo de 2026 · Plottier, Neuquén, Argentina',
  keywords: ['congreso', 'cce', 'esperanza', 'argentina', '2026', 'expansión sobrenatural'],
  metadataBase: new URL('https://congreso.ccesperanza.org'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Congreso CCE Argentina 2026 — Expansión Sobrenatural',
    description: '20 al 23 de marzo de 2026 · Plottier, Neuquén, Argentina',
    url: 'https://congreso.ccesperanza.org',
    siteName: 'Congreso CCE Argentina 2026',
    type: 'website',
    locale: 'es_AR',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Congreso CCE Argentina 2026 — Expansión Sobrenatural',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Congreso CCE Argentina 2026 — Expansión Sobrenatural',
    description: '20 al 23 de marzo de 2026 · Plottier, Neuquén, Argentina',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="antialiased">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
