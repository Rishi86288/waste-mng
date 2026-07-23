/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      // यह Webpack को बताएगा कि async_hooks को लोकल फाइल न समझे
      config.resolve.alias = {
        ...config.resolve.alias,
        'async_hooks': 'node:async_hooks',
      };
    }
    return config;
  },
};

export default nextConfig;