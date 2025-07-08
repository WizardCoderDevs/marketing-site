import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Optimize images and enable modern image formats
  images: {
    unoptimized: true, // Required for static export
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Enable compression for better performance
  compress: true,

  // Enable source maps in production for better debugging
  productionBrowserSourceMaps: true,

  // Configure headers for security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },

  // Enable webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle size
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          chartjs: {
            test: /[\\/]node_modules[\\/]chart\.js[\\/]/,
            name: 'chartjs',
            priority: 20,
            reuseExistingChunk: true,
          },
          next: {
            test: /[\\/]node_modules[\\/]next[\\/]/,
            name: 'next',
            priority: 20,
            reuseExistingChunk: true,
          },
          nextThemes: {
            test: /[\\/]node_modules[\\/]next-themes[\\/]/,
            name: 'next-themes',
            priority: 20,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      };
    }
    return config;
  },

  // Turbopack configuration (stable)
  turbopack: {
    rules: {
      // Configure Turbopack rules
      '*.svg': ['@svgr/webpack'],
      '*.{png,jpg,jpeg,gif,webp,avif}': ['file-loader'],
      '*.{woff,woff2,eot,ttf,otf}': ['file-loader'],
    },
    resolveAlias: {
      // Add any path aliases here if needed
      '@': './src',
    },
  },
};

export default nextConfig;
