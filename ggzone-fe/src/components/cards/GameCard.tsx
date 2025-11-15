import React from "react";
import { Star, Users } from "lucide-react";
import { Badge } from "../common";
import type { Game } from "../../assets/mock/games";

interface GameCardProps {
  game: Game;
  onClick?: () => void;
}

export const GameCard: React.FC<GameCardProps> = ({ game, onClick }) => {
  const formatPlayers = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group"
    >
      <div className="relative h-40 overflow-hidden bg-gray-200">
        <img
          src={game.image_url}
          alt={game.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <Badge label={game.category} variant="primary" size="sm" />
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
          {game.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {game.description}
        </p>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-yellow-500">
            <Star size={16} fill="currentColor" />
            <span className="font-semibold">{game.rating}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <Users size={16} />
            <span className="font-medium">
              {formatPlayers(game.players_count)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
