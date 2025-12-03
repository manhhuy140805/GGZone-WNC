import React, { useState, useEffect } from "react";
import { Search, Trash2, Eye, Loader, Ban, CheckCircle, Image, Video } from "lucide-react";
import { adminService } from "@/services/api/adminService";
import { ConfirmDialog } from "@/components/Dialog";

interface Post {
  id: string;
  content: string;
  createdAt: string;
  likesCount: number;
  commentsCount: number;
  author: {
    id: string;
    username: string;
    avatarUrl?: string;
  };
  media: Array<{
    id: string;
    mediaUrl: string;
    mediaType: string;
  }>;
  groupId?: string;
}

interface Toast {
  message: string;
  type: 'success' | 'error';
}

export const Posts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(20);
  const [toast, setToast] = useState<Toast | null>(null);
  const [sortBy, setSortBy] = useState<string>("latest");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    loadPosts();
  }, [currentPage, searchTerm, sortBy]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const response = await adminService.getPosts(
        searchTerm || undefined,
        currentPage,
        pageSize,
        sortBy
      );

      if (response.success && response.data) {
        setPosts(response.data.posts);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.error('Error loading posts:', error);
      showToast('Failed to load posts', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleDeleteClick = (postId: string) => {
    setPostToDelete(postId);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (!postToDelete) return;

    try {
      const response = await adminService.deletePost(postToDelete);

      if (response.success) {
        showToast('Post deleted successfully', 'success');
        setShowDeleteDialog(false);
        setPostToDelete(null);
        await loadPosts();
      } else {
        showToast(response.message || 'Failed to delete post', 'error');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      showToast('An error occurred while deleting post', 'error');
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteDialog(false);
    setPostToDelete(null);
  };

  const handleViewPost = (post: Post) => {
    setSelectedPost(post);
    setShowDetailModal(true);
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Posts Management</h1>
          <p className="text-gray-600 mt-1">Manage all posts in the system</p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search posts by content..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 bg-white"
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="trending">Trending</option>
          </select>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <Loader className="animate-spin text-orange-600" size={40} />
        </div>
      )}

      {/* Posts Table */}
      {!loading && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {posts.length > 0 ? (
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Author</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Content</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Media</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stats</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                          {post.author.avatarUrl ? (
                            <img src={post.author.avatarUrl} alt="" className="w-full h-full rounded-full object-cover" />
                          ) : (
                            <span className="text-orange-600 font-semibold">
                              {post.author.username[0].toUpperCase()}
                            </span>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{post.author.username}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-600 max-w-md">{truncateText(post.content, 100)}</p>
                    </td>
                    <td className="px-6 py-4">
                      {post.media.length > 0 && (
                        <div className="flex items-center gap-2">
                          {post.media[0].mediaType === 'image' ? (
                            <Image size={16} className="text-blue-600" />
                          ) : (
                            <Video size={16} className="text-purple-600" />
                          )}
                          <span className="text-sm text-gray-600">{post.media.length}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 text-sm">
                        <span className="text-gray-600">❤️ {post.likesCount}</span>
                        <span className="text-gray-600">💬 {post.commentsCount}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      {new Date(post.createdAt).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleViewPost(post)}
                          className="p-2 hover:bg-blue-50 rounded-lg transition"
                          title="View details"
                        >
                          <Eye size={16} className="text-blue-600" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(post.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition"
                          title="Delete post"
                        >
                          <Trash2 size={16} className="text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No posts found</p>
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {!loading && posts.length > 0 && (
        <div className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-slide-up ${
          toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {toast.type === 'success' ? (
            <CheckCircle size={20} />
          ) : (
            <Ban size={20} />
          )}
          <span className="font-medium">{toast.message}</span>
        </div>
      )}

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        title="Delete Post"
        message="Are you sure you want to delete this post? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />

      {/* Post Detail Modal */}
      {showDetailModal && selectedPost && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Post Details</h2>

            <div className="space-y-4">
              {/* Author */}
              <div className="flex items-center gap-3 pb-4 border-b">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  {selectedPost.author.avatarUrl ? (
                    <img src={selectedPost.author.avatarUrl} alt="" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <span className="text-orange-600 font-semibold text-lg">
                      {selectedPost.author.username[0].toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{selectedPost.author.username}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(selectedPost.createdAt).toLocaleString('vi-VN')}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Content</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{selectedPost.content}</p>
              </div>

              {/* Media */}
              {selectedPost.media.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Media ({selectedPost.media.length})</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedPost.media.map((media) => (
                      <div key={media.id} className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                        {media.mediaType === 'image' ? (
                          <img src={media.mediaUrl} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <video src={media.mediaUrl} controls className="w-full h-full" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Stats */}
              <div className="flex gap-6 pt-4 border-t">
                <div>
                  <p className="text-sm text-gray-500">Likes</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedPost.likesCount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Comments</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedPost.commentsCount}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowDetailModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  handleDeleteClick(selectedPost.id);
                }}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Delete Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
