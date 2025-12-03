import React from "react";
import { GameCard } from "@/components/shared/cards";
import { Game } from "@/types";
import { ChevronRight } from "lucide-react";

interface TrendingGamesProps {
  games: Game[];
}

export const TrendingGames: React.FC<TrendingGamesProps> = ({ games }) => {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900">Most Popular Games</h3>
        <a
          href="#"
          className="text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-1 transition-colors"
        >
          View All <ChevronRight size={18} />
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {games.map((game, index) => (
          <div key={game.id} className="relative">
            {index < 3 && (
              <div className="absolute -top-2 -left-2 z-10 w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                {index + 1}
              </div>
            )}
            <GameCard game={game} rank={index} />
          </div>
        ))}
      </div>
    </section>
  );
};
