import React, { useState } from "react";
import { MarketplaceCard } from "@/components/shared/cards";
import { Search, Grid3x3, List, SlidersHorizontal } from "lucide-react";
import { useCart } from "@/app/providers/CartContext";

export interface MarketplaceItem {
  id: string;
  title: string;
  name?: string;
  description: string;
  price: number;
  coverImageUrl: string;
  category: string;
  platform: string;
  rating: number;
  reviewsCount: number;
  status: string;
}

interface MarketplaceProps {
  onViewProduct: (productId: string) => void;
}

export const Marketplace: React.FC<MarketplaceProps> = ({ onViewProduct }) => {
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"price-low" | "price-high" | "newest">("newest");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000000]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // TODO: Fetch data from API
  const marketplaceItems: MarketplaceItem[] = [];

  const filteredItems = marketplaceItems.filter((item) => {
    const itemTitle = item.title || item.name || "";
    const itemDescription = item.description || "";
    const matchesSearch =
      itemTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      itemDescription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    return 0;
  });

  const categories = Array.from(new Set(marketplaceItems.map((i) => i.category)));

  const handleAddToCart = (item: MarketplaceItem) => {
    addToCart(item, 1);
    alert(`Added "${item.title}" to cart!`);
  };

  const handleBuy = (item: MarketplaceItem) => {
    addToCart(item, 1);
    alert(`Added "${item.title}" to cart! Redirecting to checkout...`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-48 rounded-xl overflow-hidden mb-8 shadow-lg">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://wallpapercat.com/w/full/4/d/7/1868806-3840x2160-desktop-4k-valorant-wallpaper-image.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-center px-8">
          <h1 className="text-4xl font-bold text-white mb-2">Marketplace</h1>
          <p className="text-gray-200">Home &gt; Shop</p>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Header with results and controls */}
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <p className="text-gray-600">
                Showing <span className="text-gray-900 font-semibold">1-{sortedItems.length}</span> of{" "}
                <span className="text-gray-900 font-semibold">{sortedItems.length}</span> results
              </p>
              
              <div className="flex items-center gap-4">
                {/* Sort By */}
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 text-sm">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-3 py-1.5 bg-white border border-gray-300 rounded text-gray-900 text-sm focus:outline-none focus:border-orange-500 cursor-pointer"
                  >
                    <option value="newest">Latest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center gap-1 bg-gray-100 rounded p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded transition ${
                      viewMode === "grid" ? "bg-orange-600 text-white" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <Grid3x3 size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded transition ${
                      viewMode === "list" ? "bg-orange-600 text-white" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {sortedItems.length > 0 ? (
            <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-4"}>
              {sortedItems.map((item) => (
                <MarketplaceCard
                  key={item.id}
                  item={item}
                  onViewDetails={() => onViewProduct(item.id)}
                  onAddToCart={() => handleAddToCart(item)}
                  onBuy={() => handleBuy(item)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200 shadow-sm">
              <p className="text-gray-500 text-lg">No items found</p>
            </div>
          )}

          {/* Load More Button */}
          {sortedItems.length > 0 && (
            <div className="flex justify-center pt-4">
              <button className="px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition shadow-md">
                Load More
              </button>
            </div>
          )}
        </div>

        {/* Sidebar Filter - Right Side */}
        <div className="w-72 flex-shrink-0 space-y-6">
          {/* Search */}
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
            <h3 className="text-gray-900 font-semibold mb-3 flex items-center gap-2">
              <Search size={18} />
              Search
            </h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-gray-900 placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
              <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Price Filter */}
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
            <h3 className="text-gray-900 font-semibold mb-3 flex items-center gap-2">
              <SlidersHorizontal size={18} />
              Filter by Price
            </h3>
            <div className="space-y-3">
              <input
                type="range"
                min="0"
                max="5000000"
                step="100000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full accent-orange-500"
              />
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Price: ${priceRange[0].toLocaleString()}</span>
                <span className="text-gray-600">- ${priceRange[1].toLocaleString()}</span>
              </div>
              <button className="w-full px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded transition shadow-sm">
                Apply Filter
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
            <h3 className="text-gray-900 font-semibold mb-3">Category</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-700 hover:text-gray-900 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === null}
                  onChange={() => setSelectedCategory(null)}
                  className="accent-orange-500"
                />
                <span>All Products</span>
              </label>
              {categories.map((category) => (
                <label key={category} className="flex items-center gap-2 text-gray-700 hover:text-gray-900 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === category}
                    onChange={() => setSelectedCategory(category)}
                    className="accent-orange-500"
                  />
                  <span className="capitalize">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Latest Products Preview */}
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
            <h3 className="text-gray-900 font-semibold mb-3">Latest Products</h3>
            <p className="text-gray-500 text-sm">Dữ liệu sẽ được tải từ API</p>
          </div>
        </div>
      </div>
    </div>
  );
};
