"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { generateInsectDataFromImages } from '@/utils/imageScanner';

// 昆虫データの型定義
interface InsectData {
  name: string;
  category: string;
  imagePath: string;
}

export default function TagPage() {
  const params = useParams();
  const router = useRouter();
  const tag = decodeURIComponent(params.tag as string);
  const [insects, setInsects] = useState<InsectData[]>([]);
  const [tagInsects, setTagInsects] = useState<InsectData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 18;

  // 昆虫データの初期化（動的データ生成）
  useEffect(() => {
    const insectData = generateInsectDataFromImages();
    setInsects(insectData);
  }, []);

  // タグに該当する昆虫をフィルタリング
  useEffect(() => {
    const filtered = insects.filter(insect => insect.category === tag);
    setTagInsects(filtered);
    setCurrentPage(1); // フィルタが変わったら1ページ目に戻る
  }, [insects, tag]);

  // ページネーション計算
  const totalPages = Math.ceil(tagInsects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentInsects = tagInsects.slice(startIndex, endIndex);

  // ページ変更ハンドラー
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // ページ変更時にトップにスクロール
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // タグ情報を取得
  const getTagInfo = (tagName: string) => {
    const tagData = {
      "チョウ": { 
        icon: "🦋", 
        iconImage: "/チョウ/キアゲハ.png",
        description: "美しい蝶の仲間たち",
        color: "from-blue-400 to-purple-500"
      },
      "ガ": { 
        icon: "🌙", 
        iconImage: "/ガ/キバラエダシャク .png",
        description: "夜に舞う蛾の仲間たち",
        color: "from-indigo-400 to-gray-600"
      },
      "セミ": { 
        icon: "🎵", 
        iconImage: "/セミ/アブラゼミ.png",
        description: "夏の音楽家たち",
        color: "from-green-400 to-emerald-600"
      },
      "カブト・クワガタ": { 
        icon: "🪲", 
        iconImage: "/カブト・クワガタ/カブトムシ.png",
        description: "力強いカブト・クワガタ",
        color: "from-amber-500 to-orange-600"
      },
      "身近な虫": { 
        icon: "🐛", 
        iconImage: "/身近な虫/ナナホシテントウ.png",
        description: "身の回りの小さな仲間たち",
        color: "from-red-400 to-pink-500"
      },
      "カエル": { 
        icon: "🐸", 
        iconImage: "/カエル/ツノガエル(緑).png",
        description: "水辺の可愛い仲間たち",
        color: "from-teal-400 to-cyan-500"
      },
      "その他": { 
        icon: "🔍", 
        iconImage: "/その他/ディアボリカル・アイアンクラッド・ビートル.png",
        description: "珍しい昆虫たち",
        color: "from-gray-500 to-slate-600"
      }
    }[tagName];
    return tagData || { icon: "🐛", iconImage: null, description: "昆虫の仲間たち", color: "from-green-400 to-blue-500" };
  };

  const tagInfo = getTagInfo(tag);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* ヘッダー */}
      <Header showOnHover={true} />
      
      {/* 背景画像 */}
      <div className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: "url('/background-PC.png')"
        }}
      />
      
      <div className="relative z-10">
        {/* ヘッダーセクション */}
        <section className={`py-12 md:py-16 bg-gradient-to-r ${tagInfo.color} text-white relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <div className="w-28 h-28 mx-auto mb-5 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm overflow-hidden">
              {tagInfo.iconImage ? (
                <Image
                  src={tagInfo.iconImage}
                  alt={tag}
                  width={96}
                  height={96}
                  className="object-cover rounded-full"
                />
              ) : (
                <span className="text-5xl">{tagInfo.icon}</span>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-2xl">
              {tag}
            </h1>
            <p className="text-lg md:text-xl mb-5 drop-shadow-lg">
              {tagInfo.description}
            </p>
            <div className="inline-flex items-center px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full text-lg font-medium">
              {tagInsects.length}種類の画像
            </div>
          </div>
        </section>

        {/* ナビゲーション */}
        <section className="py-6 bg-white/90 backdrop-blur-sm border-b">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-green-600 transition-colors">
                ホーム
              </Link>
              <span>›</span>
              <span className="text-green-600 font-medium">{tag}</span>
            </div>
          </div>
        </section>

        {/* 画像ギャラリー */}
        <section className="py-12 md:py-16 bg-white/90 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4">
            {tagInsects.length > 0 ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
                  {currentInsects.map((insect, index) => (
                    <Link key={index} href={`/insect/${encodeURIComponent(insect.name)}`}>
                      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer transform hover:-translate-y-1">
                        <div className="aspect-square relative">
                          <Image
                            src={insect.imagePath}
                            alt={insect.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-3 md:p-4">
                          <h3 className="font-semibold text-sm md:text-base text-gray-800 truncate group-hover:text-green-600 transition-colors">
                            {insect.name}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1">{insect.category}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* ページネーション */}
                {totalPages > 1 && (
                  <div className="mt-12 flex justify-center items-center space-x-2">
                    {/* 前へボタン */}
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        currentPage === 1
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      前へ
                    </button>

                    {/* ページ番号 */}
                    <div className="flex space-x-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                            currentPage === page
                              ? 'bg-green-600 text-white'
                              : 'bg-white text-gray-700 hover:bg-green-100'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    {/* 次へボタン */}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        currentPage === totalPages
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      次へ
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-4xl text-gray-400">🔍</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  該当する画像が見つかりません
                </h3>
                <p className="text-gray-500">
                  「{tag}」カテゴリの画像は現在準備中です。
                </p>
              </div>
            )}
          </div>
        </section>

        {/* 戻るボタン */}
        <section className="py-8 bg-green-50/90 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              戻る
            </button>
          </div>
        </section>

      </div>
      
      {/* フッター */}
      <Footer />
    </div>
  );
}
