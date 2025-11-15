import { mockUsers, User } from "../assets/mock/users";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  message?: string;
}

// Mock passwords cho các user (trong thực tế sẽ hash)
const mockPasswords: Record<string, string> = {
  "alice@example.com": "alice123",
  "bob@example.com": "bob123",
  "charlie@example.com": "charlie123",
  "david@example.com": "david123",
  "emma@example.com": "emma123",
  "frank@example.com": "frank123",
};

class AuthService {
  private readonly TOKEN_KEY = "ggzone_auth_token";
  private readonly USER_KEY = "ggzone_user";

  // Đăng nhập với email và password
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const { email, password } = credentials;

    // Kiểm tra email có tồn tại không
    const user = mockUsers.find((u) => u.email === email);
    if (!user) {
      return {
        success: false,
        message: "Email không tồn tại",
      };
    }

    // Kiểm tra password
    if (mockPasswords[email] !== password) {
      return {
        success: false,
        message: "Mật khẩu không đúng",
      };
    }

    // Tạo mock token
    const token = `mock_token_${user.id}_${Date.now()}`;

    // Lưu vào localStorage
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));

    return {
      success: true,
      user,
      token,
      message: "Đăng nhập thành công",
    };
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
    return !!this.getToken() && !!this.getCurrentUser();
  }

  // Lấy danh sách tài khoản demo (để hiển thị cho user test)
  getDemoAccounts() {
    return mockUsers.map((user) => ({
      email: user.email,
      password: mockPasswords[user.email],
      fullName: user.fullName,
      role: user.role,
    }));
  }
}

export const authService = new AuthService();
