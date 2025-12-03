import React from "react";
import { Heart, Users2 } from "lucide-react";
import type { Group } from "@/types";

interface CommunityCardProps {
  group: Group;
  onJoin?: () => void;
  onClick?: () => void;
  isJoined?: boolean;
}

export const CommunityCard: React.FC<CommunityCardProps> = ({
  group,
  onJoin,
  onClick,
  isJoined = false,
}) => {
  const handleCardClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleJoinClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking Join button
    if (onJoin) {
      onJoin();
    }
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 hover:shadow-lg transition-all duration-300 group cursor-pointer"
    >
      <div className="flex items-stretch h-40">
        {/* Image Section */}
        <div className="w-38 flex-shrink-0 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 relative">
          <img
            src={group.coverImageUrl}
            alt={group.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content Section */}
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div className="flex-1">
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className="font-semibold text-gray-900 text-base group-hover:text-gray-700 transition-colors flex-1">
                {group.name}
              </h3>
              <div className="flex-shrink-0 p-1.5 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors">
                <Users2 size={16} className="text-gray-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
              {group.description}
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-3">
            <div className="flex items-center gap-1.5 text-sm">
              <div className="p-1 bg-gray-100 rounded">
                <Users2 size={13} className="text-gray-600" />
              </div>
              <span className="text-gray-900 font-semibold">
                {group.membersCount.toLocaleString()}
              </span>
              <span className="text-gray-500">members</span>
            </div>
            
            <button
              onClick={handleJoinClick}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all active:scale-95 flex items-center gap-2 shadow-sm hover:shadow-md ${
                isJoined
                  ? 'bg-green-100 hover:bg-green-200 text-green-700'
                  : 'bg-gray-900 hover:bg-gray-800 text-white'
              }`}
            >
              <Heart size={14} className={isJoined ? 'fill-green-700' : ''} />
              {isJoined ? 'Joined' : 'Join'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
