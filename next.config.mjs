// @ts-check
 
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
  // Strip console statements in production builds
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  images: {
    remotePatterns: [new URL('https://s3-eu-west-1.amazonaws.com/eposnow-assets/**')],
  },
}
 
export default nextConfig