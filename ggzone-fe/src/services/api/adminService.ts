import { HttpClient, ApiError } from '@/lib/utils/httpClient';
import { API_CONFIG } from '@/lib/constants/api';

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
        userGrowth: 12, // Mock growth data (backend doesn't provide this yet)
        postGrowth: 8,
        productGrowth: 5,
        orderGrowth: 15,
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
      const endDate = new Date();
      const startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 12);
      
      const response = await HttpClient.get<any[]>(
        `/api/admin/daily-statistics?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`,
        true
      );
      
      // Group by month and calculate totals
      const monthlyData: { [key: string]: number } = {};
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      response.forEach((stat: any) => {
        const date = new Date(stat.statDate);
        const monthKey = months[date.getMonth()];
        if (!monthlyData[monthKey]) {
          monthlyData[monthKey] = 0;
        }
        monthlyData[monthKey] += (stat.newOrders || 0);
      });
      
      const revenueData: RevenueData[] = months.map(month => ({
        month,
        value: Math.round((monthlyData[month] || 0) / 1000) // Convert to thousands
      }));
      
      return {
        success: true,
        data: revenueData,
      };
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Error fetching revenue data:', apiError);
      // Return mock data if API fails
      return {
        success: true,
        data: [
          { month: "Jan", value: 45 },
          { month: "Feb", value: 52 },
          { month: "Mar", value: 48 },
          { month: "Apr", value: 61 },
          { month: "May", value: 55 },
          { month: "Jun", value: 67 },
          { month: "Jul", value: 73 },
          { month: "Aug", value: 69 },
          { month: "Sep", value: 78 },
          { month: "Oct", value: 85 },
          { month: "Nov", value: 82 },
          { month: "Dec", value: 90 },
        ],
      };
    }
  }

  // Get top products (mock data for now)
  async getTopProducts(limit: number = 4): Promise<{ success: boolean; data?: TopProduct[]; message?: string }> {
    try {
      // TODO: Backend doesn't have this endpoint yet, using mock data
      const mockData: TopProduct[] = [
        { id: "1", name: "Gaming Mouse Pro", sales: 234, revenue: 12450000, growth: 15 },
        { id: "2", name: "Mechanical Keyboard", sales: 189, revenue: 9870000, growth: 8 },
        { id: "3", name: "RGB Headset", sales: 156, revenue: 7340000, growth: 12 },
        { id: "4", name: "Gaming Chair", sales: 98, revenue: 24500000, growth: 5 },
      ];
      
      return {
        success: true,
        data: mockData.slice(0, limit),
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

  // Get recent activities (mock data for now)
  async getRecentActivities(limit: number = 5): Promise<{ success: boolean; data?: RecentActivity[]; message?: string }> {
    try {
      // TODO: Backend doesn't have this endpoint yet, using mock data
      const mockData: RecentActivity[] = [
        { id: "1", type: "order", userId: "u1", userName: "John Doe", action: "placed an order", amount: 150000, createdAt: new Date(Date.now() - 2 * 60000).toISOString() },
        { id: "2", type: "user", userId: "u2", userName: "Jane Smith", action: "registered", createdAt: new Date(Date.now() - 5 * 60000).toISOString() },
        { id: "3", type: "post", userId: "u3", userName: "Bob Johnson", action: "created a post", createdAt: new Date(Date.now() - 10 * 60000).toISOString() },
        { id: "4", type: "order", userId: "u4", userName: "Alice Brown", action: "placed an order", amount: 89000, createdAt: new Date(Date.now() - 15 * 60000).toISOString() },
        { id: "5", type: "product", userId: "admin", userName: "Admin", action: "added new product", createdAt: new Date(Date.now() - 20 * 60000).toISOString() },
      ];
      
      return {
        success: true,
        data: mockData.slice(0, limit),
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

  // Get quick stats (mock data for now)
  async getQuickStats(): Promise<{ success: boolean; data?: QuickStats; message?: string }> {
    try {
      // TODO: Backend doesn't have this endpoint yet, using mock data
      const mockData: QuickStats = {
        pageViews: 24567,
        pageViewsGrowth: 18,
        comments: 1234,
        commentsGrowth: 12,
        conversionRate: 3.24,
        conversionRateGrowth: 5,
      };
      
      return {
        success: true,
        data: mockData,
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
  async updateUser(userId: string, data: { email?: string; fullName?: string }): Promise<{ success: boolean; message?: string }> {
    try {
      await HttpClient.put(`/api/admin/users/${userId}`, data, true);
      
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
