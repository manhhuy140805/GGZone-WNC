import React from "react";
import {
  Home,
  Users,
  Gamepad2,
  Trophy,
  ShoppingCart,
  TrendingUp,
  X,
} from "lucide-react";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  onNavigate?: (page: string) => void;
}

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  badge?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen = true,
  onClose,
  onNavigate,
}) => {
  const navItems: NavItem[] = [
    { icon: <Home size={20} />, label: "Home", href: "/" },
    { icon: <Gamepad2 size={20} />, label: "Browse Games", href: "/browse" },
    { icon: <Users size={20} />, label: "Groups", href: "/groups" },
    {
      icon: <Trophy size={20} />,
      label: "Achievements",
      href: "/achievements",
    },
    {
      icon: <ShoppingCart size={20} />,
      label: "Marketplace",
      href: "/marketplace",
    },
    { icon: <TrendingUp size={20} />, label: "Trending", href: "/trending" },
  ];

  const handleNavClick = (href: string) => {
    onNavigate?.(href);
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
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition text-left"
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
              {item.badge && (
                <span className="ml-auto bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="px-4 py-6 border-t border-gray-200 m-4">
          <h3 className="text-xs font-bold text-gray-500 uppercase mb-3">
            Following
          </h3>
          <div className="space-y-2">
            <div className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">
              ShadowNinja92
            </div>
            <div className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">
              LunaStorm
            </div>
            <div className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">
              BlazeFury
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
