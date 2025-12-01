import React, { useState, useEffect } from "react";
import { GameCard } from "@/components/shared/cards";
import {
  Search,
  Filter,
  Gamepad2,
  TrendingUp,
  Star,
  Clock,
  Zap,
  ChevronRight,
  Loader,
} from "lucide-react";
import { gameService } from "@/services/api/gameService";
import { Game } from "@/types";

interface BrowseProps {
  onViewGame?: (gameId: string) => void;
}

export const Browse: React.FC<BrowseProps> = ({ onViewGame }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"trending" | "newest" | "popular">(
    "trending"
  );
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [games, setGames] = useState<Game[]>([]);
  const [featuredGames, setFeaturedGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(12);
  const [genres, setGenres] = useState<string[]>([]);
  const [platforms, setPlatforms] = useState<string[]>([]);

  // Load genres and platforms on component mount
  useEffect(() => {
    loadFilters();
    loadFeaturedGames();
  }, []);

  // Fetch games on component mount and when filters change
  useEffect(() => {
    loadGames();
  }, [currentPage, selectedGenre, selectedPlatform]);

  const loadFilters = async () => {
    try {
      const [genresRes, platformsRes] = await Promise.all([
        gameService.getGenres(),
        gameService.getPlatforms(),
      ]);

      if (genresRes.success && genresRes.data) {
        setGenres(genresRes.data);
      }
      if (platformsRes.success && platformsRes.data) {
        setPlatforms(platformsRes.data);
      }
    } catch (err) {
      console.error('Lỗi khi tải filters:', err);
    }
  };

  const loadFeaturedGames = async () => {
    try {
      const response = await gameService.getFeaturedGames(3);
      if (response.success && response.data) {
        setFeaturedGames(response.data);
      }
    } catch (err) {
      console.error('Lỗi khi tải featured games:', err);
    }
  };

  const loadGames = async () => {
    try {
      setLoading(true);
      setError(null);

      let response;
      if (searchTerm.trim()) {
        response = await gameService.searchGames(searchTerm, currentPage, pageSize);
      } else {
        response = await gameService.getGamesPaginated(
          currentPage,
          pageSize,
          selectedGenre || undefined,
          selectedPlatform || undefined
        );
      }

      if (response.success && response.data) {
        setGames(response.data.games);
        setTotalPages(response.data.totalPages);
      } else {
        setError(response.message || 'Lỗi khi tải games');
      }
    } catch (err) {
      setError('Lỗi khi tải dữ liệu');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    loadGames();
  };

  // Sort games based on sortBy
  const sortedGames = [...games].sort((a, b) => {
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
          <h1 className="text-4xl font-bold text-white mb-2">Browse Games</h1>
          <p className="text-gray-200">Home &gt; Games</p>
        </div>
      </div>
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Gamepad2 size={32} className="text-orange-600" />
          <h1 className="text-4xl font-bold text-gray-900">Browse Games</h1>
        </div>
        <p className="text-gray-600 text-lg">
          Discover and explore amazing games
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
        {featuredGames.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredGames.map((game, idx) => (
              <GameCard key={game.id} game={game} rank={idx} onViewGame={onViewGame} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">Đang tải featured games...</p>
          </div>
        )}
      </section>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative">
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
      </form>

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

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-16">
          <Loader className="animate-spin text-orange-600" size={40} />
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="text-center py-12 bg-red-50 rounded-lg">
          <p className="text-red-500 font-medium">{error}</p>
        </div>
      )}

      {/* Games Display */}
      {!loading && !error && sortedGames.length > 0 ? (
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
                <GameCard game={game} rank={idx} onViewGame={onViewGame} />
              ) : (
                <div 
                  onClick={() => onViewGame?.(game.id)}
                  className="bg-white rounded-lg p-4 border border-gray-200 hover:border-orange-400 hover:shadow-md transition-all flex gap-4 cursor-pointer"
                >
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
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewGame?.(game.id);
                    }}
                    className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors flex items-center gap-1 h-fit"
                  >
                    <Zap size={14} />
                    View
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        !loading && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎮</div>
            <p className="text-gray-600 text-lg font-medium mb-2">
              No games found
            </p>
            <p className="text-gray-500">
              Try adjusting your search or filters to find what you're looking for
            </p>
          </div>
        )
      )}

      {/* Pagination */}
      {!loading && !error && totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Previous
          </button>
          
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 rounded-lg transition-all ${
                  currentPage === page
                    ? 'bg-orange-600 text-white'
                    : 'border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
