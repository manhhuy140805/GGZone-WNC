import React, { useState } from "react";
import { ShoppingCart, Heart, Star } from "lucide-react";
import type { MarketplaceItem } from "@/types";

interface MarketplaceCardProps {
  item: MarketplaceItem;
  onAddToCart?: () => void;
  onBuy?: () => void;
  onViewDetails?: () => void;
}

const MarketplaceCard: React.FC<MarketplaceCardProps> = ({
  item,
  onAddToCart,
  onBuy,
  onViewDetails,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const isSold = item.status === "sold";

  return (
    <div
      onClick={onViewDetails}
      className={`bg-white rounded-lg overflow-hidden transition-all duration-200 shadow-sm hover:shadow-md border border-gray-200 hover:border-orange-400 cursor-pointer group ${
        isSold ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      {/* Image Container */}
      <div className="relative h-40 bg-gray-100 overflow-hidden group">
        <img
          src={item.coverImageUrl}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Sold Out Overlay */}
        {isSold && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">SOLD OUT</span>
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-2 right-2 p-2 bg-white rounded-full hover:bg-gray-100 transition-all shadow-md"
        >
          <Heart
            size={16}
            className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}
          />
        </button>

        {/* Rating Badge */}
        <div className="absolute bottom-2 left-2 px-2 py-1 bg-white rounded flex items-center gap-1 text-xs font-semibold shadow-sm">
          <Star size={12} className="text-yellow-500 fill-yellow-500" />
          {item.rating}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-bold text-gray-900 mb-1 line-clamp-2 text-sm">
          {item.title}
        </h3>

        {/* Category & Reviews */}
        <div className="flex items-center justify-between mb-3 text-xs text-gray-600">
          <span className="px-2 py-1 bg-orange-100 rounded">
            {item.category}
          </span>
          <span>{item.reviewsCount} reviews</span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-2">
          {/* Price */}
          <span className="text-lg font-bold text-orange-600">
            ${item.price}
          </span>

          {/* Buttons */}
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart?.();
              }}
              disabled={isSold}
              className="px-3 py-2 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-400 text-gray-900 text-sm font-bold rounded transition-colors flex items-center gap-1"
            >
              <ShoppingCart size={14} />
              Cart
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onBuy?.();
              }}
              disabled={isSold}
              className="px-3 py-2 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white text-sm font-bold rounded transition-colors"
            >
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { MarketplaceCard };