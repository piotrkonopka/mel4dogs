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
    // CloudFront CDN pattern for remote images
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.cloudfront.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "d*.cloudfront.net",
        pathname: "/**",
      },
    ],
    // Modern image formats
    formats: ["image/webp", "image/avif"],
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Minimize CLS by using explicit sizes
    minimumCacheTTL: 60,
  },

  // HTTP headers for caching and security
  async headers() {
    return [
      // Security headers for all routes
      {
        source: "/:path*",
        headers: [
          // HSTS - Force HTTPS for 2 years
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // Prevent clickjacking
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          // XSS Protection
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // Referrer Policy
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Permissions Policy (limit browser features)
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self)",
          },
          // Content Security Policy
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              "img-src 'self' data: https: blob:",
              "connect-src 'self' https://www.google-analytics.com https://*.cloudfunctions.net",
              "frame-ancestors 'self'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
      // Cache headers for static assets
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
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
