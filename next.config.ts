import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Netlify用の静的エクスポート設定
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // 画像最適化の無効化（静的エクスポート用）
  experimental: {
    esmExternals: false
  }
};

export default nextConfig;
