import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/cart/:path*',
        destination: 'http://localhost:3001/cart/:path*',
      },
    ];
  },
  /* config options here */
};

export default nextConfig;
