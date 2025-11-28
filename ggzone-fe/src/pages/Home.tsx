import React, { useState, useEffect } from "react";
import {
  Flame,
  Users,
  TrendingUp,
  ChevronRight,
  Zap,
  Loader,
  MessageCircle,
  Crown,
} from "lucide-react";
import {
  GameCard,
  CommunityCard,
} from "../components/cards";
import { homeService, Post, User } from "../services/homeService";
import { Game, Group } from "../types";

interface HomeProps {
  onNavigate?: (page: string) => void;
  onViewGame?: (gameId: string) => void;
  onViewGroup?: (groupId: string) => void;
}

export const Home: React.FC<HomeProps> = ({ 
  onNavigate, 
  onViewGame,
  onViewGroup
}) => {
  const [trendingGames, setTrendingGames] = useState<Game[]>([]);
  const [popularGroups, setPopularGroups] = useState<Group[]>([]);
  const [trendingPosts, setTrendingPosts] = useState<Post[]>([]);
  const [trendingPlayers, setTrendingPlayers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await homeService.getHomeData();
        
        if (response.success && response.data) {
          setTrendingGames(response.data.trendingGames || []);
          setPopularGroups(response.data.popularGroups || []);
          setTrendingPosts(response.data.trendingPosts || []);
          setTrendingPlayers(response.data.trendingPlayers || []);
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

    loadHomeData();
  }, []);

  const handleMarketplaceClick = () => {
    onNavigate?.("MARKETPLACE");
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
              <button className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-lg transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl">
                <span></span> Play Now
              </button>
              <button className="px-8 py-3 bg-white/20 hover:bg-white/30 text-white font-bold rounded-lg border border-white/40 transition-all duration-200 backdrop-blur-sm">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </section>

      {/* Games */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <TrendingUp size={28} className="text-orange-600" />
            <h2 className="text-3xl font-bold text-gray-900">Games</h2>
          </div>
          <a
            href="#"
            className="text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-1 transition-colors"
          >
            View All <ChevronRight size={18} />
          </a>
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
            <h2 className="text-3xl font-bold text-gray-900">Communities</h2>
          </div>
          <a
            href="#"
            className="text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-1 transition-colors"
          >
            View All <ChevronRight size={18} />
          </a>
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

      {/* Trending Posts */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <MessageCircle size={28} className="text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">Trending Posts</h2>
          </div>
          <a
            href="#"
            className="text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-1 transition-colors"
          >
            View All <ChevronRight size={18} />
          </a>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12 bg-gray-50 rounded-lg">
            <Loader className="animate-spin text-blue-600" size={32} />
          </div>
        ) : error ? (
          <div className="text-center py-12 bg-red-50 rounded-lg">
            <p className="text-red-500">{error}</p>
          </div>
        ) : trendingPosts.length > 0 ? (
          <div className="grid grid-cols-2 gap-6">
            {trendingPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-4">
                  {post.author?.avatar && (
                    <img
                      src={post.author.avatar}
                      alt={post.author.username}
                      className="w-10 h-10 rounded-full"
                    />
                  )}
                  <div>
                    <p className="font-semibold text-gray-900">
                      {post.author?.username || 'Anonymous'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {post.createdAt
                        ? new Date(post.createdAt).toLocaleDateString('vi-VN')
                        : 'Recently'}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 line-clamp-3 mb-4">{post.content}</p>
                <div className="flex gap-4 text-sm text-gray-500">
                  <span>❤️ {post.likes || 0} Likes</span>
                  <span>💬 {post.comments || 0} Comments</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">Không có bài viết nào</p>
          </div>
        )}
      </section>

      {/* Trending Players */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Crown size={28} className="text-yellow-600" />
            <h2 className="text-3xl font-bold text-gray-900">Top Players</h2>
          </div>
          <a
            href="#"
            className="text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-1 transition-colors"
          >
            View All <ChevronRight size={18} />
          </a>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12 bg-gray-50 rounded-lg">
            <Loader className="animate-spin text-yellow-600" size={32} />
          </div>
        ) : error ? (
          <div className="text-center py-12 bg-red-50 rounded-lg">
            <p className="text-red-500">{error}</p>
          </div>
        ) : trendingPlayers.length > 0 ? (
          <div className="grid grid-cols-2 gap-6">
            {trendingPlayers.map((player, index) => (
              <div
                key={player.id}
                className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    {player.avatar && (
                      <img
                        src={player.avatar}
                        alt={player.username}
                        className="w-16 h-16 rounded-full"
                      />
                    )}
                    <div className="absolute -top-2 -right-2 bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                      #{index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 text-lg">
                      {player.username}
                    </p>
                    <p className="text-sm text-gray-600">
                      Level {player.level || 1}
                    </p>
                    <p className="text-sm text-orange-600 font-semibold">
                      {player.followers || 0} Followers
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">Không có người chơi nào</p>
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

        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">Dữ liệu sẽ được tải từ API</p>
        </div>
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

          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/30 backdrop-blur-sm"
            />
            <button className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors shadow-md hover:shadow-lg">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
