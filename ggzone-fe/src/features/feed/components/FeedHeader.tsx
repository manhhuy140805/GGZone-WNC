import React from "react";
import { TrendingUp } from "lucide-react";

export const FeedHeader: React.FC = () => {
  return (
    <div className="relative h-48 rounded-xl overflow-hidden shadow-lg">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1920')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      <div className="relative z-10 h-full flex flex-col justify-center px-8">
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp size={32} className="text-orange-500" />
          <h1 className="text-4xl font-bold text-white">Community Feed</h1>
        </div>
        <p className="text-gray-200">
          Discover posts, videos, photos and gaming moments
        </p>
      </div>
    </div>
  );
};
