# 推奨コマンド一覧

## 開発サーバー起動
```bash
# フロントエンドのみ（Next.js）
npm run dev

# バックエンドと同時起動（プロジェクトルートから）
./dev-start.sh
```

## ビルド・本番環境
```bash
# プロダクションビルド
npm run build

# 本番サーバー起動
npm start
```

## コード品質チェック
```bash
# ESLint実行
npm run lint

# TypeScript型チェック（明示的コマンドなし、IDEで確認）
npx tsc --noEmit
```

## パッケージ管理
```bash
# 依存関係インストール
npm install

# パッケージ追加
npm install <package-name>

# 開発依存関係追加
npm install --save-dev <package-name>
```

## Git 操作（macOS Darwin環境）
```bash
# ステータス確認
git status

# 変更をステージング
git add <file>

# コミット
git commit -m "message"

# プッシュ
git push origin <branch>

# ブランチ作成・切り替え
git checkout -b <branch-name>
```

## システムユーティリティ（macOS）
```bash
# ファイル一覧
ls -la

# ディレクトリ移動
cd <directory>

# ファイル検索
find . -name "*.tsx"

# 文字列検索（grep）
grep -r "検索文字列" src/

# プロセス確認
ps aux | grep node
```

## Next.js 特有
```bash
# Turbopack使用（高速開発サーバー）
npm run dev  # package.jsonで--turbopack指定済み

# キャッシュクリア
rm -rf .next/

# 型定義確認
npx next info
```

## 推奨開発フロー
1. `npm run dev` で開発サーバー起動
2. コード変更
3. `npm run lint` で品質チェック
4. `npx tsc --noEmit` で型チェック
5. Git コミット
6. 必要に応じて `npm run build` でビルドテスト

## 注意事項
- OpenAI API Key設定が必要（backend/.env）
- PostgreSQL起動が必要
- Node.js環境必要