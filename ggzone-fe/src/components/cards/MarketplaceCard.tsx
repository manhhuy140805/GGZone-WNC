import React from "react";
import { ShoppingCart } from "lucide-react";
import { Badge, Button } from "../common";
import type { MarketplaceItem } from "../../assets/mock/marketplace";

interface MarketplaceCardProps {
  item: MarketplaceItem;
  onBuy?: () => void;
}

export const MarketplaceCard: React.FC<MarketplaceCardProps> = ({
  item,
  onBuy,
}) => {
  const isSold = item.status === "sold";

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${
        isSold ? "opacity-60" : ""
      }`}
    >
      <div className="h-40 bg-gray-200 flex items-center justify-center text-5xl relative">
        {item.image_url}
        {isSold && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">SOLD</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
            <Badge label={item.category} variant="info" size="sm" />
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {item.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">{item.price}</span>
          <Button variant="primary" size="sm" onClick={onBuy} disabled={isSold}>
            <ShoppingCart size={16} />
            Buy
          </Button>
        </div>
      </div>
    </div>
  );
};
