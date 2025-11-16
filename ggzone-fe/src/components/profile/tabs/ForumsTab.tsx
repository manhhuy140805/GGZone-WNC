import React from "react";
import { MessageCircle, Heart, Star } from "lucide-react";
import { Post, Comment } from "../../../assets/mock/posts";
import { User } from "../../../assets/mock/users";

interface ForumsTabProps {
  user: User | null;
  userPosts: Post[];
  comments: Comment[];
}

export const ForumsTab: React.FC<ForumsTabProps> = ({ user, userPosts, comments }) => {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Forum Activity</h2>
      </div>

      {/* Forum Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <MessageCircle size={24} className="text-blue-600 mb-2" />
          <p className="text-2xl font-bold text-gray-900">{userPosts.length}</p>
          <p className="text-sm text-gray-600">Posts Created</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <Heart size={24} className="text-red-600 mb-2" />
          <p className="text-2xl font-bold text-gray-900">
            {userPosts.reduce((sum, p) => sum + p.likesCount, 0)}
          </p>
          <p className="text-sm text-gray-600">Likes Received</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <Star size={24} className="text-yellow-600 mb-2" />
          <p className="text-2xl font-bold text-gray-900">
            {comments.filter(c => c.userId === user?.id).length}
          </p>
          <p className="text-sm text-gray-600">Comments Made</p>
        </div>
      </div>

      {/* Recent Forum Posts */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Forum Posts</h3>
        {userPosts.length > 0 ? (
          <div className="space-y-3">
            {userPosts.slice(0, 5).map((post) => (
              <div key={post.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <p className="text-sm text-gray-900 mb-2 line-clamp-2">{post.content}</p>
                <div className="flex items-center gap-4 text-xs text-gray-600">
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1">
                    <Heart size={12} />
                    {post.likesCount}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle size={12} />
                    {post.commentsCount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-8">No forum posts yet</p>
        )}
      </div>
    </section>
  );
};
