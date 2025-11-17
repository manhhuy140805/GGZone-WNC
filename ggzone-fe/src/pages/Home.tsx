import React from "react";
import {
  Flame,
  Users,
  TrendingUp,
  ChevronRight,
  Users2,
  Gamepad2,
  Trophy,
  DollarSign,
  Zap,
  Eye,
  Play,
  Heart,
  Tag,
  ShoppingCart,
} from "lucide-react";
import { mockLiveChannels } from "../assets/mock/liveChannels";
import { mockGroups } from "../assets/mock/groups";
import { mockMarketplaceItems } from "../assets/mock/marketplace";
import { mockGames } from "../assets/mock/games";
import {
  LiveChannelCard,
  GameCard,
  CommunityCard,
  MarketplaceCard,
  StatCard,
} from "../components/cards";

interface HomeProps {
  onNavigate?: (page: string) => void;
  onViewProduct?: (productId: string) => void;
  onViewGame?: (gameId: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate, onViewProduct, onViewGame }) => {
  const handleMarketplaceClick = () => {
    onNavigate?.("MARKETPLACE");
  };

  const handleProductClick = (productId: string) => {
    onNavigate?.("MARKETPLACE");
    onViewProduct?.(productId);
  };

  const handleLiveChannelClick = () => {
    onNavigate?.("LIVESTREAM");
  };

  const handleGameClick = (gameId: string) => {
    onNavigate?.("BROWSE");
    onViewGame?.(gameId);
  };

  const handleGroupClick = () => {
    onNavigate?.("GROUPS");
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

      {/* Live Channels */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <h2 className="text-3xl font-bold text-gray-900">Live Now</h2>
            <span className="text-sm text-gray-600">
              {mockLiveChannels.length} streaming
            </span>
          </div>
          <a
            href="#"
            className="text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-1 transition-colors"
          >
            View All <ChevronRight size={18} />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockLiveChannels.slice(0, 4).map((channel) => (
            <div key={channel.id} onClick={handleLiveChannelClick} className="cursor-pointer">
              <LiveChannelCard channel={channel} />
            </div>
          ))}
        </div>
      </section>

      {/* Trending Games */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <TrendingUp size={28} className="text-orange-600" />
            <h2 className="text-3xl font-bold text-gray-900">Trending Games</h2>
          </div>
          <a
            href="#"
            className="text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-1 transition-colors"
          >
            View All <ChevronRight size={18} />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockGames.slice(0, 6).map((game, idx) => (
            <GameCard key={game.id} game={game} rank={idx} onViewGame={handleGameClick} />
          ))}
        </div>
      </section>

      {/* Communities */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Users size={28} className="text-purple-600" />
            <h2 className="text-3xl font-bold text-gray-900">Popular Communities</h2>
          </div>
          <a
            href="#"
            className="text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-1 transition-colors"
          >
            View All <ChevronRight size={18} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockGroups.slice(0, 4).map((group) => (
            <div key={group.id} onClick={handleGroupClick} className="cursor-pointer">
              <CommunityCard group={group} />
            </div>
          ))}
        </div>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockMarketplaceItems.slice(0, 4).map((item) => (
            <MarketplaceCard 
              key={item.id} 
              item={item}
              onViewDetails={() => handleProductClick(item.id)}
            />
          ))}
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
