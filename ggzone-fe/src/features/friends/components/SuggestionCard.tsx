import React from "react";
import { User } from "@/types";
import { UserPlus, Users2 } from "lucide-react";

interface SuggestionCardProps {
  user: User;
}

export const SuggestionCard: React.FC<SuggestionCardProps> = ({ user }) => {
  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 hover:border-green-400 hover:shadow-lg transition-all duration-300 overflow-hidden group">
      {/* Cover/Background */}
      <div className="relative h-24 bg-gradient-to-br from-green-400 via-teal-400 to-blue-400">
        {user.coverImageUrl && (
          <img
            src={user.coverImageUrl}
            alt=""
            className="w-full h-full object-cover opacity-80"
          />
        )}
        {/* Suggestion Badge */}
        <div className="absolute top-2 right-2">
          <div className="flex items-center gap-1 bg-white/90 text-green-600 text-xs font-bold px-2 py-1 rounded-full">
            <Users2 size={12} />
            Suggested
          </div>
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
            <div className="w-20 h-20 rounded-full border-4 border-white bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              {user.fullName.charAt(0)}
            </div>
          )}
        </div>
      </div>

      {/* User Info */}
      <div className="px-4 pb-4 pt-2">
        <h3 className="font-bold text-gray-900 text-lg truncate group-hover:text-green-600 transition-colors">
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

        {/* Bio */}
        {user.bio && (
          <p className="mt-3 text-xs text-gray-600 line-clamp-2">
            {user.bio}
          </p>
        )}

        {/* Action Buttons */}
        <div className="mt-4 flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors">
            <UserPlus size={16} />
            Add Friend
          </button>
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors">
            View
          </button>
        </div>
      </div>
    </div>
  );
};
