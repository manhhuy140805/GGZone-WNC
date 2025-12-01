import React, { createContext, useContext, useState, useEffect } from "react";
import { cartService } from "@/services/api/cartService";

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
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

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
    // Update local state immediately
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    // Sync with backend if user is logged in
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        await cartService.addToCart({
          userId: user.id,
          productId: product.id,
          quantity,
        });
      } catch (error) {
        console.error('Lỗi khi thêm vào cart backend:', error);
      }
    }
  };

  const removeFromCart = async (productId: string) => {
    const item = cartItems.find((i) => i.product.id === productId);
    
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));

    // Sync with backend
    if (item?.cartItemId) {
      try {
        await cartService.removeFromCart(item.cartItemId);
      } catch (error) {
        console.error('Lỗi khi xóa khỏi cart backend:', error);
      }
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const item = cartItems.find((i) => i.product.id === productId);
    
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );

    // Sync with backend
    if (item?.cartItemId) {
      try {
        await cartService.updateQuantity(item.cartItemId, quantity);
      } catch (error) {
        console.error('Lỗi khi cập nhật quantity backend:', error);
      }
    }
  };

  const clearCart = async () => {
    setCartItems([]);

    // Sync with backend
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        await cartService.clearCart(user.id);
      } catch (error) {
        console.error('Lỗi khi xóa cart backend:', error);
      }
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
