import React from "react";
import { LiveChannel } from "../../assets/mock/liveChannels";
import { ChevronRight } from "lucide-react";

interface TrendingStreamsProps {
  streams: LiveChannel[];
}

export const TrendingStreams: React.FC<TrendingStreamsProps> = ({ streams }) => {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          <h3 className="text-2xl font-bold text-gray-900">Live Now</h3>
          <span className="text-sm text-gray-600">{streams.length} streaming</span>
        </div>
        <a
          href="#"
          className="text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-1 transition-colors"
        >
          View All <ChevronRight size={18} />
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {streams.map((stream) => (
          <div
            key={stream.id}
            className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-orange-400 hover:shadow-lg transition-all"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video bg-gray-100">
              <img
                src={stream.thumbnailUrl}
                alt={stream.name}
                className="w-full h-full object-cover"
              />
              {/* Live Badge */}
              <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                LIVE
              </div>
              {/* Viewers */}
              <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-semibold">
                {stream.viewers.toLocaleString()} viewers
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <h4 className="font-bold text-gray-900 mb-2 line-clamp-2">
                {stream.name}
              </h4>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm">
                  {stream.streamerName.charAt(0)}
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {stream.streamerName}
                </span>
              </div>
              <p className="text-xs text-gray-500">{stream.game}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
