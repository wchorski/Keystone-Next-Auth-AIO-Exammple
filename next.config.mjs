const KEYSTONE_URL = process.env.KEYSTONE_URL || 'http://localhost:3001'

/** @type {import('next').NextConfig} */
const nextConfig = {

  // serverExternalPackages: ['graphql'],
  experimental: {
    // without this, 'Error: Expected Upload to be a GraphQL nullable type.'
    serverComponentsExternalPackages: ['graphql'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  async rewrites() {
    return {
      beforeFiles: [],
      fallback: [
        {
          source: '/admin',
          destination: `${KEYSTONE_URL}/admin`,
        },
        {
          source: '/admin/:admin*',
          destination: `${KEYSTONE_URL}/admin/:admin*`,
        },
      ],
      afterFiles: [],
    }
  },
};

export default nextConfig;
