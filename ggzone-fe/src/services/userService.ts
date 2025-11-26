import { HttpClient, ApiError } from '../utils/httpClient';
import { API_CONFIG } from '../config/api';
import { User } from '../types';

export interface UpdateProfileData {
  fullName?: string;
  bio?: string;
  location?: string;
  avatarUrl?: string;
  coverImageUrl?: string;
}

export interface UserProfileResponse {
  success: boolean;
  data?: User;
  message?: string;
}

class UserService {
  // Lấy thông tin user hiện tại
  async getCurrentUser(): Promise<UserProfileResponse> {
    try {
      // Kiểm tra token trước
      const token = localStorage.getItem('ggzone_auth_token');
      if (!token) {
        localStorage.removeItem('ggzone_user');
        window.location.href = '/login';
        return {
          success: false,
          message: 'Vui lòng đăng nhập',
        };
      }

      const response = await HttpClient.get<any>(
        API_CONFIG.ENDPOINTS.USERS.ME,
        true
      );
      // API returns { success: true, data: {...} }
      const userData = response.data || response;
      return {
        success: true,
        data: userData,
      };
    } catch (error) {
      const apiError = error as ApiError;
      // 401 sẽ được handle bởi HttpClient interceptor
      return {
        success: false,
        message: apiError.message || 'Lỗi khi lấy thông tin user',
      };
    }
  }

  // Lấy thông tin user theo ID
  async getUserById(id: string): Promise<UserProfileResponse> {
    try {
      const response = await HttpClient.get<any>(
        API_CONFIG.ENDPOINTS.USERS.BY_ID(id),
        false
      );
      const userData = response.data || response;
      return {
        success: true,
        data: userData,
      };
    } catch (error) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError.message || 'Lỗi khi lấy thông tin user',
      };
    }
  }

  // Cập nhật profile
  async updateProfile(data: UpdateProfileData): Promise<UserProfileResponse> {
    try {
      // Kiểm tra token trước
      const token = localStorage.getItem('ggzone_auth_token');
      if (!token) {
        localStorage.removeItem('ggzone_user');
        window.location.href = '/login';
        return {
          success: false,
          message: 'Vui lòng đăng nhập',
        };
      }

      const response = await HttpClient.put<any>(
        API_CONFIG.ENDPOINTS.USERS.PROFILE,
        data,
        true
      );
      const userData = response.data || response;
      return {
        success: true,
        data: userData,
        message: 'Cập nhật profile thành công',
      };
    } catch (error) {
      const apiError = error as ApiError;
      // 401 sẽ được handle bởi HttpClient interceptor
      return {
        success: false,
        message: apiError.message || 'Lỗi khi cập nhật profile',
      };
    }
  }

  // Cập nhật trạng thái online/offline
  async updateStatus(status: string): Promise<{ success: boolean; message?: string }> {
    try {
      await HttpClient.put(
        API_CONFIG.ENDPOINTS.USERS.STATUS,
        { status },
        true
      );
      return {
        success: true,
        message: 'Cập nhật trạng thái thành công',
      };
    } catch (error) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError.message || 'Lỗi khi cập nhật trạng thái',
      };
    }
  }

  // Đổi mật khẩu
  async changePassword(currentPassword: string, newPassword: string): Promise<{ success: boolean; message?: string }> {
    try {
      await HttpClient.put(
        API_CONFIG.ENDPOINTS.USERS.PASSWORD,
        { currentPassword, newPassword },
        true
      );
      return {
        success: true,
        message: 'Đổi mật khẩu thành công',
      };
    } catch (error) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError.message || 'Lỗi khi đổi mật khẩu',
      };
    }
  }
}

export const userService = new UserService();
