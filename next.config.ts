import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Netlify用の設定
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // ビルド時のTypeScriptエラーを無視
  typescript: {
    ignoreBuildErrors: true,
  },
  // ESLintエラーを無視
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
