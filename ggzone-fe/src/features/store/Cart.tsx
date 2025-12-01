import React, { useState } from "react";
import { useCart } from "@/app/providers/CartContext";
import { useAuth } from "@/app/providers/AuthContext";
import { orderService } from "@/services/api/orderService";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  CreditCard,
  Tag,
  Package,
  Star,
  Eye,
} from "lucide-react";

interface CartProps {
  onBack: () => void;
  onViewProduct?: (productId: string) => void;
  onCheckout?: () => void;
}

export const Cart: React.FC<CartProps> = ({ onBack, onViewProduct, onCheckout }) => {
  const { user } = useAuth();
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalPrice, getTotalItems } =
    useCart();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(
    null
  );

  const shippingFee = 30000;
  const subtotal = getTotalPrice();
  const discount = appliedCoupon ? (subtotal * appliedCoupon.discount) / 100 : 0;
  const total = subtotal + shippingFee - discount;

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === "GGZONE10") {
      setAppliedCoupon({ code: couponCode, discount: 10 });
      alert("Coupon applied! 10% discount");
    } else if (couponCode.toUpperCase() === "WELCOME20") {
      setAppliedCoupon({ code: couponCode, discount: 20 });
      alert("Coupon applied! 20% discount");
    } else {
      alert("Invalid coupon code");
    }
  };

  const handleCheckout = async () => {
    if (!user || cartItems.length === 0) return;

    const orderItems = cartItems.map(item => ({
      productId: item.product.id,
      quantity: item.quantity,
      price: item.product.price
    }));

    const response = await orderService.createOrder({
      userId: user.id,
      totalAmount: total,
      items: orderItems
    });

    if (response.success) {
      clearCart();
      if (onCheckout) onCheckout();
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center">
              <ShoppingCart size={64} className="text-gray-400" />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Cart is Empty</h2>
            <p className="text-gray-600">Add some products to get started!</p>
          </div>
          <button
            onClick={onBack}
            className="px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition inline-flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition mb-2"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Continue Shopping</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-1">
            {getTotalItems()} {getTotalItems() === 1 ? "item" : "items"} in your cart
          </p>
        </div>
        <button
          onClick={clearCart}
          className="px-4 py-2 text-red-600 hover:bg-red-50 border border-red-300 rounded-lg transition font-medium"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.product.id}
              className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition overflow-hidden"
            >
              <div className="p-4 flex gap-4">
                {/* Product Image */}
                <div className="relative w-32 h-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden group">
                  <img
                    src={item.product.coverImageUrl}
                    alt={item.product.title}
                    className="w-full h-full object-cover"
                  />
                  {onViewProduct && (
                    <button
                      onClick={() => onViewProduct(item.product.id)}
                      className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center"
                    >
                      <Eye size={24} className="text-white" />
                    </button>
                  )}
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                          {item.product.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="px-2 py-0.5 bg-orange-100 text-orange-600 rounded text-xs font-medium">
                            {item.product.category}
                          </span>
                          <span>•</span>
                          <span>{item.product.platform}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Remove from cart"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                      <Star size={16} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-semibold">{item.product.rating}</span>
                      <span className="text-sm text-gray-500">
                        ({item.product.reviewsCount} reviews)
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2">
                      {item.product.description}
                    </p>
                  </div>

                  {/* Quantity and Price */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1.5 bg-gray-200 hover:bg-gray-300 rounded transition"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-12 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1.5 bg-gray-200 hover:bg-gray-300 rounded transition"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="text-sm text-gray-500">
                        ${item.product.price.toLocaleString()} x {item.quantity}
                      </div>
                      <div className="text-xl font-bold text-orange-600">
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm sticky top-6">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Package size={24} />
                Order Summary
              </h2>
            </div>

            <div className="p-6 space-y-4">
              {/* Coupon Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Tag size={16} />
                  Coupon Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium rounded-lg transition"
                  >
                    Apply
                  </button>
                </div>
                {appliedCoupon && (
                  <p className="text-sm text-green-600 mt-2">
                    ✓ Coupon "{appliedCoupon.code}" applied ({appliedCoupon.discount}% off)
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Try: GGZONE10 or WELCOME20
                </p>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="font-semibold">${shippingFee.toLocaleString()}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({appliedCoupon.discount}%)</span>
                    <span className="font-semibold">-${discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-orange-600">${total.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition flex items-center justify-center gap-2 shadow-md"
              >
                <CreditCard size={20} />
                Proceed to Checkout
              </button>

              {/* Security Info */}
              <div className="text-center text-xs text-gray-500 pt-2">
                <p>🔒 Secure checkout</p>
                <p>Free shipping on orders over $50</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
