import React from "react";
import { Search } from "lucide-react";

interface FriendsSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const FriendsSearch: React.FC<FriendsSearchProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  return (
    <div className="relative">
      <Search
        size={20}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
      />
      <input
        type="text"
        placeholder="Search by name or username..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
      />
    </div>
  );
};
