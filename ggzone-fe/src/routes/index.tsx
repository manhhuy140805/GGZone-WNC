import React from "react";
import { Routes, Route, Navigate, useParams, useNavigate } from "react-router-dom";
import { Home as HomeIcon, LockKeyhole, LogIn } from "lucide-react";
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
  Unauthorized,
} from "@/app/pages";
import { AdminLayout, Dashboard, Users as AdminUsers, Posts as AdminPosts, Products as AdminProducts, Orders as AdminOrders, Groups as AdminGroups } from "@/features/admin";
import { useAuth } from "@/app/providers/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const LoginRequiredMessage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl border border-gray-200 shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
            <LockKeyhole size={40} className="text-orange-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Bạn cần đăng nhập
        </h1>

        <p className="text-gray-600 mb-8">
          Vui lòng đăng nhập để truy cập trang này.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate("/login")}
            className="flex-1 flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-5 py-3 rounded-lg font-semibold transition"
          >
            <LogIn size={18} />
            Đăng nhập
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-5 py-3 rounded-lg font-semibold transition"
          >
            <HomeIcon size={18} />
            Trang chủ
          </button>
        </div>
      </div>
    </div>
  );
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <LoginRequiredMessage />;
};

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <LoginRequiredMessage />;
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
      onViewProduct={(id: string) => navigate(`/store/${id}`)}
    />
  );
};

const BrowseWrapper: React.FC = () => {
  const navigate = useNavigate();
  return <Browse onViewGame={(id: string) => navigate(`/browse/${id}`)} />;
};

const GroupsWrapper: React.FC = () => {
  const navigate = useNavigate();
  return <Groups onViewGroup={(id: string) => navigate(`/groups/${id}`)} />;
};

const StoreWrapper: React.FC = () => {
  const navigate = useNavigate();
  const Store = React.lazy(() => import('@/app/pages').then(m => ({ default: m.Store })));
  
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
      onNavigate={(page: string) => {
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
      onViewProduct={(id: string) => navigate(`/store/${id}`)}
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
      <Route path="/" element={<HomeWrapper />} />
      <Route path="/browse" element={<BrowseWrapper />} />
      <Route path="/browse/:gameId" element={<GameDetail />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/groups" element={<GroupsWrapper />} />
      <Route path="/groups/:groupId" element={<GroupDetail />} />
      <Route path="/store" element={<StoreWrapper />} />
      <Route path="/store/:productId" element={<ProductDetail />} />

      {/* Protected Routes */}
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

      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
