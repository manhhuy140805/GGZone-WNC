import React from "react";
import {
  Home,
  Users,
  Gamepad2,
  ShoppingCart,
  TrendingUp,
  UserCircle,
  UserPlus,
  MessageCircle,
  X,
  Rss,
  Radio,
} from "lucide-react";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  onNavigate?: (page: string) => void;
  currentPage?: string;
}

interface NavItem {
  icon: React.ReactNode;
  label: string;
  key: string;
  badge?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen = true,
  onClose,
  onNavigate,
  currentPage = "HOME",
}) => {
  const navItems: NavItem[] = [
    { icon: <Home size={20} />, label: "Home", key: "HOME" },
    { icon: <Gamepad2 size={20} />, label: "Browse Games", key: "BROWSE" },
    { icon: <Rss size={20} />, label: "Feed", key: "FEED" },
    { icon: <Radio size={20} />, label: "Livestream", key: "LIVESTREAM" },
    { icon: <Users size={20} />, label: "Groups", key: "GROUPS" },
    {
      icon: <ShoppingCart size={20} />,
      label: "Marketplace",
      key: "MARKETPLACE",
    },
    { icon: <UserPlus size={20} />, label: "Friends", key: "FRIENDS" },
    { icon: <MessageCircle size={20} />, label: "Messages", key: "MESSAGES", badge: 3 },
    {
      icon: <UserCircle size={20} />,
      label: "Profile",
      key: "PROFILE",
    },
  ];

  const handleNavClick = (key: string) => {
    onNavigate?.(key);
    onClose?.();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed lg:static inset-y-0 left-0 w-64 bg-white border-r border-gray-200 overflow-y-auto
          transition-transform duration-300 z-40 pt-20 lg:pt-0
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 lg:hidden p-2 hover:bg-gray-100 rounded-lg"
        >
          <X size={24} />
        </button>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = currentPage === item.key;
            return (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition text-left font-medium ${
                  isActive
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100 hover:text-orange-600"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Following Section */}
        <div className="px-4 py-6 border-t border-gray-200 m-4">
          <h3 className="text-xs font-bold text-gray-500 uppercase mb-3">
            Following
          </h3>
          <div className="space-y-2">
            <div className="text-sm text-gray-600 hover:text-orange-600 cursor-pointer transition">
              ShadowNinja92
            </div>
            <div className="text-sm text-gray-600 hover:text-orange-600 cursor-pointer transition">
              LunaStorm
            </div>
            <div className="text-sm text-gray-600 hover:text-orange-600 cursor-pointer transition">
              BlazeFury
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
