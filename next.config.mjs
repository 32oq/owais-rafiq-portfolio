/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/owais-rafiq-portfolio" : "";

const nextConfig = {
  output: "export",           // Static HTML export for GitHub Pages
  basePath,                   // /owais-rafiq-portfolio in prod, empty in dev
  trailingSlash: true,        // page/ → page/index.html (GitHub Pages compatible)
  reactStrictMode: true,
  poweredByHeader: false,
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
