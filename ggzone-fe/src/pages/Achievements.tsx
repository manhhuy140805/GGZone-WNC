import React, { useState } from "react";
import { AchievementCard } from "../components/cards";
import { Badge } from "../components/common";
import { mockAchievements } from "../assets/mock/achievements";
import { mockGames } from "../assets/mock/games";

export const Achievements: React.FC = () => {
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const [earnedAchievementIds] = useState<string[]>(["1", "3", "5", "7"]);

  const filteredAchievements = selectedGameId
    ? mockAchievements.filter((a) => a.game_id === selectedGameId)
    : mockAchievements;

  const earnedCount = filteredAchievements.filter((a) =>
    earnedAchievementIds.includes(a.id)
  ).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Achievements</h1>
        <p className="text-gray-600">
          Track your progress and unlock achievements
        </p>
      </div>

      <div className="bg-blue-50 rounded-lg p-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">Progress</p>
          <p className="text-2xl font-bold text-blue-600">
            {earnedCount} / {filteredAchievements.length}
          </p>
        </div>
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
          <span className="text-3xl font-bold text-white">
            {Math.round((earnedCount / filteredAchievements.length) * 100)}%
          </span>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedGameId(null)}
          className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition ${
            selectedGameId === null
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          All Games
        </button>
        {mockGames.map((game) => (
          <button
            key={game.id}
            onClick={() => setSelectedGameId(game.id)}
            className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition ${
              selectedGameId === game.id
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {game.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAchievements.map((achievement) => (
          <AchievementCard
            key={achievement.id}
            achievement={achievement}
            isEarned={earnedAchievementIds.includes(achievement.id)}
          />
        ))}
      </div>
    </div>
  );
};
