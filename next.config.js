// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  reactStrictMode: false, // Aceasta opțiune trebuie să fie parte a obiectului nextConfig
};

module.exports = nextConfig;
