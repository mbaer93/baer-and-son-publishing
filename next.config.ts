import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // Allow large file uploads via API routes
  experimental: {
    serverActions: {
      bodySizeLimit: '55mb',
    },
  },
}

export default nextConfig
