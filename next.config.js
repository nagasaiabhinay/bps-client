/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['*', "images.pexels.com", "developers.google.com"],
  },

};

module.exports = nextConfig;
