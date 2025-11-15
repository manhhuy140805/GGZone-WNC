import React from "react";
import { Badge } from "../common";
import type { Achievement } from "../../assets/mock/achievements";

interface AchievementCardProps {
  achievement: Achievement;
  isEarned?: boolean;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({
  achievement,
  isEarned = false,
}) => {
  const difficultyColors = {
    easy: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    hard: "bg-orange-100 text-orange-800",
    legendary: "bg-purple-100 text-purple-800",
  };

  return (
    <div
      className={`rounded-lg p-4 transition-all duration-200 ${
        isEarned
          ? "bg-white shadow-md hover:shadow-lg"
          : "bg-gray-100 opacity-60"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`text-4xl flex-shrink-0 ${!isEarned ? "grayscale" : ""}`}
        >
          {achievement.icon_url}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-bold text-gray-900">{achievement.name}</h3>
            <Badge
              label={achievement.difficulty}
              variant={
                achievement.difficulty === "easy"
                  ? "success"
                  : achievement.difficulty === "medium"
                  ? "warning"
                  : "error"
              }
              size="sm"
            />
          </div>
          <p className="text-sm text-gray-600">{achievement.description}</p>
          {isEarned && (
            <p className="text-xs text-green-600 mt-1 font-medium">Earned</p>
          )}
        </div>
      </div>
    </div>
  );
};
