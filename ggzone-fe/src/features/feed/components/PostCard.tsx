import React from "react";
import { ThumbsUp, Check, Link as LinkIcon } from "lucide-react";
import { Post } from "@/services/api/postService";
import { getTimeAgo } from "@/lib/utils/timeUtils";

interface PostCardProps {
  post: Post;
  isLiked: boolean;
  isCopied: boolean;
  onLike: (postId: string) => void;
  onShare: (postId: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  isLiked,
  isCopied,
  onLike,
  onShare,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      {/* Post Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={post.author?.avatarUrl || "https://via.placeholder.com/48"}
            alt={post.author?.username}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-bold text-gray-900">
              {post.author?.username}
            </h3>
            <p className="text-xs text-gray-500">{getTimeAgo(post.createdAt)}</p>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-4">
        <p className="text-gray-800 leading-relaxed">{post.content}</p>
      </div>

      {/* Media */}
      {post.media && post.media.length > 0 && (
        <div className="space-y-2 px-4 pb-4">
          {post.media.map((media) => (
            <div key={media.id}>
              {media.mediaType?.startsWith("video") ? (
                <video
                  src={media.mediaUrl}
                  controls
                  className="w-full rounded-lg max-h-96 object-cover"
                />
              ) : (
                <img
                  src={media.mediaUrl}
                  alt="Post media"
                  className="w-full rounded-lg max-h-96 object-cover"
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Post Actions */}
      <div className="px-4 py-3 border-t border-gray-200">
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <span>{post.likesCount} likes</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onLike(post.id)}
            className="flex-1 flex items-center justify-center gap-2 py-2 px-4 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <ThumbsUp
              size={18}
              className={
                isLiked ? "text-blue-600 fill-blue-600" : "text-gray-600"
              }
            />
            <span className="font-semibold text-gray-700">
              {isLiked ? "Liked" : "Like"}
            </span>
          </button>
          <button
            onClick={() => onShare(post.id)}
            className="flex-1 flex items-center justify-center gap-2 py-2 px-4 hover:bg-gray-50 rounded-lg transition-colors relative"
          >
            {isCopied ? (
              <>
                <Check size={18} className="text-green-500" />
                <span className="font-semibold text-green-600">Copied!</span>
              </>
            ) : (
              <>
                <LinkIcon size={18} className="text-blue-500" />
                <span className="font-semibold text-gray-700">Copy Link</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
