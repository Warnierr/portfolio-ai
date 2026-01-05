import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  
  // Optimisations performance & SEO
  images: {
    formats: ['image/avif', 'image/webp'], // Formats modernes (30-50% plus légers)
    deviceSizes: [640, 750, 828, 1080, 1200, 1920], // Responsive
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Tailles optimisées
  },
  
  // Compression
  compress: true,
  
  // Headers de sécurité et performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
    ];
  },
};

export default nextConfig;
