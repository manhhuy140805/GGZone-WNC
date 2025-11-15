import React, { useState } from "react";
import { UserCard } from "../components/cards";
import { TrendingSection } from "../components/sections";
import { mockUsers } from "../assets/mock/users";
import { mockGames } from "../assets/mock/games";

export const Trending: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"games" | "users">("games");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Trending</h1>
        <p className="text-gray-600">See what's hot in the gaming community</p>
      </div>

      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("games")}
          className={`px-4 py-3 font-medium border-b-2 transition ${
            activeTab === "games"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          Trending Games
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={`px-4 py-3 font-medium border-b-2 transition ${
            activeTab === "users"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          Popular Players
        </button>
      </div>

      {activeTab === "games" && (
        <TrendingSection games={mockGames} title="Most Popular Games" />
      )}

      {activeTab === "users" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {mockUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};
