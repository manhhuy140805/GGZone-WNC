import React, { useState, useEffect } from "react";
import { ArrowLeft, Calendar, Gamepad2, Star, Play, Loader } from "lucide-react";
import { gameService } from "@/services/api/gameService";
import { Game } from "@/types";

interface GameDetailProps {
  gameId: string;
  onBack: () => void;
}

export const GameDetail: React.FC<GameDetailProps> = ({ gameId, onBack }) => {
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadGameDetail();
  }, [gameId]);

  const loadGameDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await gameService.getGameById(gameId);
      
      if (response.success && response.data) {
        setGame(response.data);
      } else {
        setError(response.message || 'Không thể tải thông tin game');
      }
    } catch (err) {
      setError('Lỗi khi tải dữ liệu');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <Loader className="animate-spin text-orange-600" size={40} />
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="space-y-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-orange-600 font-semibold transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Browse
        </button>
        <div className="text-center py-16 bg-red-50 rounded-lg">
          <p className="text-red-500 font-medium">{error || 'Game không tồn tại'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-orange-600 font-semibold transition-colors"
      >
        <ArrowLeft size={20} />
        Back to Browse
      </button>

      {/* Hero Section */}
      <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
        <img
          src={game.coverImageUrl}
          alt={game.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-orange-600 text-white rounded-full text-sm font-bold">
              {game.genre}
            </span>
            <span className="px-3 py-1 bg-purple-600 text-white rounded-full text-sm font-bold">
              {game.platform}
            </span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-2">{game.name}</h1>
          <p className="text-gray-200 text-lg">{game.publisher}</p>
        </div>
      </div>

      {/* Game Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Game</h2>
            <p className="text-gray-700 leading-relaxed">{game.description}</p>
          </div>

          {/* System Requirements */}
          {(game.minimumRequirements || game.recommendedRequirements) && (
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">System Requirements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {game.minimumRequirements && (
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Minimum</h3>
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap">{game.minimumRequirements}</pre>
                  </div>
                )}
                {game.recommendedRequirements && (
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Recommended</h3>
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap">{game.recommendedRequirements}</pre>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Photos Gallery */}
          {game.photos && game.photos.length > 0 && (
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Screenshots</h2>
              <div className="grid grid-cols-2 gap-4">
                {game.photos.map((photo: any, idx: number) => (
                  <img
                    key={idx}
                    src={photo.imageUrl}
                    alt={`Screenshot ${idx + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Reviews */}
          {game.gameReviews && game.gameReviews.length > 0 && (
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">User Reviews</h2>
              <div className="space-y-4">
                {game.gameReviews.slice(0, 3).map((review: any, idx: number) => (
                  <div key={idx} className="border-b border-gray-200 pb-4 last:border-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{review.title}</span>
                    </div>
                    <p className="text-sm text-gray-700">{review.content}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {review.hoursPlayed} hours played • {review.isRecommended ? '👍 Recommended' : '👎 Not Recommended'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Play Button */}
          <button className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-bold py-4 px-6 rounded-lg transition-all flex items-center justify-center gap-3 shadow-lg">
            <Play size={24} />
            {game.gameType === 'web' ? 'Play in Browser' : 'Play Now'}
          </button>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Game Stats */}
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Game Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar size={20} className="text-orange-600" />
                <div>
                  <p className="text-sm text-gray-600">Release Date</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(game.releaseDate).toLocaleDateString('vi-VN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Gamepad2 size={20} className="text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Genre</p>
                  <p className="font-semibold text-gray-900">{game.genre}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Star size={20} className="text-yellow-500" />
                <div>
                  <p className="text-sm text-gray-600">Platform</p>
                  <p className="font-semibold text-gray-900">{game.platform}</p>
                </div>
              </div>

              {game.gameType && (
                <div className="flex items-center gap-3">
                  <Play size={20} className="text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Game Type</p>
                    <p className="font-semibold text-gray-900 capitalize">{game.gameType}</p>
                  </div>
                </div>
              )}

              {game.installSize && (
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">Install Size</p>
                  <p className="font-semibold text-gray-900">{game.installSize}</p>
                </div>
              )}
            </div>
          </div>

          {/* Publisher Info */}
          <div className="bg-gradient-to-br from-orange-50 to-purple-50 rounded-lg p-6 border border-orange-200">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Publisher</h3>
            <p className="text-gray-700 font-semibold">{game.publisher}</p>
          </div>

          {/* Videos */}
          {game.videos && game.videos.length > 0 && (
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Videos</h3>
              <div className="space-y-3">
                {game.videos.slice(0, 3).map((video: any, idx: number) => (
                  <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden hover:border-orange-400 transition-colors cursor-pointer">
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-3">
                      <p className="text-sm font-semibold text-gray-900 line-clamp-2">{video.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{video.viewsCount} views</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
