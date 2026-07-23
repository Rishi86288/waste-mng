import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Next.js को बताएँ कि इस पैकेज को अलग से हैंडल करे
  experimental: {
    serverComponentsExternalPackages: ['@cloudflare/next-on-pages'],
  },
  
  // 2. Webpack को बताएँ कि async_hooks को लोकल फाइल न समझे
  webpack: (config, { isServer, nextRuntime }) => {
    if (isServer && nextRuntime === 'edge') {
      config.externals = [
        ...(Array.isArray(config.externals) ? config.externals : []), 
        'async_hooks', 
        'node:async_hooks'
      ];
    }
    return config;
  },
};

export default nextConfig;