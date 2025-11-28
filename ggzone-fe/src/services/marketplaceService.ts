import { HttpClient, ApiError } from '../utils/httpClient';
import { API_CONFIG } from '../config/api';

export interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  coverImageUrl: string;
  category: string;
  price: number;
  rating: number;
  reviewsCount: number;
  status: string;
  createdAt: string;
  seller: {
    id: string;
    username: string;
    avatarUrl?: string;
  };
  game?: {
    id: string;
    name: string;
    iconUrl?: string;
  };
}

export interface MarketplaceReview {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: {
    id: string;
    username: string;
    avatarUrl?: string;
  };
}

export interface MarketplaceResponse {
  success: boolean;
  data?: MarketplaceItem[] | MarketplaceItem;
  message?: string;
}

class MarketplaceService {
  // Lấy danh sách Featured Gear
  async getFeaturedGear(limit: number = 8): Promise<{ success: boolean; data?: MarketplaceItem[] }> {
    try {
      const response = await HttpClient.get<any>(
        API_CONFIG.ENDPOINTS.MARKETPLACE.BASE,
        false
      );
      const items = response.data || response;
      const itemsArray = Array.isArray(items) ? items : items.data || [];
      
      return {
        success: true,
        data: itemsArray.slice(0, limit),
      };
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Lỗi khi lấy Featured Gear:', apiError);
      return {
        success: false,
        data: [],
      };
    }
  }

  // Lấy marketplace items theo category
  async getItemsByCategory(
    category: string,
    page: number = 1,
    pageSize: number = 20
  ): Promise<{ success: boolean; data?: MarketplaceItem[] }> {
    try {
      const response = await HttpClient.get<any>(
        API_CONFIG.ENDPOINTS.MARKETPLACE.BY_CATEGORY(category, page, pageSize),
        false
      );
      const items = response.data || response;
      const itemsArray = Array.isArray(items) ? items : items.data || [];
      
      return {
        success: true,
        data: itemsArray,
      };
    } catch (error) {
      const apiError = error as ApiError;
      console.error(`Lỗi khi lấy items từ category ${category}:`, apiError);
      return {
        success: false,
        data: [],
      };
    }
  }

  // Lấy chi tiết marketplace item
  async getItemById(id: string): Promise<{ success: boolean; data?: MarketplaceItem }> {
    try {
      const response = await HttpClient.get<MarketplaceItem>(
        API_CONFIG.ENDPOINTS.MARKETPLACE.BY_ID(id),
        false
      );
      
      return {
        success: true,
        data: response,
      };
    } catch (error) {
      const apiError = error as ApiError;
      console.error(`Lỗi khi lấy item ${id}:`, apiError);
      return {
        success: false,
      };
    }
  }

  // Lấy reviews của marketplace item
  async getItemReviews(id: string): Promise<{ success: boolean; data?: MarketplaceReview[] }> {
    try {
      const response = await HttpClient.get<any>(
        API_CONFIG.ENDPOINTS.MARKETPLACE.REVIEWS(id),
        false
      );
      const reviews = response.data || response;
      const reviewsArray = Array.isArray(reviews) ? reviews : reviews.data || [];
      
      return {
        success: true,
        data: reviewsArray,
      };
    } catch (error) {
      const apiError = error as ApiError;
      console.error(`Lỗi khi lấy reviews cho item ${id}:`, apiError);
      return {
        success: false,
        data: [],
      };
    }
  }

  // Thêm review cho marketplace item
  async addReview(
    id: string,
    rating: number,
    comment: string
  ): Promise<{ success: boolean; data?: MarketplaceReview }> {
    try {
      const response = await HttpClient.post<MarketplaceReview>(
        API_CONFIG.ENDPOINTS.MARKETPLACE.REVIEWS(id),
        { rating, comment }
      );
      
      return {
        success: true,
        data: response,
      };
    } catch (error) {
      const apiError = error as ApiError;
      console.error(`Lỗi khi thêm review cho item ${id}:`, apiError);
      return {
        success: false,
      };
    }
  }
}

export const marketplaceService = new MarketplaceService();
