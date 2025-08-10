import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Netlify用の設定
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
