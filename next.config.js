/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,

  images: {
    domains: ['firebasestorage.googleapis.com'],
    imageSizes: [32, 64, 96, 128, 256],
    deviceSizes: [640, 750, 828],
  },
};
