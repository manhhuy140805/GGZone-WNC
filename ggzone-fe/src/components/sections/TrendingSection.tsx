import React from "react";
import { TrendingUp } from "lucide-react";
import { GameCard } from "../cards";
import type { Game } from "../../types";

interface TrendingSectionProps {
  games: Game[];
  title?: string;
}

export const TrendingSection: React.FC<TrendingSectionProps> = ({
  games,
  title = "Trending Now",
}) => {
  return (
    <section className="py-8">
      <div className="mb-6 flex items-center gap-2">
        <TrendingUp size={24} className="text-orange-500" />
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </section>
  );
};
