import React, { useState } from "react";
import { GameCard } from "../components/cards";
import {
  Search,
  Filter,
  Gamepad2,
  TrendingUp,
  Star,
  Clock,
  Zap,
  ChevronRight,
} from "lucide-react";
import { mockGames } from "../assets/mock/games";

export const Browse: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"trending" | "newest" | "popular">(
    "trending"
  );
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredGames = mockGames.filter((game) => {
    const matchesSearch =
      game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = !selectedGenre || game.genre === selectedGenre;
    const matchesPlatform =
      !selectedPlatform || game.platform === selectedPlatform;
    return matchesSearch && matchesGenre && matchesPlatform;
  });

  const sortedGames = [...filteredGames].sort((a, b) => {
    if (sortBy === "newest") {
      return (
        new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
      );
    }
    if (sortBy === "popular") {
      return b.name.localeCompare(a.name);
    }
    return 0;
  });

  const genres = Array.from(new Set(mockGames.map((g) => g.genre)));
  const platforms = Array.from(new Set(mockGames.map((g) => g.platform)));

  // Featured games (first 3)
  const featuredGames = mockGames.slice(0, 3);

  return (
    <div className="space-y-8 bg-gradient-to-b from-white via-gray-50 to-gray-100 min-h-screen pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Gamepad2 size={32} className="text-orange-600" />
          <h1 className="text-4xl font-bold text-gray-900">Browse Games</h1>
        </div>
        <p className="text-gray-600 text-lg">
          Discover and explore {mockGames.length}+ amazing games
        </p>
      </div>

      {/* Featured Games Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Star size={20} className="text-yellow-500" />
            <h2 className="text-2xl font-bold text-gray-900">Featured Games</h2>
          </div>
          <a
            href="#"
            className="text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-1"
          >
            View All <ChevronRight size={18} />
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredGames.map((game, idx) => (
            <GameCard key={game.id} game={game} rank={idx} />
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
          placeholder="Search games by name or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
        />
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
        <div className="space-y-4">
          {/* Genre & Platform Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Genre Filter */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Filter size={18} className="text-orange-600" />
                <label className="text-sm font-bold text-gray-900">Genre</label>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                <button
                  onClick={() => setSelectedGenre(null)}
                  className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                    selectedGenre === null
                      ? "bg-orange-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  All Genres
                </button>
                {genres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => setSelectedGenre(genre)}
                    className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                      selectedGenre === genre
                        ? "bg-orange-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            {/* Platform Filter */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Gamepad2 size={18} className="text-purple-600" />
                <label className="text-sm font-bold text-gray-900">
                  Platform
                </label>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                <button
                  onClick={() => setSelectedPlatform(null)}
                  className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                    selectedPlatform === null
                      ? "bg-purple-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  All Platforms
                </button>
                {platforms.map((platform) => (
                  <button
                    key={platform}
                    onClick={() => setSelectedPlatform(platform)}
                    className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                      selectedPlatform === platform
                        ? "bg-purple-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    {platform}
                  </button>
                ))}
              </div>
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
                <option value="trending">Trending</option>
                <option value="newest">Newest</option>
                <option value="popular">Popular</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="text-xs font-bold text-gray-600 mb-2 block">
                View
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`flex-1 px-3 py-2 rounded-lg font-medium transition-all ${
                    viewMode === "grid"
                      ? "bg-orange-600 text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`flex-1 px-3 py-2 rounded-lg font-medium transition-all ${
                    viewMode === "list"
                      ? "bg-orange-600 text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  List
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp size={18} className="text-green-600" />
          <span className="text-sm font-semibold text-gray-700">
            {sortedGames.length} game{sortedGames.length !== 1 ? "s" : ""}{" "}
            found
          </span>
        </div>
      </div>

      {/* Games Display */}
      {sortedGames.length > 0 ? (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              : "space-y-3"
          }
        >
          {sortedGames.map((game, idx) => (
            <div key={game.id}>
              {viewMode === "grid" ? (
                <GameCard game={game} rank={idx} />
              ) : (
                <div className="bg-white rounded-lg p-4 border border-gray-200 hover:border-orange-400 hover:shadow-md transition-all flex gap-4">
                  <img
                    src={game.coverImageUrl}
                    alt={game.name}
                    className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">
                      {game.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {game.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded">
                        {game.genre}
                      </span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">
                        {game.platform}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {new Date(game.releaseDate).getFullYear()}
                      </span>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors flex items-center gap-1 h-fit">
                    <Zap size={14} />
                    Play
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🎮</div>
          <p className="text-gray-600 text-lg font-medium mb-2">
            No games found
          </p>
          <p className="text-gray-500">
            Try adjusting your search or filters to find what you're looking for
          </p>
        </div>
      )}
    </div>
  );
};
