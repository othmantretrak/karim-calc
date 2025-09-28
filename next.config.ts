import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // enable image domains if needed https://res.cloudinary.com/tretrak/image/upload/v1631180000/uyyy_a2f9fe3deb.jpg
  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
