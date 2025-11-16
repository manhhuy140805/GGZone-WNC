import React from "react";
import { Trophy, Star, Flame, Users } from "lucide-react";

interface StatsCardsProps {
  earnedCount: number;
  totalPoints: number;
  winningCount: number;
  friendsCount: number;
}

export const StatsCards: React.FC<StatsCardsProps> = ({
  earnedCount,
  totalPoints,
  winningCount,
  friendsCount,
}) => {
  const stats = [
    { icon: Trophy, label: "Achievements", value: earnedCount, color: "text-yellow-600" },
    { icon: Star, label: "Total Points", value: totalPoints, color: "text-purple-600" },
    { icon: Flame, label: "Winning", value: winningCount, color: "text-red-600" },
    { icon: Users, label: "Friends", value: friendsCount, color: "text-blue-600" },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <Icon size={24} className={stat.color} />
            </div>
            <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        );
      })}
    </section>
  );
};
