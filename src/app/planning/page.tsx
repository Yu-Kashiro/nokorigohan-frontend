"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChefHat, User, LogOut, Sparkles, Users, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { recipesApi, Recipe } from "@/lib/api";

interface IngredientInput {
  name: string;
  amount: string;
  unit: string;
}

export default function PlanningPage() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const [ingredients, setIngredients] = useState<IngredientInput[]>([]);
  const [currentIngredient, setCurrentIngredient] = useState({
    name: "",
    amount: "",
    unit: "個",
  });
  const [servings, setServings] = useState(2);
  const [isGenerating, setIsGenerating] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const addIngredient = () => {
    if (currentIngredient.name.trim() && currentIngredient.amount.trim()) {
      const ingredientExists = ingredients.some(
        (item) =>
          item.name.toLowerCase() ===
          currentIngredient.name.toLowerCase().trim()
      );

      if (!ingredientExists) {
        setIngredients([
          ...ingredients,
          {
            name: currentIngredient.name.trim(),
            amount: currentIngredient.amount.trim(),
            unit: currentIngredient.unit,
          },
        ]);
        setCurrentIngredient({ name: "", amount: "", unit: "個" });
      }
    }
  };

  const handleAddIngredient = (e: React.FormEvent) => {
    e.preventDefault();
    addIngredient();
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const generateRecipes = async () => {
    if (ingredients.length === 0) {
      setError("食材を1つ以上入力してください");
      return;
    }

    setIsGenerating(true);
    setError("");
    setRecipes([]);

    try {
      const ingredientStrings = ingredients.map(
        (ing) => `${ing.name} ${ing.amount}${ing.unit}`
      );

      const response = await recipesApi.generate({
        ingredients: ingredientStrings,
        servings,
      });

      setRecipes(response.data.recipes);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { error?: string } } };
      setError(error.response?.data?.error || "レシピの生成に失敗しました");
    } finally {
      setIsGenerating(false);
    }
  };

  const saveRecipe = async (recipeId: string) => {
    try {
      await recipesApi.save(recipeId);
      alert("レシピを保存しました！");
    } catch {
      alert("レシピの保存に失敗しました");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* ヘッダー */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <ChefHat className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500" />
            <h1 className="text-lg sm:text-2xl font-bold text-gray-900">
              nokoriごはん
            </h1>
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
              <span className="text-sm sm:text-base text-gray-700 hidden sm:inline">
                {user.name}さん
              </span>
              <span className="text-sm text-gray-700 sm:hidden">
                {user.name}
              </span>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 px-2 py-1 text-sm sm:text-base"
            >
              <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden sm:inline">ログアウト</span>
            </button>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左側: 食材入力・設定エリア */}
          <div className="space-y-6">

            {/* 食材入力 */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                残り物食材
              </h3>

              <form onSubmit={handleAddIngredient} className="mb-4">
                <div className="space-y-3">
                  <input
                    type="text"
                    value={currentIngredient.name}
                    onChange={(e) =>
                      setCurrentIngredient({
                        ...currentIngredient,
                        name: e.target.value,
                      })
                    }
                    placeholder="食材名"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 placeholder-gray-600 text-gray-900"
                    required
                  />
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={currentIngredient.amount}
                      onChange={(e) =>
                        setCurrentIngredient({
                          ...currentIngredient,
                          amount: e.target.value,
                        })
                      }
                      placeholder="数量"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 placeholder-gray-600 text-gray-900"
                      required
                    />
                    <select
                      value={currentIngredient.unit}
                      onChange={(e) =>
                        setCurrentIngredient({
                          ...currentIngredient,
                          unit: e.target.value,
                        })
                      }
                      className="w-20 px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900"
                    >
                      <option value="個">個</option>
                      <option value="g">g</option>
                      <option value="ml">ml</option>
                      <option value="本">本</option>
                      <option value="枚">枚</option>
                      <option value="玉">玉</option>
                      <option value="袋">袋</option>
                      <option value="パック">パック</option>
                      <option value="少々">少々</option>
                      <option value="適量">適量</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-3 w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  食材を追加
                </button>
              </form>

              {/* 食材リスト */}
              <div className="space-y-2">
                {ingredients.map((ingredient, index) => (
                  <div
                    key={index}
                    className="bg-orange-50 border border-orange-200 rounded-lg p-3 flex justify-between items-center"
                  >
                    <span className="text-gray-800">
                      {ingredient.name} {ingredient.amount}
                      {ingredient.unit}
                    </span>
                    <button
                      onClick={() => removeIngredient(index)}
                      className="text-orange-600 hover:text-orange-800"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              {ingredients.length === 0 && (
                <p className="text-gray-500 text-sm">
                  食材を追加してください（例: 鶏肉 300g、玉ねぎ 1個、にんじん
                  1本）
                </p>
              )}
            </div>

            {/* 人数設定 */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                調理設定
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="h-4 w-4 inline mr-1" />
                  人数
                </label>
                <select
                  value={servings}
                  onChange={(e) => setServings(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value={1}>1人分</option>
                  <option value={2}>2人分</option>
                  <option value={3}>3人分</option>
                  <option value={4}>4人分</option>
                  <option value={5}>5人分</option>
                  <option value={6}>6人分</option>
                  <option value={7}>7人分</option>
                  <option value={8}>8人分</option>
                  <option value={9}>9人分</option>
                  <option value={10}>10人分</option>
                </select>
              </div>
            </div>

            {/* レシピ生成ボタン */}
            <button
              onClick={generateRecipes}
              disabled={isGenerating || ingredients.length === 0}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 px-6 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              <Sparkles className="h-5 w-5" />
              <span>
                {isGenerating ? "レシピを生成中..." : "レシピを生成する"}
              </span>
            </button>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}
          </div>

          {/* 右側: レシピ結果エリア */}
          <div className="space-y-6">
            {recipes.length === 0 && !isGenerating ? (
              <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
                <ChefHat className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  レシピ待ち
                </h3>
                <p className="text-gray-600">
                  食材を入力してレシピを生成してください
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {recipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    className="bg-white rounded-2xl shadow-sm p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              recipe.pattern === "leftovers"
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {recipe.pattern === "leftovers"
                              ? "残り物活用"
                              : "栄養最適化"}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {recipe.name}
                        </h3>
                        <p className="text-gray-600 mt-2">
                          {recipe.description}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <Users className="h-4 w-4 mr-1" />
                        {recipe.servings}人分
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">材料</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        {recipe.ingredients.map((ingredient, index) => (
                          <li key={index}>・{ingredient}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-medium text-gray-900 mb-2">作り方</h4>
                      <ol className="text-sm text-gray-700 space-y-2">
                        {recipe.instructions.map((instruction, index) => (
                          <li key={index}>
                            {index + 1}. {instruction}
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div className="flex space-x-3">
                      <button
                        onClick={() => saveRecipe(recipe.id)}
                        className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                      >
                        レシピ保存
                      </button>
                      {recipe.pattern === "nutritious" && (
                        <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium transition-colors">
                          買い出しリスト
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {isGenerating && (
              <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  レシピを生成中...
                </h3>
                <p className="text-gray-600">
                  AIがあなたの食材から最適なレシピを作成しています
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
