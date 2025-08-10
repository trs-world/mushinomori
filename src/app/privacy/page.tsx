'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
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
            <span className="text-gray-700 font-medium">プライバシーポリシー</span>
          </div>
        </nav>

        {/* メインカード */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 max-w-4xl mx-auto">
          {/* ヘッダー */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              🔒 プライバシーポリシー
            </h1>
            <p className="text-gray-600 text-lg">
              虫の森.com 個人情報保護方針
            </p>
          </div>

          {/* プライバシーポリシー内容 */}
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-purple-500 pb-2">
                第1条（個人情報の定義）
              </h2>
              <p>
                本プライバシーポリシーにおいて「個人情報」とは、個人情報保護法にいう「個人情報」を指すものとし、
                生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、電話番号、
                連絡先その他の記述等により特定の個人を識別できる情報を指します。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-purple-500 pb-2">
                第2条（個人情報の収集方法）
              </h2>
              <div className="space-y-3">
                <p>当サイトでは、以下の方法で個人情報を収集する場合があります：</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>お問い合わせフォームからのご連絡時</li>
                  <li>アンケートやキャンペーンへの参加時</li>
                  <li>サービス利用時のアクセスログ</li>
                  <li>Cookie等の技術を用いた情報収集</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-purple-500 pb-2">
                第3条（個人情報の利用目的）
              </h2>
              <div className="space-y-3">
                <p>収集した個人情報は、以下の目的で利用いたします：</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>お問い合わせへの回答・対応</li>
                  <li>サービスの提供・改善</li>
                  <li>利用状況の分析・統計作成</li>
                  <li>重要なお知らせの配信</li>
                  <li>不正利用の防止・セキュリティ向上</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-purple-500 pb-2">
                第4条（個人情報の第三者提供）
              </h2>
              <div className="space-y-3">
                <p>
                  当サイトは、法令に基づく場合を除き、あらかじめユーザーの同意を得ることなく、
                  第三者に個人情報を提供することはありません。
                </p>
                <p><strong>ただし、以下の場合は除きます：</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>法令に基づく場合</li>
                  <li>人の生命、身体または財産の保護のために必要がある場合</li>
                  <li>公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-purple-500 pb-2">
                第5条（Cookie等の利用）
              </h2>
              <div className="space-y-3">
                <p>
                  当サイトでは、ユーザーの利便性向上のためCookieを使用する場合があります。
                  Cookieの使用を望まない場合は、ブラウザの設定でCookieを無効にすることができます。
                </p>
                <p><strong>🍪 Cookieの利用目的：</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>サイトの利用状況の分析</li>
                  <li>ユーザー体験の向上</li>
                  <li>広告の最適化</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-purple-500 pb-2">
                第6条（アクセス解析ツール）
              </h2>
              <p>
                当サイトでは、Google Analyticsなどのアクセス解析ツールを使用しています。
                これらのツールはCookieを使用してユーザーの行動を分析しますが、
                個人を特定する情報は含まれません。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-purple-500 pb-2">
                第7条（個人情報の開示・訂正・削除）
              </h2>
              <p>
                ユーザーは、当サイトの保有する自己の個人情報について、開示・訂正・削除を求めることができます。
                お問い合わせフォームよりご連絡ください。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-purple-500 pb-2">
                第8条（プライバシーポリシーの変更）
              </h2>
              <p>
                当サイトは、必要に応じて本プライバシーポリシーを変更することがあります。
                変更後のプライバシーポリシーは、当サイトに掲載された時点で効力を生じるものとします。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-purple-500 pb-2">
                第9条（お問い合わせ窓口）
              </h2>
              <p>
                本プライバシーポリシーに関するお問い合わせは、当サイトのお問い合わせフォームよりご連絡ください。
              </p>
            </section>

            <div className="mt-8 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
              <p className="text-purple-800 font-medium">
                📅 制定日：2024年1月1日<br />
                📅 最終更新：2024年8月10日
              </p>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-blue-800 text-sm">
                <strong>🛡️ 個人情報保護について</strong><br />
                当サイトは、ユーザーの個人情報を適切に保護し、安全に管理することをお約束いたします。
                ご不明な点がございましたら、お気軽にお問い合わせください。
              </p>
            </div>
          </div>

          {/* ホームに戻るボタン */}
          <div className="text-center mt-12">
            <button
              onClick={() => router.push('/')}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
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
