import React, { useState, useEffect, useRef } from "react";
import { PlusCircle, Loader } from "lucide-react";
import {
  FeedHeader,
  FeedTabs,
  PostCard,
  CreatePostModal,
  FeedSidebar,
} from "@/features/feed/components";
import { useFeedData } from "@/lib/hooks/useFeedData";
import { Post } from "@/services/api/postService";

type FeedTab = "all" | "posts" | "videos" | "photos" | "moments";
type SortType = "latest" | "trending" | "oldest";

export const Feed: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FeedTab>("all");
  const [sortBy, setSortBy] = useState<SortType>("latest");
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");
  const [isSticky, setIsSticky] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const {
    posts,
    loading,
    error,
    likedPosts,
    copiedPostId,
    uploadedMedia,
    uploading,
    uploadError,
    uploadProgress,
    handleMediaUpload,
    handleCreatePost,
    handleToggleLike,
    handleSharePost,
    handleRemoveMedia,
    setUploadError,
  } = useFeedData(sortBy, activeTab);

  // Sticky sidebar effect
  useEffect(() => {
    const handleScroll = () => {
      if (!sidebarRef.current) return;

      const sidebarElement = sidebarRef.current;
      const rect = sidebarElement.getBoundingClientRect();
      const sidebarHeight = sidebarElement.scrollHeight;
      const viewportHeight = window.innerHeight;

      if (sidebarHeight <= viewportHeight) {
        setIsSticky(true);
        return;
      }

      const sidebarBottom = rect.bottom;
      if (sidebarBottom <= viewportHeight) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Filter posts based on active tab
  const filteredPosts = posts.filter((post) => {
    if (activeTab === "all") return true;
    if (activeTab === "posts")
      return !post.media || post.media.length === 0;
    if (activeTab === "videos")
      return post.media?.some((m) => m.mediaType?.startsWith("video"));
    if (activeTab === "photos")
      return post.media?.some((m) => m.mediaType?.startsWith("image"));
    return true;
  });

  const handleCreate = async () => {
    const success = await handleCreatePost(newPostContent);
    if (success) {
      setNewPostContent("");
      setShowCreatePost(false);
    }
  };

  const handleCloseModal = () => {
    setShowCreatePost(false);
    setNewPostContent("");
    setUploadError(null);
  };

  return (
    <div className="space-y-6">
      <FeedHeader />

      {/* Create Post Button */}
      <button
        onClick={() => setShowCreatePost(!showCreatePost)}
        className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
      >
        <PlusCircle size={24} />
        Create New Post
      </button>

      <CreatePostModal
        isOpen={showCreatePost}
        content={newPostContent}
        uploadedMedia={uploadedMedia}
        uploading={uploading}
        uploadProgress={uploadProgress}
        error={uploadError}
        onClose={handleCloseModal}
        onContentChange={setNewPostContent}
        onMediaUpload={handleMediaUpload}
        onRemoveMedia={handleRemoveMedia}
        onCreate={handleCreate}
      />

      <FeedTabs
        activeTab={activeTab}
        sortBy={sortBy}
        onTabChange={setActiveTab}
        onSortChange={setSortBy}
      />

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-4">
          {loading && (
            <div className="flex justify-center items-center py-12 bg-white rounded-xl shadow-md border border-gray-200">
              <Loader className="animate-spin text-orange-600" size={32} />
            </div>
          )}

          {error && (
            <div className="text-center py-12 bg-red-50 rounded-xl border border-red-200">
              <p className="text-red-500 font-medium">{error}</p>
            </div>
          )}

          {!loading && !error && filteredPosts.length > 0 ? (
            filteredPosts.map((post: Post) => (
              <PostCard
                key={post.id}
                post={post}
                isLiked={likedPosts.has(post.id)}
                isCopied={copiedPostId === post.id}
                onLike={handleToggleLike}
                onShare={handleSharePost}
              />
            ))
          ) : (
            !loading &&
            !error && (
              <div className="text-center py-12 bg-white rounded-xl shadow-md border border-gray-200">
                <p className="text-gray-500">Không có posts nào</p>
              </div>
            )
          )}
        </div>

        {/* Sidebar */}
        <FeedSidebar users={[]} isSticky={isSticky} sidebarRef={sidebarRef} />
      </div>
    </div>
  );
};
