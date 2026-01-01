import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for Firebase Hosting
  output: "export",
  // Trailing slash for clean URLs
  trailingSlash: false,

  // Image optimization configuration
  images: {
    // Disable image optimization for static export
    unoptimized: true,
    // Modern image formats
    formats: ["image/webp", "image/avif"],
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  // Enable strict mode for better development experience
  reactStrictMode: true,

  // Production optimizations
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
