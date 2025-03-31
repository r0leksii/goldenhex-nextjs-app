import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 's3-eu-west-1.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
  env: {
    BASE_URL: process.env.ORGADO_SERVER_URL,
    ADMIN_URL: process.env.ORGADO_ADMIN_URL,
    IMGBB_URL: process.env.ORGADO_IMGBB_KEY,
    EMAIL_SERVICE_ID: process.env.EMAIL_SERVICE_KEY,
    EMAIL_PUBLIC_KEY: process.env.EMAIL_PUBLIC_KEY,
    EMAIL_TEMPLATE_ID: process.env.EMAIL_TEMPLATE_KEY,
    STRIPE_PROMISE_KEY: process.env.STRIPE_PROMISE_KEY,
  }
};

if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform();
}

export default nextConfig;