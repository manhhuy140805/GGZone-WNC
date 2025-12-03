import React from "react";
import { Users, UserPlus } from "lucide-react";

interface FriendsTabsProps {
  activeTab: "friends" | "suggestions";
  onTabChange: (tab: "friends" | "suggestions") => void;
  friendsCount: number;
  suggestionsCount: number;
}

export const FriendsTabs: React.FC<FriendsTabsProps> = ({
  activeTab,
  onTabChange,
  friendsCount,
  suggestionsCount,
}) => {
  return (
    <div className="bg-white rounded-lg p-1 border border-gray-200 shadow-sm">
      <div className="grid grid-cols-2 gap-1">
        <button
          onClick={() => onTabChange("friends")}
          className={`py-3 px-4 rounded-md font-semibold transition-all flex items-center justify-center gap-2 ${
            activeTab === "friends"
              ? "bg-blue-600 text-white shadow-md"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <Users size={20} />
          My Friends ({friendsCount})
        </button>
        <button
          onClick={() => onTabChange("suggestions")}
          className={`py-3 px-4 rounded-md font-semibold transition-all flex items-center justify-center gap-2 ${
            activeTab === "suggestions"
              ? "bg-blue-600 text-white shadow-md"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <UserPlus size={20} />
          Suggestions ({suggestionsCount})
        </button>
      </div>
    </div>
  );
};
