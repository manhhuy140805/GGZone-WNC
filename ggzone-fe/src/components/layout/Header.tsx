import React, { useState } from "react";
import { Menu, X, Search, Bell, LogOut } from "lucide-react";
import { Input } from "../common";
import { useAuth } from "../../context/AuthContext";

interface HeaderProps {
  onMenuToggle?: () => void;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle, onLogout }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout } = useAuth();

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
            <div className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              GGZone
            </div>
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
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition">
              <Bell size={20} className="text-gray-700" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>

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
