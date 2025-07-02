import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Multi-zone rewrites
  async rewrites() {
    return [
      {
        source: '/cart/:path*',
        destination: 'http://cart:3001/cart/:path*',
      },
    ];
  },

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: ['localhost', 'your-domain.com'],
    minimumCacheTTL: 60,
  },

  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  
  // Experimental features for performance
  experimental: {
    optimizePackageImports: ['react-hot-toast'],
    webVitalsAttribution: ['CLS', 'LCP'],
  },

  // Bundle optimization
  webpack: (config, { isServer }) => {
    // Bundle analyzer in development
    if (process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: false,
        })
      );
    }

    // Optimize for performance
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }

    return config;
  },

  // Headers for caching and security
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=60, stale-while-revalidate=300',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options', 
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // TypeScript and ESLint config
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
