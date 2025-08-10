"use client";

import Image from "next/image";
import { useState } from "react";

// Sample image data - in a real app, this would come from an API
const sampleImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    alt: "森の風景",
    title: "静寂な森",
    category: "自然",
    downloads: 1234,
    photographer: "Nature Lover"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=800&q=80",
    alt: "山の風景",
    title: "雄大な山々",
    category: "自然",
    downloads: 987,
    photographer: "Mountain Explorer"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=800&q=80",
    alt: "動物",
    title: "可愛い動物",
    category: "動物",
    downloads: 2156,
    photographer: "Animal Friend"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80",
    alt: "建物",
    title: "モダン建築",
    category: "建物",
    downloads: 876,
    photographer: "Architecture Fan"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
    alt: "食べ物",
    title: "美味しい料理",
    category: "食べ物",
    downloads: 1543,
    photographer: "Food Artist"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    alt: "花",
    title: "美しい花",
    category: "自然",
    downloads: 1876,
    photographer: "Flower Lover"
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80",
    alt: "空",
    title: "青い空",
    category: "自然",
    downloads: 2341,
    photographer: "Sky Watcher"
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80",
    alt: "湖",
    title: "静かな湖",
    category: "自然",
    downloads: 1654,
    photographer: "Lake Explorer"
  }
];

export function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState<typeof sampleImages[0] | null>(null);

  const handleDownload = (image: typeof sampleImages[0]) => {
    // In a real app, this would trigger an actual download
    console.log("Downloading:", image.title);
    // Simulate download by opening the image in a new tab
    window.open(image.src, '_blank');
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sampleImages.map((image) => (
          <div
            key={image.id}
            className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="aspect-square relative overflow-hidden">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
              
              {/* Overlay buttons */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedImage(image)}
                    className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                  >
                    詳細
                  </button>
                  <button
                    onClick={() => handleDownload(image)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                  >
                    ダウンロード
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1">{image.title}</h3>
              <p className="text-sm text-gray-600 mb-2">by {image.photographer}</p>
              <div className="flex justify-between items-center">
                <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  {image.category}
                </span>
                <span className="text-xs text-gray-500">
                  {image.downloads.toLocaleString()} DL
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for image details */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-auto">
            <div className="relative">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-white text-gray-900 rounded-full p-2 hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="aspect-video relative">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 80vw"
                />
              </div>
              
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedImage.title}</h2>
                <p className="text-gray-600 mb-4">撮影者: {selectedImage.photographer}</p>
                <div className="flex items-center justify-between mb-6">
                  <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full">
                    {selectedImage.category}
                  </span>
                  <span className="text-gray-500">
                    {selectedImage.downloads.toLocaleString()} ダウンロード
                  </span>
                </div>
                
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleDownload(selectedImage)}
                    className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    無料ダウンロード
                  </button>
                  <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    お気に入り
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
