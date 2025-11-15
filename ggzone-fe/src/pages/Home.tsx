import React from "react";
import { FeaturedSection, TrendingSection } from "../components/sections";
import { mockGames } from "../assets/mock/games";

export const Home: React.FC = () => {
  return (
    <div className="space-y-12">
      <FeaturedSection />
      <TrendingSection games={mockGames.slice(0, 4)} />
    </div>
  );
};
