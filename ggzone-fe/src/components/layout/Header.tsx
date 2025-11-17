import React, { useState } from "react";
import { Menu, X, Search, Bell, LogOut, ShoppingCart, Trash2 } from "lucide-react";
import { Input } from "../common";
import { useAuth } from "../../context/AuthContext";

interface HeaderProps {
  onMenuToggle?: () => void;
  onLogout?: () => void;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle, onLogout }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const { user, logout } = useAuth();

  // Mock cart items - In real app, this would come from context/state management
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Gaming Headset Pro",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=100&h=100&fit=crop",
      quantity: 1,
    },
    {
      id: "2",
      name: "Mechanical Keyboard RGB",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=100&h=100&fit=crop",
      quantity: 2,
    },
  ]);

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleLogout = () => {
    logout();
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className=" px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <Menu size={24} className="text-gray-700" />
            </button>
            <img 
              src="/logo.png" 
              alt="GGZone" 
              className="h-13 w-20 object-cover"
            />
          </div>

          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search games, users..."
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition">
              <Bell size={20} className="text-gray-700" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* Shopping Cart */}
            <div className="relative">
              <button
                onClick={() => setShowCart(!showCart)}
                className="relative p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <ShoppingCart size={20} className="text-gray-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Cart Dropdown */}
              {showCart && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowCart(false)}
                  />
                  <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-20">
                    {/* Cart Header */}
                    <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-orange-100">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                          <ShoppingCart size={20} className="text-orange-600" />
                          Shopping Cart
                        </h3>
                        <span className="text-sm text-gray-600">
                          {cartCount} {cartCount === 1 ? "item" : "items"}
                        </span>
                      </div>
                    </div>

                    {/* Cart Items */}
                    <div className="max-h-96 overflow-y-auto">
                      {cartItems.length === 0 ? (
                        <div className="p-8 text-center">
                          <ShoppingCart size={48} className="text-gray-300 mx-auto mb-3" />
                          <p className="text-gray-500">Your cart is empty</p>
                        </div>
                      ) : (
                        <div className="p-4 space-y-3">
                          {cartItems.map((item) => (
                            <div
                              key={item.id}
                              className="flex gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 rounded-lg object-cover"
                              />
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-sm text-gray-900 truncate">
                                  {item.name}
                                </h4>
                                <p className="text-xs text-gray-600 mt-1">
                                  Qty: {item.quantity}
                                </p>
                                <p className="text-sm font-bold text-orange-600 mt-1">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </p>
                              </div>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="p-2 hover:bg-red-100 rounded-lg transition-colors self-start"
                              >
                                <Trash2 size={16} className="text-red-600" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Cart Footer */}
                    {cartItems.length > 0 && (
                      <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-semibold text-gray-700">Total:</span>
                          <span className="text-2xl font-bold text-orange-600">
                            ${cartTotal.toFixed(2)}
                          </span>
                        </div>
                        <button className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold py-3 rounded-lg transition-all shadow-md hover:shadow-lg">
                          Checkout
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 hover:bg-gray-100 rounded-lg p-2 transition"
              >
                {user?.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.fullName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                    {user?.fullName?.charAt(0) || "U"}
                  </div>
                )}
                <span className="hidden md:block text-sm font-medium text-gray-700">
                  {user?.username || "User"}
                </span>
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowUserMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-semibold text-gray-900">
                        {user?.fullName}
                      </p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                      <div className="mt-1">
                        <span className="inline-block px-2 py-1 text-xs bg-orange-100 text-orange-600 rounded">
                          {user?.role}
                        </span>
                        {user?.isVerified && (
                          <span className="inline-block ml-1 px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded">
                            ✓ Verified
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition"
                    >
                      <LogOut size={16} />
                      Đăng xuất
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
