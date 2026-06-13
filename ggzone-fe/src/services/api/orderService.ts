import { HttpClient, ApiError } from '@/lib/utils/httpClient';
import { API_CONFIG } from '@/lib/constants/api';

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface CreateOrderRequest {
  userId: string;
  totalAmount: number;
  items: OrderItem[];
}

class OrderService {
  async createOrder(request: CreateOrderRequest) {
    try {
      const response = await HttpClient.post(API_CONFIG.ENDPOINTS.ORDER.BASE, request, true);
      return { success: true, data: (response as any).data || response };
    } catch (error) {
      const apiError = error as ApiError;
      return { success: false, message: apiError.message };
    }
  }

  async getMyOrders(userId: string) {
    try {
      const response = await HttpClient.get(API_CONFIG.ENDPOINTS.ORDER.BY_USER(userId), true);
      return { success: true, data: (response as any).data || response };
    } catch (error) {
      const apiError = error as ApiError;
      return { success: false, message: apiError.message };
    }
  }

  async getOrderDetail(orderId: string) {
    try {
      const response = await HttpClient.get(API_CONFIG.ENDPOINTS.ORDER.BY_ID(orderId), true);
      return { success: true, data: (response as any).data || response };
    } catch (error) {
      const apiError = error as ApiError;
      return { success: false, message: apiError.message };
    }
  }

  async cancelOrder(orderId: string) {
    try {
      await HttpClient.delete(API_CONFIG.ENDPOINTS.ORDER.CANCEL(orderId), true);
      return { success: true };
    } catch (error) {
      const apiError = error as ApiError;
      return { success: false, message: apiError.message };
    }
  }
}

export const orderService = new OrderService();
