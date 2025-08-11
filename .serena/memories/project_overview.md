# プロジェクト概要

## アプリ名
nokoriごはん - 残り物を入力するだけで簡単にレシピを作成できるアプリ

## 技術スタック（フロントエンド）
- **フレームワーク**: Next.js 15 (App Router使用)
- **言語**: TypeScript (strict mode)
- **スタイリング**: Tailwind CSS v4 + PostCSS
- **状態管理**: React Context (AuthContext)
- **HTTP クライアント**: Axios
- **UI コンポーネント**: 
  - @headlessui/react (アクセシビリティ対応)
  - lucide-react (アイコン)
- **ユーティリティ**: 
  - clsx (条件付きクラス名)
  - tailwind-merge (Tailwindクラスのマージ)

## プロジェクト構造（フロントエンドのみ確認）
```
src/
├── app/                 # Next.js App Router
│   ├── globals.css     # グローバルスタイル
│   ├── layout.tsx      # ルートレイアウト
│   ├── page.tsx        # ホームページ
│   ├── login/page.tsx  # ログインページ
│   ├── signup/page.tsx # サインアップページ
│   └── planning/page.tsx # プランニングページ
├── contexts/
│   └── AuthContext.tsx # 認証コンテキスト
└── lib/
    ├── api.ts         # API クライアント設定とインターフェース
    └── utils.ts       # ユーティリティ関数
```

## 対応デバイス
PC、スマートフォン（レスポンシブデザイン）

## 主要機能（CLAUDE.mdより）
- ユーザー設定管理（調理人数、アレルギー、道具、調味料、栄養目標）
- 食材在庫管理（数量・賞味期限付き）
- 2パターンレシピ生成（残り物活用 + 栄養最適化）
- 買い出しリスト機能
- レシピ保存機能

## バックエンド構成（CLAUDE.mdより）
- Rails 8 + PostgreSQL
- GPT-5 mini API連携
- JWT認証

## 実装済み機能
✅ ユーザー認証（JWT）
✅ ユーザー設定管理
✅ 食材在庫管理
✅ GPT-5 mini連携
✅ 2パターンレシピ生成
✅ 買い出しリスト機能
✅ レスポンシブUI