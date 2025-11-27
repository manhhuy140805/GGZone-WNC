import React from "react";
import { Calendar, MapPin, Mail, Shield, Users, Award } from "lucide-react";
import { User } from "../../../types";

interface Badge {
  id: string;
  badgeName: string;
  badgeType: string;
  iconUrl: string;
  awardedAt: string;
}

interface AboutTabProps {
  user: User | null;
  userFriends: User[];
  userGroups: any[];
  earnedCount: number;
  userBadges?: Badge[];
}

export const AboutTab: React.FC<AboutTabProps> = ({ 
  user, 
  userFriends, 
  userGroups, 
  earnedCount,
  userBadges = []
}) => {
  return (
    <section className="space-y-6">
      {/* Bio Section */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Bio</h3>
        <p className="text-gray-700 leading-relaxed">
          {user?.bio || "No bio yet. Tell others about yourself!"}
        </p>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Personal Info */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Personal Information</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-gray-700">
              <MapPin size={18} className="text-gray-400" />
              <span>{user?.location || "Location not set"}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Mail size={18} className="text-gray-400" />
              <span>{user?.email || "Email not set"}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Calendar size={18} className="text-gray-400" />
              <span>Joined {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              }) : "Date unknown"}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Shield size={18} className="text-gray-400" />
              <span className="capitalize">{user?.role || "user"} Account</span>
            </div>
          </div>
        </div>

        {/* Gaming Stats */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Gaming Profile</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Total Posts</span>
              <span className="font-bold text-gray-900">{user?.stats?.postsCount || 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Photos Shared</span>
              <span className="font-bold text-gray-900">{user?.stats?.photosCount || 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Friends</span>
              <span className="font-bold text-gray-900">{userFriends.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Groups Joined</span>
              <span className="font-bold text-gray-900">{userGroups.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Achievements</span>
              <span className="font-bold text-gray-900">{earnedCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Friends Section */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Users size={20} />
            Friends
          </h3>
          <span className="text-sm text-gray-600">{userFriends.length} friends</span>
        </div>
        {userFriends.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {userFriends.slice(0, 6).map((friend) => (
              <div key={friend.id} className="text-center hover:bg-gray-50 p-2 rounded-lg transition">
                <img
                  src={friend.avatarUrl || "https://via.placeholder.com/64"}
                  alt={friend.fullName || friend.username}
                  className="w-16 h-16 rounded-full mx-auto mb-2 border-2 border-gray-200 object-cover"
                />
                <p className="text-sm font-medium text-gray-900 truncate">{friend.fullName || friend.username}</p>
                <p className="text-xs text-gray-500">@{friend.username}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-4">No friends yet</p>
        )}
      </div>

      {/* Achievements/Badges Section */}
      {userBadges.length > 0 && (
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Award size={20} />
              Achievements
            </h3>
            <span className="text-sm text-gray-600">{userBadges.length} earned</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {userBadges.slice(0, 12).map((badge) => (
              <div key={badge.id} className="text-center hover:bg-yellow-50 p-3 rounded-lg transition">
                <img
                  src={badge.iconUrl || "https://via.placeholder.com/64"}
                  alt={badge.badgeName}
                  className="w-16 h-16 rounded-lg mx-auto mb-2 object-cover"
                />
                <p className="text-sm font-medium text-gray-900 truncate">{badge.badgeName}</p>
                <p className="text-xs text-gray-500">{badge.badgeType}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(badge.awardedAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Status */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${
            user?.status === 'online' ? 'bg-green-500' :
            user?.status === 'in-game' ? 'bg-blue-500' :
            'bg-gray-400'
          }`} />
          <div>
            <p className="font-bold text-gray-900">Current Status</p>
            <p className="text-sm text-gray-600 capitalize">{user?.status || 'offline'}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
