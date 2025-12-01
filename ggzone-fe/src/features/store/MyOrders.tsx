import React, { useState, useEffect } from "react";
import { useAuth } from "@/app/providers/AuthContext";
import { orderService } from "@/services/api/orderService";
import { Package, Clock, CheckCircle, XCircle, Eye, Loader } from "lucide-react";

interface MyOrdersProps {
  onBack?: () => void;
  onViewProduct?: (productId: string) => void;
}

export const MyOrders: React.FC<MyOrdersProps> = ({ onBack, onViewProduct }) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) loadOrders();
  }, [user?.id]);

  const loadOrders = async () => {
    if (!user?.id) return;
    setLoading(true);
    const response = await orderService.getMyOrders(user.id);
    if (response.success) setOrders(response.data || []);
    setLoading(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="text-green-600" />;
      case 'pending': return <Clock className="text-yellow-600" />;
      case 'cancelled': return <XCircle className="text-red-600" />;
      default: return <Package className="text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <Loader className="animate-spin text-orange-600" size={40} />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      
      {orders.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <Package size={64} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">No orders yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg border p-6 hover:shadow-md transition">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getStatusIcon(order.status)}
                  <div>
                    <p className="font-bold text-gray-900">Order #{order.id.slice(0, 8)}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-orange-600">
                    {order.totalAmount.toLocaleString('vi-VN')}đ
                  </p>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>
              <button className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium">
                <Eye size={18} />
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
