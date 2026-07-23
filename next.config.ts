import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Next.js को बताएँ कि इन पैकेजेस को अलग से हैंडल करे
  serverExternalPackages: [
    '@cloudflare/next-on-pages'
  ],
  
  // 2. Turbopack बिल्ड एरर को रोकने के लिए
  turbopack: {},
  
  // 3. Webpack को Cloudflare Edge के अनुकूल बनाना
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Cloudflare Edge पर Node.js के कोर मॉड्यूल्स को सही ढंग से रिजॉल्व करने के लिए Alias
      config.resolve.alias = {
        ...config.resolve.alias,
        'async_hooks': 'node:async_hooks',
      };

      // अगर फिर भी कोई पुराना पैकेज इन्हें लोकल फाइल समझता है, तो उसे ब्लॉक करें
      config.resolve.fallback = {
        ...config.resolve.fallback,
        async_hooks: false,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

export default nextConfig;