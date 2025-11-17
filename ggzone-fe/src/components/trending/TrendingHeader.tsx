import React from "react";
import { Flame, TrendingUp } from "lucide-react";

export const TrendingHeader: React.FC = () => {
  return (
    <>
      {/* Hero Banner */}
      <div className="relative h-48 rounded-xl overflow-hidden shadow-lg">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://wallpapercat.com/w/full/4/d/7/1868806-3840x2160-desktop-4k-valorant-wallpaper-image.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-center px-8">
          <div className="flex items-center gap-3 mb-2">
            <Flame size={32} className="text-orange-500" />
            <h1 className="text-4xl font-bold text-white">Trending</h1>
          </div>
          <p className="text-gray-200">Home &gt; Trending</p>
        </div>
      </div>

      {/* Page Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp size={32} className="text-orange-600" />
          <h2 className="text-3xl font-bold text-gray-900">What's Hot</h2>
        </div>
        <p className="text-gray-600 text-lg">
          Discover what's trending in the gaming community right now
        </p>
      </div>
    </>
  );
};
