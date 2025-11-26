import { HttpClient, ApiError } from '../utils/httpClient';
import { API_CONFIG } from '../config/api';
import { User } from '../types';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  fullName?: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  message?: string;
}

// API Response types
interface LoginApiResponse {
  token: string;
}

interface RegisterApiResponse {
  id: string;
  username: string;
  email: string;
}

class AuthService {
  private readonly TOKEN_KEY = "ggzone_auth_token";
  private readonly USER_KEY = "ggzone_user";

  // Đăng nhập với email và password
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await HttpClient.post<LoginApiResponse>(
        API_CONFIG.ENDPOINTS.AUTH.LOGIN,
        credentials,
        false
      );

      if (response.token) {
        // Lưu token
        localStorage.setItem(this.TOKEN_KEY, response.token);

        // Decode JWT để lấy thông tin user (simple decode, không verify)
        const user = this.decodeToken(response.token);
        
        if (user) {
          localStorage.setItem(this.USER_KEY, JSON.stringify(user));
        }

        return {
          success: true,
          user: user || undefined,
          token: response.token,
          message: "Đăng nhập thành công",
        };
      }

      return {
        success: false,
        message: "Đăng nhập thất bại",
      };
    } catch (error) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError.message || "Có lỗi xảy ra khi đăng nhập",
      };
    }
  }

  // Đăng ký tài khoản mới
  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {
      const response = await HttpClient.post<RegisterApiResponse>(
        API_CONFIG.ENDPOINTS.AUTH.REGISTER,
        credentials,
        false
      );

      if (response.id) {
        // Sau khi đăng ký thành công, tự động đăng nhập
        return await this.login({
          email: credentials.email,
          password: credentials.password,
        });
      }

      return {
        success: false,
        message: "Đăng ký thất bại",
      };
    } catch (error) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError.message || "Có lỗi xảy ra khi đăng ký",
      };
    }
  }

  // Decode JWT token (simple decode, không verify signature)
  private decodeToken(token: string): User | null {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );

      const payload = JSON.parse(jsonPayload);

      // JWT payload thường có format:
      // { sub: userId, email: email, name: username, ... }
      return {
        id: payload.sub || payload.userId || payload.id,
        username: payload.name || payload.username || payload.unique_name,
        email: payload.email,
        fullName: payload.fullName || payload.name || payload.username,
        role: payload.role || 'user',
      };
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  // Đăng xuất
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  // Lấy user hiện tại từ localStorage
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  // Lấy token hiện tại
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Kiểm tra đã đăng nhập chưa
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    // Kiểm tra token có hết hạn không
    try {
      const payload = this.decodeToken(token);
      if (!payload) return false;

      // Nếu có exp (expiration time), kiểm tra
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      if (tokenData.exp) {
        const expirationTime = tokenData.exp * 1000; // Convert to milliseconds
        if (Date.now() >= expirationTime) {
          this.logout();
          return false;
        }
      }

      return true;
    } catch {
      return false;
    }
  }
}

export const authService = new AuthService();
