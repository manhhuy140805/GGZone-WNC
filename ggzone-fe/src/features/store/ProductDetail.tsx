import React, { useState, useEffect } from "react";
import { ArrowLeft, Star, ShoppingCart, Heart, Minus, Plus } from "lucide-react";
import { useCart } from "@/app/providers/CartContext";
import { storeService, StoreProduct } from "@/services/api/storeService";

interface ProductDetailProps {
  productId: string;
  onBack: () => void;
  onViewProduct?: (productId: string) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  productId,
  onBack,
  onViewProduct,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "reviews" | "shipping">("description");
  const [isFavorite, setIsFavorite] = useState(false);
  const [product, setProduct] = useState<StoreProduct | null>(null);
  const [showAddedToast, setShowAddedToast] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<StoreProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    loadProduct();
  }, [productId]);

  const loadProduct = async () => {
    setLoading(true);
    const response = await storeService.getProductById(productId);
    
    if (response.success && response.data) {
      setProduct(response.data);
      
      // Load related products from same category
      if (response.data.category) {
        const relatedRes = await storeService.getProductsByCategory(response.data.category);
        if (relatedRes.success && relatedRes.data) {
          setRelatedProducts(relatedRes.data.filter(p => p.id !== productId).slice(0, 4));
        }
      }
    }
    
    setLoading(false);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
        <p className="text-gray-500 mt-4">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Product not found</p>
        <button
          onClick={onBack}
          className="mt-4 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
        >
          Back to Store
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    const cartItem = {
      ...product,
      title: product.name,
      platform: '',
    };
    addToCart(cartItem, quantity);
    setShowAddedToast(true);
    setTimeout(() => setShowAddedToast(false), 3000);
  };

  const handleBuyNow = () => {
    const cartItem = {
      ...product,
      title: product.name,
      platform: '',
    };
    addToCart(cartItem, quantity);
    setShowAddedToast(true);
    setTimeout(() => {
      setShowAddedToast(false);
      // Redirect to cart after toast
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
      >
        <ArrowLeft size={20} />
        <span className="font-medium">Back to Store</span>
      </button>

      {/* Product Header */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square">
          <img
            src={product.coverImageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/800x800?text=No+Image';
            }}
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Title & Category */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium">
                {product.category}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star size={20} className="text-yellow-500 fill-yellow-500" />
                <span className="text-lg font-semibold">{product.rating}</span>
              </div>
              <span className="text-gray-500">
                ({product.reviewsCount} reviews)
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="border-t border-b border-gray-200 py-4">
            <div className="text-4xl font-bold text-orange-600">
              {formatPrice(product.price)}
            </div>
          </div>

          {/* Description Preview */}
          <div>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          {/* Status */}
          <div className="flex flex-wrap gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              product.status === 'online' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-gray-100 text-gray-700'
            }`}>
              {product.status === 'online' ? 'Available' : 'Unavailable'}
            </span>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="font-medium text-gray-700">Quantity:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 bg-gray-200 hover:bg-gray-300 rounded transition"
              >
                <Minus size={16} />
              </button>
              <span className="w-12 text-center font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 bg-gray-200 hover:bg-gray-300 rounded transition"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold rounded-lg transition"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition"
            >
              Buy Now
            </button>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-3 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
            >
              <Heart
                size={20}
                className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-t border-gray-200 pt-6">
        <div className="flex gap-4 border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab("description")}
            className={`px-4 py-2 font-medium transition ${
              activeTab === "description"
                ? "text-orange-600 border-b-2 border-orange-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-4 py-2 font-medium transition ${
              activeTab === "reviews"
                ? "text-orange-600 border-b-2 border-orange-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Reviews ({product.reviewsCount})
          </button>
          <button
            onClick={() => setActiveTab("shipping")}
            className={`px-4 py-2 font-medium transition ${
              activeTab === "shipping"
                ? "text-orange-600 border-b-2 border-orange-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Shipping
          </button>
        </div>

        {/* Tab Content */}
        <div className="prose max-w-none">
          {activeTab === "description" && (
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Product Details</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Category:</strong> {product.category}</li>
                  <li><strong>Rating:</strong> {product.rating} / 5</li>
                  <li><strong>Reviews:</strong> {product.reviewsCount}</li>
                  <li><strong>Status:</strong> {product.status}</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="text-gray-700">
              <p className="mb-4">Customer reviews coming soon...</p>
              <div className="flex items-center gap-2 mb-4">
                <Star size={24} className="text-yellow-500 fill-yellow-500" />
                <span className="text-2xl font-bold">{product.rating}</span>
                <span className="text-gray-500">out of 5</span>
              </div>
              <p className="text-gray-500">Based on {product.reviewsCount} reviews</p>
            </div>
          )}

          {activeTab === "shipping" && (
            <div className="text-gray-700 space-y-4">
              <p>Fast and reliable shipping options available.</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Standard Shipping: 5-7 business days</li>
                <li>Express Shipping: 2-3 business days</li>
                <li>Free shipping on orders over $50</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedProducts.map((item) => (
              <div
                key={item.id}
                onClick={() => onViewProduct?.(item.id)}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md border border-gray-200 hover:border-orange-400 transition cursor-pointer"
              >
                <div className="relative h-40 bg-gray-100">
                  <img
                    src={item.coverImageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/400x225?text=No+Image';
                    }}
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-1 bg-white rounded flex items-center gap-1 text-xs font-semibold">
                    <Star size={12} className="text-yellow-500 fill-yellow-500" />
                    {item.rating}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 text-sm">
                    {item.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-orange-600">
                      {formatPrice(item.price)}
                    </span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewProduct?.(item.id);
                      }}
                      className="px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold rounded transition"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showAddedToast && (
        <div className="fixed bottom-8 right-8 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-slide-up z-50">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <ShoppingCart size={18} className="text-green-600" />
          </div>
          <div>
            <p className="font-bold">Added to cart!</p>
            <p className="text-sm text-green-100">{quantity}x {product?.name}</p>
          </div>
        </div>
      )}
    </div>
  );
};
