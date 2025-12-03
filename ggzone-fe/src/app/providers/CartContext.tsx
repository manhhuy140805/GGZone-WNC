import React, { createContext, useContext, useState, useEffect } from "react";
import { cartService } from "@/services/api/cartService";
import { useAuth } from "./AuthContext";

export interface MarketplaceItem {
  id: string;
  title: string;
  name?: string;
  description: string;
  price: number;
  coverImageUrl: string;
  category: string;
  platform: string;
  rating: number;
  reviewsCount: number;
  status: string;
}

export interface CartItem {
  product: MarketplaceItem;
  quantity: number;
  cartItemId?: string; // ID từ backend để update/delete
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: MarketplaceItem, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  syncWithBackend: (userId: string) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { user, isAuthenticated } = useAuth();

  // Load cart from backend when user logs in
  useEffect(() => {
    const loadCart = async () => {
      if (isAuthenticated && user?.id) {
        try {
          await syncWithBackend(user.id);
        } catch (error) {
          console.error('Lỗi khi load cart:', error);
        }
      } else {
        // Clear cart when user logs out
        setCartItems([]);
      }
    };

    loadCart();
  }, [isAuthenticated, user?.id]);

  // Sync cart với backend
  const syncWithBackend = async (userId: string) => {
    try {
      const result = await cartService.getCart(userId);
      if (result.success && result.data) {
        const mappedItems: CartItem[] = result.data.items.map((item) => {
          return {
            product: {
              id: item.product.id,
              title: item.product.name,
              name: item.product.name,
              description: '',
              price: item.product.price,
              coverImageUrl: item.product.coverImageUrl,
              category: item.product.category,
              platform: '',
              rating: 0,
              reviewsCount: 0,
              status: 'online',
            },
            quantity: item.quantity,
            cartItemId: item.id,
          };
        });
        setCartItems(mappedItems);
      }
    } catch (error) {
      console.error('Lỗi khi sync cart:', error);
    }
  };

  const addToCart = async (product: MarketplaceItem, quantity: number = 1) => {
    if (!isAuthenticated || !user?.id) {
      console.error('User chưa đăng nhập');
      return;
    }

    try {
      const result = await cartService.addToCart({
        userId: user.id,
        productId: product.id,
        quantity,
      });

      if (result.success) {
        // Reload cart from backend
        await syncWithBackend(user.id);
      }
    } catch (error) {
      console.error('Lỗi khi thêm vào cart:', error);
    }
  };

  const removeFromCart = async (productId: string) => {
    const item = cartItems.find((i) => i.product.id === productId);
    
    if (!item?.cartItemId) {
      console.error('Không tìm thấy cart item');
      return;
    }

    try {
      const result = await cartService.removeFromCart(item.cartItemId);
      if (result.success) {
        // Update local state
        setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
      }
    } catch (error) {
      console.error('Lỗi khi xóa khỏi cart:', error);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const item = cartItems.find((i) => i.product.id === productId);
    
    if (!item?.cartItemId) {
      console.error('Không tìm thấy cart item');
      return;
    }

    try {
      const result = await cartService.updateQuantity(item.cartItemId, quantity);
      if (result.success) {
        // Update local state
        setCartItems((prev) =>
          prev.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          )
        );
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật quantity:', error);
    }
  };

  const clearCart = async () => {
    if (!isAuthenticated || !user?.id) {
      setCartItems([]);
      return;
    }

    try {
      const result = await cartService.clearCart(user.id);
      if (result.success) {
        setCartItems([]);
      }
    } catch (error) {
      console.error('Lỗi khi xóa cart:', error);
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
        syncWithBackend,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
