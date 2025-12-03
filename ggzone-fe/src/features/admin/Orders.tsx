import React, { useState, useEffect } from "react";
import { Search, Eye, Loader, Ban, CheckCircle, Package, User, X } from "lucide-react";
import { adminService } from "@/services/api/adminService";
import { ConfirmDialog } from "@/components/Dialog";

interface Order {
  id: string;
  userId: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

interface OrderItem {
  id: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  product: {
    id: string;
    name: string;
    coverImageUrl?: string;
  };
}

interface OrderDetail {
  order: Order;
  items: OrderItem[];
}

interface Toast {
  message: string;
  type: 'success' | 'error';
}

export const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(20);
  const [toast, setToast] = useState<Toast | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState<string | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    loadOrders();
  }, [currentPage, statusFilter]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await adminService.getOrders(
        statusFilter !== "all" ? statusFilter : undefined,
        currentPage,
        pageSize
      );

      if (response.success && response.data) {
        setOrders(response.data);
      }
    } catch (error) {
      console.error('Error loading orders:', error);
      showToast('Failed to load orders', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetail = async (orderId: string) => {
    try {
      setLoadingDetail(true);
      setShowDetailModal(true);
      
      const response = await adminService.getOrderDetail(orderId);
      
      if (response.success && response.data) {
        setSelectedOrder(response.data);
      } else {
        showToast('Failed to load order details', 'error');
        setShowDetailModal(false);
      }
    } catch (error) {
      console.error('Error loading order detail:', error);
      showToast('An error occurred while loading order details', 'error');
      setShowDetailModal(false);
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      console.log('Updating order status:', { orderId, newStatus });
      const response = await adminService.updateOrderStatus(orderId, newStatus);
      console.log('Update response:', response);

      if (response.success) {
        showToast('Order status updated successfully', 'success');
        await loadOrders();
        
        // Update detail modal if open
        if (selectedOrder && selectedOrder.order.id === orderId) {
          setSelectedOrder({
            ...selectedOrder,
            order: { ...selectedOrder.order, status: newStatus }
          });
        }
      } else {
        showToast(response.message || 'Failed to update status', 'error');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      showToast('An error occurred while updating status', 'error');
    }
  };

  const handleCancelClick = (orderId: string) => {
    setOrderToCancel(orderId);
    setShowCancelDialog(true);
  };

  const handleCancelConfirm = async () => {
    if (!orderToCancel) return;

    try {
      const response = await adminService.updateOrderStatus(orderToCancel, 'cancelled');

      if (response.success) {
        showToast('Order cancelled successfully', 'success');
        setShowCancelDialog(false);
        setOrderToCancel(null);
        await loadOrders();
        
        // Update detail modal if open
        if (selectedOrder && selectedOrder.order.id === orderToCancel) {
          setSelectedOrder({
            ...selectedOrder,
            order: { ...selectedOrder.order, status: 'cancelled' }
          });
        }
      } else {
        showToast(response.message || 'Failed to cancel order', 'error');
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
      showToast('An error occurred while cancelling order', 'error');
    }
  };

  const handleCancelCancel = () => {
    setShowCancelDialog(false);
    setOrderToCancel(null);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Confirmed':
        return 'bg-blue-100 text-blue-700';
      case 'Shipping':
        return 'bg-purple-100 text-purple-700';
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getNextStatus = (currentStatus: string): string | null => {
    switch (currentStatus) {
      case 'pending':
        return 'Confirmed';
      case 'Confirmed':
        return 'Shipping';
      case 'Shipping':
        return 'completed';
      case 'completed':
      case 'cancelled':
        return null; // No next status
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orders Management</h1>
          <p className="text-gray-600 mt-1">Manage all orders in the system</p>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 p-2">
        <div className="flex gap-2">
          <button
            onClick={() => {
              setStatusFilter("all");
              setCurrentPage(1);
            }}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
              statusFilter === "all"
                ? "bg-orange-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            All Orders
          </button>
          <button
            onClick={() => {
              setStatusFilter("pending");
              setCurrentPage(1);
            }}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
              statusFilter === "pending"
                ? "bg-yellow-500 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => {
              setStatusFilter("Confirmed");
              setCurrentPage(1);
            }}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
              statusFilter === "Confirmed"
                ? "bg-blue-500 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Confirmed
          </button>
          <button
            onClick={() => {
              setStatusFilter("Shipping");
              setCurrentPage(1);
            }}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
              statusFilter === "Shipping"
                ? "bg-purple-500 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Shipping
          </button>
          <button
            onClick={() => {
              setStatusFilter("completed");
              setCurrentPage(1);
            }}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
              statusFilter === "completed"
                ? "bg-green-500 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => {
              setStatusFilter("cancelled");
              setCurrentPage(1);
            }}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
              statusFilter === "cancelled"
                ? "bg-red-500 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Cancelled
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <Loader className="animate-spin text-orange-600" size={40} />
        </div>
      )}

      {/* Orders Table */}
      {!loading && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {orders.length > 0 ? (
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="text-sm font-mono text-gray-600">#{order.id.substring(0, 8)}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900">{order.user.username}</p>
                          <p className="text-xs text-gray-500">{order.user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-900 font-semibold">
                      {formatPrice(order.totalAmount)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {getNextStatus(order.status) && (
                          <button
                            onClick={() => handleUpdateStatus(order.id, getNextStatus(order.status)!)}
                            className="px-3 py-1 bg-orange-600 text-white text-xs rounded-lg hover:bg-orange-700 transition capitalize"
                            title={`Update to ${getNextStatus(order.status)}`}
                          >
                            → {getNextStatus(order.status)}
                          </button>
                        )}
                        {order.status !== 'completed' && order.status !== 'cancelled' && (
                          <button
                            onClick={() => handleCancelClick(order.id)}
                            className="p-2 hover:bg-red-50 rounded-lg transition"
                            title="Cancel order"
                          >
                            <X size={16} className="text-red-600" />
                          </button>
                        )}
                        <button
                          onClick={() => handleViewDetail(order.id)}
                          className="p-2 hover:bg-blue-50 rounded-lg transition"
                          title="View details"
                        >
                          <Eye size={16} className="text-blue-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No orders found</p>
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {!loading && orders.length > 0 && (
        <div className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-600">
            Showing page {currentPage}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={orders.length < pageSize}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Confirm Cancel Dialog */}
      <ConfirmDialog
        isOpen={showCancelDialog}
        title="Cancel Order"
        message="Are you sure you want to cancel this order? This action cannot be undone."
        confirmText="Cancel Order"
        cancelText="Keep Order"
        variant="danger"
        onConfirm={handleCancelConfirm}
        onCancel={handleCancelCancel}
      />

      {/* Order Detail Modal */}
      {showDetailModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            {loadingDetail ? (
              <div className="flex justify-center items-center py-12">
                <Loader className="animate-spin text-orange-600" size={40} />
              </div>
            ) : selectedOrder && (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Details</h2>

                {/* Order Info */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Order ID</p>
                      <p className="font-mono text-gray-900">#{selectedOrder.order.id.substring(0, 8)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="text-gray-900">{new Date(selectedOrder.order.createdAt).toLocaleString('vi-VN')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Customer</p>
                      <p className="text-gray-900">{selectedOrder.order.user.username}</p>
                      <p className="text-xs text-gray-500">{selectedOrder.order.user.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-3 py-1 rounded-lg text-sm font-medium capitalize ${getStatusColor(selectedOrder.order.status)}`}>
                          {selectedOrder.order.status}
                        </span>
                        {getNextStatus(selectedOrder.order.status) && (
                          <button
                            onClick={() => handleUpdateStatus(selectedOrder.order.id, getNextStatus(selectedOrder.order.status)!)}
                            className="px-3 py-1 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700 transition"
                          >
                            → {getNextStatus(selectedOrder.order.status)}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Order Items</h3>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                          {item.product.coverImageUrl ? (
                            <img src={item.product.coverImageUrl} alt={item.product.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package size={24} className="text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{item.product.name}</p>
                          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{formatPrice(item.totalPrice)}</p>
                          <p className="text-xs text-gray-500">{formatPrice(item.unitPrice)} each</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total */}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-semibold text-gray-900">Total Amount</p>
                    <p className="text-2xl font-bold text-orange-600">{formatPrice(selectedOrder.order.totalAmount)}</p>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => {
                      setShowDetailModal(false);
                      setSelectedOrder(null);
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                  >
                    Close
                  </button>
                  {selectedOrder.order.status !== 'completed' && selectedOrder.order.status !== 'cancelled' && (
                    <button
                      onClick={() => {
                        setShowDetailModal(false);
                        handleCancelClick(selectedOrder.order.id);
                      }}
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 transition-opacity duration-200 ${
          toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {toast.type === 'success' ? (
            <CheckCircle size={20} />
          ) : (
            <Ban size={20} />
          )}
          <span className="font-medium">{toast.message}</span>
        </div>
      )}
    </div>
  );
};
