import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Next.js 16 का नया सिंटैक्स (experimental हटा दिया गया है)
  serverExternalPackages: [
    '@cloudflare/next-on-pages', 
    'async_hooks', 
    'node:async_hooks'
  ],
  
  // 2. Turbopack के बिल्ड एरर को शांत करने के लिए एक खाली ऑब्जेक्ट
  turbopack: {},
  
  // 3. Webpack का कॉन्फ़िगरेशन (ताकि Edge Runtime पर दिक्कत न आए)
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