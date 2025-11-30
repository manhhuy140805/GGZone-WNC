import React from "react";
import { Calendar, Clock, MapPin, Flame, TrendingUp } from "lucide-react";

interface User {
  id: string;
  username: string;
  avatarUrl?: string;
  bio?: string;
}

interface FeedSidebarProps {
  users: User[];
  isSticky: boolean;
  sidebarRef: React.RefObject<HTMLDivElement | null>;
}

export const FeedSidebar: React.FC<FeedSidebarProps> = ({
  users,
  isSticky,
  sidebarRef,
}) => {
  const events = [
    { name: "Valorant Tournament", date: "Nov 20", location: "Online" },
    { name: "CS2 Championship", date: "Nov 25", location: "Arena" },
    { name: "League Finals", date: "Dec 1", location: "Stadium" },
  ];

  const trendingTopics = [
    "#Valorant",
    "#CS2",
    "#LeagueOfLegends",
    "#Gaming",
    "#Esports",
  ];

  return (
    <div
      ref={sidebarRef}
      className={`space-y-4 ${isSticky ? "lg:sticky lg:top-4" : ""}`}
    >
      {/* Gaming Events */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Calendar size={20} className="text-purple-600" />
          Upcoming Events
        </h3>
        <div className="space-y-3">
          {events.map((event, idx) => (
            <div
              key={idx}
              className="p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-bold text-gray-900 text-sm">
                  {event.name}
                </h4>
                <Flame size={16} className="text-orange-500" />
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock size={12} />
                  {event.date}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={12} />
                  {event.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Topics */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp size={20} className="text-orange-600" />
          Trending Topics
        </h3>
        <div className="space-y-3">
          {trendingTopics.map((tag, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
            >
              <span className="font-semibold text-blue-600">{tag}</span>
              <span className="text-xs text-gray-500">
                {Math.floor(Math.random() * 500) + 100}K posts
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested Users */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4">
        <h3 className="font-bold text-gray-900 mb-4">Suggested Users</h3>
        <div className="space-y-3">
          {users.slice(0, 5).map((user) => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={user.avatarUrl}
                  alt={user.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {user.username}
                  </p>
                  <p className="text-xs text-gray-500 line-clamp-1">
                    {user.bio}
                  </p>
                </div>
              </div>
              <button className="px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-lg transition-colors">
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
