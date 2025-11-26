import React, { createContext, useContext, useState, useEffect } from "react";
import { authService, LoginCredentials } from "../services/authService";
import { userService } from "../services/userService";
import { setUnauthorizedCallback } from "../utils/httpClient";
import { User } from "../types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<{
    success: boolean;
    message?: string;
  }>;
  mockLogin: (user: User) => void;
  logout: () => void;
  setUser: (user: User | null) => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Set unauthorized callback khi component mount
  useEffect(() => {
    setUnauthorizedCallback(() => {
      // Logout user
      authService.logout();
      setUser(null);
      // Redirect về login
      window.location.href = '/login';
    });
  }, []);

  // Fetch full user data từ API
  const fetchFullUserData = async () => {
    try {
      const response = await userService.getCurrentUser();
      if (response.success && response.data) {
        setUser(response.data);
        localStorage.setItem('ggzone_user', JSON.stringify(response.data));
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Kiểm tra user đã đăng nhập khi load app
  useEffect(() => {
    const checkAuth = async () => {
      // Kiểm tra token còn hợp lệ không
      if (authService.isAuthenticated()) {
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          // Fetch full user data từ API
          await fetchFullUserData();
        }
      } else {
        // Token hết hạn hoặc không hợp lệ, xóa dữ liệu
        authService.logout();
        setUser(null);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    const response = await authService.login(credentials);

    if (response.success && response.user) {
      setUser(response.user);
      // Fetch full user data từ API sau khi login
      await fetchFullUserData();
      return { success: true, message: response.message };
    }

    return { success: false, message: response.message };
  };

  const mockLogin = (mockUser: User) => {
    // Save mock user to localStorage
    localStorage.setItem('ggzone_user', JSON.stringify(mockUser));
    localStorage.setItem('ggzone_auth_token', 'mock_token_' + Date.now());
    // Update state
    setUser(mockUser);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const updateUser = (updatedUser: User | null) => {
    setUser(updatedUser);
    if (updatedUser) {
      localStorage.setItem('ggzone_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        mockLogin,
        logout,
        setUser: updateUser,
        refreshUser: fetchFullUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
