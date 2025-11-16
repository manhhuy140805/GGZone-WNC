import React, { useState } from "react";
import { Achievement } from "../../../assets/mock/achievements";
import { Game } from "../../../assets/mock/games";
import { StatsCards } from "../sections/StatsCards";

interface AchievementsTabProps {
  achievements: Achievement[];
  games: Game[];
  earnedAchievementIds: string[];
  earnedCount: number;
  totalPoints: number;
  winningCount: number;
  friendsCount: number;
}

export const AchievementsTab: React.FC<AchievementsTabProps> = ({
  achievements,
  games,
  earnedAchievementIds,
  earnedCount,
  totalPoints,
  winningCount,
  friendsCount,
}) => {
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);

  const filteredAchievements = selectedGameId
    ? achievements.filter((a) => a.gameId === selectedGameId)
    : achievements;

  const filteredEarnedCount = filteredAchievements.filter((a) =>
    earnedAchievementIds.includes(a.id)
  ).length;

  const progressPercent = Math.round(
    (filteredEarnedCount / filteredAchievements.length) * 100
  );

  return (
    <>
      {/* Stats Cards */}
      <StatsCards
        earnedCount={earnedCount}
        totalPoints={totalPoints}
        winningCount={winningCount}
        friendsCount={friendsCount}
      />

      {/* Achievements Section */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Achievements</h2>

          {/* Progress Bar */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-gray-700">
                Progress: {filteredEarnedCount} / {filteredAchievements.length}
              </span>
              <span className="text-lg font-bold text-orange-600">{progressPercent}%</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Game Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedGameId(null)}
              className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                selectedGameId === null
                  ? "bg-orange-600 text-white shadow-md"
                  : "bg-white border-2 border-gray-200 text-gray-800 hover:border-orange-400"
              }`}
            >
              All Games
            </button>
            {games.map((game) => (
              <button
                key={game.id}
                onClick={() => setSelectedGameId(game.id)}
                className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                  selectedGameId === game.id
                    ? "bg-orange-600 text-white shadow-md"
                    : "bg-white border-2 border-gray-200 text-gray-800 hover:border-orange-400"
                }`}
              >
                {game.name}
              </button>
            ))}
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAchievements.map((achievement) => {
            const isEarned = earnedAchievementIds.includes(achievement.id);
            return (
              <div
                key={achievement.id}
                className={`rounded-xl p-6 border transition-all ${
                  isEarned
                    ? "bg-white border-orange-200 shadow-md hover:shadow-lg"
                    : "bg-gray-50 border-gray-200 opacity-60"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="text-4xl">{isEarned ? "🏆" : "🔒"}</div>
                  {isEarned && (
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded">
                      Earned
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">
                  {achievement.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {achievement.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    +{achievement.points} points
                  </span>
                  {isEarned && (
                    <span className="text-xs font-semibold text-orange-600">
                      ✓ Unlocked
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};
