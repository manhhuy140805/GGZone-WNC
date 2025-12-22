import { HttpClient, ApiError } from '@/lib/utils/httpClient';

export interface DashboardStats {
  totalUsers: number;
  totalPosts: number;
  totalProducts: number;
  totalOrders: number;
  userGrowth: number;
  postGrowth: number;
  productGrowth: number;
  orderGrowth: number;
}

export interface RevenueData {
  month: string;
  value: number;
}

export interface TopProduct {
  id: string;
  name: string;
  sales: number;
  revenue: number;
  growth: number;
}

export interface RecentActivity {
  id: string;
  type: 'order' | 'user' | 'post' | 'product';
  userId: string;
  userName: string;
  action: string;
  amount?: number;
  createdAt: string;
}

export interface QuickStats {
  pageViews: number;
  pageViewsGrowth: number;
  comments: number;
  commentsGrowth: number;
  conversionRate: number;
  conversionRateGrowth: number;
}

class AdminService {
  // Get dashboard statistics
  async getDashboardStats(): Promise<{ success: boolean; data?: DashboardStats; message?: string }> {
    try {
      const response = await HttpClient.get<any>(
        '/api/admin/statistics',
        true
      );
      
      // Map backend response to frontend format
      const data: DashboardStats = {
        totalUsers: response.totalUsers || 0,
        totalPosts: response.totalPosts || 0,
        totalProducts: response.totalGames || 0, // Using games as products
        totalOrders: response.totalOrders || 0,
        userGrowth: response.userGrowth || 0,
        postGrowth: response.postGrowth || 0,
        productGrowth: response.productGrowth || 0,
        orderGrowth: response.orderGrowth || 0,
      };
      
      return {
        success: true,
        data,
      };
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Error fetching dashboard stats:', apiError);
      return {
        success: false,
        message: apiError.message,
      };
    }
  }

  // Get daily statistics for revenue chart
  async getRevenueData(): Promise<{ success: boolean; data?: RevenueData[]; message?: string }> {
    try {
      const year = 2025;
      
      const response = await HttpClient.get<any[]>(
        `/api/admin/monthly-revenue?year=${year}`,
        true
      );
      
      // Response already in correct format from backend
      const revenueData: RevenueData[] = response.map((item: any) => ({
        month: item.month,
        value: item.value
      }));
      
      return {
        success: true,
        data: revenueData,
      };
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Error fetching revenue data:', apiError);
      
      // Return empty data if API fails - no mock data
      return {
        success: false,
        data: [],
        message: apiError.message || 'Failed to load revenue data',
      };
    }
  }

  // Get top products
  async getTopProducts(limit: number = 4): Promise<{ success: boolean; data?: TopProduct[]; message?: string }> {
    try {
      // TODO: Implement backend endpoint for top products
      const response = await HttpClient.get<TopProduct[]>(
        `/api/admin/top-products?limit=${limit}`,
        true
      );
      
      return {
        success: true,
        data: response,
      };
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Error fetching top products:', apiError);
      return {
        success: false,
        message: apiError.message,
      };
    }
  }

  // Get recent activities
  async getRecentActivities(limit: number = 5): Promise<{ success: boolean; data?: RecentActivity[]; message?: string }> {
    try {
      // TODO: Implement backend endpoint for recent activities
      const response = await HttpClient.get<RecentActivity[]>(
        `/api/admin/recent-activities?limit=${limit}`,
        true
      );
      
      return {
        success: true,
        data: response,
      };
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Error fetching recent activities:', apiError);
      return {
        success: false,
        message: apiError.message,
      };
    }
  }

  // Get quick stats
  async getQuickStats(): Promise<{ success: boolean; data?: QuickStats; message?: string }> {
    try {
      // TODO: Implement backend endpoint for quick stats
      const response = await HttpClient.get<QuickStats>(
        '/api/admin/quick-stats',
        true
      );
      
      return {
        success: true,
        data: response,
      };
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Error fetching quick stats:', apiError);
      return {
        success: false,
        message: apiError.message,
      };
    }
  }

