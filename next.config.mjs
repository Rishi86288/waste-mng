/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer, nextRuntime }) => {
    // जब कोड Edge Runtime (Cloudflare) के लिए बिल्ड हो रहा हो
    if (isServer && nextRuntime === 'edge') {
      // Webpack को सख्त निर्देश: इन मॉड्यूल्स को बंडल न करे, इन्हें Cloudflare खुद हैंडल करेगा
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