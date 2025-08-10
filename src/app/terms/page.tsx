'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="text-green-600 text-xl">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* 背景画像 */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/background-PC.png"
          alt="森の背景"
          fill
          className="object-cover opacity-30"
          priority
        />
      </div>

      {/* メインコンテンツ */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* パンくずナビゲーション */}
        <nav className="mb-6">
          <div className="flex items-center space-x-2 text-sm">
            <button
              onClick={() => router.push('/')}
              className="text-green-600 hover:text-green-800 transition-colors"
            >
              ホーム
            </button>
            <span className="text-gray-500">›</span>
            <span className="text-gray-700 font-medium">利用規約</span>
          </div>
        </nav>

        {/* メインカード */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 max-w-4xl mx-auto">
          {/* ヘッダー */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              📋 利用規約
            </h1>
            <p className="text-gray-600 text-lg">
              虫の森.com サービス利用規約
            </p>
          </div>

          {/* 利用規約内容 */}
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-green-500 pb-2">
                第1条（適用）
              </h2>
              <p>
                本規約は、当サイト「虫の森.com」（以下「当サイト」）が提供するサービスの利用条件を定めるものです。
                利用者の皆様には本規約に従って、当サイトをご利用いただきます。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-green-500 pb-2">
                第2条（利用許可）
              </h2>
              <div className="space-y-3">
                <p><strong>✅ 許可される利用：</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>個人・商用問わず無料でご利用いただけます</li>
                  <li>印刷物、ウェブサイト、動画、アプリなどでの使用</li>
                  <li>教育目的での使用</li>
                  <li>プレゼンテーション資料での使用</li>
                  <li>ブログやSNSでの使用</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-green-500 pb-2">
                第3条（禁止事項）
              </h2>
              <div className="space-y-3">
                <p><strong>❌ 禁止される利用：</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>イラストそのものを販売すること</li>
                  <li>他のフリー素材サイトへの転載・配布</li>
                  <li>公序良俗に反する用途での使用</li>
                  <li>反社会的勢力による利用</li>
                  <li>著作権表示の削除や改変</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-green-500 pb-2">
                第4条（著作権）
              </h2>
              <p>
                当サイトで提供するすべてのイラストの著作権は当サイトに帰属します。
                ただし、利用規約に従った範囲内での使用については、使用許可を与えるものとします。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-green-500 pb-2">
                第5条（免責事項）
              </h2>
              <p>
                当サイトのイラストを使用したことによって生じたいかなる損害についても、
                当サイトは一切の責任を負いません。利用者の責任においてご使用ください。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-green-500 pb-2">
                第6条（規約の変更）
              </h2>
              <p>
                当サイトは、必要に応じて本規約を変更することがあります。
                変更後の規約は、当サイトに掲載された時点で効力を生じるものとします。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-green-500 pb-2">
                第7条（お問い合わせ）
              </h2>
              <p>
                本規約に関するお問い合わせは、当サイトのお問い合わせフォームよりご連絡ください。
              </p>
            </section>

            <div className="mt-8 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <p className="text-green-800 font-medium">
                📅 制定日：2024年1月1日<br />
                📅 最終更新：2024年8月10日
              </p>
            </div>
          </div>

          {/* ホームに戻るボタン */}
          <div className="text-center mt-12">
            <button
              onClick={() => router.push('/')}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              🏠 ホームに戻る
            </button>
          </div>
        </div>
      </div>

      {/* フッター */}
      <Footer />
    </div>
  );
}
