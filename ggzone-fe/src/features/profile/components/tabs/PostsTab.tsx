import React, { useState } from "react";
import { ThumbsUp, MessageCircle, Share2, Image as ImageIcon, Loader } from "lucide-react";
import { Post, Photo, User } from "@/types";
import { postService } from "@/services/api/postService";

interface PostsTabProps {
  user: User | null;
  userPosts: Post[];
  userPhotos: Photo[];
}

export const PostsTab: React.FC<PostsTabProps> = ({ user, userPosts, userPhotos }) => {
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [loadingPostId, setLoadingPostId] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>(userPosts);

  // Update posts when userPosts prop changes
  React.useEffect(() => {
    setPosts(userPosts);
    // Initialize liked posts from userPosts
    const likedPostIds = userPosts
      .filter(post => post.isLiked)
      .map(post => post.id);
    setLikedPosts(new Set(likedPostIds));
  }, [userPosts]);

  const handleLikePost = async (postId: string) => {
    if (likedPosts.has(postId)) {
      // Unlike
      setLoadingPostId(postId);
      const response = await postService.unlikePost(postId);
      if (response.success) {
        setLikedPosts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(postId);
          return newSet;
        });
        // Update like count - always update even if 0
        const newLikeCount = response.likeCount ?? 0;
        setPosts(prev => prev.map(p => 
          p.id === postId ? { ...p, likesCount: newLikeCount } : p
        ));
      }
      setLoadingPostId(null);
    } else {
      // Like
      setLoadingPostId(postId);
      const response = await postService.likePost(postId);
      if (response.success) {
        setLikedPosts((prev) => new Set(prev).add(postId));
        // Update like count - always update even if 0
        const newLikeCount = response.likeCount ?? 0;
        setPosts(prev => prev.map(p => 
          p.id === postId ? { ...p, likesCount: newLikeCount } : p
        ));
      }
      setLoadingPostId(null);
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Posts & Photos</h2>
        <span className="text-sm text-gray-600">{userPosts.length + userPhotos.length} items</span>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 gap-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start gap-4">
                <img
                  src={user?.avatarUrl || "https://via.placeholder.com/48"}
                  alt={user?.fullName || "User"}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-bold text-gray-900">{user?.fullName || "Unknown User"}</h4>
                    <span className="text-sm text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4">{post.content}</p>
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <button 
                      onClick={() => handleLikePost(post.id)}
                      disabled={loadingPostId === post.id}
                      className={`flex items-center gap-1 transition ${
                        likedPosts.has(post.id) 
                          ? 'text-blue-600' 
                          : 'hover:text-blue-600'
                      } disabled:opacity-50`}
                    >
                      {loadingPostId === post.id ? (
                        <Loader size={16} className="animate-spin" />
                      ) : (
                        <ThumbsUp size={16} fill={likedPosts.has(post.id) ? "currentColor" : "none"} />
                      )}
                      <span>{post.likesCount}</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-blue-600 transition">
                      <MessageCircle size={16} />
                      <span>{post.commentsCount}</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-green-600 transition">
                      <Share2 size={16} />
                      <span>{post.sharesCount}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
            <ImageIcon size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">No posts yet</p>
          </div>
        )}
      </div>

      {/* Photos Grid */}
      {userPhotos.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <ImageIcon size={20} />
            Photos ({userPhotos.length})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {userPhotos.map((photo) => (
              <div key={photo.id} className="relative group rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all">
                <img
                  src={photo.imageUrl}
                  alt={photo.caption || "Photo"}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div className="text-white">
                    <p className="text-sm mb-2 line-clamp-2">{photo.caption}</p>
                    <div className="flex items-center gap-2 text-xs">
                      <ThumbsUp size={14} />
                      <span>{photo.likesCount}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
