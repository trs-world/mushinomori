import Image from "next/image";

export function Hero() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          美しい無料画像を
          <span className="block text-green-600">みつけよう</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          mushinomoriは、クリエイターのための高品質な無料画像を提供するプラットフォームです。
          商用利用可能な美しい写真を自由にダウンロードできます。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            画像を探す
          </button>
          <button className="border border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 rounded-lg font-semibold transition-colors">
            アップロードする
          </button>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-emerald-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-green-300 rounded-full opacity-20 animate-pulse delay-500"></div>
    </section>
  );
}