  // Get users list
  async getUsers(search?: string, page: number = 1, pageSize: number = 20): Promise<{ success: boolean; data?: any[]; message?: string }> {
    try {
      let url = `/api/admin/users?page=${page}&pageSize=${pageSize}`;
      if (search) {
        url += `&search=${encodeURIComponent(search)}`;
      }
      
      const response = await HttpClient.get<any[]>(url, true);
      
      return {
        success: true,
        data: response,
      };
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Error fetching users:', apiError);
      return {
        success: false,
        message: apiError.message,
      };
    }
  }

  // Update user
  async updateUser(userId: string, data: { email?: string; fullName?: string; role?: string }): Promise<{ success: boolean; message?: string }> {
    try {
      console.log('AdminService.updateUser - Sending request:', { userId, data });
      
      const response = await HttpClient.put(`/api/admin/users/${userId}`, data, true);
      
      console.log('AdminService.updateUser - Response:', response);
      
      return {
        success: true,
        message: 'User updated successfully',
      };
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Error updating user:', apiError);
      return {
        success: false,
        message: apiError.message,
      };
    }
  }

  // Ban user
  async banUser(userId: string, reason: string = 'Violated community guidelines', bannedBy: string): Promise<{ success: boolean; message?: string }> {
    try {
      await HttpClient.post(`/api/admin/users/${userId}/ban`, {
        reason,
        bannedBy,
        banType: 'permanent',
        endDate: null
      }, true);
      
      return {
        success: true,
        message: 'User banned successfully',
      };
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Error banning user:', apiError);
      return {
        success: false,
        message: apiError.message,
      };
    }
  }

  // Unban user
  async unbanUser(userId: string): Promise<{ success: boolean; message?: string }> {
    try {
      await HttpClient.delete(`/api/admin/users/${userId}/unban`, true);
      
      return {
        success: true,
        message: 'User unbanned successfully',
      };
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Error unbanning user:', apiError);
      return {
        success: false,
        message: apiError.message,
      };
    }
  }

  // Get posts list
  async getPosts(search?: string, page: number = 1, pageSize: number = 20, sortBy: string = 'latest'): Promise<{ success: boolean; data?: any; message?: string }> {
    try {
      let url = `/api/posts/filter?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}`;
      if (search) {
        url = `/api/posts/search?q=${encodeURIComponent(search)}&page=${page}&pageSize=${pageSize}`;
      }
      
      const response = await HttpClient.get<any>(url, true);
      
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Error fetching posts:', apiError);
      return {
        success: false,
        message: apiError.message,
      };
    }
  }

  // Delete post (admin)
  async deletePost(postId: string): Promise<{ success: boolean; message?: string }> {
    try {
      await HttpClient.delete(`/api/admin/posts/${postId}`, true);
      
      return {
        success: true,
        message: 'Post deleted successfully',
      };
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Error deleting post:', apiError);
      return {
        success: false,
        message: apiError.message,
      };
    }
  }

  // Get products list
  async getProducts(search?: string, category?: string, page: number = 1, pageSize: number = 20): Promise<{ success: boolean; data?: any[]; message?: string }> {
    try {
      let url = `/api/store/products?page=${page}&pageSize=${pageSize}`;
      if (search) {
        url += `&search=${encodeURIComponent(search)}`;
      }
      if (category) {
        url += `&category=${encodeURIComponent(category)}`;
      }
      
      const response = await HttpClient.get<any[]>(url, true);
      
      return {
        success: true,
        data: response,
      };
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Error fetching products:', apiError);
      return {
        success: false,
        message: apiError.message,
      };
    }
  }

