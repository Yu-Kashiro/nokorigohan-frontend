"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChefHat } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { authApi } from "@/lib/api";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors([]);

    try {
      const response = await authApi.signup({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      const { user, token } = response.data;

      login(user, token);
      router.push("/planning");
    } catch (err: any) {
      const errorData = err.response?.data;
      if (errorData?.errors) {
        setErrors(errorData.errors);
      } else {
        setErrors([errorData?.error || "アカウント作成に失敗しました"]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* メインコンテンツ */}
      <main className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-sm p-8">
            {/* ロゴ */}
            <div className="text-center mb-8">
              <Link
                href="/"
                className="flex items-center justify-center space-x-2 mb-6"
              >
                <ChefHat className="h-8 w-8 text-orange-500" />
                <h1 className="text-2xl font-bold text-gray-900">
                  nokoriごはん
                </h1>
              </Link>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                アカウント作成
              </h2>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="sr-only">
                    ニックネーム
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="ニックネーム"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">
                    メールアドレス
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="メールアドレス"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    パスワード
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="パスワード（6文字以上）"
                  />
                </div>
                <div>
                  <label htmlFor="password_confirmation" className="sr-only">
                    パスワード確認
                  </label>
                  <input
                    id="password_confirmation"
                    name="password_confirmation"
                    type="password"
                    required
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="パスワード確認"
                  />
                </div>
              </div>

              {errors.length > 0 && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                  {errors.map((error, index) => (
                    <div key={index}>{error}</div>
                  ))}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? "アカウント作成中..." : "アカウント作成"}
              </button>

              <div className="text-center">
                <Link
                  href="/login"
                  className="text-orange-600 hover:text-orange-700 text-sm"
                >
                  既にアカウントをお持ちの方はこちら
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
