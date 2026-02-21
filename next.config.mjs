/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@tanstack/react-query",
    ],
  },
  async redirects() {
    return [
      {
        source: '/events/bytebloom',
        destination: '/events/promptathon',
        permanent: false,
      },
      {
        source: '/events/bytebloom-register',
        destination: '/events/promptathon-register',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
