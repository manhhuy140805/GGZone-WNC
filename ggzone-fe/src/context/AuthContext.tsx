import React, { createContext, useContext, useState, useEffect } from "react";
import { authService, LoginCredentials } from "../services/authService";
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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Kiểm tra user đã đăng nhập khi load app
  useEffect(() => {
    const checkAuth = () => {
      // Kiểm tra token còn hợp lệ không
      if (authService.isAuthenticated()) {
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
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
