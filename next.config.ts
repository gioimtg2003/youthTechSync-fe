import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    '*.nguyenconggioi.local',
    'nguyenconggioi.local',
    '*.nguyenconggioi.local:3000',
    
  ],
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}:path*`,
      },
    ];
  },
};

export default nextConfig;
