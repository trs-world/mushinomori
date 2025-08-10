"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

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
  }, []);

  // タグに該当する昆虫をフィルタリング
  useEffect(() => {
    const filtered = insects.filter(insect => insect.category === tag);
    setTagInsects(filtered);
  }, [insects, tag]);

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
      }
    }[tagName];
    return tagData || { icon: "🐛", iconImage: null, description: "昆虫の仲間たち", color: "from-green-400 to-blue-500" };
  };

  const tagInfo = getTagInfo(tag);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* 背景画像 */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-30"
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
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
                {tagInsects.map((insect, index) => (
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

        {/* フッター */}
        <footer className="py-8 bg-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-sm text-gray-400">
              © 2024 mushinomori - すべての画像は商用利用可能です
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
