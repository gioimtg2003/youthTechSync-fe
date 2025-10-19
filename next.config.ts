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
        destination: 'http://localhost:5000/api/v1/:path*',
      },
    ];
  },
};

export default nextConfig;
