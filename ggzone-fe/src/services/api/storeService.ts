import { HttpClient, ApiError } from '@/lib/utils/httpClient';
import { API_CONFIG } from '@/lib/constants/api';

export interface StoreProduct {
  id: string;
  name: string;
  description: string;
  coverImageUrl: string;
  price: number;
  category: string;
  gameId?: string;
  rating: number;
  reviewsCount: number;
  status: string;
  createdAt: string;
}

export interface StoreProductsResponse {
  success: boolean;
  data?: StoreProduct[];
  message?: string;
}

export interface StoreProductResponse {
  success: boolean;
  data?: StoreProduct;
  message?: string;
}

class StoreService {
  // Lấy tất cả sản phẩm
  async getAllProducts(): Promise<StoreProductsResponse> {
    try {
      const response = await HttpClient.get<any>(
        API_CONFIG.ENDPOINTS.STORE.PRODUCTS,
        false
      );
      
      return {
        success: true,
        data: response.data || response,
      };
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Lỗi khi lấy products:', apiError);
      return {
        success: false,
        message: apiError.message || 'Không thể tải sản phẩm',
      };
    }
  }

  // Lấy sản phẩm theo ID
  async getProductById(id: string): Promise<StoreProductResponse> {
    try {
      const response = await HttpClient.get<any>(
        API_CONFIG.ENDPOINTS.STORE.PRODUCT_BY_ID(id),
        false
      );
      
      return {
        success: true,
        data: response.data || response,
      };
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Lỗi khi lấy product:', apiError);
      return {
        success: false,
        message: apiError.message || 'Không thể tải sản phẩm',
      };
    }
  }

  // Lấy sản phẩm theo category
  async getProductsByCategory(category: string): Promise<StoreProductsResponse> {
    try {
      const response = await HttpClient.get<any>(
        `${API_CONFIG.ENDPOINTS.STORE.PRODUCTS}?category=${encodeURIComponent(category)}`,
        false
      );
      
      return {
        success: true,
        data: response.data || response,
      };
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Lỗi khi lấy products by category:', apiError);
      return {
        success: false,
        message: apiError.message || 'Không thể tải sản phẩm',
      };
    }
  }

  // Lấy danh sách categories
  async getCategories(): Promise<{ success: boolean; data?: string[] }> {
    try {
      const response = await HttpClient.get<any>(
        API_CONFIG.ENDPOINTS.STORE.CATEGORIES,
        false
      );
      
      return {
        success: true,
        data: response.data || response,
      };
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Lỗi khi lấy categories:', apiError);
      return {
        success: false,
        data: [],
      };
    }
  }
}

export const storeService = new StoreService();
