import React, { useState } from "react";
import { ArrowLeft, Star, ShoppingCart, Heart, Minus, Plus } from "lucide-react";
import type { MarketplaceItem } from "../assets/mock/marketplace";
import { mockMarketplaceItems } from "../assets/mock/marketplace";
import { useCart } from "../context/CartContext";

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
  const { addToCart } = useCart();

  const product = mockMarketplaceItems.find((item) => item.id === productId);

  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Product not found</p>
        <button
          onClick={onBack}
          className="mt-4 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
        >
          Back to Marketplace
        </button>
      </div>
    );
  }

  const relatedProducts = mockMarketplaceItems
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`Added ${quantity}x "${product.title}" to cart!`);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    alert(`Added ${quantity}x "${product.title}" to cart! Redirecting to checkout...`);
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
      >
        <ArrowLeft size={20} />
        <span className="font-medium">Back to Marketplace</span>
      </button>

      {/* Product Header */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square">
          <img
            src={product.coverImageUrl}
            alt={product.title}
            className="w-full h-full object-cover"
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
              <span className="text-sm text-gray-500">
                {product.platform}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.title}
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
              ${product.price}
            </div>
          </div>

          {/* Description Preview */}
          <div>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          {/* Platform & Status */}
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              Platform: {product.platform}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              product.status === 'online' 
                ? 'bg-green-100 text-green-700' 
                : product.status === 'sold'
                ? 'bg-red-100 text-red-700'
                : 'bg-gray-100 text-gray-700'
            }`}>
              {product.status}
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
                  <li><strong>Platform:</strong> {product.platform}</li>
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
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-1 bg-white rounded flex items-center gap-1 text-xs font-semibold">
                    <Star size={12} className="text-yellow-500 fill-yellow-500" />
                    {item.rating}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 text-sm">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-orange-600">
                      ${item.price}
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
    </div>
  );
};
