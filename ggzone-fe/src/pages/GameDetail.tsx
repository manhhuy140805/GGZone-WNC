import React, { useState } from "react";
import { mockGames } from "../assets/mock/games";
import {
  ArrowLeft,
  Play,
  Heart,
  Share2,
  Users,
  Trophy,
  Star,
  Calendar,
  Gamepad2,
  Tag,
  TrendingUp,
  MessageSquare,
  Eye,
} from "lucide-react";

interface GameDetailProps {
  gameId: string;
  onBack: () => void;
}

export const GameDetail: React.FC<GameDetailProps> = ({ gameId, onBack }) => {
  const [activeTab, setActiveTab] = useState<"overview" | "stats" | "community">("overview");

  const game = mockGames.find((g) => g.id === gameId);

  if (!game) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🎮</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Game Not Found</h2>
        <p className="text-gray-600 mb-6">The game you're looking for doesn't exist.</p>
        <button
          onClick={onBack}
          className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors"
        >
          Back to Browse
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-orange-600 font-semibold transition-colors"
      >
        <ArrowLeft size={20} />
        Back to Browse
      </button>

      {/* Hero Section */}
      <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl">
        <img
          src={game.coverImageUrl}
          alt={game.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="flex items-end justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-orange-600 text-white text-sm font-bold rounded-full">
                  {game.genre}
                </span>
                <span className="px-3 py-1 bg-purple-600 text-white text-sm font-bold rounded-full">
                  {game.platform}
                </span>
              </div>
              <h1 className="text-5xl font-bold text-white mb-2">{game.name}</h1>
              <p className="text-gray-200 text-lg max-w-2xl">{game.description}</p>
            </div>
            
            <div className="flex gap-3">
              <button className="p-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-lg transition-all">
                <Heart size={24} />
              </button>
              <button className="p-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-lg transition-all">
                <Share2 size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="flex items-center gap-2 text-yellow-500 mb-1">
                <Star size={20} className="fill-yellow-500" />
                <span className="text-2xl font-bold text-gray-900">4.8</span>
              </div>
              <p className="text-xs text-gray-600">Rating</p>
            </div>
            <div className="h-12 w-px bg-gray-200" />
            <div className="text-center">
              <div className="flex items-center gap-2 mb-1">
                <Users size={20} className="text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">
                  {Math.floor(Math.random() * 500) + 100}K
                </span>
              </div>
              <p className="text-xs text-gray-600">Players</p>
            </div>
            <div className="h-12 w-px bg-gray-200" />
            <div className="text-center">
              <div className="flex items-center gap-2 mb-1">
                <Trophy size={20} className="text-purple-600" />
                <span className="text-2xl font-bold text-gray-900">
                  {Math.floor(Math.random() * 50) + 10}
                </span>
              </div>
              <p className="text-xs text-gray-600">Achievements</p>
            </div>
          </div>
          
          <button className="px-8 py-4 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center gap-3">
            <Play size={24} />
            Play Now
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex-1 py-4 px-6 font-semibold transition-all ${
              activeTab === "overview"
                ? "bg-orange-50 text-orange-600 border-b-2 border-orange-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("stats")}
            className={`flex-1 py-4 px-6 font-semibold transition-all ${
              activeTab === "stats"
                ? "bg-orange-50 text-orange-600 border-b-2 border-orange-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Statistics
          </button>
          <button
            onClick={() => setActiveTab("community")}
            className={`flex-1 py-4 px-6 font-semibold transition-all ${
              activeTab === "community"
                ? "bg-orange-50 text-orange-600 border-b-2 border-orange-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Community
          </button>
        </div>

        <div className="p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Game Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Game Information</h3>
                  
                  <div className="flex items-center gap-3">
                    <Calendar size={20} className="text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-600">Release Date</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(game.releaseDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Gamepad2 size={20} className="text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-600">Publisher</p>
                      <p className="font-semibold text-gray-900">{game.publisher}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Tag size={20} className="text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-600">Genre</p>
                      <p className="font-semibold text-gray-900">{game.genre}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Stats</h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <TrendingUp size={24} className="text-blue-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-blue-600">
                        #{Math.floor(Math.random() * 10) + 1}
                      </p>
                      <p className="text-xs text-gray-600">Trending</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <Eye size={24} className="text-green-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-green-600">
                        {Math.floor(Math.random() * 50) + 10}K
                      </p>
                      <p className="text-xs text-gray-600">Watching</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 text-center">
                      <MessageSquare size={24} className="text-purple-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-purple-600">
                        {Math.floor(Math.random() * 100) + 50}K
                      </p>
                      <p className="text-xs text-gray-600">Posts</p>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-4 text-center">
                      <Users size={24} className="text-orange-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-orange-600">
                        {Math.floor(Math.random() * 20) + 5}K
                      </p>
                      <p className="text-xs text-gray-600">Online</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">About This Game</h3>
                <p className="text-gray-700 leading-relaxed">
                  {game.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                </p>
              </div>
            </div>
          )}

          {activeTab === "stats" && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900">Player Statistics</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: "Total Players", value: "2.5M+", color: "blue" },
                  { label: "Active Today", value: "450K", color: "green" },
                  { label: "Peak Players", value: "1.2M", color: "purple" },
                  { label: "Avg. Playtime", value: "3.5h", color: "orange" },
                  { label: "Total Matches", value: "50M+", color: "red" },
                  { label: "Win Rate", value: "48.5%", color: "yellow" },
                ].map((stat, idx) => (
                  <div key={idx} className={`bg-${stat.color}-50 rounded-lg p-6 text-center`}>
                    <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "community" && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900">Community Activity</h3>
              
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700">
                    Join the {game.name} community! Connect with other players, share strategies, 
                    and stay updated with the latest news and events.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button className="p-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors">
                    Join Discord Server
                  </button>
                  <button className="p-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-colors">
                    Visit Forums
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
