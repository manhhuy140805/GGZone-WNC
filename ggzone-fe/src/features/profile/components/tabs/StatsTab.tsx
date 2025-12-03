import React from "react";
import { Trophy, Star, Flame, Zap } from "lucide-react";
import { User, Game } from "@/types";

interface GameStats extends Game {
  hoursPlayed: number;
}

interface StatsTabProps {
  user: User | null;
  totalPoints: number;
  games: GameStats[];
}

export const StatsTab: React.FC<StatsTabProps> = ({ user, totalPoints, games }) => {

  // Get level based on total points
  const getLevel = () => {
    return user?.stats?.level || Math.floor(totalPoints / 100) + 1;
  };

  // Get win rate
  const getWinRate = () => {
    if (!user?.stats?.winningCount) return 0;
    const estimatedMatches = Math.max(user.stats.winningCount * 2, 10);
    return Math.round((user.stats.winningCount / estimatedMatches) * 100);
  };

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Game Statistics</h2>
      
      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition">
          <Trophy size={32} className="mb-3 opacity-80" />
          <p className="text-sm opacity-90 mb-1">Total Wins</p>
          <p className="text-3xl font-bold">{user?.stats?.winningCount || 0}</p>
          <p className="text-xs opacity-75 mt-2">Win Rate: {getWinRate()}%</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition">
          <Star size={32} className="mb-3 opacity-80" />
          <p className="text-sm opacity-90 mb-1">Tournaments</p>
          <p className="text-3xl font-bold">{user?.stats?.tournamentsCount || 0}</p>
          <p className="text-xs opacity-75 mt-2">Participated</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition">
          <Flame size={32} className="mb-3 opacity-80" />
          <p className="text-sm opacity-90 mb-1">Achievement Points</p>
          <p className="text-3xl font-bold">{totalPoints}</p>
          <p className="text-xs opacity-75 mt-2">Level {getLevel()}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition">
          <Zap size={32} className="mb-3 opacity-80" />
          <p className="text-sm opacity-90 mb-1">Games Played</p>
          <p className="text-3xl font-bold">{user?.stats?.postsCount || 0}</p>
          <p className="text-xs opacity-75 mt-2">Total</p>
        </div>
      </div>

      {/* Game-specific Stats */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Games Played</h3>
        {games.length > 0 ? (
          <div className="space-y-4">
            {games.slice(0, 5).map((game) => (
              <div key={game.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <div className="flex items-center gap-4">
                  <img
                    src={game.coverImageUrl || "https://via.placeholder.com/48"}
                    alt={game.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{game.name}</h4>
                    <p className="text-sm text-gray-600">{game.genre}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{game.hoursPlayed}</p>
                  <p className="text-sm text-gray-600">hours played</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">No games data available</p>
          </div>
        )}
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">User Stats</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Friends</span>
              <span className="font-bold text-gray-900">{user?.stats?.friendsCount || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Posts</span>
              <span className="font-bold text-gray-900">{user?.stats?.postsCount || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Photos</span>
              <span className="font-bold text-gray-900">{user?.stats?.photosCount || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Videos</span>
              <span className="font-bold text-gray-900">{user?.stats?.videosCount || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Groups</span>
              <span className="font-bold text-gray-900">{user?.stats?.groupsCount || 0}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Gaming Stats</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Wins</span>
              <span className="font-bold text-gray-900">{user?.stats?.winningCount || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Tournaments</span>
              <span className="font-bold text-gray-900">{user?.stats?.tournamentsCount || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Win Rate</span>
              <span className="font-bold text-green-600">{getWinRate()}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Level</span>
              <span className="font-bold text-purple-600">Level {getLevel()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Points</span>
              <span className="font-bold text-orange-600">{totalPoints}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
