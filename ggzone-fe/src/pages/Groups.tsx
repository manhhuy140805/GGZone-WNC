import React, { useState } from "react";
import { CommunityCard } from "../components/cards";
import {
  Search,
  Plus,
  Users,
  TrendingUp,
  ChevronRight,
  Filter,
} from "lucide-react";
import { mockGroups } from "../assets/mock/groups";

export const Groups: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [joinedGroups, setJoinedGroups] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"members" | "newest" | "trending">(
    "members"
  );
  const [filterType, setFilterType] = useState<"all" | "joined" | "recommended">(
    "all"
  );

  const filteredGroups = mockGroups.filter((group) => {
    const matchesSearch =
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (group.description || "").toLowerCase().includes(searchTerm.toLowerCase());

    if (filterType === "joined") {
      return matchesSearch && joinedGroups.includes(group.id);
    }
    if (filterType === "recommended") {
      return matchesSearch && !joinedGroups.includes(group.id);
    }
    return matchesSearch;
  });

  const sortedGroups = [...filteredGroups].sort((a, b) => {
    if (sortBy === "members") {
      return b.membersCount - a.membersCount;
    }
    if (sortBy === "newest") {
      return (
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }
    return 0;
  });

  const handleJoinGroup = (groupId: string) => {
    if (joinedGroups.includes(groupId)) {
      setJoinedGroups(joinedGroups.filter((id) => id !== groupId));
    } else {
      setJoinedGroups([...joinedGroups, groupId]);
    }
  };

  // Featured groups (first 3)
  const featuredGroups = mockGroups.slice(0, 3);
  const myGroups = mockGroups.filter((g) => joinedGroups.includes(g.id));

  return (
    <div className="space-y-8 bg-gradient-to-b from-white via-gray-50 to-gray-100 min-h-screen pb-12">
      {/* Hero Banner */}
      <div className="relative h-48 rounded-xl overflow-hidden mb-8 shadow-lg">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://wallpapercat.com/w/full/4/d/7/1868806-3840x2160-desktop-4k-valorant-wallpaper-image.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-center px-8">
          <h1 className="text-4xl font-bold text-white mb-2">Groups</h1>
          <p className="text-gray-200">Home &gt; Groups</p>
        </div>
      </div>
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Users size={32} className="text-orange-600" />
            <h1 className="text-4xl font-bold text-gray-900">Gaming Groups</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Join {mockGroups.length} communities and play with friends
          </p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold rounded-lg transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg whitespace-nowrap">
          <Plus size={20} />
          Create Group
        </button>
      </div>

      {/* My Groups Section */}
      {myGroups.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <h2 className="text-2xl font-bold text-gray-900">My Groups</h2>
              <span className="text-sm text-gray-600">({myGroups.length})</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myGroups.slice(0, 2).map((group) => (
              <CommunityCard
                key={group.id}
                group={group}
                onJoin={() => handleJoinGroup(group.id)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Featured Groups Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp size={20} className="text-yellow-500" />
            <h2 className="text-2xl font-bold text-gray-900">Featured Groups</h2>
          </div>
          <a
            href="#"
            className="text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-1"
          >
            View All <ChevronRight size={18} />
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredGroups.map((group) => (
            <CommunityCard
              key={group.id}
              group={group}
              onJoin={() => handleJoinGroup(group.id)}
            />
          ))}
        </div>
      </section>

      {/* Search Bar */}
      <div className="relative">
        <Search
          size={20}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search groups by name or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
        />
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
        <div className="space-y-4">
          {/* Filter Type */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Filter size={18} className="text-orange-600" />
              <label className="text-sm font-bold text-gray-900">
                Filter By
              </label>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {[
                { value: "all", label: "All Groups" },
                { value: "joined", label: "My Groups" },
                { value: "recommended", label: "Recommended" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFilterType(option.value as any)}
                  className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                    filterType === option.value
                      ? "bg-orange-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sort & View Options */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2 border-t border-gray-200">
            <div className="flex-1">
              <label className="text-xs font-bold text-gray-600 mb-2 block">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 text-sm"
              >
                <option value="members">Most Members</option>
                <option value="newest">Newest</option>
                <option value="trending">Trending</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="text-xs font-bold text-gray-600 mb-2 block">
                Results
              </label>
              <div className="px-3 py-2 bg-gray-100 rounded-lg text-sm font-semibold text-gray-700">
                {sortedGroups.length} group{sortedGroups.length !== 1 ? "s" : ""}{" "}
                found
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Groups Grid */}
      {sortedGroups.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedGroups.map((group) => (
            <CommunityCard
              key={group.id}
              group={group}
              onJoin={() => handleJoinGroup(group.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">👥</div>
          <p className="text-gray-600 text-lg font-medium mb-2">
            No groups found
          </p>
          <p className="text-gray-500">
            Try adjusting your search or filters to find communities you're
            interested in
          </p>
        </div>
      )}

      {/* Newsletter CTA */}
      <section className="bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 rounded-2xl p-8 md:p-12 border border-purple-400/30 shadow-lg">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Discover New Communities
          </h2>
          <p className="text-white/90 mb-6">
            Get notified about new gaming groups and community events delivered
            to your inbox.
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
