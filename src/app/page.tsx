import Link from "next/link";
import { ChefHat, Sparkles, Clock, Heart } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* ヘッダー */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <ChefHat className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500" />
            <h1 className="text-lg sm:text-2xl font-bold text-gray-900">
              nokoriごはん
            </h1>
          </div>
          <div className="flex gap-2 sm:gap-4">
            <Link
              href="/login"
              className="text-gray-600 hover:text-gray-900 border border-gray-300 hover:border-gray-400 px-3 py-2 rounded-lg text-sm sm:text-base text-center"
            >
              ログイン
            </Link>
            <Link
              href="/signup"
              className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-lg text-sm sm:text-base text-center"
            >
              始める
            </Link>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto px-4 py-16">
        {/* ヒーローセクション */}
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="block">残り物を入力するだけで</span>
            <span className="block text-orange-500">簡単にレシピを作成</span>
          </h2>
          <div className="text-base sm:text-xl text-gray-600 mb-12 space-y-2">
            <p>冷蔵庫の残り物から、AIが最適なレシピを提案します。もうレシピ作成に悩むことはありません。</p>
          </div>
          <Link
            href="/signup"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold inline-flex items-center justify-center space-x-2 w-full sm:w-auto max-w-xs mx-auto"
          >
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>レシピを作成してみる</span>
          </Link>
        </div>

        {/* 機能紹介 */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ChefHat className="h-8 w-8 text-orange-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              2パターンのレシピ提案
            </h3>
            <p className="text-gray-600">
              残り物のみで作るシンプルレシピと、買い足して作る栄養バランス重視レシピを同時に提案
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              時短で簡単
            </h3>
            <p className="text-gray-600">
              食材を入力するだけで、調理時間や人数に合わせたレシピが瞬時に生成されます
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-pink-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              個人設定に対応
            </h3>
            <p className="text-gray-600">
              アレルギー、持っている調理器具、栄養目標に合わせてパーソナライズされたレシピ
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 text-center bg-white rounded-2xl p-6 sm:p-12 max-w-4xl mx-auto shadow-sm">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            今すぐ始めてみませんか？
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-8">
            アカウントを作成すると、残り物やレシピを保存することができます。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/signup"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold w-full sm:w-auto"
            >
              無料でアカウント作成
            </Link>
            <Link
              href="/login"
              className="text-gray-600 hover:text-gray-900 border border-gray-300 hover:border-gray-400 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-sm sm:text-base w-full sm:w-auto text-center"
            >
              既にアカウントをお持ちの方
            </Link>
          </div>
        </div>
      </main>

      {/* フッター */}
      <footer className="bg-gray-900 text-white py-12 mt-24">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <ChefHat className="h-6 w-6 text-orange-500" />
            <span className="text-xl font-bold">nokoriごはん</span>
          </div>
          <p className="text-gray-400">残り物から始まる、新しい料理の発見</p>
        </div>
      </footer>
    </div>
  );
}
