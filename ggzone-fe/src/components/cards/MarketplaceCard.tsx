import React, { useState } from "react";
import {
  ShoppingCart,
  Heart,
  Star,
  Tag,
  TrendingUp,
  Eye,
} from "lucide-react";
import type { MarketplaceItem } from "../../assets/mock/marketplace";

interface MarketplaceCardProps {
  item: MarketplaceItem;
  onBuy?: () => void;
}

const MarketplaceCard: React.FC<MarketplaceCardProps> = ({ item, onBuy }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const isSold = item.status === "sold";

  return (
    <div className="group relative">
      {/* Card Container */}
      <div
        className={`bg-white rounded-xl overflow-hidden transition-all duration-200 ${
          isSold
            ? "opacity-60 pointer-events-none"
            : "hover:shadow-lg"
        } shadow-md`}
      >
        {/* Image Container */}
        <div className="relative h-40 bg-gray-100 overflow-hidden">
          <img
            src={item.coverImageUrl}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />

          {/* Status Badge */}
          {isSold && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
              <div className="text-center">
                <div className="text-white font-bold text-xl">SOLD OUT</div>
                <div className="text-white/80 text-xs mt-1">Check back soon</div>
              </div>
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute top-2 left-2 px-2 py-1 bg-orange-600 text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-md">
            <Tag size={12} />
            {item.category}
          </div>

          {/* Favorite Button */}
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-2 right-2 p-2 bg-white/90 hover:bg-white rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <Heart
              size={16}
              className={`transition-colors ${
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
              }`}
            />
          </button>

          {/* Rating Badge */}
          <div className="absolute bottom-2 right-2 px-2 py-1 bg-white/90 rounded-lg flex items-center gap-1 text-xs font-semibold shadow-md">
            <Star size={12} className="text-yellow-500 fill-yellow-500" />
            <span className="text-gray-900">{item.rating}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="text-sm font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-orange-600 transition-colors">
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-gray-600 mb-3 line-clamp-2">
            {item.description}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200">
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <Eye size={12} className="text-blue-600" />
              <span>{item.reviewsCount} reviews</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-green-600 font-semibold">
              <TrendingUp size={12} />
              <span>Trending</span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between gap-2">
            {/* Price */}
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Price</span>
              <span className="text-lg font-bold text-orange-600">
                ${item.price}
              </span>
            </div>

            {/* Buy Button */}
            <button
              onClick={onBuy}
              disabled={isSold}
              className="flex-1 px-3 py-2 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white text-sm font-bold rounded-lg transition-all duration-200 flex items-center justify-center gap-1 shadow-md hover:shadow-lg"
            >
              <ShoppingCart size={14} />
              <span className="hidden sm:inline">Buy</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { MarketplaceCard };