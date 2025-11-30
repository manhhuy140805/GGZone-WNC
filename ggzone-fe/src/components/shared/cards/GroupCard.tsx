import React from "react";
import { Users, Heart } from "lucide-react";
import type { Group } from "@/types";

interface GroupCardProps {
  group: Group;
  onJoin?: () => void;
  isJoined?: boolean;
}

export const GroupCard: React.FC<GroupCardProps> = ({
  group,
  onJoin,
  isJoined = false,
}) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 shadow-sm border border-gray-200 hover:border-orange-400 flex items-center gap-4 p-4 group cursor-pointer">
      {/* Image - Left Side */}
      <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        <img
          src={group.coverImageUrl}
          alt={group.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Content - Middle */}
      <div className="flex-1 min-w-0">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {group.name}
        </h3>

        {/* Description - Limited to 2 lines */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {group.description}
        </p>

        {/* Members */}
        <div className="flex items-center gap-1 text-gray-600">
          <Users size={16} />
          <span className="text-sm font-semibold">
            {group.membersCount} members
          </span>
        </div>
      </div>

      {/* Action Button - Right Side */}
      <button
        onClick={onJoin}
        className={`px-6 py-2 font-bold rounded-lg transition-all duration-200 flex items-center gap-2 whitespace-nowrap shadow-md hover:shadow-lg ${
          isJoined
            ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
            : "bg-gray-900 hover:bg-black text-white"
        }`}
      >
        <Heart
          size={18}
          fill={isJoined ? "none" : "currentColor"}
          className={isJoined ? "text-gray-700" : "text-white"}
        />
        {isJoined ? "Joined" : "Join"}
      </button>
    </div>
  );
};
