import React from "react";
import { Eye, Gamepad2 } from "lucide-react";
import type { LiveChannel } from "../../assets/mock/liveChannels";

interface LiveChannelCardProps {
  channel: LiveChannel;
}

export const LiveChannelCard: React.FC<LiveChannelCardProps> = ({
  channel,
}) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden transition-all duration-200 group cursor-pointer shadow-md hover:shadow-xl">
      <div className="relative h-40 bg-gray-200 overflow-hidden">
        <img
          src={channel.thumbnailUrl}
          alt={channel.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2 px-2 py-1 bg-red-600 text-white text-xs font-bold rounded flex items-center gap-1">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          LIVE
        </div>
        <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 text-white text-xs rounded flex items-center gap-1">
          <Eye size={12} />
          {channel.viewers.toLocaleString()}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-gray-900 mb-1 line-clamp-2">
          {channel.name}
        </h3>
        <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
          <Gamepad2 size={14} className="text-purple-600" />
          {channel.game}
        </p>
        <div className="flex items-center gap-2">
          <img
            src={channel.streamerAvatar}
            alt={channel.streamerName}
            className="w-8 h-8 rounded-full border border-orange-500"
          />
          <div className="text-sm">
            <div className="text-gray-900 font-semibold">
              {channel.streamerName}
            </div>
            <div className="text-gray-600 text-xs">
              {channel.viewers} watching
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
