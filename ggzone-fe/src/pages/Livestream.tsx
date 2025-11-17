import React, { useState } from "react";
import { mockLiveChannels } from "../assets/mock/liveChannels";
import { mockUsers } from "../assets/mock/users";
import {
  Play,
  Users,
  Heart,
  Share2,
  Eye,
  Radio,
  PlusCircle,
  X,
  Video,
  Mic,
  Settings,
  TrendingUp,
  Filter,
  Grid,
  List,
  Star,
  MessageCircle,
  Send,
  Smile,
  Gift,
  Crown,
  Flame,
} from "lucide-react";

type ViewMode = "browse" | "watch";
type LayoutMode = "grid" | "list";

export const Livestream: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("browse");
  const [layoutMode, setLayoutMode] = useState<LayoutMode>("grid");
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [showCreateStream, setShowCreateStream] = useState(false);
  const [streamTitle, setStreamTitle] = useState("");
  const [streamGame, setStreamGame] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  
  const [chatMessages, setChatMessages] = useState([
    { id: "1", user: "alice", avatar: mockUsers[0].avatarUrl, message: "Amazing gameplay! 🔥", timestamp: "2m ago" },
    { id: "2", user: "bob", avatar: mockUsers[1].avatarUrl, message: "How did you do that?!", timestamp: "1m ago" },
    { id: "3", user: "charlie", avatar: mockUsers[2].avatarUrl, message: "GG! Keep it up!", timestamp: "30s ago" },
  ]);

  const handleCreateStream = () => {
    if (streamTitle.trim() && streamGame.trim()) {
      alert(`Stream created: ${streamTitle} - ${streamGame}`);
      setStreamTitle("");
      setStreamGame("");
      setShowCreateStream(false);
    }
  };

  const handleWatchStream = (channelId: string) => {
    setSelectedChannel(channelId);
    setViewMode("watch");
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      setChatMessages([
        ...chatMessages,
        { id: Date.now().toString(), user: "You", avatar: mockUsers[0].avatarUrl, message: chatMessage, timestamp: "Just now" },
      ]);
      setChatMessage("");
    }
  };

  const categories = ["all", ...Array.from(new Set(mockLiveChannels.map(c => c.category)))];
  const filteredChannels = filterCategory === "all" 
    ? mockLiveChannels 
    : mockLiveChannels.filter(c => c.category === filterCategory);

  const featuredChannels = mockLiveChannels.slice(0, 3);
  const channel = mockLiveChannels.find(c => c.id === selectedChannel);

  // Browse View
  if (viewMode === "browse") {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="relative h-48 rounded-xl overflow-hidden shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-orange-600 to-purple-600" />
          <div className="relative z-10 h-full flex flex-col justify-center px-8">
            <div className="flex items-center gap-3 mb-2">
              <Radio size={32} className="text-white animate-pulse" />
              <h1 className="text-4xl font-bold text-white">Live Streams</h1>
            </div>
            <p className="text-white/90">{mockLiveChannels.length} channels streaming now</p>
          </div>
        </div>

        {/* Create Stream Button */}
        <button
          onClick={() => setShowCreateStream(true)}
          className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
        >
          <PlusCircle size={24} />
          Go Live - Start Your Stream
        </button>

        {/* Create Stream Modal */}
        {showCreateStream && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Start Your Stream</h3>
                <button onClick={() => setShowCreateStream(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Stream Title</label>
                  <input
                    type="text"
                    value={streamTitle}
                    onChange={(e) => setStreamTitle(e.target.value)}
                    placeholder="Enter your stream title..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Game/Category</label>
                  <input
                    type="text"
                    value={streamGame}
                    onChange={(e) => setStreamGame(e.target.value)}
                    placeholder="What are you playing?"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 py-3 border-2 border-gray-200 rounded-lg hover:border-orange-500 transition-colors">
                    <Video size={20} />
                    <span className="font-semibold">Camera</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 py-3 border-2 border-gray-200 rounded-lg hover:border-orange-500 transition-colors">
                    <Mic size={20} />
                    <span className="font-semibold">Microphone</span>
                  </button>
                </div>

                <button
                  onClick={handleCreateStream}
                  className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-3 rounded-lg transition-all"
                >
                  Start Streaming
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Featured Streamers */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Flame size={24} className="text-orange-600" />
              <h2 className="text-2xl font-bold text-gray-900">Featured Streamers</h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredChannels.map((stream, idx) => (
              <div
                key={stream.id}
                onClick={() => handleWatchStream(stream.id)}
                className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer"
              >
                <div className="relative aspect-video">
                  <img src={stream.thumbnailUrl} alt={stream.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Rank Badge */}
                  <div className="absolute top-3 left-3 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                    {idx + 1}
                  </div>
                  
                  {/* Live Badge */}
                  <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-lg font-bold flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    LIVE
                  </div>
                  
                  {/* Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <img src={stream.streamerAvatar} alt={stream.streamerName} className="w-12 h-12 rounded-full border-2 border-white" />
                      <div className="flex-1">
                        <h3 className="font-bold text-white">{stream.streamerName}</h3>
                        <p className="text-sm text-white/80">{stream.game}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-white text-sm">
                      <div className="flex items-center gap-1">
                        <Eye size={16} />
                        <span>{stream.viewers.toLocaleString()}</span>
                      </div>
                      <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded">{stream.category}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters & Layout */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-1">
              <Filter size={18} className="text-gray-600" />
              <div className="flex gap-2 overflow-x-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                      filterCategory === cat
                        ? "bg-orange-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setLayoutMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  layoutMode === "grid" ? "bg-orange-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setLayoutMode("list")}
                className={`p-2 rounded-lg transition-colors ${
                  layoutMode === "list" ? "bg-orange-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* All Streams */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <TrendingUp size={24} className="text-orange-600" />
            All Live Channels ({filteredChannels.length})
          </h2>
          
          {layoutMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredChannels.map((stream) => (
                <div
                  key={stream.id}
                  onClick={() => handleWatchStream(stream.id)}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-video rounded-lg overflow-hidden mb-3 shadow-md hover:shadow-xl transition-shadow">
                    <img src={stream.thumbnailUrl} alt={stream.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      LIVE
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                      <Eye size={12} />
                      {stream.viewers.toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <img src={stream.streamerAvatar} alt={stream.streamerName} className="w-10 h-10 rounded-full object-cover" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 truncate group-hover:text-orange-600 transition-colors">{stream.name}</h3>
                      <p className="text-sm text-gray-600 truncate">{stream.streamerName}</p>
                      <p className="text-xs text-gray-500 truncate">{stream.game}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredChannels.map((stream) => (
                <div
                  key={stream.id}
                  onClick={() => handleWatchStream(stream.id)}
                  className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="relative w-48 aspect-video rounded-lg overflow-hidden flex-shrink-0">
                    <img src={stream.thumbnailUrl} alt={stream.name} className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      LIVE
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <img src={stream.streamerAvatar} alt={stream.streamerName} className="w-12 h-12 rounded-full object-cover" />
                        <div>
                          <h3 className="font-bold text-gray-900">{stream.name}</h3>
                          <p className="text-sm text-gray-600">{stream.streamerName}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Eye size={16} />
                        <span className="font-semibold">{stream.viewers.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">{stream.category}</span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">{stream.game}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Watch View
  if (!channel) return <div>Channel not found</div>;

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => setViewMode("browse")}
        className="flex items-center gap-2 text-gray-600 hover:text-orange-600 font-semibold transition-colors"
      >
        ← Back to Browse
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Stream */}
        <div className="lg:col-span-3 space-y-4">
          {/* Video Player */}
          <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
            <img src={channel.thumbnailUrl} alt={channel.name} className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
              LIVE
            </div>
            <div className="absolute top-4 right-4 bg-black/80 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2">
              <Eye size={18} />
              {channel.viewers.toLocaleString()}
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors cursor-pointer group">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm group-hover:bg-white/30 rounded-full flex items-center justify-center">
                <Play size={32} className="text-white ml-1" fill="white" />
              </div>
            </div>
          </div>

          {/* Stream Info */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <img src={channel.streamerAvatar} alt={channel.streamerName} className="w-16 h-16 rounded-full border-4 border-orange-500" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{channel.name}</h2>
                  <p className="text-gray-600">{channel.streamerName} • {channel.game}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg flex items-center gap-2">
                  <Heart size={20} />
                  Follow
                </button>
                <button className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg">
                  <Share2 size={20} />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-red-50 rounded-lg p-4 text-center">
                <Eye size={24} className="text-red-600 mx-auto mb-2" />
                <p className="text-2xl font-bold">{channel.viewers.toLocaleString()}</p>
                <p className="text-xs text-gray-600">Viewers</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <Heart size={24} className="text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold">{Math.floor(Math.random() * 500) + 100}</p>
                <p className="text-xs text-gray-600">Followers</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <Star size={24} className="text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold">4.8</p>
                <p className="text-xs text-gray-600">Rating</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <Radio size={24} className="text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold">{Math.floor(Math.random() * 10) + 1}h</p>
                <p className="text-xs text-gray-600">Streaming</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircle size={20} />
                <h3 className="font-bold">Live Chat</h3>
              </div>
              <span className="text-sm">{chatMessages.length}</span>
            </div>
            <div className="h-96 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {chatMessages.map((msg) => (
                <div key={msg.id} className="flex gap-2">
                  <img src={msg.avatar} alt={msg.user} className="w-8 h-8 rounded-full" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm">{msg.user}</span>
                      <span className="text-xs text-gray-500">{msg.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-700">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t bg-white">
              <div className="flex gap-2 mb-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg"><Smile size={18} /></button>
                <button className="p-2 hover:bg-gray-100 rounded-lg"><Gift size={18} /></button>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Send a message..."
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <button onClick={handleSendMessage} className="p-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg">
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Top Supporters */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Crown size={20} className="text-yellow-500" />
              Top Supporters
            </h3>
            <div className="space-y-3">
              {mockUsers.slice(0, 5).map((user, idx) => (
                <div key={user.id} className="flex items-center gap-3">
                  <div className="relative">
                    <img src={user.avatarUrl} alt={user.username} className="w-10 h-10 rounded-full" />
                    {idx < 3 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-xs font-bold">
                        {idx + 1}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{user.username}</p>
                    <p className="text-xs text-gray-500">${Math.floor(Math.random() * 500) + 50}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
