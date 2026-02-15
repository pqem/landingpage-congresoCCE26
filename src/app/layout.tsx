import type { Metadata } from 'next'
import './globals.css'
import SessionProvider from "@/components/SessionProvider";

export const metadata: Metadata = {
  title: 'Congreso CCE ARG. 2026 | Expansión Sobrenatural',
  description: 'Congreso Centro Cristiano Esperanza Argentina 2026 - Temporada de Expansión Sobrenatural. 20 al 23 de Marzo.',
  keywords: ['congreso', 'cce', 'esperanza', 'argentina', '2026', 'expansión sobrenatural'],
  openGraph: {
    title: 'Congreso CCE ARG. 2026',
    description: 'Temporada de Expansión Sobrenatural - 20 al 23 de Marzo',
    type: 'website',
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
