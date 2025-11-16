import React, { useState } from "react";
import { UserCard, GameCard } from "../components/cards";
import { mockUsers } from "../assets/mock/users";
import { mockGames } from "../assets/mock/games";
import { mockLiveChannels } from "../assets/mock/liveChannels";
import { TrendingUp, Flame, Users, ChevronRight } from "lucide-react";

export const Trending: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"games" | "streams" | "players">("games");

  const trendingGames = mockGames.slice(0, 8);
  const trendingStreams = mockLiveChannels.slice(0, 6);
  const trendingPlayers = mockUsers.slice(0, 12);

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div className="relative h-48 rounded-xl overflow-hidden shadow-lg">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://wallpapercat.com/w/full/4/d/7/1868806-3840x2160-desktop-4k-valorant-wallpaper-image.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-center px-8">
          <div className="flex items-center gap-3 mb-2">
            <Flame size={32} className="text-orange-500" />
            <h1 className="text-4xl font-bold text-white">Trending</h1>
          </div>
          <p className="text-gray-200">Home &gt; Trending</p>
        </div>
      </div>

      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp size={32} className="text-orange-600" />
          <h2 className="text-3xl font-bold text-gray-900">What's Hot</h2>
        </div>
        <p className="text-gray-600 text-lg">
          Discover what's trending in the gaming community right now
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg p-1 border border-gray-200 shadow-sm">
        <div className="grid grid-cols-3 gap-1">
          <button
            onClick={() => setActiveTab("games")}
            className={`py-3 px-4 rounded-md font-semibold transition-all ${
              activeTab === "games"
                ? "bg-orange-600 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Trending Games
          </button>
          <button
            onClick={() => setActiveTab("streams")}
            className={`py-3 px-4 rounded-md font-semibold transition-all ${
              activeTab === "streams"
                ? "bg-orange-600 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Live Streams
          </button>
          <button
            onClick={() => setActiveTab("players")}
            className={`py-3 px-4 rounded-md font-semibold transition-all ${
              activeTab === "players"
                ? "bg-orange-600 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Top Players
          </button>
        </div>
      </div>

      {/* Games Tab */}
      {activeTab === "games" && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Most Popular Games</h3>
            <a
              href="#"
              className="text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-1 transition-colors"
            >
              View All <ChevronRight size={18} />
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {trendingGames.map((game, index) => (
              <div key={game.id} className="relative">
                {index < 3 && (
                  <div className="absolute -top-2 -left-2 z-10 w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {index + 1}
                  </div>
                )}
                <GameCard game={game} rank={index} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Streams Tab */}
      {activeTab === "streams" && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <h3 className="text-2xl font-bold text-gray-900">Live Now</h3>
              <span className="text-sm text-gray-600">
                {trendingStreams.length} streaming
              </span>
            </div>
            <a
              href="#"
              className="text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-1 transition-colors"
            >
              View All <ChevronRight size={18} />
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {trendingStreams.map((stream) => (
              <div
                key={stream.id}
                className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-orange-400 hover:shadow-lg transition-all"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-gray-100">
                  <img
                    src={stream.thumbnailUrl}
                    alt={stream.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Live Badge */}
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    LIVE
                  </div>
                  {/* Viewers */}
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-semibold">
                    {stream.viewers.toLocaleString()} viewers
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h4 className="font-bold text-gray-900 mb-2 line-clamp-2">
                    {stream.name}
                  </h4>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm">
                      {stream.streamerName.charAt(0)}
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {stream.streamerName}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{stream.game}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Players Tab */}
      {activeTab === "players" && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Users size={28} className="text-purple-600" />
              <h3 className="text-2xl font-bold text-gray-900">Top Players</h3>
            </div>
            <a
              href="#"
              className="text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-1 transition-colors"
            >
              View All <ChevronRight size={18} />
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {trendingPlayers.map((user, index) => (
              <div key={user.id} className="relative">
                {index < 3 && (
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10">
                    <div className="w-7 h-7 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                      <Flame size={16} className="text-white" />
                    </div>
                  </div>
                )}
                <UserCard user={user} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
