import React, { useState } from "react";
import { BrowserRouter, useNavigate, useLocation } from "react-router-dom";
import { Header, Sidebar } from "./components/layout";
import { AppRoutes } from "./routes";
import { useAuth } from "./context/AuthContext";

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated, logout, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleNavigation = (route: string) => {
    const routeMap: { [key: string]: string } = {
      HOME: "/",
      BROWSE: "/browse",
      FEED: "/feed",
      GROUPS: "/groups",
      MARKETPLACE: "/marketplace",
      PROFILE: "/profile",
      FRIENDS: "/friends",
      MESSAGES: "/messages",
      CART: "/cart",
    };
    
    const path = routeMap[route] || "/";
    navigate(path);
    setSidebarOpen(false);
  };

  const handleViewCart = () => {
    navigate("/cart");
  };

  // Get current page from pathname
  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === "/" || path === "/login") return "HOME";
    if (path.startsWith("/browse")) return "BROWSE";
    if (path.startsWith("/feed")) return "FEED";
    if (path.startsWith("/groups")) return "GROUPS";
    if (path.startsWith("/marketplace")) return "MARKETPLACE";
    if (path.startsWith("/profile")) return "PROFILE";
    if (path.startsWith("/friends")) return "FRIENDS";
    if (path.startsWith("/messages")) return "MESSAGES";
    if (path.startsWith("/cart")) return "CART";
    return "HOME";
  };

  // Public pages without layout (Login, Register, Admin)
  const isPublicPage = location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/admin";

  // Hiển thị loading khi đang kiểm tra authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (isPublicPage || !isAuthenticated) {
    return <AppRoutes />;
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header 
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)} 
        onLogout={handleLogout}
        onViewCart={handleViewCart}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onNavigate={handleNavigation}
          currentPage={getCurrentPage()}
        />

        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl bg-white mx-auto px-4 sm:px-6 lg:px-8 py-8 rounded-xs">
            <AppRoutes />
          </div>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
