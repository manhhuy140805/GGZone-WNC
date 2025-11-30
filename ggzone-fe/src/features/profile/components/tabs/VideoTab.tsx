import React from "react";
import { Video, Heart, MessageCircle } from "lucide-react";
import { Post } from "@/types";

interface VideoTabProps {
  userPosts: Post[];
}

export const VideoTab: React.FC<VideoTabProps> = ({ userPosts }) => {
  const videoPosts = userPosts.filter(p => p.postType === 'video');

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Videos & Streams</h2>
      </div>

      {/* Video Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {videoPosts.length > 0 ? (
          videoPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all">
              <div className="relative h-48 bg-gray-900 flex items-center justify-center">
                <Video size={48} className="text-white opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-medium line-clamp-2">{post.content}</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Heart size={14} />
                      {post.likesCount}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle size={14} />
                      {post.commentsCount}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 bg-white rounded-xl p-12 border border-gray-200 text-center">
            <Video size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-2">No videos yet</p>
            <p className="text-sm text-gray-500">Share your gaming highlights and streams</p>
          </div>
        )}
      </div>
    </section>
  );
};
