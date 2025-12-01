import { HttpClient, ApiError } from '@/lib/utils/httpClient';

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
      const response = await HttpClient.post('/api/order', request, true);
      return { success: true, data: response.data };
    } catch (error) {
      const apiError = error as ApiError;
      return { success: false, message: apiError.message };
    }
  }

  async getMyOrders(userId: string) {
    try {
      const response = await HttpClient.get(`/api/order/${userId}`, true);
      return { success: true, data: response.data || response };
    } catch (error) {
      const apiError = error as ApiError;
      return { success: false, message: apiError.message };
    }
  }

  async getOrderDetail(orderId: string) {
    try {
      const response = await HttpClient.get(`/api/order/detail/${orderId}`, true);
      return { success: true, data: response.data || response };
    } catch (error) {
      const apiError = error as ApiError;
      return { success: false, message: apiError.message };
    }
  }

  async cancelOrder(orderId: string) {
    try {
      await HttpClient.delete(`/api/order/${orderId}`, true);
      return { success: true };
    } catch (error) {
      const apiError = error as ApiError;
      return { success: false, message: apiError.message };
    }
  }
}

export const orderService = new OrderService();
