import React, { useState, useEffect, useRef } from "react";
import { Header, Sidebar } from "./components/layout";
import {
  Home,
  Browse,
  Groups,
  Marketplace,
  ProductDetail,
  Profile,
  Trending,
  Login,
  Register,
} from "./pages";
import { useAuth } from "./context/AuthContext";

const ROUTES = {
  HOME: "HOME",
  BROWSE: "BROWSE",
  GROUPS: "GROUPS",
  MARKETPLACE: "MARKETPLACE",
  PROFILE: "PROFILE",
  TRENDING: "TRENDING",
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
} as const;

function App() {
  const [currentPage, setCurrentPage] = useState<keyof typeof ROUTES>("LOGIN");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const { isAuthenticated, logout } = useAuth();
  const mainRef = useRef<HTMLElement>(null);

  // Scroll to top when page or product changes
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0 });
    }
  }, [currentPage, selectedProductId]);

  const handleLogin = () => {
    setCurrentPage("HOME");
  };

  const handleLogout = () => {
    logout();
    setCurrentPage("LOGIN");
  };

  const handleViewProduct = (productId: string) => {
    setSelectedProductId(productId);
  };

  const handleBackToMarketplace = () => {
    setSelectedProductId(null);
  };

  const renderPage = () => {
    if (!isAuthenticated) {
      if (currentPage === "REGISTER") {
        return <Register onRegister={handleLogin} onSwitchToLogin={() => setCurrentPage("LOGIN")} />;
      }
      return <Login onLogin={handleLogin} onSwitchToRegister={() => setCurrentPage("REGISTER")} />;
    }

    // Show product detail if a product is selected
    if (selectedProductId && currentPage === "MARKETPLACE") {
      return (
        <ProductDetail
          productId={selectedProductId}
          onBack={handleBackToMarketplace}
          onViewProduct={handleViewProduct}
        />
      );
    }

    switch (currentPage) {
      case "LOGIN":
        return (
          <Home 
            onNavigate={(page) => setCurrentPage(page as keyof typeof ROUTES)} 
            onViewProduct={handleViewProduct}
          />
        );
      case "HOME":
        return (
          <Home 
            onNavigate={(page) => setCurrentPage(page as keyof typeof ROUTES)} 
            onViewProduct={handleViewProduct}
          />
        );
      case "BROWSE":
        return <Browse />;
      case "GROUPS":
        return <Groups />;
      case "MARKETPLACE":
        return <Marketplace onViewProduct={handleViewProduct} />;
      case "PROFILE":
        return <Profile />;
      case "TRENDING":
        return <Trending />;
      default:
        return <Home />;
    }
  };

  const handleNavigation = (route: string) => {
    const routeKey = Object.entries(ROUTES).find(
      ([, value]) => value === route
    )?.[0];
    if (routeKey) {
      setCurrentPage(routeKey as keyof typeof ROUTES);
      setSidebarOpen(false);
    }
  };

  if (!isAuthenticated) {
    return renderPage();
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        onLogout={handleLogout}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onNavigate={(page) => {
            setCurrentPage(page as keyof typeof ROUTES);
            setSelectedProductId(null); // Reset product selection when navigating
          }}
          currentPage={currentPage}
        />

        <main ref={mainRef} className="flex-1 overflow-auto">
          <div className="max-w-7xl bg-white mx-auto px-4 sm:px-6 lg:px-8 py-8 rounded-xs">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
