import React, { useState } from "react";
import { Header, Sidebar } from "./components/layout";
import {
  Home,
  Browse,
  Groups,
  Achievements,
  Marketplace,
  Profile,
  Trending,
  Login,
} from "./pages";
import { ROUTES } from "./utils";
import { useAuth } from "./context/AuthContext";

function App() {
  const [currentPage, setCurrentPage] = useState<keyof typeof ROUTES>("HOME");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const handleLogin = () => {
    setCurrentPage("HOME");
  };

  const handleLogout = () => {
    logout();
    setCurrentPage("LOGIN");
  };

  const renderPage = () => {
    if (!isAuthenticated) {
      return <Login onLogin={handleLogin} />;
    }

    switch (currentPage) {
      case "LOGIN":
        return <Home />;
      case "HOME":
        return <Home />;
      case "BROWSE":
        return <Browse />;
      case "GROUPS":
        return <Groups />;
      case "ACHIEVEMENTS":
        return <Achievements />;
      case "MARKETPLACE":
        return <Marketplace />;
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
          onNavigate={(page) => setCurrentPage(page as keyof typeof ROUTES)}
          currentPage={currentPage}
        />

        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl bg-white mx-auto px-4 sm:px-6 lg:px-8 py-8 rounded-xs">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
