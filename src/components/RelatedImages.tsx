"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { generateInsectDataFromImages } from '@/utils/imageScanner';

interface InsectData {
  name: string;
  category: string;
  imagePath: string;
}

interface RelatedImagesProps {
  currentInsect: InsectData;
}

export default function RelatedImages({ currentInsect }: RelatedImagesProps) {
  const [relatedInsects, setRelatedInsects] = useState<InsectData[]>([]);

  useEffect(() => {
    // 全ての昆虫データを取得
    const allInsects = generateInsectDataFromImages();
    
    // 同じカテゴリの昆虫をフィルタリング（現在の昆虫を除く）
    const sameCategory = allInsects.filter(
      insect => insect.category === currentInsect.category && insect.name !== currentInsect.name
    );

    // ランダムに4つ選択
    const shuffled = [...sameCategory].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 4);
    
    setRelatedInsects(selected);
  }, [currentInsect]);

  if (relatedInsects.length === 0) {
    return null;
  }

  return (
    <div className="mt-16 max-w-6xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-green-700 text-center mb-8">
        他の{currentInsect.category}もどうぞ！
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {relatedInsects.map((insect, index) => (
          <Link
            key={`${insect.name}-${index}`}
            href={`/insect/${encodeURIComponent(insect.name)}`}
            className="group"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group-hover:scale-105">
              <div className="aspect-square relative">
                <Image
                  src={insect.imagePath}
                  alt={insect.name}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="p-3">
                <h3 className="text-sm md:text-base font-medium text-gray-800 text-center line-clamp-2">
                  {insect.name}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
