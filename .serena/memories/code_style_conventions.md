# コードスタイルと規約

## 言語とファイル
- **言語**: TypeScript (strict mode有効)
- **JSXファイル**: `.tsx` 拡張子
- **TSファイル**: `.ts` 拡張子

## TypeScript 設定
- target: ES2017
- strict: true
- Path alias: `@/*` → `./src/*`
- JSX: preserve (Next.js処理)

## ESLint 設定
- next/core-web-vitals
- next/typescript
- FlatCompat使用（ESLint v9対応）

## 命名規約
- **コンポーネント**: PascalCase (`AuthProvider`, `Home`)
- **ファイル**: kebab-case or PascalCase (page.tsx, AuthContext.tsx)
- **変数/関数**: camelCase (`isLoading`, `setUser`)
- **定数**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **インターフェース**: PascalCase (`User`, `AuthResponse`)

## React パターン
- 関数コンポーネントのみ使用
- `export default function` パターン
- React Hooksの使用（useState, useEffect, useContext）
- カスタムフック（`useAuth`）

## スタイリング
- **CSS フレームワーク**: Tailwind CSS v4
- **スタイル方法**: className属性でTailwindクラス使用
- **レスポンシブ**: モバイルファースト（sm:, md:, lg:）
- **カラーパレット**: 
  - プライマリ: orange-500系
  - セカンダリ: green, pink
  - 背景: gradient-to-br from-orange-50 to-yellow-50

## API クライアント
- **ライブラリ**: Axios
- **設定**: インターセプター使用（リクエスト/レスポンス）
- **ベースURL**: 環境変数 `API_BASE_URL`
- **認証**: JWTトークンをHeaderに自動付与

## コメントスタイル
- 日本語コメント使用
- JSXでは `{/* コメント */}` 形式
- TSでは `// コメント` または `/* コメント */`

## インターフェース定義
```typescript
export interface User {
  id: number
  name: string
  email: string
  created_at: string
}
```

## エラーハンドリング
- try-catch文使用
- console.error でのログ出力
- localStorage のクリーンアップ

## インポート順序
1. Reactライブラリ
2. 外部ライブラリ
3. 内部ライブラリ（@/で始まる）
4. 相対パス

## 例外・特徴
- UI文言は全て日本語
- レスポンシブ対応必須
- アクセシビリティ配慮（@headlessui使用）