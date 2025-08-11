# アーキテクチャとデザインパターン

## 全体アーキテクチャ
- **フロントエンド**: Next.js 15 (App Router) + TypeScript
- **バックエンド**: Rails 8 + PostgreSQL (別リポジトリ)
- **API通信**: RESTful API + JWT認証
- **外部API**: GPT-5 mini (レシピ生成)

## Next.js App Router パターン
```
src/app/
├── layout.tsx          # ルートレイアウト
├── page.tsx            # ホーム（/）
├── login/page.tsx      # ログイン（/login）
├── signup/page.tsx     # サインアップ（/signup）
└── planning/page.tsx   # プランニング（/planning）
```

## 状態管理パターン
### React Context使用
```typescript
// contexts/AuthContext.tsx
const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // 状態管理ロジック
}

export function useAuth() {
  const context = useContext(AuthContext)
  // カスタムフック
}
```

## API通信パターン
### Axiosインスタンス + インターセプター
```typescript
// lib/api.ts
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
})

// リクエストインターセプター（JWT自動付与）
api.interceptors.request.use()

// レスポンスインターセプター（エラーハンドリング）
api.interceptors.response.use()
```

## TypeScript 型定義パターン
### インターフェース定義
```typescript
export interface User {
  id: number
  name: string
  email: string
  created_at: string
}

export interface AuthResponse {
  token: string
  user: User
}
```

### API関数の型安全性
```typescript
const authApi = {
  login: (data: LoginRequest): Promise<AuthResponse> => 
    api.post('/auth/login', data).then(res => res.data),
  
  signup: (data: SignupRequest): Promise<AuthResponse> => 
    api.post('/auth/signup', data).then(res => res.data)
}
```

## UI/UXパターン
### レスポンシブデザイン
- モバイルファースト設計
- Tailwind CSS のブレークポイント使用
- `text-sm sm:text-base` などのレスポンシブクラス

### 日本語UI
- 全ての文言が日本語
- ユーザビリティ重視のシンプルなデザイン

## データフローパターン
```
User Action → Component → API Call → Backend → Database
                ↓
            State Update ← API Response ← Rails API ← 
```

## エラーハンドリングパターン
### 認証エラー
```typescript
// 401エラー時は自動ログアウト
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // ログアウト処理
    }
    return Promise.reject(error)
  }
)
```

### ローカルストレージ管理
```typescript
// AuthContext内でのデータ永続化
localStorage.setItem('user', JSON.stringify(user))
localStorage.setItem('token', token)
```

## セキュリティパターン
- JWT トークンの適切な管理
- Next.jsのデフォルトXSS保護機能活用
- 環境変数での機密情報管理

## パフォーマンスパターン
- Next.js App Routerの自動最適化
- Turbopack使用（高速開発）
- 画像最適化（next/image使用予定）

## コンポーネント設計原則
- 単一責任の原則
- 再利用可能なコンポーネント設計
- propsの型安全性確保
- デフォルトexportパターンの使用