import React from "react";
import { Trophy, Star, Flame } from "lucide-react";
import { User, Game } from "../../../types";

interface StatsTabProps {
  user: User | null;
  totalPoints: number;
  games: Game[];
}

export const StatsTab: React.FC<StatsTabProps> = ({ user, totalPoints, games }) => {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Game Statistics</h2>
      
      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <Trophy size={32} className="mb-3 opacity-80" />
          <p className="text-sm opacity-90 mb-1">Total Wins</p>
          <p className="text-3xl font-bold">{user?.stats?.winningCount || 0}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <Star size={32} className="mb-3 opacity-80" />
          <p className="text-sm opacity-90 mb-1">Tournaments</p>
          <p className="text-3xl font-bold">{user?.stats?.tournamentsCount || 0}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
          <Flame size={32} className="mb-3 opacity-80" />
          <p className="text-sm opacity-90 mb-1">Achievement Points</p>
          <p className="text-3xl font-bold">{totalPoints}</p>
        </div>
      </div>

      {/* Game-specific Stats */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Games Played</h3>
        <div className="space-y-4">
          {games.slice(0, 5).map((game) => (
            <div key={game.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <div className="flex items-center gap-4">
                <img
                  src={game.iconUrl || game.coverImageUrl}
                  alt={game.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{game.name}</h4>
                  <p className="text-sm text-gray-600">{game.genre}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">{Math.floor(Math.random() * 50) + 10}</p>
                <p className="text-sm text-gray-600">hours played</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { game: "Valorant", action: "Won a competitive match", time: "2 hours ago", color: "text-green-600" },
            { game: "CS2", action: "Achieved MVP status", time: "5 hours ago", color: "text-blue-600" },
            { game: "League of Legends", action: "Reached new rank", time: "1 day ago", color: "text-purple-600" },
          ].map((activity, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className={`w-2 h-2 rounded-full ${activity.color.replace('text-', 'bg-')}`} />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.game}</p>
                <p className="text-xs text-gray-600">{activity.action}</p>
              </div>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
