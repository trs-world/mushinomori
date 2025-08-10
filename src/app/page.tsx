"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

// 昆虫データの型定義
interface InsectData {
  name: string;
  category: string;
  imagePath: string;
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [insects, setInsects] = useState<InsectData[]>([]);
  const [filteredInsects, setFilteredInsects] = useState<InsectData[]>([]);

  // 昆虫データの初期化
  useEffect(() => {
    const insectData: InsectData[] = [
      // セミ
      { name: "アカエゾゼミ", category: "セミ", imagePath: "/セミ/アカエゾゼミ.png" },
      { name: "アブラゼミ", category: "セミ", imagePath: "/セミ/アブラゼミ.png" },
      { name: "エゾゼミ", category: "セミ", imagePath: "/セミ/エゾゼミ.png" },
      { name: "エゾハルゼミ", category: "セミ", imagePath: "/セミ/エゾハルゼミ.png" },
      { name: "クマゼミ", category: "セミ", imagePath: "/セミ/クマゼミ.png" },
      { name: "コエゾゼミ", category: "セミ", imagePath: "/セミ/コエゾゼミ.png" },
      { name: "ツクツクボウシ", category: "セミ", imagePath: "/セミ/ツクツクボウシ.png" },
      { name: "ニイニイゼミ", category: "セミ", imagePath: "/セミ/ニイニイゼミ.png" },
      { name: "ヒグラシ", category: "セミ", imagePath: "/セミ/ヒグラシ.png" },
      // チョウ
      { name: "アオスジアゲハ", category: "チョウ", imagePath: "/チョウ/アオスジアゲハ.png" },
      { name: "アカタテハ", category: "チョウ", imagePath: "/チョウ/アカタテハ.png" },
      { name: "アサギマダラ", category: "チョウ", imagePath: "/チョウ/アサギマダラ.png" },
      { name: "アレクサンドラトリバネアゲハ", category: "チョウ", imagePath: "/チョウ/アレクサンドラトリバネアゲハ.png" },
      { name: "イチモンジセセリ", category: "チョウ", imagePath: "/チョウ/イチモンジセセリ.png" },
      { name: "カラスアゲハ", category: "チョウ", imagePath: "/チョウ/カラスアゲハ.png" },
      { name: "キアゲハ", category: "チョウ", imagePath: "/チョウ/キアゲハ.png" },
      { name: "キタキチョウ", category: "チョウ", imagePath: "/チョウ/キタキチョウ.png" },
      { name: "キタテハ", category: "チョウ", imagePath: "/チョウ/キタテハ.png" },
      { name: "コミスジ", category: "チョウ", imagePath: "/チョウ/コミスジ.png" },
      { name: "ゴマダラチョウ", category: "チョウ", imagePath: "/チョウ/ゴマダラチョウ.png" },
      { name: "ダイミョウセセリ", category: "チョウ", imagePath: "/チョウ/ダイミョウセセリ.png" },
      { name: "チャバネセセリ", category: "チョウ", imagePath: "/チョウ/チャバネセセリ.png" },
      { name: "ツバメシジミ(♀)", category: "チョウ", imagePath: "/チョウ/ツバメシジミ(♀).png" },
      { name: "ツバメシジミ(♂)", category: "チョウ", imagePath: "/チョウ/ツバメシジミ(♂).png" },
      { name: "ヒカゲチョウ", category: "チョウ", imagePath: "/チョウ/ヒカゲチョウ.png" },
      { name: "ヒメアカタテハ", category: "チョウ", imagePath: "/チョウ/ヒメアカタテハ .png" },
      { name: "ベニシジミ", category: "チョウ", imagePath: "/チョウ/ベニシジミ.png" },
      { name: "ミドリヒョウモン", category: "チョウ", imagePath: "/チョウ/ミドリヒョウモン.png" },
      { name: "ムラサキシジミ", category: "チョウ", imagePath: "/チョウ/ムラサキシジミ.png" },
      { name: "ヤマトシジミ(♂)", category: "チョウ", imagePath: "/チョウ/ヤマトシジミ(♂).png" },
      { name: "ルリシジミ", category: "チョウ", imagePath: "/チョウ/ルリシジミ.png" },
      { name: "ルリタテハ", category: "チョウ", imagePath: "/チョウ/ルリタテハ.png" },
      // ガ
      { name: "アケビコノハ", category: "ガ", imagePath: "/ガ/アケビコノハ.png" },
      { name: "ウスキツバメエダシャク", category: "ガ", imagePath: "/ガ/ウスキツバメエダシャク.png" },
      { name: "ウススジオオシロヒメシャク", category: "ガ", imagePath: "/ガ/ウススジオオシロヒメシャク.png" },
      { name: "キオベニヒメシャク", category: "ガ", imagePath: "/ガ/キオベニヒメシャク.png" },
      { name: "キナミシロヒメシャク", category: "ガ", imagePath: "/ガ/キナミシロヒメシャク.png" },
      { name: "キバラエダシャク", category: "ガ", imagePath: "/ガ/キバラエダシャク .png" },
      { name: "コウスアオシャク", category: "ガ", imagePath: "/ガ/コウスアオシャク.png" },
      { name: "シロシタオビダシャク", category: "ガ", imagePath: "/ガ/シロシタオビダシャク.png" },
      { name: "ツマグロナミシャク", category: "ガ", imagePath: "/ガ/ツマグロナミシャク.png" },
      { name: "トガリベニスジヒメシャク", category: "ガ", imagePath: "/ガ/トガリベニスジヒメシャク.png" },
      { name: "ヒメジャノメ", category: "ガ", imagePath: "/ガ/ヒメジャノメ.png" },
      { name: "ヒョウモンエダシャク", category: "ガ", imagePath: "/ガ/ヒョウモンエダシャク.png" },
      { name: "ビロードナミメシャク", category: "ガ", imagePath: "/ガ/ビロードナミメシャク.png" },
      { name: "フタナミトビヒメシャク", category: "ガ", imagePath: "/ガ/フタナミトビヒメシャク.png" },
      { name: "ヘリグログヒメアオシャク", category: "ガ", imagePath: "/ガ/ヘリグログヒメアオシャク.png" },
      { name: "ヘリスジナミシャク", category: "ガ", imagePath: "/ガ/ヘリスジナミシャク.png" },
      { name: "マルモンシロナミシャク", category: "ガ", imagePath: "/ガ/マルモンシロ ナミシャク.png" },
      { name: "ヨツメアオシャク", category: "ガ", imagePath: "/ガ/ヨツメアオシャク.png" },
      { name: "ヨツモンマエジロアオシャク", category: "ガ", imagePath: "/ガ/ヨツモンマエジロアオシャク.png" },
    ];
    setInsects(insectData);
    setFilteredInsects(insectData);
  }, []);

