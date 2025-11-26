import React from "react";
import { User } from "../../types";
import { Users, ChevronRight, Flame, Trophy, Star } from "lucide-react";

interface TrendingPlayersProps {
  players: User[];
}

export const TrendingPlayers: React.FC<TrendingPlayersProps> = ({ players }) => {
  const getRankColor = (index: number) => {
    if (index === 0) return "from-yellow-400 to-yellow-600";
    if (index === 1) return "from-gray-300 to-gray-500";
    if (index === 2) return "from-orange-400 to-orange-600";
    return "from-purple-400 to-purple-600";
  };

  const getRankBadge = (index: number) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return null;
  };

  return (
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
        {players.map((user, index) => (
          <div
            key={user.id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-purple-300 group"
          >
            {/* Rank Badge */}
            {index < 3 && (
              <div className="absolute top-2 right-2 z-10 text-2xl">
                {getRankBadge(index)}
              </div>
            )}

            {/* Avatar Section */}
            <div className={`relative h-32 bg-gradient-to-br ${getRankColor(index)} p-4 flex items-center justify-center`}>
              <div className="relative">
                <img
                  src={user.avatarUrl}
                  alt={user.username}
                  className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover"
                />
                {/* Online Status */}
                <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
            </div>

            {/* Info Section */}
            <div className="p-4">
              {/* Rank Number */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-500">
                  RANK #{index + 1}
                </span>
                <div className="flex items-center gap-1">
                  <Trophy size={14} className="text-yellow-500" />
                  <span className="text-xs font-bold text-gray-700">
                    {Math.floor(Math.random() * 5000) + 1000}
                  </span>
                </div>
              </div>

              {/* Username */}
              <h4 className="font-bold text-gray-900 mb-1 truncate group-hover:text-purple-600 transition-colors">
                {user.username}
              </h4>

              {/* Bio */}
              <p className="text-xs text-gray-600 mb-3 line-clamp-2 h-8">
                {user.bio}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="bg-blue-50 rounded-lg p-2 text-center">
                  <div className="text-xs text-gray-600">Level</div>
                  <div className="text-sm font-bold text-blue-600">
                    {Math.floor(Math.random() * 50) + 10}
                  </div>
                </div>
                <div className="bg-purple-50 rounded-lg p-2 text-center">
                  <div className="text-xs text-gray-600">Games</div>
                  <div className="text-sm font-bold text-purple-600">
                    {Math.floor(Math.random() * 500) + 100}
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center justify-center gap-1 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg py-2">
                <Star size={14} className="text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-bold text-gray-700">
                  {(Math.random() * 2 + 3).toFixed(1)}
                </span>
                <span className="text-xs text-gray-500">/5.0</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
