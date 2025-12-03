import React from "react";
import { Routes, Route, Navigate, useParams, useNavigate } from "react-router-dom";
import {
  Home,
  Browse,
  GameDetail as GameDetailPage,
  Feed,
  Groups,
  GroupDetail as GroupDetailPage,
  ProductDetail as ProductDetailPage,
  Profile,
  Login,
  Register,
  Friends,
  Messages,
  Cart,
  Settings,
  CloudinaryTest,
  Unauthorized,
} from "@/pages";
import { AdminLayout, Dashboard, Users as AdminUsers, Posts as AdminPosts, Products as AdminProducts, Orders as AdminOrders, Groups as AdminGroups } from "@/features/admin";
import { useAuth } from "@/app/providers/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Check if user has admin role
  if (user?.role !== 'admin') {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return <>{children}</>;
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
      onBack={() => navigate("/store")}
      onViewProduct={(id) => navigate(`/store/${id}`)}
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

const StoreWrapper: React.FC = () => {
  const navigate = useNavigate();
  const Store = React.lazy(() => import('@/features/store').then(m => ({ default: m.Store })));
  
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Store 
        onViewProduct={(id: string) => navigate(`/store/${id}`)}
      />
    </React.Suspense>
  );
};

const HomeWrapper: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Home
      onNavigate={(page) => {
        const routes: { [key: string]: string } = {
          STORE: "/store",
          BROWSE: "/browse",
          GROUPS: "/groups",
        };
        navigate(routes[page] || "/");
      }}
      onViewGame={(id: string) => navigate(`/browse/${id}`)}
      onViewGroup={(id: string) => navigate(`/groups/${id}`)}
      onViewProduct={(id: string) => navigate(`/store/${id}`)}
    />
  );
};

const CartWrapper: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Cart
      onBack={() => navigate("/store")}
      onViewProduct={(id) => navigate(`/store/${id}`)}
      onCheckout={() => navigate("/store?tab=orders")}
    />
  );
};

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

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
        path="/store"
        element={
          <ProtectedRoute>
            <StoreWrapper />
          </ProtectedRoute>
        }
      />
      <Route
        path="/store/:productId"
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
      {/* Admin Routes */}
      <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="posts" element={<AdminPosts />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="groups" element={<AdminGroups />} />
      </Route>
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
