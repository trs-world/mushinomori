'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  showOnHover?: boolean;
}

export default function Header({ showOnHover = false }: HeaderProps) {
  const router = useRouter();

  if (showOnHover) {
    return (
      <div className="group md:fixed relative top-0 left-0 right-0 z-50">
        {/* ホバー検出エリア（PC版のみ） */}
        <div className="h-16 w-full hidden md:block"></div>
        
        {/* ヘッダー本体 */}
        <header className="absolute top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-lg transform md:-translate-y-full md:group-hover:translate-y-0 translate-y-0 transition-transform duration-300 ease-in-out">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              {/* 左側: ナビゲーションリンク */}
              <div className="flex items-center gap-3 md:gap-6">
                <Link 
                  href="/"
                  className="flex items-center gap-1 text-gray-700 hover:text-green-600 font-medium transition-colors duration-200 text-sm md:text-base"
                >
                  🏠 ホーム
                </Link>
                <Link 
                  href="/terms"
                  className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200 text-sm md:text-base"
                >
                  利用規約
                </Link>
                <Link 
                  href="/contact"
                  className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200 text-sm md:text-base"
                >
                  お問い合わせ
                </Link>
              </div>

              {/* 右側: サイトタイトル */}
              <div className="flex items-center">
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <Image
                    src="/logo.png"
                    alt="虫の森ロゴ"
                    width={32}
                    height={32}
                    className="w-6 h-6 md:w-8 md:h-8"
                  />
                  <h1 className="text-lg md:text-xl font-bold text-gray-800">
                    虫の森
                  </h1>
                </Link>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }

  // 通常表示（個別ページ用）
  return (
    <header className="relative z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* 左側: ナビゲーションリンク */}
          <div className="flex items-center gap-6">
            <Link 
              href="/"
              className="flex items-center gap-1 text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
            >
              🏠 ホーム
            </Link>
            <Link 
              href="/terms"
              className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
            >
              利用規約
            </Link>
            <Link 
              href="/contact"
              className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
            >
              お問い合わせ
            </Link>
          </div>

          {/* 右側: サイトタイトル */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Image
                src="/logo.png"
                alt="虫の森ロゴ"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <h1 className="text-xl font-bold text-gray-800">
                虫の森
              </h1>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
