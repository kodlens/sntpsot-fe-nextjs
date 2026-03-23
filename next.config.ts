import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http', // use 'https' if your site uses https
        hostname: 'localhost',
        port: '8000',
        pathname: '/storage/**',
      },
    ],
    dangerouslyAllowLocalIP: true, //remove if in production
  },
  
};

export default nextConfig;
