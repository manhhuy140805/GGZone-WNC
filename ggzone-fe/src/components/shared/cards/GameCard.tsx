import React from "react";
import { Play } from "lucide-react";
import type { Game } from "@/types";

interface GameCardProps {
  game: Game;
  rank?: number;
  onViewGame?: (gameId: string) => void;
}

export const GameCard: React.FC<GameCardProps> = ({ game, rank, onViewGame }) => {
  const getRankBadge = (index?: number) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return "⭐";
  };

  return (
    <div 
      onClick={() => onViewGame?.(game.id)}
      className="group relative h-48 rounded-lg overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-shadow"
    >
      <img
        src={game.coverImageUrl}
        alt={game.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onViewGame?.(game.id);
          }}
          className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors flex items-center gap-2 shadow-lg"
        >
          <Play size={16} fill="currentColor" />
          View Details
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-white text-lg">{game.name}</h3>
            <p className="text-sm text-gray-200">{game.genre}</p>
          </div>
          <div className="text-2xl">{getRankBadge(rank)}</div>
        </div>
      </div>
    </div>
  );
};
