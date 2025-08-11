const fs = require('fs');
const path = require('path');

// 画像ファイルの拡張子
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp', '.gif'];

/**
 * publicフォルダから画像を再帰的にスキャンして昆虫データを生成
 */
function scanImagesFromPublicFolder() {
  const publicPath = path.join(__dirname, '..', 'public');
  const insectData = [];

  // publicフォルダ内のディレクトリをスキャン
  const categories = fs.readdirSync(publicPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(name => !['_redirects'].includes(name) && !name.startsWith('.'));

  categories.forEach(category => {
    const categoryPath = path.join(publicPath, category);
    
    try {
      const files = fs.readdirSync(categoryPath);
      
      files.forEach(file => {
        const ext = path.extname(file).toLowerCase();
        if (IMAGE_EXTENSIONS.includes(ext)) {
          const name = path.basename(file, ext);
          const imagePath = `/${category}/${file}`;
          
          insectData.push({
            name: name,
            category: category,
            imagePath: imagePath
          });
        }
      });
    } catch (error) {
      console.warn(`Warning: Could not read directory ${categoryPath}:`, error.message);
    }
  });

  return insectData;
}

/**
 * 生成されたデータをTypeScriptファイルとして出力
 */
function generateImageDataFile() {
  const insectData = scanImagesFromPublicFolder();
  
  const fileContent = `// 自動生成されたファイル - 手動で編集しないでください
// 生成日時: ${new Date().toISOString()}

export interface InsectData {
  name: string;
  category: string;
  imagePath: string;
}

export const GENERATED_INSECT_DATA: InsectData[] = ${JSON.stringify(insectData, null, 2)};

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
 * 全ての昆虫データを取得
 */
export function getAllInsectData(): InsectData[] {
  return GENERATED_INSECT_DATA;
}
`;

  const outputPath = path.join(__dirname, '..', 'src', 'data', 'generatedImageData.ts');
  
  // dataディレクトリが存在しない場合は作成
  const dataDir = path.dirname(outputPath);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  fs.writeFileSync(outputPath, fileContent, 'utf8');
  
  console.log(`✅ 画像データファイルを生成しました: ${outputPath}`);
  console.log(`📊 合計 ${insectData.length} 個の画像を検出しました`);
  
  // カテゴリ別の統計を表示
  const categoryStats = {};
  insectData.forEach(item => {
    categoryStats[item.category] = (categoryStats[item.category] || 0) + 1;
  });
  
  console.log('📈 カテゴリ別統計:');
  Object.entries(categoryStats).forEach(([category, count]) => {
    console.log(`  - ${category}: ${count}個`);
  });
}

// スクリプトが直接実行された場合
if (require.main === module) {
  generateImageDataFile();
}

module.exports = { generateImageDataFile, scanImagesFromPublicFolder };
