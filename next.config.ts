import { BASE_URL } from "@/constants/baseURL";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${BASE_URL}/api/:path*`,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true, // Use 'true' for SEO if /login is the permanent home
      },
    ]
  },
};

export default nextConfig;
