import React, { useState, useEffect, useRef } from "react";
import {
  mockPosts,
  additionalMockPosts,
  mockPostMedia,
  mockComments,
} from "../assets/mock/posts";
import { mockPhotos } from "../assets/mock/photos";
import { mockUsers } from "../assets/mock/users";
import { mockLiveChannels } from "../assets/mock/liveChannels";
import {
  Image,
  Video,
  FileText,
  Zap,
  Heart,
  MessageCircle,
  Share2,
  Play,
  TrendingUp,
  PlusCircle,
  Filter,
  Clock,
  Flame,
  Send,
  X,
  Calendar,
  MapPin,
} from "lucide-react";

type FeedTab = "all" | "posts" | "videos" | "photos" | "moments";
type SortType = "recent" | "popular" | "trending";

export const Feed: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FeedTab>("all");
  const [sortBy, setSortBy] = useState<SortType>("recent");
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");
  const [expandedComments, setExpandedComments] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sidebarRef.current) return;

      const sidebarElement = sidebarRef.current;
      const rect = sidebarElement.getBoundingClientRect();
      const sidebarHeight = sidebarElement.scrollHeight;
      const viewportHeight = window.innerHeight;

      // Nếu sidebar ngắn hơn viewport, sticky luôn
      if (sidebarHeight <= viewportHeight) {
        setIsSticky(true);
        return;
      }

      // Tính bottom của sidebar so với viewport
      const sidebarBottom = rect.bottom;

      // Chỉ sticky khi bottom của sidebar đã vào viewport
      // Nghĩa là đã cuộn đủ để xem hết nội dung sidebar
      if (sidebarBottom <= viewportHeight) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    // Delay để đảm bảo DOM đã render xong
    setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const allPosts = [...mockPosts, ...additionalMockPosts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const getUserInfo = (userId: string) => {
    return mockUsers.find((u) => u.id === userId);
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  const filteredContent = () => {
    let content = allPosts;

    switch (activeTab) {
      case "posts":
        content = allPosts.filter((p) => p.postType === "text");
        break;
      case "videos":
        content = allPosts.filter((p) => p.postType === "video");
        break;
      case "photos":
        content = allPosts.filter((p) => p.postType === "image");
        break;
      case "moments":
        return mockPhotos;
      default:
        content = allPosts;
    }

    // Apply sorting
    if (sortBy === "popular") {
      return [...content].sort((a, b) => b.likesCount - a.likesCount);
    } else if (sortBy === "trending") {
      return [...content].sort(
        (a, b) =>
          b.likesCount +
          b.commentsCount +
          b.sharesCount -
          (a.likesCount + a.commentsCount + a.sharesCount)
      );
    }

    return content;
  };

  const handleCreatePost = () => {
    if (newPostContent.trim()) {
      alert("Post created: " + newPostContent);
      setNewPostContent("");
      setShowCreatePost(false);
    }
  };

  const handleAddComment = (postId: string) => {
    if (newComment.trim()) {
      alert(`Comment added to post ${postId}: ${newComment}`);
      setNewComment("");
    }
  };

  const liveStreams = mockLiveChannels.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Header */}
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

      {/* Create Post Button */}
      <button
        onClick={() => setShowCreatePost(!showCreatePost)}
        className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
      >
        <PlusCircle size={24} />
        Create New Post
      </button>

      {/* Create Post Modal */}
      {showCreatePost && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Create Post</h3>
            <button
              onClick={() => setShowCreatePost(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <textarea
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full p-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 resize-none"
            rows={4}
          />
          <div className="flex items-center justify-between mt-4">
            <div className="flex gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Image size={20} className="text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Video size={20} className="text-gray-600" />
              </button>
            </div>
            <button
              onClick={handleCreatePost}
              className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors"
            >
              Post
            </button>
          </div>
        </div>
      )}

      {/* Tabs & Filters */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-2">
        <div className="flex items-center justify-between gap-4 mb-2">
          <div className="flex gap-2 overflow-x-auto flex-1">
            <button
              onClick={() => setActiveTab("all")}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
                activeTab === "all"
                  ? "bg-orange-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Zap size={18} />
              All Feed
            </button>
            <button
              onClick={() => setActiveTab("posts")}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
                activeTab === "posts"
                  ? "bg-orange-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <FileText size={18} />
              Posts
            </button>
            <button
              onClick={() => setActiveTab("videos")}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
                activeTab === "videos"
                  ? "bg-orange-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Video size={18} />
              Videos
            </button>
            <button
              onClick={() => setActiveTab("photos")}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
                activeTab === "photos"
                  ? "bg-orange-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Image size={18} />
              Photos
            </button>
            <button
              onClick={() => setActiveTab("moments")}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
                activeTab === "moments"
                  ? "bg-orange-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Zap size={18} />
              Moments
            </button>
          </div>
        </div>

        {/* Sort Filter */}
        <div className="flex items-center gap-2 border-t border-gray-200 pt-2 mt-2">
          <Filter size={16} className="text-gray-600" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortType)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-500"
          >
            <option value="recent">Most Recent</option>
            <option value="popular">Most Popular</option>
            <option value="trending">Trending</option>
          </select>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-4">
          {activeTab === "moments" ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {mockPhotos.map((photo) => {
                  const user = getUserInfo(photo.userId);
                  return (
                    <div
                      key={photo.id}
                      onClick={() => setSelectedPhoto(photo.imageUrl)}
                      className="group relative aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer"
                    >
                      <img
                        src={photo.imageUrl}
                        alt={photo.caption}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex items-center gap-2 mb-2">
                          <img
                            src={user?.avatarUrl}
                            alt={user?.username}
                            className="w-6 h-6 rounded-full"
                          />
                          <span className="text-sm font-semibold">
                            {user?.username}
                          </span>
                        </div>
                        <p className="text-xs line-clamp-2">{photo.caption}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Heart size={14} />
                          <span className="text-xs">{photo.likesCount}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Photo Lightbox */}
              {selectedPhoto && (
                <div
                  onClick={() => setSelectedPhoto(null)}
                  className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                >
                  <button
                    onClick={() => setSelectedPhoto(null)}
                    className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X size={24} className="text-white" />
                  </button>
                  <img
                    src={selectedPhoto}
                    alt="Full size"
                    className="max-w-full max-h-full object-contain rounded-lg"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              )}
            </>
          ) : (
            filteredContent().map((post: any) => {
              const user = getUserInfo(post.userId);
              const media = mockPostMedia.find((m) => m.postId === post.id);

              return (
                <div
                  key={post.id}
                  className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Post Header */}
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={user?.avatarUrl}
                        alt={user?.username}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-bold text-gray-900">
                          {user?.username}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {getTimeAgo(post.createdAt)}
                        </p>
                      </div>
                    </div>
                    {post.isPinned && (
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">
                        Pinned
                      </span>
                    )}
                  </div>

                  {/* Post Content */}
                  <div className="px-4 pb-4">
                    <p className="text-gray-800 leading-relaxed">
                      {post.content}
                    </p>
                  </div>

                  {/* Media */}
                  {post.postType === "video" && post.videoUrl && (
                    <div className="relative aspect-video bg-gray-900">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button className="w-16 h-16 bg-orange-600 hover:bg-orange-700 rounded-full flex items-center justify-center transition-colors shadow-lg">
                          <Play
                            size={24}
                            className="text-white ml-1"
                            fill="white"
                          />
                        </button>
                      </div>
                    </div>
                  )}

                  {post.postType === "image" && media && (
                    <img
                      src={media.mediaUrl}
                      alt="Post media"
                      className="w-full object-cover max-h-96"
                    />
                  )}

                  {/* Post Actions */}
                  <div className="px-4 py-3 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                      <span>{post.likesCount} likes</span>
                      <div className="flex gap-3">
                        <button
                          onClick={() =>
                            setExpandedComments(
                              expandedComments === post.id ? null : post.id
                            )
                          }
                          className="hover:text-orange-600 transition-colors"
                        >
                          {post.commentsCount} comments
                        </button>
                        <span>{post.sharesCount} shares</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 hover:bg-gray-50 rounded-lg transition-colors">
                        <Heart size={18} className="text-red-500" />
                        <span className="font-semibold text-gray-700">
                          Like
                        </span>
                      </button>
                      <button
                        onClick={() =>
                          setExpandedComments(
                            expandedComments === post.id ? null : post.id
                          )
                        }
                        className="flex-1 flex items-center justify-center gap-2 py-2 px-4 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <MessageCircle size={18} className="text-blue-500" />
                        <span className="font-semibold text-gray-700">
                          Comment
                        </span>
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 hover:bg-gray-50 rounded-lg transition-colors">
                        <Share2 size={18} className="text-green-500" />
                        <span className="font-semibold text-gray-700">
                          Share
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Comments Section */}
                  {expandedComments === post.id && (
                    <div className="px-4 pb-4 border-t border-gray-200 pt-4">
                      <div className="space-y-3 mb-4">
                        {mockComments
                          .filter((c) => c.postId === post.id)
                          .map((comment) => (
                            <div key={comment.id} className="flex gap-3">
                              <img
                                src={comment.user?.avatarUrl}
                                alt={comment.user?.username}
                                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                              />
                              <div className="flex-1">
                                <div className="bg-gray-100 rounded-lg p-3">
                                  <p className="font-semibold text-sm text-gray-900">
                                    {comment.user?.username}
                                  </p>
                                  <p className="text-sm text-gray-700">
                                    {comment.content}
                                  </p>
                                </div>
                                <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                                  <button className="hover:text-orange-600">
                                    Like
                                  </button>
                                  <span>{getTimeAgo(comment.createdAt)}</span>
                                  <span>{comment.likesCount} likes</span>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>

                      {/* Add Comment */}
                      <div className="flex gap-3">
                        <img
                          src={mockUsers[0].avatarUrl}
                          alt="You"
                          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="flex-1 flex gap-2">
                          <input
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Write a comment..."
                            className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:border-orange-500"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handleAddComment(post.id);
                              }
                            }}
                          />
                          <button
                            onClick={() => handleAddComment(post.id)}
                            className="p-2 bg-orange-600 hover:bg-orange-700 text-white rounded-full transition-colors"
                          >
                            <Send size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Sidebar */}
        <div 
          ref={sidebarRef}
          className={`space-y-4 ${isSticky ? 'lg:sticky lg:top-4' : ''}`}
        >
          {/* Live Streams */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Play size={20} className="text-red-600" />
              Live Now
            </h3>
            <div className="space-y-3">
              {liveStreams.map((stream) => (
                <div key={stream.id} className="group cursor-pointer">
                  <div className="relative aspect-video rounded-lg overflow-hidden mb-2">
                    <img
                      src={stream.thumbnailUrl}
                      alt={stream.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      LIVE
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
                      {stream.viewers.toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-xs">
                      {stream.streamerName.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-gray-900 truncate">
                        {stream.streamerName}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {stream.game}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gaming Events */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar size={20} className="text-purple-600" />
              Upcoming Events
            </h3>
            <div className="space-y-3">
              {[
                {
                  name: "Valorant Tournament",
                  date: "Nov 20",
                  location: "Online",
                },
                {
                  name: "CS2 Championship",
                  date: "Nov 25",
                  location: "Arena",
                },
                { name: "League Finals", date: "Dec 1", location: "Stadium" },
              ].map((event, idx) => (
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
              {[
                "#Valorant",
                "#CS2",
                "#LeagueOfLegends",
                "#Gaming",
                "#Esports",
              ].map((tag, idx) => (
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
              {mockUsers.slice(0, 5).map((user) => (
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
      </div>
    </div>
  );
};
