import type { NextConfig } from "next";

const nextConfig: NextConfig = {

 
    images: {
    remotePatterns: [
      {
        protocol : "https",
        hostname : "fleet-digital.s3.eu-north-1.amazonaws.com"
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "storage.cloud.google.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      }
    ],
  },
};

export default nextConfig;
