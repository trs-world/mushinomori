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
  },
  // 実験的機能の設定（Next.js 15対応）
  experimental: {
    // PPR（Partial Prerendering）を無効化
    ppr: false,
  },
  // 出力設定
  output: 'standalone'
};

export default nextConfig;
