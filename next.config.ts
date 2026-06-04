import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https', // use 'https' if your site uses https
        hostname: 'sntpost.doststii.ph',
        //port: '80',
        pathname: '/storage/**',
      },
    ],
    //dangerouslyAllowLocalIP: true, //remove if in production
  },
  
};

export default nextConfig;
