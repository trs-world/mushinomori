"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getAllInsectData, filterInsects, type InsectData } from '@/data/generatedImageData';

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(query);
  const [insects, setInsects] = useState<InsectData[]>([]);
  const [filteredInsects, setFilteredInsects] = useState<InsectData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 18;

  // 昆虫データの初期化（全カエルデータを含む）
  useEffect(() => {
    // 自動生成されたデータを取得を試行、失敗時はフォールバック
    let insectData;
    try {
      insectData = getAllInsectData();
    } catch (error) {
      console.warn('自動生成データの読み込みに失敗、フォールバックデータを使用:', error);
      // フォールバックデータ（全28種類のカエルを含む）
      insectData = [
        // 既存の昆虫データ（省略）
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
        
        // 全28種類のカエル
        { name: "アイフィンガーガエル", category: "カエル", imagePath: "/カエル/アイフィンガーガエル.png" },
        { name: "アフリカツメガエル(泳いでる姿)", category: "カエル", imagePath: "/カエル/アフリカツメガエル(泳いでる姿).png" },
        { name: "アフリカツメガエル", category: "カエル", imagePath: "/カエル/アフリカツメガエル.png" },
        { name: "アマミイシカワガエル", category: "カエル", imagePath: "/カエル/アマミイシカワガエル.png" },
        { name: "アメフクラガエル", category: "カエル", imagePath: "/カエル/アメフクラガエル.png" },
        { name: "ウシガエル", category: "カエル", imagePath: "/カエル/ウシガエル.png" },
        { name: "オオハナサキガエル", category: "カエル", imagePath: "/カエル/オオハナサキガエル.png" },
        { name: "オットンガエル", category: "カエル", imagePath: "/カエル/オットンガエル.png" },
        { name: "ゴライアスガエル", category: "カエル", imagePath: "/カエル/ゴライアスガエル.png" },
        { name: "サドガエル", category: "カエル", imagePath: "/カエル/サドガエル.png" },
        { name: "タゴガエル", category: "カエル", imagePath: "/カエル/タゴガエル.png" },
        { name: "チョウセンヤマアカガエル", category: "カエル", imagePath: "/カエル/チョウセンヤマアカガエル.png" },
        { name: "ツチガエル", category: "カエル", imagePath: "/カエル/ツチガエル.png" },
        { name: "ツノガエル(アルビノ)", category: "カエル", imagePath: "/カエル/ツノガエル(アルビノ).png" },
        { name: "ツノガエル(ペパーミント)", category: "カエル", imagePath: "/カエル/ツノガエル(ペパーミント).png" },
        { name: "ツノガエル(緑)", category: "カエル", imagePath: "/カエル/ツノガエル(緑).png" },
        { name: "ツノガエル(赤)", category: "カエル", imagePath: "/カエル/ツノガエル(赤).png" },
        { name: "トウキョウダルマガエル", category: "カエル", imagePath: "/カエル/トウキョウダルマガエル.png" },
        { name: "トノサマガエル", category: "カエル", imagePath: "/カエル/トノサマガエル.png" },
        { name: "ナミガエル", category: "カエル", imagePath: "/カエル/ナミガエル.png" },
        { name: "ヌマガエル", category: "カエル", imagePath: "/カエル/ヌマガエル.png" },
        { name: "ハナサキガエル", category: "カエル", imagePath: "/カエル/ハナサキガエル.png" },
        { name: "バシェットガエル(口開け)", category: "カエル", imagePath: "/カエル/バシェットガエル(口開け).png" },
        { name: "バジェットガエル", category: "カエル", imagePath: "/カエル/バジェットガエル.png" },
        { name: "ヒキガエル", category: "カエル", imagePath: "/カエル/ヒキガエル.png" },
        { name: "ホルストガエル", category: "カエル", imagePath: "/カエル/ホルストガエル.png" },
        { name: "ヤエヤマアオガエル", category: "カエル", imagePath: "/カエル/ヤエヤマアオガエル.png" },
        { name: "ヤドクガエル", category: "カエル", imagePath: "/カエル/ヤドクガエル.png" },
        
        // チョウ
        { name: "アオスジアゲハ", category: "チョウ", imagePath: "/チョウ/アオスジアゲハ.png" },
        { name: "アカタテハ", category: "チョウ", imagePath: "/チョウ/アカタテハ.png" },
        { name: "アサギマダラ", category: "チョウ", imagePath: "/チョウ/アサギマダラ.png" },
        { name: "モンシロチョウ", category: "チョウ", imagePath: "/チョウ/モンシロチョウ.png" },
        { name: "ベニシジミ", category: "チョウ", imagePath: "/チョウ/ベニシジミ.png" },
        
        // カブト・クワガタ
        { name: "カブトムシ", category: "カブト・クワガタ", imagePath: "/カブト・クワガタ/カブトムシ.png" },
        { name: "オオクワガタ", category: "カブト・クワガタ", imagePath: "/カブト・クワガタ/オオクワガタ.png" },
        { name: "ヒラタクワガタ", category: "カブト・クワガタ", imagePath: "/カブト・クワガタ/ヒラタクワガタ.png" },
        
        // ガ
        { name: "アケビコノハ", category: "ガ", imagePath: "/ガ/アケビコノハ.png" },
        { name: "オオミズアオ", category: "ガ", imagePath: "/ガ/オオミズアオ.png" },
        
        // 身近な虫
        { name: "ナナホシテントウ", category: "身近な虫", imagePath: "/身近な虫/ナナホシテントウ.png" },
        { name: "アカトンボ", category: "身近な虫", imagePath: "/身近な虫/アカトンボ.png" },
        { name: "カタツムリ", category: "身近な虫", imagePath: "/身近な虫/カタツムリ.png" },
        
        // その他
        { name: "ディアボリカル・アイアンクラッド・ビートル", category: "その他", imagePath: "/その他/ディアボリカル・アイアンクラッド・ビートル.png" },
        { name: "ブルドッグアリ", category: "その他", imagePath: "/その他/ブルドッグアリ.png" }
      ];
    }
    setInsects(insectData);
  }, []);

  // 検索クエリが変更されたときの処理
  useEffect(() => {
    if (query) {
      setSearchQuery(query);
      const filtered = filterInsects(insects, query);
      setFilteredInsects(filtered);
      setCurrentPage(1); // 検索時にページを1に戻す
    } else {
      setFilteredInsects([]);
      setCurrentPage(1);
    }
  }, [query, insects]);

  // 検索実行
  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  // エンターキー処理
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(searchQuery);
    }
  };

  // ページネーション用の計算
  const totalPages = Math.ceil(filteredInsects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentInsects = filteredInsects.slice(startIndex, endIndex);

  // ページ変更処理
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
        <section className="py-8 md:py-12 bg-gradient-to-r from-green-400 to-emerald-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <Link href="/" className="inline-block mb-4">
              <h1 className="text-2xl md:text-3xl font-bold hover:text-green-200 transition-colors">
                虫の森.com
              </h1>
            </Link>
            
            {/* 検索バー */}
            <div className="w-full max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="昆虫名で検索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full px-4 md:px-6 py-3 md:py-4 text-base md:text-lg rounded-full border-0 shadow-lg focus:outline-none focus:ring-4 focus:ring-green-500/50 bg-white/90 backdrop-blur-sm text-gray-800"
                />
                <button 
                  onClick={() => handleSearch(searchQuery)}
                  className="absolute right-1 md:right-2 top-1/2 transform -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white p-2 md:p-3 rounded-full transition-colors"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ナビゲーション */}
        <section className="py-4 bg-white/90 backdrop-blur-sm border-b">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-green-600 transition-colors">
                ホーム
              </Link>
              <span>›</span>
              <span className="text-green-600 font-medium">
                検索結果{query && `: "${query}"`}
              </span>
            </div>
          </div>
        </section>

        {/* 検索結果 */}
        <section className="py-8 md:py-12 bg-white/90 backdrop-blur-sm min-h-[60vh]">
          <div className="max-w-7xl mx-auto px-4">
            {query ? (
              <>
                <div className="mb-6 md:mb-8">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                    「{query}」の検索結果
                  </h2>
                  <p className="text-gray-600">
                    {filteredInsects.length}件の結果が見つかりました
                  </p>
                </div>

                {filteredInsects.length > 0 ? (
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
                    <div className="mt-8 flex justify-center items-center space-x-2">
                      {/* 前へボタン */}
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          currentPage === 1
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-green-50 hover:text-green-600 border border-gray-300'
                        }`}
                      >
                        前へ
                      </button>

                      {/* ページ番号 */}
                      <div className="flex space-x-1">
                        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }

                          return (
                            <button
                              key={pageNum}
                              onClick={() => handlePageChange(pageNum)}
                              className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                                currentPage === pageNum
                                  ? 'bg-green-600 text-white'
                                  : 'bg-white text-gray-700 hover:bg-green-50 hover:text-green-600 border border-gray-300'
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                      </div>

                      {/* 次へボタン */}
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          currentPage === totalPages
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-green-50 hover:text-green-600 border border-gray-300'
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
                    検索結果が見つかりません
                  </h3>
                    <p className="text-gray-500 mb-4">
                      「{query}」に一致する昆虫が見つかりませんでした。
                    </p>
                    <p className="text-gray-500 text-sm">
                      別のキーワードで検索してみてください。
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-4xl text-green-600">🔍</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  昆虫を検索してください
                </h3>
                <p className="text-gray-500">
                  上の検索バーに昆虫名を入力して検索してください。
                </p>
              </div>
            )}
          </div>
        </section>

        {/* 戻るボタン */}
        <section className="py-6 bg-green-50/90 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              ホームに戻る
            </Link>
          </div>
        </section>

      </div>
      
      {/* フッター */}
      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-2xl text-green-600">🔍</span>
          </div>
          <p className="text-gray-600">検索ページを読み込み中...</p>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
