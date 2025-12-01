import { HttpClient, ApiError } from '@/lib/utils/httpClient';
import { API_CONFIG } from '@/lib/constants/api';

export interface CartItem {
  id: string;
  quantity: number;
  addedAt: string;
  product: {
    id: string;
    name: string;
    coverImageUrl: string;
    price: number;
    category: string;
    gameId?: string;
  };
}

export interface CartResponse {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
}

export interface AddToCartRequest {
  userId: string;
  productId: string;
  quantity: number;
}

class CartService {
  // Lấy giỏ hàng của user
  async getCart(userId: string): Promise<{ success: boolean; data?: CartResponse }> {
    try {
      const response = await HttpClient.get<CartResponse>(
        API_CONFIG.ENDPOINTS.CART.BY_USER(userId),
        true
      );
      
      return {
        success: true,
        data: response,
      };
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Lỗi khi lấy giỏ hàng:', apiError);
      return {
        success: false,
      };
    }
  }

  // Thêm sản phẩm vào giỏ hàng
  async addToCart(request: AddToCartRequest): Promise<{ success: boolean; data?: CartItem }> {
    try {
      const response = await HttpClient.post<CartItem>(
        API_CONFIG.ENDPOINTS.CART.ADD,
        request,
        true
      );
      
      return {
        success: true,
        data: response,
      };
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Lỗi khi thêm vào giỏ hàng:', apiError);
      return {
        success: false,
      };
    }
  }

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  async updateQuantity(cartItemId: string, quantity: number): Promise<{ success: boolean }> {
    try {
      await HttpClient.put(
        API_CONFIG.ENDPOINTS.CART.UPDATE(cartItemId),
        quantity,
        true
      );
      
      return {
        success: true,
      };
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Lỗi khi cập nhật số lượng:', apiError);
      return {
        success: false,
      };
    }
  }

  // Xóa sản phẩm khỏi giỏ hàng
  async removeFromCart(cartItemId: string): Promise<{ success: boolean }> {
    try {
      await HttpClient.delete(
        API_CONFIG.ENDPOINTS.CART.REMOVE(cartItemId),
        true
      );
      
      return {
        success: true,
      };
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Lỗi khi xóa khỏi giỏ hàng:', apiError);
      return {
        success: false,
      };
    }
  }

  // Xóa toàn bộ giỏ hàng
  async clearCart(userId: string): Promise<{ success: boolean }> {
    try {
      await HttpClient.delete(
        API_CONFIG.ENDPOINTS.CART.CLEAR(userId),
        true
      );
      
      return {
        success: true,
      };
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Lỗi khi xóa giỏ hàng:', apiError);
      return {
        success: false,
      };
    }
  }
}

export const cartService = new CartService();
