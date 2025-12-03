import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Grid3x3, List, SlidersHorizontal, ShoppingBag, Package } from "lucide-react";
import { storeService, StoreProduct } from "@/services/api/storeService";
import { MyOrders } from "./MyOrders";
import { useScrollToTop } from "@/lib/hooks/useScrollToTop";

interface StoreProps {
  onViewProduct: (id: string) => void;
}

type TabType = "products" | "orders";

export const Store: React.FC<StoreProps> = ({ onViewProduct }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabFromUrl = searchParams.get("tab") as TabType | null;
  const [activeTab, setActiveTab] = useState<TabType>(tabFromUrl || "products");
  const [products, setProducts] = useState<StoreProduct[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "price-low" | "price-high">("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000000]);
  const [maxPrice, setMaxPrice] = useState(5000000);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (tabFromUrl && tabFromUrl !== activeTab) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setSearchParams(tab === "products" ? {} : { tab });
  };

  const loadData = async () => {
    setLoading(true);
    const [productsRes, categoriesRes] = await Promise.all([
      storeService.getAllProducts(),
      storeService.getCategories(),
    ]);

    if (productsRes.success && productsRes.data) {
      setProducts(productsRes.data);
      // Tính giá cao nhất
      const max = Math.max(...productsRes.data.map(p => p.price));
      setMaxPrice(max);
      setPriceRange([0, max]);
    }

    if (categoriesRes.success && categoriesRes.data) {
      setCategories(categoriesRes.data);
    }

    setLoading(false);
  };

  const filteredProducts = products
    .filter(p => !selectedCategory || p.category === selectedCategory)
    .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                 p.description.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, priceRange, sortBy]);

  // Scroll to top when page changes
  useScrollToTop([currentPage]);

  const formatPrice = (price: number) => {
    return `${price.toLocaleString()}đ`;
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

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        <button
          onClick={() => handleTabChange("products")}
          className={`px-6 py-3 font-semibold transition flex items-center gap-2 ${
            activeTab === "products"
              ? "text-orange-600 border-b-2 border-orange-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <ShoppingBag size={20} />
          Products
        </button>
        <button
          onClick={() => handleTabChange("orders")}
          className={`px-6 py-3 font-semibold transition flex items-center gap-2 ${
            activeTab === "orders"
              ? "text-orange-600 border-b-2 border-orange-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <Package size={20} />
          My Orders
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "orders" ? (
        <MyOrders onBack={() => handleTabChange("products")} onViewProduct={onViewProduct} />
      ) : (
        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-1 space-y-6">
          {/* Header with results and controls */}
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <p className="text-gray-600">
                Showing <span className="text-gray-900 font-semibold">{startIndex + 1}-{Math.min(endIndex, filteredProducts.length)}</span> of{" "}
                <span className="text-gray-900 font-semibold">{filteredProducts.length}</span> results
              </p>

              <div className="flex items-center gap-4">
                {/* Items per page */}
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 text-sm">Show:</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(parseInt(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="px-3 py-1.5 bg-white border border-gray-300 rounded text-gray-900 text-sm focus:outline-none focus:border-orange-500 cursor-pointer"
                  >
                    <option value="6">6</option>
                    <option value="9">9</option>
                    <option value="12">12</option>
                    <option value="24">24</option>
                  </select>
                </div>
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
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading products...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <>
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                    : "space-y-4"
                }
              >
                {currentProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => onViewProduct(product.id)}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer border border-gray-200"
                  >
                    <div className="aspect-video bg-gray-200">
                      <img
                        src={product.coverImageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "https://via.placeholder.com/400x225?text=No+Image";
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-orange-600">
                          {formatPrice(product.price)}
                        </span>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <span>⭐</span>
                          <span>{product.rating?.toFixed(1) || "0.0"}</span>
                          <span>({product.reviewsCount || 0})</span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                          {product.category}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-6">
                  {/* Previous Button */}
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Previous
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                      // Show first page, last page, current page, and pages around current
                      const showPage = 
                        page === 1 || 
                        page === totalPages || 
                        (page >= currentPage - 1 && page <= currentPage + 1);
                      
                      const showEllipsis = 
                        (page === currentPage - 2 && currentPage > 3) ||
                        (page === currentPage + 2 && currentPage < totalPages - 2);

                      if (showEllipsis) {
                        return (
                          <span key={page} className="px-2 text-gray-400">
                            ...
                          </span>
                        );
                      }

                      if (!showPage) return null;

                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`min-w-[40px] h-10 rounded-lg font-medium transition ${
                            currentPage === page
                              ? "bg-orange-600 text-white"
                              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      currentPage === totalPages
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200 shadow-sm">
              <p className="text-gray-500 text-lg">No items found</p>
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
                max={maxPrice}
                step="100000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full accent-orange-500"
              />
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Price: {formatPrice(priceRange[0])}</span>
                <span className="text-gray-600">— {formatPrice(priceRange[1])}</span>
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
                <label
                  key={category}
                  className="flex items-center gap-2 text-gray-700 hover:text-gray-900 cursor-pointer"
                >
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
      )}
    </div>
  );
};
