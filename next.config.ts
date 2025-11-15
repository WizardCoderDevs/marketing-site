import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Configure `pageExtensions` para incluir arquivos MDX
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
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

  // Note: security headers should be configured at the hosting layer for static export

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

  // Turbopack configuration removida temporariamente
  // devido a conflitos conhecidos com MDX no Next.js 15
  // Para usar MDX, execute: pnpm dev (sem --turbopack)
  // ou atualize o script dev no package.json
};

const withMDX = createMDX({
  // Adicione extensões Markdown e MDX
  extension: /\.mdx?$/,
});

// Mescla a configuração do MDX com a configuração do Next.js
export default withMDX(nextConfig);
