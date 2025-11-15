import React, { useState } from "react";
import {
  Star,
  Trophy,
  Flame,
  Users,
  Share2,
  Settings,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { mockAchievements } from "../assets/mock/achievements";
import { mockGames } from "../assets/mock/games";

export const Achievements: React.FC = () => {
  const { user } = useAuth();
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const [earnedAchievementIds] = useState<string[]>(["1", "3", "5", "7"]);
  const [activeTab, setActiveTab] = useState<
    "posts" | "stats" | "about" | "teams" | "groups" | "forums" | "video" | "achievements"
  >("achievements");

  const filteredAchievements = selectedGameId
    ? mockAchievements.filter((a) => a.gameId === selectedGameId)
    : mockAchievements;

  const earnedCount = filteredAchievements.filter((a) =>
    earnedAchievementIds.includes(a.id)
  ).length;

  const progressPercent = Math.round(
    (earnedCount / filteredAchievements.length) * 100
  );

  return (
    <div className="space-y-8 bg-gradient-to-b from-white via-gray-50 to-gray-100 min-h-screen pb-12">
      {/* Profile Header */}
      <section className="relative">
        {/* Background Banner */}
        <div
          className="h-48 bg-cover bg-center rounded-2xl"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=1200&h=400&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 rounded-2xl" />
        </div>

        {/* Profile Info */}
        <div className="relative -mt-16 px-6 flex flex-col md:flex-row md:items-end md:gap-6">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <img
              src={user?.avatarUrl || "https://api.dicebear.com/7.x/avataaars/svg?seed=User"}
              alt={user?.fullName}
              className="w-32 h-32 rounded-2xl border-4 border-white shadow-lg"
            />
          </div>

          {/* Profile Details */}
          <div className="flex-1 pb-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              {user?.fullName || "Player"}
            </h1>
            <p className="text-gray-600 mb-3">@{user?.username || "username"}</p>
            <div className="flex flex-wrap gap-2">
              {user?.isVerified && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                  ✓ Verified
                </span>
              )}
              <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">
                {user?.role}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pb-4">
            <button className="px-4 py-2 bg-white border-2 border-gray-200 text-gray-900 font-bold rounded-lg hover:border-orange-400 transition-all flex items-center gap-2">
              <Share2 size={16} />
              Share
            </button>
            <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-all flex items-center gap-2">
              <Settings size={16} />
              Edit
            </button>
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex gap-8 overflow-x-auto px-6 py-4">
          {[
            { key: "posts", label: "Posts - Item" },
            { key: "stats", label: "Game - Stats" },
            { key: "about", label: "About" },
            { key: "teams", label: "Teams" },
            { key: "groups", label: "Groups" },
            { key: "forums", label: "Forums" },
            { key: "video", label: "Video" },
            { key: "achievements", label: "Achievements" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`pb-4 font-medium whitespace-nowrap transition-all border-b-2 ${
                activeTab === tab.key
                  ? "text-orange-600 border-orange-600"
                  : "text-gray-600 border-transparent hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      {activeTab === "achievements" && (
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { icon: Trophy, label: "Achievements", value: earnedCount, color: "text-yellow-600" },
          { icon: Star, label: "Total Points", value: earnedCount * 100, color: "text-purple-600" },
          { icon: Flame, label: "Streak", value: "7 days", color: "text-red-600" },
          { icon: Users, label: "Friends", value: user?.stats?.friendsCount || 0, color: "text-blue-600" },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <Icon size={24} className={stat.color} />
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </section>
      )}

      {/* Achievements Section */}
      {activeTab === "achievements" && (
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Achievements</h2>

          {/* Progress Bar */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-gray-700">
                Progress: {earnedCount} / {filteredAchievements.length}
              </span>
              <span className="text-lg font-bold text-orange-600">{progressPercent}%</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Game Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedGameId(null)}
              className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                selectedGameId === null
                  ? "bg-orange-600 text-white shadow-md"
                  : "bg-white border-2 border-gray-200 text-gray-800 hover:border-orange-400"
              }`}
            >
              All Games
            </button>
            {mockGames.map((game) => (
              <button
                key={game.id}
                onClick={() => setSelectedGameId(game.id)}
                className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                  selectedGameId === game.id
                    ? "bg-orange-600 text-white shadow-md"
                    : "bg-white border-2 border-gray-200 text-gray-800 hover:border-orange-400"
                }`}
              >
                {game.name}
              </button>
            ))}
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAchievements.map((achievement) => {
            const isEarned = earnedAchievementIds.includes(achievement.id);
            return (
              <div
                key={achievement.id}
                className={`rounded-xl p-6 border transition-all ${
                  isEarned
                    ? "bg-white border-orange-200 shadow-md hover:shadow-lg"
                    : "bg-gray-50 border-gray-200 opacity-60"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="text-4xl">{isEarned ? "🏆" : "🔒"}</div>
                  {isEarned && (
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded">
                      Earned
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">
                  {achievement.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {achievement.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    +{achievement.points} points
                  </span>
                  {isEarned && (
                    <span className="text-xs font-semibold text-orange-600">
                      ✓ Unlocked
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
      )}

      {/* Other Tabs Content */}
      {activeTab === "posts" && (
        <section className="bg-white rounded-xl p-8 border border-gray-200 text-center">
          <p className="text-gray-600">Posts & Items coming soon...</p>
        </section>
      )}

      {activeTab === "stats" && (
        <section className="bg-white rounded-xl p-8 border border-gray-200 text-center">
          <p className="text-gray-600">Game Stats coming soon...</p>
        </section>
      )}

      {activeTab === "about" && (
        <section className="bg-white rounded-xl p-8 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">About</h3>
          <p className="text-gray-600 mb-4">{user?.bio || "No bio yet"}</p>
          <div className="space-y-2 text-sm text-gray-600">
            <p>📍 {user?.location || "Location not set"}</p>
            <p>📅 Joined {new Date(user?.createdAt || "").toLocaleDateString()}</p>
          </div>
        </section>
      )}

      {activeTab === "teams" && (
        <section className="bg-white rounded-xl p-8 border border-gray-200 text-center">
          <p className="text-gray-600">Teams coming soon...</p>
        </section>
      )}

      {activeTab === "groups" && (
        <section className="bg-white rounded-xl p-8 border border-gray-200 text-center">
          <p className="text-gray-600">Groups coming soon...</p>
        </section>
      )}

      {activeTab === "forums" && (
        <section className="bg-white rounded-xl p-8 border border-gray-200 text-center">
          <p className="text-gray-600">Forums coming soon...</p>
        </section>
      )}

      {activeTab === "video" && (
        <section className="bg-white rounded-xl p-8 border border-gray-200 text-center">
          <p className="text-gray-600">Videos coming soon...</p>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 rounded-2xl p-8 md:p-12 border border-purple-400/30 shadow-lg">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Keep Achieving
          </h2>
          <p className="text-white/90 mb-6">
            Get notified about new achievements and challenges to unlock.
          </p>

          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/30 backdrop-blur-sm"
            />
            <button className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors shadow-md hover:shadow-lg">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
