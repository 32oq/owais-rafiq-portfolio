/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/owais-rafiq-portfolio" : "";

const nextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  // Expose basePath so components can prefix /public asset paths manually
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,        // Required — GitHub Pages has no image server
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
