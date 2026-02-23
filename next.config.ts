import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http', // use 'https' if your site uses https
        hostname: 'localhost',
      },
    ],
  },
  
};

export default nextConfig;
