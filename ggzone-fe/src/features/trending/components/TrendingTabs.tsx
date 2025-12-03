import React from "react";

interface TrendingTabsProps {
  activeTab: "games" | "streams" | "players";
  onTabChange: (tab: "games" | "streams" | "players") => void;
}

export const TrendingTabs: React.FC<TrendingTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="bg-white rounded-lg p-1 border border-gray-200 shadow-sm">
      <div className="grid grid-cols-3 gap-1">
        <button
          onClick={() => onTabChange("games")}
          className={`py-3 px-4 rounded-md font-semibold transition-all ${
            activeTab === "games"
              ? "bg-orange-600 text-white shadow-md"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Trending Games
        </button>
        <button
          onClick={() => onTabChange("streams")}
          className={`py-3 px-4 rounded-md font-semibold transition-all ${
            activeTab === "streams"
              ? "bg-orange-600 text-white shadow-md"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Live Streams
        </button>
        <button
          onClick={() => onTabChange("players")}
          className={`py-3 px-4 rounded-md font-semibold transition-all ${
            activeTab === "players"
              ? "bg-orange-600 text-white shadow-md"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Top Players
        </button>
      </div>
    </div>
  );
};
