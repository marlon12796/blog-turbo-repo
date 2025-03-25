import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'loremflickr.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Agregado para Google Avatars
        pathname: '/**'
      },

      {
        protocol: 'https',
        hostname: 'ozowdtwaefvmghtdtpab.supabase.co',
        port: '',
        pathname: '/**'
      }
    ]
  }
};
export default nextConfig;
