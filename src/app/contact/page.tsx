'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('送信エラー:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="text-green-600 text-xl">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
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
        {/* パンくずナビゲーション */}
        <nav className="mb-6">
          <div className="flex items-center space-x-2 text-sm">
            <button
              onClick={() => router.push('/')}
              className="text-green-600 hover:text-green-800 transition-colors"
            >
              ホーム
            </button>
            <span className="text-gray-500">›</span>
            <span className="text-gray-700 font-medium">お問い合わせ</span>
          </div>
        </nav>

        {/* メインカード */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 max-w-4xl mx-auto">
          {/* ヘッダー */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              📧 お問い合わせ
            </h1>
            <p className="text-gray-600 text-lg">
              虫の森.com へのご質問・ご要望
            </p>
          </div>

          {/* お問い合わせフォーム */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* お名前 */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  お名前 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="山田太郎"
                />
              </div>

              {/* メールアドレス */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  メールアドレス <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="example@email.com"
                />
              </div>
            </div>

            {/* お問い合わせ種別 */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                お問い合わせ種別 <span className="text-red-500">*</span>
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              >
                <option value="">選択してください</option>
                <option value="利用について">イラストの利用について</option>
                <option value="商用利用">商用利用について</option>
                <option value="技術的問題">技術的な問題</option>
                <option value="要望・提案">要望・提案</option>
                <option value="その他">その他</option>
              </select>
            </div>

            {/* お問い合わせ内容 */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                お問い合わせ内容 <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-vertical"
                placeholder="お問い合わせ内容をご記入ください..."
              />
            </div>

            {/* 送信ボタン */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 hover:shadow-xl hover:scale-105'
                } text-white`}
              >
                {isSubmitting ? '📤 送信中...' : '📧 送信する'}
              </button>
            </div>

            {/* 送信結果メッセージ */}
            {submitStatus === 'success' && (
              <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center">
                ✅ お問い合わせを送信しました。内容を確認後、ご連絡いたします。
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
                ❌ 送信に失敗しました。しばらく時間をおいて再度お試しください。
              </div>
            )}
          </form>

          {/* 注意事項 */}
          <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-bold text-blue-800 mb-3">📝 お問い合わせについて</h3>
            <ul className="text-blue-700 text-sm space-y-2">
              <li>• お返事には2-3営業日いただく場合があります</li>
              <li>• 内容によってはお返事できない場合があります</li>
              <li>• 個人情報は適切に管理し、お問い合わせ対応以外には使用いたしません</li>
              <li>• 営業・宣伝目的のお問い合わせはご遠慮ください</li>
            </ul>
          </div>

          {/* よくある質問 */}
          <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
            <h3 className="text-lg font-bold text-green-800 mb-4">❓ よくある質問</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-green-700 mb-1">Q. イラストは商用利用できますか？</h4>
                <p className="text-green-600 text-sm">A. はい、すべてのイラストは商用利用可能です。詳しくは利用規約をご確認ください。</p>
              </div>
              <div>
                <h4 className="font-medium text-green-700 mb-1">Q. クレジット表記は必要ですか？</h4>
                <p className="text-green-600 text-sm">A. クレジット表記は不要ですが、していただけると嬉しいです。</p>
              </div>
              <div>
                <h4 className="font-medium text-green-700 mb-1">Q. イラストの加工は可能ですか？</h4>
                <p className="text-green-600 text-sm">A. はい、色変更やサイズ変更など、自由に加工していただけます。</p>
              </div>
            </div>
          </div>

          {/* ホームに戻るボタン */}
          <div className="text-center mt-12">
            <button
              onClick={() => router.push('/')}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              🏠 ホームに戻る
            </button>
          </div>
        </div>
      </div>

      {/* フッター */}
      <Footer />
    </div>
  );
}
