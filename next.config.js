// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false, // Aceasta opțiune trebuie să fie parte a obiectului nextConfig
};

module.exports = nextConfig;
