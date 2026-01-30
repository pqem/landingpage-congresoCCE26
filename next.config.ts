import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Optimizaciones de imágenes
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
