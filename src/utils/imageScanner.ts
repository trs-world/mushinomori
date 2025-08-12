// 画像自動スキャン用ユーティリティ
export interface InsectData {
  name: string;
  category: string;
  imagePath: string;
}

// 画像ファイルの拡張子
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp', '.gif'];

// カテゴリマッピング（日本語カテゴリ名）
const CATEGORY_MAPPING: Record<string, string> = {
  'セミ': 'セミ',
  'チョウ': 'チョウ',
  'カブト・クワガタ': 'カブト・クワガタ',
  'ガ': 'ガ',
  'カエル': 'カエル',
  'その他': 'その他',
  '身近な虫': '身近な虫'
};

/**
 * ビルド時に生成された画像データを取得
 * 実際の画像スキャンはbuild時にscripts/generateImageData.jsで実行される
 */
export function generateInsectDataFromImages(): InsectData[] {
  try {
    // 生成されたデータファイルから読み込み
    const generatedData = require('@/data/generatedImageData');
    return generatedData.getAllInsectData();
  } catch (error) {
    console.warn('Generated image data not found, using fallback data:', error);
    
    // フォールバック用の基本データ
    return [
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
      
      // カエル（全28種類）
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
      { name: "トノサマガエル", category: "カエル", imagePath: "/カエル/ナミガエル.png" },
      { name: "ナミガエル", category: "カエル", imagePath: "/カエル/ナミガエル.png" },
      { name: "ヌマガエル", category: "カエル", imagePath: "/カエル/ヌマガエル.png" },
      { name: "ハナサキガエル", category: "カエル", imagePath: "/カエル/ハナサキガエル.png" },
      { name: "バシェットガエル(口開け)", category: "カエル", imagePath: "/カエル/バシェットガエル(口開け).png" },
      { name: "バジェットガエル", category: "カエル", imagePath: "/カエル/バジェットガエル.png" },
      { name: "ヒキガエル", category: "カエル", imagePath: "/カエル/ヒキガエル.png" },
      { name: "ホルストガエル", category: "カエル", imagePath: "/カエル/ホルストガエル.png" },
      { name: "ヤエヤマアオガエル", category: "カエル", imagePath: "/カエル/ヤエヤマアオガエル.png" },
      { name: "ヤドクガエル", category: "カエル", imagePath: "/カエル/ヤドクガエル.png" },
    ];
  }
}

/**
 * ファイル名から表示名を生成（拡張子を除去）
 */
export function getDisplayNameFromFilename(filename: string): string {
  return filename.replace(/\.[^/.]+$/, '');
}

/**
 * カテゴリ別に昆虫データをグループ化
 */
export function groupInsectsByCategory(insects: InsectData[]): Record<string, InsectData[]> {
  return insects.reduce((groups, insect) => {
    const category = insect.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(insect);
    return groups;
  }, {} as Record<string, InsectData[]>);
}

/**
 * 検索用のフィルタリング関数
 */
export function filterInsects(insects: InsectData[], query: string): InsectData[] {
  if (!query.trim()) return insects;
  
  const lowercaseQuery = query.toLowerCase();
  return insects.filter(insect =>
    insect.name.toLowerCase().includes(lowercaseQuery) ||
    insect.category.toLowerCase().includes(lowercaseQuery)
  );
}
