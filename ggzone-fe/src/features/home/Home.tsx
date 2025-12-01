import React, { useState, useEffect } from "react";
import {
  Flame,
  Users,
  TrendingUp,
  ChevronRight,
  Zap,
  Loader,
} from "lucide-react";
import {
  GameCard,
  CommunityCard,
} from "@/components/shared/cards";
import { homeService } from "@/services/api/homeService";
import { storeService, StoreProduct } from "@/services/api/storeService";
import { Game, Group } from "@/types";

interface HomeProps {
  onNavigate?: (page: string) => void;
  onViewGame?: (gameId: string) => void;
  onViewGroup?: (groupId: string) => void;
  onViewProduct?: (productId: string) => void;
}

export const Home: React.FC<HomeProps> = ({ 
  onNavigate, 
  onViewGame,
  onViewGroup,
  onViewProduct
}) => {
  const [trendingGames, setTrendingGames] = useState<Game[]>([]);
  const [popularGroups, setPopularGroups] = useState<Group[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<StoreProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [subscribeLoading, setSubscribeLoading] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState('');

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await homeService.getHomeData();
        
        if (response.success && response.data) {
          setTrendingGames(response.data.trendingGames || []);
          setPopularGroups(response.data.popularGroups || []);
        } else {
          setError(response.message || 'Lỗi khi tải dữ liệu');
        }
      } catch (err) {
        setError('Lỗi khi tải dữ liệu trang Home');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const loadFeaturedProducts = async () => {
      try {
        setProductsLoading(true);
        const response = await storeService.getAllProducts();
        
        if (response.success && response.data) {
          // Lấy 4 sản phẩm đầu tiên để hiển thị
          setFeaturedProducts(response.data.slice(0, 4));
        }
      } catch (err) {
        console.error('Lỗi khi tải sản phẩm:', err);
      } finally {
        setProductsLoading(false);
      }
    };

    loadHomeData();
    loadFeaturedProducts();
  }, []);

  const handleMarketplaceClick = () => {
    onNavigate?.("MARKETPLACE");
  };

  const handleProductClick = (productId: string) => {
    if (onViewProduct) {
      onViewProduct(productId);
    } else {
      onNavigate?.("MARKETPLACE");
    }
  };

  const handleGameClick = (gameId: string) => {
    onViewGame?.(gameId);
  };

  const handleGroupClick = (groupId: string) => {
    if (onViewGroup) {
      onViewGroup(groupId);
    } else {
      onNavigate?.("GROUPS");
    }
  };

  const handleBrowseGames = () => {
    onNavigate?.("BROWSE");
  };

  const handleBrowseGroups = () => {
    onNavigate?.("GROUPS");
  };

  const handlePlayNow = () => {
    // Navigate to browse games or specific game
    onNavigate?.("BROWSE");
  };

  const handleLearnMore = () => {
    // Scroll to games section or navigate
    const gamesSection = document.getElementById('games-section');
    if (gamesSection) {
      gamesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setSubscribeMessage('Please enter a valid email address');
      return;
    }

    setSubscribeLoading(true);
    setSubscribeMessage('');

    // Simulate API call
    setTimeout(() => {
      setSubscribeMessage('Thank you for subscribing! 🎉');
      setEmail('');
      setSubscribeLoading(false);
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setSubscribeMessage('');
      }, 3000);
    }, 1000);
  };

  return (
    <div className="space-y-12 bg-white min-h-screen pb-12">
      {/* Hero Banner */}
      <section className="relative h-96 rounded-2xl overflow-hidden group shadow-xl">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://wallpapercat.com/w/full/4/d/7/1868806-3840x2160-desktop-4k-valorant-wallpaper-image.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

        <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-orange-300/300 border border-orange-600 rounded-full backdrop-blur-sm">
              <Flame size={16} className="text-orange-600" />
              <span className="text-sm font-semibold text-orange-600">
                Featured Game
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              Valorant Champions
            </h1>

            <p className="text-white text-lg mb-6 max-w-xl drop-shadow-md">
              Join the competitive esports revolution. Master your skills,
              compete with players worldwide, and claim your glory.
            </p>

            <div className="flex gap-4">
              <button 
                onClick={handlePlayNow}
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-lg transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <Flame size={20} /> Play Now
              </button>
              <button 
                onClick={handleLearnMore}
                className="px-8 py-3 bg-white/20 hover:bg-white/30 text-white font-bold rounded-lg border border-white/40 transition-all duration-200 backdrop-blur-sm hover:scale-105"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </section>

      {/* Games */}
      <section id="games-section">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <TrendingUp size={28} className="text-orange-600" />
            <h2 className="text-3xl font-bold text-gray-900">Trending Games</h2>
          </div>
          <button
            onClick={handleBrowseGames}
            className="text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-1 transition-colors hover:gap-2"
          >
            View All <ChevronRight size={18} />
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12 bg-gray-50 rounded-lg">
            <Loader className="animate-spin text-orange-600" size={32} />
          </div>
        ) : error ? (
          <div className="text-center py-12 bg-red-50 rounded-lg">
            <p className="text-red-500">{error}</p>
          </div>
        ) : trendingGames.length > 0 ? (
          <div className="grid grid-cols-3 gap-6">
            {trendingGames.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                onViewGame={() => handleGameClick(game.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">Không có game nào</p>
          </div>
        )}
      </section>

      {/* Communities */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Users size={28} className="text-purple-600" />
            <h2 className="text-3xl font-bold text-gray-900">Popular Communities</h2>
          </div>
          <button
            onClick={handleBrowseGroups}
            className="text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-1 transition-colors hover:gap-2"
          >
            View All <ChevronRight size={18} />
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12 bg-gray-50 rounded-lg">
            <Loader className="animate-spin text-purple-600" size={32} />
          </div>
        ) : error ? (
          <div className="text-center py-12 bg-red-50 rounded-lg">
            <p className="text-red-500">{error}</p>
          </div>
        ) : popularGroups.length > 0 ? (
          <div className="grid grid-cols-2 gap-6">
            {popularGroups.map((group) => (
              <CommunityCard
                key={group.id}
                group={group}
                onClick={() => handleGroupClick(group.id)}
                onJoin={() => handleGroupClick(group.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">Không có cộng đồng nào</p>
          </div>
        )}
      </section>

      {/* Featured Marketplace */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Zap size={28} className="text-yellow-600" />
            <h2 className="text-3xl font-bold text-gray-900">Featured Gear</h2>
          </div>
          <button
            onClick={handleMarketplaceClick}
            className="text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-1 transition-colors"
          >
            View All <ChevronRight size={18} />
          </button>
        </div>

        {productsLoading ? (
          <div className="flex justify-center items-center py-12 bg-gray-50 rounded-lg">
            <Loader className="animate-spin text-yellow-600" size={32} />
          </div>
        ) : featuredProducts.length > 0 ? (
          <div className="grid grid-cols-4 gap-6">
            {featuredProducts.map((product) => {
              const discount = product.price > 0 ? Math.round(((product.price * 0.2) / product.price) * 100) : 0;
              const originalPrice = product.price > 0 ? product.price * 1.25 : 0;
              
              return (
                <div
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
                >
                  <div className="relative overflow-hidden aspect-square">
                    <img
                      src={product.coverImageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/400x400?text=No+Image';
                      }}
                    />
                    {discount > 0 && (
                      <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        -{discount}%
                      </div>
                    )}
                    <div className="absolute top-3 left-3 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {product.category}
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      ⭐ {product.rating?.toFixed(1) || '0.0'} ({product.reviewsCount || 0} reviews)
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl font-bold text-orange-600">
                        ${product.price.toLocaleString()}
                      </span>
                      {originalPrice > 0 && (
                        <span className="text-sm text-gray-400 line-through">
                          ${originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProductClick(product.id);
                      }}
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">Không có sản phẩm nào</p>
          </div>
        )}
      </section>

      {/* Newsletter CTA */}
      <section className="bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 rounded-2xl p-8 md:p-12 border border-purple-400/30 shadow-lg">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-white/90 mb-6">
            Get the latest gaming news, tournament updates, and exclusive offers
            delivered to your inbox.
          </p>

          <form onSubmit={handleSubscribe} className="space-y-3">
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/30 backdrop-blur-sm"
                disabled={subscribeLoading}
              />
              <button 
                type="submit"
                disabled={subscribeLoading}
                className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
              >
                {subscribeLoading ? (
                  <Loader className="animate-spin" size={20} />
                ) : (
                  'Subscribe'
                )}
              </button>
            </div>
            {subscribeMessage && (
              <p className={`text-sm ${subscribeMessage.includes('Thank you') ? 'text-green-200' : 'text-red-200'}`}>
                {subscribeMessage}
              </p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
};
