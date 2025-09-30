import path from "node:path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
  output: process.env.NEXT_OUTPUT_MODE,
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images-api.printify.com", pathname: "/**" },
      { protocol: "https", hostname: "images.printify.com",    pathname: "/**" },
      { protocol: "https", hostname: "cdn.printify.com",       pathname: "/**" }
    ]
  },
  // experimental: { outputFileTracingRoot: path.join(process.cwd(), "..") },
};
export default nextConfig;
