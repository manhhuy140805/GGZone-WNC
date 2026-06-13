import React from "react";
import { User } from "@/types";
import { MessageCircle, UserCheck } from "lucide-react";

interface FriendCardProps {
  user: User;
  onMessageClick: (userId: string) => void;
}

export const FriendCard: React.FC<FriendCardProps> = ({ user, onMessageClick }) => {
  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 overflow-hidden group">
      {/* Cover/Background */}
      <div className="relative h-24 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400">
        {user.coverImageUrl && (
          <img
            src={user.coverImageUrl}
            alt=""
            className="w-full h-full object-cover opacity-80"
          />
        )}
        {/* Status Badge */}
        <div className="absolute top-2 right-2">
          {user.status === "online" && (
            <div className="flex items-center gap-1 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              Online
            </div>
          )}
          {user.status === "in-game" && (
            <div className="flex items-center gap-1 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              <div className="w-2 h-2 bg-white rounded-full" />
              In Game
            </div>
          )}
        </div>
      </div>

      {/* Avatar */}
      <div className="relative px-4 -mt-10">
        <div className="relative inline-block">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.fullName}
              className="w-20 h-20 rounded-full border-4 border-white object-cover shadow-lg"
            />
          ) : (
            <div className="w-20 h-20 rounded-full border-4 border-white bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              {user.fullName?.[0] || user.username[0]}
            </div>
          )}
          {user.isVerified && (
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
              <UserCheck size={14} className="text-white" />
            </div>
          )}
        </div>
      </div>

      {/* User Info */}
      <div className="px-4 pb-4 pt-2">
        <h3 className="font-bold text-gray-900 text-lg truncate group-hover:text-blue-600 transition-colors">
          {user.fullName}
        </h3>
        <p className="text-sm text-gray-500 truncate">@{user.username}</p>

        {/* Stats */}
        {user.stats && (
          <div className="flex items-center justify-between mt-3 text-xs text-gray-600">
            <div className="text-center">
              <div className="font-bold text-gray-900">{user.stats.friendsCount}</div>
              <div>Friends</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-gray-900">{user.stats.winningCount}</div>
              <div>Wins</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-gray-900">{user.stats.postsCount}</div>
              <div>Posts</div>
            </div>
          </div>
        )}

        {/* Location */}
        {user.location && (
          <div className="mt-3 text-xs text-gray-500 truncate">
            📍 {user.location}
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => onMessageClick(user.id)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            <MessageCircle size={16} />
            Message
          </button>
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors">
            Profile
          </button>
        </div>
      </div>
    </div>
  );
};
