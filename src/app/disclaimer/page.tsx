'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function DisclaimerPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* 背景画像 */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: "url('/background-PC.png')"
        }}
      />
      
      <div className="relative z-10">
        {/* ヘッダーセクション */}
        <section className="py-12 md:py-16 bg-gradient-to-r from-slate-600 to-gray-700 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg">
                免責事項
              </h1>
              <p className="text-lg md:text-xl opacity-90">
                虫の森.com ご利用に関する重要事項
              </p>
            </div>
          </div>
        </section>

        {/* メインコンテンツ */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* パンくずナビゲーション */}
            <nav className="mb-8">
              <ol className="flex items-center space-x-2 text-sm text-gray-600">
                <li>
                  <button 
                    onClick={() => router.push('/')}
                    className="hover:text-green-600 transition-colors"
                  >
                    ホーム
                  </button>
                </li>
                <li className="text-gray-400">/</li>
                <li className="text-gray-900 font-medium">免責事項</li>
              </ol>
            </nav>

            {/* 免責事項内容 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">免責事項</h2>
                
                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <p>
                    当サイトの使用及び閲覧は、利用者の責任において行うものとします。内容につきましては最新の注意を払って編集しておりますが、正確性、有用性、確実性、安全性について保証するものではありません。
                  </p>
                  
                  <p>
                    ご使用にあたり、不利益、損害、実績が得られない等のことがありましても一切の責任を負い兼ねますのでご了承下さい。
                  </p>
                  
                  <p>
                    また、当サイトではアフィリエイトプログラムによる広告を掲載しております。商品の購入やサービスの利用につきましては、利用者とリンク先企業の責任において行うものとします。
                  </p>
                  
                  <p>
                    リンク先企業との間に発生したトラブル・問題などについては一切の責任を負い兼ねますのでご了承下さい。
                  </p>
                </div>
              </div>

              {/* ホームに戻るボタン */}
              <div className="mt-12 text-center">
                <button
                  onClick={() => router.push('/')}
                  className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors shadow-md"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  ホームに戻る
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