  // Delete product (admin)
  async deleteProduct(productId: string): Promise<{ success: boolean; message?: string }> {
    try {
      await HttpClient.delete(`/api/store/products/${productId}`, true);
      
      return {
        success: true,
        message: 'Product deleted successfully',
      };
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Error deleting product:', apiError);
      return {
        success: false,
        message: apiError.message,
      };
    }
  }

  // Get categories
  async getCategories(): Promise<{ success: boolean; data?: string[]; message?: string }> {
    try {
      const response = await HttpClient.get<string[]>('/api/store/categories', false);
      
      return {
        success: true,
        data: response,
      };
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Error fetching categories:', apiError);
      return {
        success: false,
        message: apiError.message,
      };
    }
  }

  // Create product
  async createProduct(data: {
    name: string;
    description?: string;
    price: number;
    coverImageUrl?: string;
    category: string;
  }): Promise<{ success: boolean; message?: string }> {
    try {
      await HttpClient.post('/api/store/products', data, true);
      
      return {
        success: true,
        message: 'Product created successfully',
      };
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Error creating product:', apiError);
      return {
        success: false,
        message: apiError.message,
      };
    }
  }

  // Update product
  async updateProduct(productId: string, data: {
    name: string;
    description?: string;
    price: number;
    coverImageUrl?: string;
    category: string;
  }): Promise<{ success: boolean; message?: string }> {
    try {
      await HttpClient.put(`/api/store/products/${productId}`, data, true);
      
      return {
        success: true,
        message: 'Product updated successfully',
      };
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Error updating product:', apiError);
      return {
        success: false,
        message: apiError.message,
      };
    }
  }

  // Get orders list
  async getOrders(status?: string, page: number = 1, pageSize: number = 20): Promise<{ success: boolean; data?: any[]; message?: string }> {
    try {
      let url = `/api/admin/orders?page=${page}&pageSize=${pageSize}`;
      if (status) {
        url += `&status=${encodeURIComponent(status)}`;
      }
      
      const response = await HttpClient.get<any[]>(url, true);
      
      return {
        success: true,
        data: response,
      };
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Error fetching orders:', apiError);
      return {
        success: false,
        message: apiError.message,
      };
    }
  }

  // Get order detail
  async getOrderDetail(orderId: string): Promise<{ success: boolean; data?: any; message?: string }> {
    try {
      const response = await HttpClient.get<any>(`/api/admin/orders/${orderId}`, true);
      
      return {
        success: true,
        data: response,
      };
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Error fetching order detail:', apiError);
      return {
        success: false,
        message: apiError.message,
      };
    }
  }

  // Update order status
  async updateOrderStatus(orderId: string, status: string): Promise<{ success: boolean; message?: string }> {
    try {
      await HttpClient.put(`/api/admin/orders/${orderId}/status`, { status }, true);
      
      return {
        success: true,
        message: 'Order status updated successfully',
      };
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Error updating order status:', apiError);
      return {
        success: false,
        message: apiError.message,
      };
    }
  }
  // Get groups list
  async getGroups(): Promise<{ success: boolean; data?: any[]; message?: string }> {
    try {
      const response = await HttpClient.get<any[]>('/api/groups', false);
      
      return {
        success: true,
        data: response,
      };
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Error fetching groups:', apiError);
      return {
        success: false,
        message: apiError.message,
      };
    }
  }

  // Delete group (admin)
  async deleteGroup(groupId: string): Promise<{ success: boolean; message?: string }> {
    try {
      await HttpClient.delete(`/api/admin/groups/${groupId}`, true);
      
      return {
        success: true,
        message: 'Group deleted successfully',
      };
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Error deleting group:', apiError);
      
      // Provide more specific error messages
      let errorMessage = apiError.message;
      if (apiError.status === 404) {
        errorMessage = 'Group not found. It may have already been deleted.';
      }
      
      return {
        success: false,
        message: errorMessage,
      };
    }
  }
}

export const adminService = new AdminService();
