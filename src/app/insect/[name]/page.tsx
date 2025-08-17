"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RelatedImages from '@/components/RelatedImages';
import { generateInsectDataFromImages } from '@/utils/imageScanner';

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

  useEffect(() => {
    const insectName = decodeURIComponent(params.name as string);
    
    // 動的データから昆虫を検索
    const insectData = generateInsectDataFromImages();
    const foundInsect = insectData.find(item => item.name === insectName);
    
    if (foundInsect) {
      setInsect(foundInsect);
    }
    setLoading(false);
  }, [params.name]);

  // Xシェア機能
  const handleXShare = () => {
    if (insect) {
      const imageUrl = `${window.location.origin}/insect/${insect.name}`;
      const shareText = `${insect.name}の画像をチェック！🌲\n\n画像: ${imageUrl}\n\n#虫の森 #虫`;
      
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
      window.open(twitterUrl, '_blank');
    }
  };

  // はてなブックマークシェア機能
  const handleHatenaShare = () => {
    if (insect) {
      const pageUrl = window.location.href;
      const hatenaUrl = `https://b.hatena.ne.jp/entry/${encodeURIComponent(pageUrl)}`;
      window.open(hatenaUrl, '_blank');
    }
  };

  // 一般的なシェア機能（Web Share API対応デバイス用）
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
        // フォールバック: Xシェアを呼び出し
        handleXShare();
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* ヘッダー */}
      <Header />
      
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
        {/* 戻るボタン */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 bg-white/90 hover:bg-white backdrop-blur-sm text-green-700 hover:text-green-800 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-medium"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 19l-7-7 7-7" 
              />
            </svg>
            戻る
          </button>
        </div>

        <main className="max-w-4xl mx-auto">
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
          <div className="flex flex-col items-center justify-center gap-4 mb-8">
            {/* ダウンロードボタン */}
            <button
              onClick={handleDownload}
              className="bg-green-600 hover:bg-green-700 text-white px-12 py-4 rounded-full text-lg font-medium transition-colors"
            >
              ダウンロード
            </button>

            {/* シェアボタン（X + はてなブックマークアイコン） */}
            <button
              onClick={handleXShare}
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
                className="hover:opacity-80 transition-opacity cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleHatenaShare();
                }}
              />
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

        {/* 関連画像セクション */}
        <RelatedImages currentInsect={insect} />
        </main>
      </div>
      
      {/* フッター */}
      <Footer />
    </div>
  );
}
