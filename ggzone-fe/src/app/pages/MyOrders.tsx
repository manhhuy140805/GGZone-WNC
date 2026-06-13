import React, { useState, useEffect } from "react";
import { useAuth } from "@/app/providers/AuthContext";
import { orderService } from "@/services/api/orderService";
import { Package, Clock, CheckCircle, XCircle, Loader, Truck, Calendar, ShoppingBag, ChevronDown, ChevronUp } from "lucide-react";

interface MyOrdersProps {
  onBack?: () => void;
  onViewProduct?: (productId: string) => void;
}

export const MyOrders: React.FC<MyOrdersProps> = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
  const [orderDetails, setOrderDetails] = useState<Map<string, any>>(new Map());
  const [loadingDetails, setLoadingDetails] = useState<Set<string>>(new Set());
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Scroll to top when filter changes
  useEffect(() => {
    const mainElement = document.querySelector('main.overflow-auto');
    if (mainElement) {
      mainElement.scrollTop = 0;
    }
  }, [statusFilter]);

  useEffect(() => {
    if (user?.id) {
      loadOrders();
    } else {
      setLoading(false);
    }
  }, [user?.id]);

  const loadOrders = async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await orderService.getMyOrders(user.id);
      
      if (response.success && response.data) {
        setOrders(response.data);
        
        // Load chi tiết cho tất cả đơn hàng để có số lượng sản phẩm
        const detailsMap = new Map();
        await Promise.all(
          response.data.map(async (order: any) => {
            try {
              const detailResponse = await orderService.getOrderDetail(order.id);
              if (detailResponse.success && detailResponse.data) {
                detailsMap.set(order.id, detailResponse.data);
              }
            } catch (err) {
              console.error(`Error loading detail for order ${order.id}:`, err);
            }
          })
        );
        setOrderDetails(detailsMap);
      } else {
        setError(response.message || 'Unable to load orders');
      }
    } catch (err) {
      console.error('Error loading orders:', err);
      setError('An error occurred while loading orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return <CheckCircle className="text-green-600" />;
      case 'pending': return <Clock className="text-yellow-600" />;
      case 'cancelled': return <XCircle className="text-red-600" />;
      case 'confirmed': return <CheckCircle className="text-blue-600" />;
      case 'shipping': return <Truck className="text-purple-600" />;
      default: return <Package className="text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      case 'confirmed': return 'bg-blue-100 text-blue-700';
      case 'shipping': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'Completed';
      case 'pending': return 'Processing';
      case 'cancelled': return 'Cancelled';
      case 'confirmed': return 'Confirmed';
      case 'shipping': return 'Shipping';
      default: return status;
    }
  };

  const loadOrderDetail = async (orderId: string) => {
    // Nếu đã có chi tiết rồi thì không cần load lại
    if (orderDetails.has(orderId)) {
      return;
    }

    try {
      setLoadingDetails(prev => new Set(prev).add(orderId));
      const response = await orderService.getOrderDetail(orderId);
      
      if (response.success && response.data) {
        setOrderDetails(prev => new Map(prev).set(orderId, response.data));
      }
    } catch (err) {
      console.error('Lỗi khi tải chi tiết đơn hàng:', err);
    } finally {
      setLoadingDetails(prev => {
        const newSet = new Set(prev);
        newSet.delete(orderId);
        return newSet;
      });
    }
  };

  const toggleOrderExpand = async (orderId: string) => {
    const isCurrentlyExpanded = expandedOrders.has(orderId);
    
    setExpandedOrders(prev => {
      const newSet = new Set(prev);
      if (isCurrentlyExpanded) {
        newSet.delete(orderId);
      } else {
        newSet.add(orderId);
      }
      return newSet;
    });

    // Load chi tiết nếu đang mở và chưa có dữ liệu
    if (!isCurrentlyExpanded && !orderDetails.has(orderId)) {
      await loadOrderDetail(orderId);
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    const confirmed = window.confirm('Are you sure you want to cancel this order?');
    if (!confirmed) return;

    try {
      const response = await orderService.cancelOrder(orderId);
      if (response.success) {
        // Reload orders after cancellation
        await loadOrders();
        alert('Order cancelled successfully');
      } else {
        alert(response.message || 'Unable to cancel order');
      }
    } catch (err) {
      console.error('Error cancelling order:', err);
      alert('An error occurred while cancelling order');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <Loader className="animate-spin text-orange-600" size={40} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center py-16 bg-red-50 rounded-lg">
          <XCircle size={64} className="mx-auto text-red-400 mb-4" />
          <p className="text-red-600 font-medium mb-4">{error}</p>
          <button 
            onClick={loadOrders}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Filter orders by status
  const filteredOrders = orders.filter(order => {
    if (statusFilter === 'all') return true;
    return order.status?.toLowerCase() === statusFilter.toLowerCase();
  });

  const statusCounts = {
    all: orders.length,
    pending: orders.filter(o => o.status?.toLowerCase() === 'pending').length,
    confirmed: orders.filter(o => o.status?.toLowerCase() === 'confirmed').length,
    shipping: orders.filter(o => o.status?.toLowerCase() === 'shipping').length,
    completed: orders.filter(o => o.status?.toLowerCase() === 'completed').length,
    cancelled: orders.filter(o => o.status?.toLowerCase() === 'cancelled').length,
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
        <p className="text-gray-600">Manage and track your orders</p>
      </div>

      {/* Status Filter Tabs */}
      <div className="mb-6 bg-white rounded-lg border border-gray-200 p-2">
        <div className="flex gap-2 overflow-x-auto">
          <button
            onClick={() => setStatusFilter('all')}
            className={`flex-1 min-w-[120px] px-4 py-3 rounded-lg font-medium transition-all ${
              statusFilter === 'all'
                ? 'bg-orange-600 text-white shadow-md'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <div className="flex flex-col items-center gap-1">
              <span>All</span>
              <span className={`text-xs ${statusFilter === 'all' ? 'text-orange-100' : 'text-gray-500'}`}>
                ({statusCounts.all})
              </span>
            </div>
          </button>

          <button
            onClick={() => setStatusFilter('pending')}
            className={`flex-1 min-w-[120px] px-4 py-3 rounded-lg font-medium transition-all ${
              statusFilter === 'pending'
                ? 'bg-yellow-600 text-white shadow-md'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <div className="flex flex-col items-center gap-1">
              <span>Processing</span>
              <span className={`text-xs ${statusFilter === 'pending' ? 'text-yellow-100' : 'text-gray-500'}`}>
                ({statusCounts.pending})
              </span>
            </div>
          </button>

          <button
            onClick={() => setStatusFilter('confirmed')}
            className={`flex-1 min-w-[120px] px-4 py-3 rounded-lg font-medium transition-all ${
              statusFilter === 'confirmed'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <div className="flex flex-col items-center gap-1">
              <span>Confirmed</span>
              <span className={`text-xs ${statusFilter === 'confirmed' ? 'text-blue-100' : 'text-gray-500'}`}>
                ({statusCounts.confirmed})
              </span>
            </div>
          </button>

          <button
            onClick={() => setStatusFilter('shipping')}
            className={`flex-1 min-w-[120px] px-4 py-3 rounded-lg font-medium transition-all ${
              statusFilter === 'shipping'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <div className="flex flex-col items-center gap-1">
              <span>Shipping</span>
              <span className={`text-xs ${statusFilter === 'shipping' ? 'text-purple-100' : 'text-gray-500'}`}>
                ({statusCounts.shipping})
              </span>
            </div>
          </button>

          <button
            onClick={() => setStatusFilter('completed')}
            className={`flex-1 min-w-[120px] px-4 py-3 rounded-lg font-medium transition-all ${
              statusFilter === 'completed'
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <div className="flex flex-col items-center gap-1">
              <span>Completed</span>
              <span className={`text-xs ${statusFilter === 'completed' ? 'text-green-100' : 'text-gray-500'}`}>
                ({statusCounts.completed})
              </span>
            </div>
          </button>

          <button
            onClick={() => setStatusFilter('cancelled')}
            className={`flex-1 min-w-[120px] px-4 py-3 rounded-lg font-medium transition-all ${
              statusFilter === 'cancelled'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <div className="flex flex-col items-center gap-1">
              <span>Cancelled</span>
              <span className={`text-xs ${statusFilter === 'cancelled' ? 'text-red-100' : 'text-gray-500'}`}>
                ({statusCounts.cancelled})
              </span>
            </div>
          </button>
        </div>
      </div>
      
      {filteredOrders.length === 0 ? (
        <div className="text-center py-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-300">
          <Package size={80} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            {statusFilter === 'all' ? 'No orders yet' : `No ${getStatusText(statusFilter).toLowerCase()} orders`}
          </h3>
          <p className="text-gray-500">
            {statusFilter === 'all' ? 'Start shopping now!' : 'Try selecting a different status'}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => {
            const isExpanded = expandedOrders.has(order.id);
            const detail = orderDetails.get(order.id);
            const isLoadingDetail = loadingDetails.has(order.id);
            const displayOrder = detail || order;
            return (
              <div 
                key={order.id} 
                className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                {/* Order Header */}
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 border-b border-orange-200">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-white rounded-lg shadow-sm">
                        {getStatusIcon(order.status)}
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-gray-900">
                            Order #{order.id.slice(0, 8).toUpperCase()}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                            {getStatusText(order.status)}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>{new Date(order.createdAt).toLocaleDateString('vi-VN', { 
                              day: '2-digit', 
                              month: '2-digit', 
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ShoppingBag size={14} />
                            <span>
                              {(() => {
                                // Ưu tiên lấy từ detail đã load (nếu có)
                                const itemsToCount = detail?.items || order.items;
                                
                                if (itemsToCount && itemsToCount.length > 0) {
                                  const totalQty = itemsToCount.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0);
                                  return `${totalQty} item${totalQty > 1 ? 's' : ''}`;
                                }
                                
                                // Fallback to totalItems
                                const count = order.totalItems || 0;
                                return `${count} item${count > 1 ? 's' : ''}`;
                              })()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm text-gray-600 mb-1">Total</p>
                      <p className="text-3xl font-bold text-orange-600">
                        {order.totalAmount.toLocaleString('vi-VN')}đ
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Body */}
                <div className="p-6">
                  {/* Shipping Info */}
                  {displayOrder.shippingAddress && (
                    <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Truck size={18} className="text-orange-600" />
                        <h4 className="font-semibold text-gray-900">Shipping Address</h4>
                      </div>
                      <p className="text-gray-700">{displayOrder.shippingAddress}</p>
                    </div>
                  )}

                  {/* Order Items - Expandable */}
                  <div className="mb-4">
                    <button
                      onClick={() => toggleOrderExpand(order.id)}
                      className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition"
                      disabled={isLoadingDetail}
                    >
                      <span className="font-semibold text-gray-900">
                        Product Details ({displayOrder.items?.length || 0})
                      </span>
                      {isLoadingDetail ? (
                        <Loader size={20} className="animate-spin text-orange-600" />
                      ) : isExpanded ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </button>
                      
                      {isExpanded && !isLoadingDetail && displayOrder.items && displayOrder.items.length > 0 && (
                        <div className="mt-3 space-y-3">
                          {displayOrder.items.map((item: any, index: number) => {
                            const itemPrice = item.unitPrice || item.price || item.product?.price || 0;
                            const itemQuantity = item.quantity || 1;
                            const totalPrice = item.totalPrice || (itemPrice * itemQuantity);
                            
                            return (
                            <div 
                              key={index}
                              className="flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition"
                            >
                              {/* Product Image */}
                              {item.product?.coverImageUrl && (
                                <div className="relative flex-shrink-0">
                                  <img 
                                    src={item.product.coverImageUrl}
                                    alt={item.product.name}
                                    className="w-20 h-20 object-cover rounded-lg"
                                  />
                                  {/* Quantity Badge */}
                                  <div className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg border-2 border-white">
                                    {item.quantity || 0}
                                  </div>
                                </div>
                              )}
                              
                              {/* Product Info */}
                              <div className="flex-1 min-w-0">
                                <h5 className="font-bold text-gray-900 mb-1 truncate">
                                  {item.product?.name || 'Product'}
                                </h5>
                                
                                {/* Product Details */}
                                <div className="space-y-1 mb-2">
                                  {item.product?.category && (
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs font-medium text-gray-500">Category:</span>
                                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                                        {item.product.category}
                                      </span>
                                    </div>
                                  )}
                                  
                                  {item.product?.gameId && (
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs font-medium text-gray-500">Game ID:</span>
                                      <span className="text-xs text-gray-700 font-mono">
                                        {item.product.gameId}
                                      </span>
                                    </div>
                                  )}
                                </div>

                                {/* Quantity */}
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium text-gray-600">Quantity:</span>
                                  <span className="px-2 py-1 bg-gray-100 text-gray-900 text-sm font-bold rounded">
                                    x{item.quantity || 0}
                                  </span>
                                </div>
                              </div>
                              
                              {/* Price Info */}
                              <div className="text-right flex-shrink-0">
                                <p className="text-xs text-gray-500 mb-1">Unit Price</p>
                                <p className="text-sm font-semibold text-gray-700 mb-2">
                                  {itemPrice > 0 ? `${itemPrice.toLocaleString('vi-VN')}đ` : 'No price'}
                                </p>
                                <div className="pt-2 border-t border-gray-200">
                                  <p className="text-xs text-gray-500 mb-1">Subtotal</p>
                                  <p className="text-lg font-bold text-orange-600">
                                    {totalPrice > 0 ? `${totalPrice.toLocaleString('vi-VN')}đ` : 'No price'}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )})}
                        </div>
                      )}
                      
                      {isExpanded && !isLoadingDetail && (!displayOrder.items || displayOrder.items.length === 0) && (
                        <div className="mt-3 p-8 text-center bg-gray-50 rounded-lg">
                          <Package size={48} className="mx-auto text-gray-400 mb-2" />
                          <p className="text-gray-600">No items in this order</p>
                        </div>
                      )}

                      {/* Order Summary */}
                      {isExpanded && !isLoadingDetail && displayOrder.items && displayOrder.items.length > 0 && (() => {
                        const shippingFee = displayOrder.shippingFee ?? 30000;
                        const totalAmount = order.totalAmount || 0;
                        const discount = displayOrder.discount || 0;
                        const subtotal = displayOrder.subtotal || (totalAmount - shippingFee + discount);
                        
                        return (
                        <div className="mt-4 p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                          <h4 className="font-bold text-gray-900 mb-3">Order Summary</h4>
                          <div className="space-y-2">
                            {/* Subtotal */}
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Subtotal:</span>
                              <span className="font-semibold text-gray-900">
                                {subtotal.toLocaleString('vi-VN')}đ
                              </span>
                            </div>
                            
                            {/* Shipping Fee */}
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Shipping Fee:</span>
                              <span className="font-semibold text-gray-900">
                                {shippingFee.toLocaleString('vi-VN')}đ
                              </span>
                            </div>

                            {/* Discount if any */}
                            {discount > 0 && (
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Discount:</span>
                                <span className="font-semibold text-green-600">
                                  -{discount.toLocaleString('vi-VN')}đ
                                </span>
                              </div>
                            )}

                            {/* Total */}
                            <div className="flex justify-between pt-3 border-t-2 border-orange-300">
                              <span className="font-bold text-gray-900">Total:</span>
                              <span className="text-2xl font-bold text-orange-600">
                                {totalAmount.toLocaleString('vi-VN')}đ
                              </span>
                            </div>
                          </div>
                        </div>
                        );
                      })()}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <button 
                      onClick={() => toggleOrderExpand(order.id)}
                      className="px-4 py-2 bg-orange-600 text-white font-medium text-sm rounded-lg hover:bg-orange-700 transition"
                    >
                      {isExpanded ? 'Collapse' : 'View Details'}
                    </button>
                    
                    {isExpanded && order.status === 'pending' && (
                      <button 
                        onClick={() => handleCancelOrder(order.id)}
                        className="px-4 py-2 bg-red-50 text-red-600 font-medium text-sm rounded-lg hover:bg-red-100 transition hover:shadow-md"
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