  // 検索機能
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredInsects(insects);
    } else {
      const filtered = insects.filter(insect => 
        insect.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredInsects(filtered);
    }
  }, [searchQuery, insects]);



  return (
    <div className="relative" style={{ minHeight: '70vh' }}>
      {/* 背景画像 - レスポンシブ対応 */}
      <div className="fixed inset-0 z-0">
        {/* PC版背景 */}
        <Image
          src="/background-PC.png"
          alt="森の背景（PC版）"
          fill
          className="object-cover hidden md:block"
          priority
        />
        {/* モバイル版背景 */}
        <Image
          src="/background-mobile.png"
          alt="森の背景（モバイル版）"
          fill
          className="object-cover block md:hidden"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* メインコンテンツ */}
      <div className="relative z-10">
        {/* ヒーローセクション */}
        <section className="flex flex-col items-center justify-center px-4" style={{ minHeight: '70vh' }}>
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 md:mb-12 drop-shadow-2xl leading-tight">
              虫の森.com
            </h1>
          </div>

          {/* 検索バー */}
          <div className="w-full max-w-2xl mb-12 md:mb-16 px-4 md:px-0">
            <div className="relative">
              <input
                type="text"
                placeholder="検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 md:px-6 py-3 md:py-4 text-base md:text-lg rounded-full border-0 shadow-lg focus:outline-none focus:ring-4 focus:ring-green-500/50 bg-white/90 backdrop-blur-sm"
              />
              <button className="absolute right-1 md:right-2 top-1/2 transform -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white p-2 md:p-3 rounded-full transition-colors">
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </section>



        {/* タグ一覧セクション */}
        <section className="py-12 md:py-16 bg-green-50/90 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl md:text-4xl font-bold text-center text-green-800 mb-8 md:mb-12">
              カテゴリから探す
            </h2>
            
            {/* 検索結果表示 */}
            {searchQuery && (
              <div className="mb-6 md:mb-8">
                <p className="text-base md:text-lg text-gray-600 text-center mb-6">
                  「{searchQuery}」の検索結果: {filteredInsects.length}件
                </p>
                
                {/* 昆虫画像ギャラリー（検索時のみ表示） */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-6">
                  {filteredInsects.slice(0, 24).map((insect, index) => (
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
                        <div className="p-2 md:p-3">
                          <h3 className="font-semibold text-xs md:text-sm text-gray-800 truncate group-hover:text-green-600 transition-colors">{insect.name}</h3>
                          <p className="text-xs text-gray-500 mt-1">{insect.category}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* 検索結果が0件の場合 */}
                {filteredInsects.length === 0 && (
                  <div className="text-center py-8 md:py-12">
                    <p className="text-lg md:text-xl text-gray-600">検索結果が見つかりませんでした。</p>
                    <p className="text-sm md:text-base text-gray-500 mt-2">別のキーワードで検索してみてください。</p>
                  </div>
                )}
              </div>
            )}

            {/* タグカード一覧（検索していない時のみ表示） */}
            {!searchQuery && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {["チョウ", "ガ", "セミ"].map((tag, index) => {
                  const tagData = {
                    "チョウ": { 
                      icon: "🦋", 
                      iconImage: "/チョウ/キアゲハ.png",
                      description: "美しい蝶の仲間たち",
                      count: insects.filter(insect => insect.category === "チョウ").length
                    },
                    "ガ": { 
                      icon: "🌙", 
                      iconImage: "/ガ/キバラエダシャク .png",
                      description: "夜に舞う蛾の仲間たち",
                      count: insects.filter(insect => insect.category === "ガ").length
                    },
                    "セミ": { 
                      icon: "🎵", 
                      iconImage: "/セミ/アブラゼミ.png",
                      description: "夏の音楽家たち",
                      count: insects.filter(insect => insect.category === "セミ").length
                    }
                  }[tag];

                  return (
                    <Link key={index} href={`/tag/${encodeURIComponent(tag)}`}>
                      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer transform hover:-translate-y-2">
                        <div className="p-8 text-center">
                          <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors overflow-hidden">
                            {tagData?.iconImage ? (
                              <Image
                                src={tagData.iconImage}
                                alt={tag}
                                width={60}
                                height={60}
                                className="object-cover rounded-full"
                              />
                            ) : (
                              <span className="text-4xl">{tagData?.icon}</span>
                            )}
                          </div>
                          <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
                            {tag}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3">
                            {tagData?.description}
                          </p>
                          <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                            {tagData?.count}種類
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
