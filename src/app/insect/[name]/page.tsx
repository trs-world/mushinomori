"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

// 昆虫データの型定義
interface InsectData {
  name: string;
  category: string;
  imagePath: string;
}

export default function InsectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [insect, setInsect] = useState<InsectData | null>(null);
  const [loading, setLoading] = useState(true);

  // 昆虫データベース（メインページと同じデータ）
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

  useEffect(() => {
    const insectName = decodeURIComponent(params.name as string);
    const foundInsect = insectData.find(item => item.name === insectName);
    
    if (foundInsect) {
      setInsect(foundInsect);
    }
    setLoading(false);
  }, [params.name]);

  // シェア機能
  const handleShare = () => {
    if (insect) {
      const shareUrl = window.location.href;
      const shareText = `${insect.name}の画像をチェック！ - mushinomori`;
      
      if (navigator.share) {
        navigator.share({
          title: shareText,
          url: shareUrl,
        });
      } else {
        // フォールバック: X（Twitter）でシェア
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        window.open(twitterUrl, '_blank');
      }
    }
  };

  // ダウンロード機能
  const handleDownload = async () => {
    if (insect) {
      try {
        const response = await fetch(insect.imagePath);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${insect.name}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('ダウンロードエラー:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  if (!insect) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">昆虫が見つかりません</h1>
          <button
            onClick={() => router.push('/')}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            ホームに戻る
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFBF0' }}>
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={() => router.push('/')}
            className="flex items-center text-green-600 hover:text-green-700 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            ホームに戻る
          </button>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          {/* タイトル */}
          <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-12">
            {insect.name}
          </h1>

          {/* 画像表示 */}
          <div className="mb-12">
            <div className="relative w-full max-w-lg mx-auto">
              <div className="aspect-square relative">
                <Image
                  src={insect.imagePath}
                  alt={insect.name}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>

          {/* アクションボタン */}
          <div className="flex items-center justify-center gap-6 mb-8">
            {/* シェアボタン（X + はてなブックマークアイコン） */}
            <button
              onClick={handleShare}
              className="flex items-center gap-2"
            >
              <Image
                src="/x-icon.png"
                alt="Xでシェア"
                width={32}
                height={32}
                className="hover:opacity-80 transition-opacity"
              />
              <Image
                src="/hatena-icon.png"
                alt="はてなブックマーク"
                width={32}
                height={32}
                className="hover:opacity-80 transition-opacity"
              />
            </button>

            {/* ダウンロードボタン */}
            <button
              onClick={handleDownload}
              className="bg-green-600 hover:bg-green-700 text-white px-12 py-4 rounded-full text-lg font-medium transition-colors"
            >
              ダウンロード
            </button>
          </div>

          {/* 利用規約など */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg max-w-2xl mx-auto">
            <p className="text-sm text-gray-600">
              この画像は無料でダウンロードできます。<br />
              商用利用も可能です。再配布は禁止されています。
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
