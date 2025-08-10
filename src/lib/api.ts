import axios, { AxiosResponse } from 'axios'
import { API_BASE_URL } from './utils'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// リクエストインターセプター（認証トークンの追加）
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// レスポンスインターセプター（エラーハンドリング）
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// 型定義
export interface User {
  id: number
  name: string
  email: string
  created_at: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface SignupRequest {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export interface AuthResponse {
  user: User
  token: string
  message: string
}

export interface UserPreference {
  id: number
  user_id: number
  default_serving_size: number
  nutritional_goals: {
    daily_calories: number
    protein_ratio: number
    carb_ratio: number
    fat_ratio: number
  }
  allergies: string[]
  cooking_tools: string[]
  seasonings: string[]
  created_at: string
  updated_at: string
}

export interface Ingredient {
  id: number
  name: string
  category: string
  unit: string
}

export interface UserIngredient {
  id: number
  ingredient: Ingredient
  quantity: number
  expiration_date?: string
  created_at: string
  updated_at: string
}

export interface Recipe {
  id: number
  title: string
  instructions: string
  nutritional_info: any
  cooking_time: number
  serving_size: number
  recipe_type: 'leftover_only' | 'balanced'
  created_at: string
  updated_at: string
}

// 認証API
export const authApi = {
  login: (data: LoginRequest): Promise<AxiosResponse<AuthResponse>> =>
    api.post('/auth/login', data),
  
  signup: (data: SignupRequest): Promise<AxiosResponse<AuthResponse>> =>
    api.post('/auth/signup', data),
}

// ユーザー設定API
export const userPreferencesApi = {
  get: (): Promise<AxiosResponse<UserPreference>> =>
    api.get('/user_preferences'),
  
  update: (data: Partial<UserPreference>): Promise<AxiosResponse<{ user_preference: UserPreference; message: string }>> =>
    api.put('/user_preferences', data),
}

// 食材API
export const ingredientsApi = {
  getAll: (category?: string): Promise<AxiosResponse<Ingredient[]>> =>
    api.get('/ingredients', { params: { category } }),
  
  create: (data: Omit<Ingredient, 'id'>): Promise<AxiosResponse<{ ingredient: Ingredient; message: string }>> =>
    api.post('/ingredients', data),
}

// ユーザー食材API
export const userIngredientsApi = {
  getAll: (available?: boolean, expiringSoon?: boolean): Promise<AxiosResponse<UserIngredient[]>> =>
    api.get('/user_ingredients', { 
      params: { 
        available: available?.toString(), 
        expiring_soon: expiringSoon?.toString() 
      } 
    }),
  
  create: (data: { ingredient_id: number; quantity: number; expiration_date?: string }): Promise<AxiosResponse<{ user_ingredient: UserIngredient; message: string }>> =>
    api.post('/user_ingredients', data),
  
  update: (id: number, data: { quantity?: number; expiration_date?: string }): Promise<AxiosResponse<{ user_ingredient: UserIngredient; message: string }>> =>
    api.put(`/user_ingredients/${id}`, data),
  
  delete: (id: number): Promise<AxiosResponse<{ message: string }>> =>
    api.delete(`/user_ingredients/${id}`),
}

// レシピAPI
export const recipesApi = {
  getAll: (): Promise<AxiosResponse<Recipe[]>> =>
    api.get('/recipes'),
  
  generate: (servingSize: number): Promise<AxiosResponse<{ recipes: Recipe[]; message: string }>> =>
    api.post('/recipes/generate', { serving_size: servingSize }),
  
  save: (recipeData: any): Promise<AxiosResponse<{ recipe: Recipe; message: string }>> =>
    api.post('/recipes', recipeData),
  
  delete: (id: number): Promise<AxiosResponse<{ message: string }>> =>
    api.delete(`/recipes/${id}`),
}

export default api