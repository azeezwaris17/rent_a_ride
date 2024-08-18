/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.carimagery.com",
      },
      {
        protocol: "https",
        hostname: "cdn.imagin.studio",
      },
    ],
  },
};

export default nextConfig;
