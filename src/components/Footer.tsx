'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative z-50 bg-gray-900 text-white py-8 border-t-4 border-green-500">
      <div className="max-w-6xl mx-auto px-6">
        {/* メインフッターコンテンツ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          {/* サイト情報 */}
          <div>
            <h3 className="text-3xl font-bold text-green-400 mb-4 drop-shadow-lg">
              🌲 虫の森.com
            </h3>
            <p className="text-gray-200 text-lg mb-4 leading-relaxed">
              昆虫のイラストを中心に掲載してます！
            </p>
            <p className="text-gray-300 text-base leading-relaxed">
              当サイトのイラストは商用利用可能です。<br />
              利用規約をご確認の上、自由にダウンロードしてご利用ください。
            </p>
          </div>

          {/* リンクセクション */}
          <div className="flex flex-col items-start md:items-end">
            <h4 className="text-xl font-bold text-white mb-6 drop-shadow-md">
              📋 サイト情報
            </h4>
            <nav className="space-y-2">
              <Link 
                href="/terms" 
                className="block text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm underline-offset-4 hover:underline"
              >
                利用規約
              </Link>
              <Link 
                href="/privacy" 
                className="block text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm underline-offset-4 hover:underline"
              >
                プライバシーポリシー
              </Link>
              <Link 
                href="/disclaimer" 
                className="block text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm underline-offset-4 hover:underline"
              >
                免責事項
              </Link>
            </nav>
          </div>
        </div>

        {/* 区切り線 */}
        <div className="border-t-2 border-gray-700 pt-4">
          <div className="text-center">
            <div className="text-gray-400 text-sm font-medium">
              © 2024 虫の森.com All rights reserved.
            </div>
            <div className="text-gray-500 text-xs mt-1">
              Made with ❤️ for insect lovers
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
