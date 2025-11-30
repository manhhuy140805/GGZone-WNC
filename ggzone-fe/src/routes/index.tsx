import React from "react";
import { Routes, Route, Navigate, useParams, useNavigate } from "react-router-dom";
import {
  Home,
  Browse,
  GameDetail as GameDetailPage,
  Feed,
  Groups,
  GroupDetail as GroupDetailPage,
  Marketplace,
  ProductDetail as ProductDetailPage,
  Profile,
  Login,
  Register,
  Friends,
  Messages,
  Cart,
  Settings,
  CloudinaryTest,
  Admin as AdminPage,
} from "@/pages";
import { useAuth } from "@/app/providers/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

// Wrapper components to handle URL params
const GameDetail: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  return <GameDetailPage gameId={gameId || ""} onBack={() => navigate("/browse")} />;
};

const GroupDetail: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();
  return (
    <GroupDetailPage
      groupId={groupId || ""}
      onBack={() => navigate("/groups")}
      onOpenChat={() => navigate("/messages")}
    />
  );
};

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  return (
    <ProductDetailPage
      productId={productId || ""}
      onBack={() => navigate("/marketplace")}
      onViewProduct={(id) => navigate(`/marketplace/${id}`)}
    />
  );
};

const BrowseWrapper: React.FC = () => {
  const navigate = useNavigate();
  return <Browse onViewGame={(id) => navigate(`/browse/${id}`)} />;
};

const GroupsWrapper: React.FC = () => {
  const navigate = useNavigate();
  return <Groups onViewGroup={(id) => navigate(`/groups/${id}`)} />;
};

const MarketplaceWrapper: React.FC = () => {
  const navigate = useNavigate();
  return <Marketplace onViewProduct={(id) => navigate(`/marketplace/${id}`)} />;
};

const HomeWrapper: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Home
      onNavigate={(page) => {
        const routes: { [key: string]: string } = {
          MARKETPLACE: "/marketplace",
          BROWSE: "/browse",
          GROUPS: "/groups",
        };
        navigate(routes[page] || "/");
      }}
      onViewGame={(id: string) => navigate(`/browse/${id}`)}
      onViewGroup={(id: string) => navigate(`/groups/${id}`)}
    />
  );
};

const CartWrapper: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Cart
      onBack={() => navigate("/marketplace")}
      onViewProduct={(id) => navigate(`/marketplace/${id}`)}
      onCheckout={() => alert("Checkout functionality coming soon!")}
    />
  );
};

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomeWrapper />
          </ProtectedRoute>
        }
      />
      <Route
        path="/browse"
        element={
          <ProtectedRoute>
            <BrowseWrapper />
          </ProtectedRoute>
        }
      />
      <Route
        path="/browse/:gameId"
        element={
          <ProtectedRoute>
            <GameDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/feed"
        element={
          <ProtectedRoute>
            <Feed />
          </ProtectedRoute>
        }
      />
      <Route
        path="/groups"
        element={
          <ProtectedRoute>
            <GroupsWrapper />
          </ProtectedRoute>
        }
      />
      <Route
        path="/groups/:groupId"
        element={
          <ProtectedRoute>
            <GroupDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/marketplace"
        element={
          <ProtectedRoute>
            <MarketplaceWrapper />
          </ProtectedRoute>
        }
      />
      <Route
        path="/marketplace/:productId"
        element={
          <ProtectedRoute>
            <ProductDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/friends"
        element={
          <ProtectedRoute>
            <Friends />
          </ProtectedRoute>
        }
      />
      <Route
        path="/messages"
        element={
          <ProtectedRoute>
            <Messages />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <CartWrapper />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/test/cloudinary"
        element={
          <ProtectedRoute>
            <CloudinaryTest />
          </ProtectedRoute>
        }
      />

      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
