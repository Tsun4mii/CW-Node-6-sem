/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => [
    {
      source: "/v1/:path*",
      destination: "http://localhost:5000/api/:path*",
    },
  ],
};

module.exports = nextConfig;
