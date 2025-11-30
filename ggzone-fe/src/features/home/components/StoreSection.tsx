import React, { useState } from "react";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { MarketplaceCard } from "@/components/shared/cards";
import type { MarketplaceItem } from "@/types";

interface StoreSectionProps {
  items: MarketplaceItem[];
}

export const StoreSection: React.FC<StoreSectionProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(items.length / 4));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.ceil(items.length / 4) - 1 : prev - 1
    );
  };

  return (
    <section className="py-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShoppingCart size={24} className="text-orange-500" />
          <h2 className="text-2xl font-bold text-white">Our Store</h2>
        </div>
        <button className="text-sm font-semibold text-gray-300 hover:text-white">
          Popular
        </button>
      </div>

      <div className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.slice(currentIndex * 4, (currentIndex + 1) * 4).map((item) => (
            <MarketplaceCard key={item.id} item={item} />
          ))}
        </div>

        {items.length > 4 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      <div className="mt-6 flex justify-center gap-1">
        {Array.from({ length: Math.ceil(items.length / 4) }).map((_, index) => (
          <div
            key={index}
            className={`h-1 rounded-full transition-all ${
              index === currentIndex ? "w-8 bg-orange-500" : "w-4 bg-gray-600"
            }`}
          />
        ))}
      </div>
    </section>
  );
};
