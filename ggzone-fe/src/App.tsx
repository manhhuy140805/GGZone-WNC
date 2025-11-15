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
} from "./pages";
import { ROUTES } from "./utils";

function App() {
  const [currentPage, setCurrentPage] = useState<keyof typeof ROUTES>("HOME");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
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

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onNavigate={handleNavigation}
        />

        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
