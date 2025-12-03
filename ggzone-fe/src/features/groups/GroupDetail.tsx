import React, { useState, useEffect } from "react";
import { ArrowLeft, Users, Calendar, Globe, Lock, MessageCircle, UserPlus, UserMinus, Loader, Heart, MessageSquare, Share2 } from "lucide-react";
import { groupService } from "@/services/api/groupService";
import { useAuth } from "@/app/providers/AuthContext";

interface GroupDetailProps {
  groupId: string;
  onBack: () => void;
  onOpenChat?: (groupId: string) => void;
}

export const GroupDetail: React.FC<GroupDetailProps> = ({ groupId, onBack, onOpenChat }) => {
  const { user } = useAuth();
  const [group, setGroup] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isJoined, setIsJoined] = useState(false);
  const [activeTab, setActiveTab] = useState<'posts' | 'members'>('posts');

  useEffect(() => {
    loadGroupDetail();
    loadGroupPosts();
  }, [groupId]);

  const loadGroupDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await groupService.getGroupById(groupId);
      
      if (response.success && response.data) {
        setGroup(response.data);
        // Check if current user is a member
        if (user && response.data.members) {
          const isMember = response.data.members.some((m: any) => m.user?.id === user.id);
          setIsJoined(isMember);
        }
      } else {
        setError(response.message || 'Không thể tải thông tin group');
      }
    } catch (err) {
      setError('Lỗi khi tải dữ liệu');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadGroupPosts = async () => {
    try {
      const response = await groupService.getGroupPosts(groupId, 1, 20);
      
      if (response.success && response.data) {
        setPosts(response.data);
      }
    } catch (err) {
      console.error('Error loading group posts:', err);
    }
  };

  const handleJoinLeave = async () => {
    if (!user) {
      alert('Vui lòng đăng nhập');
      return;
    }

    try {
      if (isJoined) {
        const response = await groupService.leaveGroup(groupId);
        if (response.success) {
          setIsJoined(false);
          if (group) {
            setGroup({ ...group, membersCount: group.membersCount - 1 });
          }
          await loadGroupDetail(); // Reload to update members list
        } else {
          alert(response.message || 'Không thể rời khỏi group');
        }
      } else {
        const response = await groupService.joinGroup(groupId);
        if (response.success) {
          setIsJoined(true);
          if (group) {
            setGroup({ ...group, membersCount: group.membersCount + 1 });
          }
          await loadGroupDetail(); // Reload to update members list
        } else {
          alert(response.message || 'Không thể tham gia group');
        }
      }
    } catch (err) {
      console.error('Error joining/leaving group:', err);
      alert('Có lỗi xảy ra');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <Loader className="animate-spin text-orange-600" size={40} />
      </div>
    );
  }

  if (error || !group) {
    return (
      <div className="space-y-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-orange-600 font-semibold transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Groups
        </button>
        <div className="text-center py-16 bg-red-50 rounded-lg">
          <p className="text-red-500 font-medium">{error || 'Group không tồn tại'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-orange-600 font-semibold transition-colors"
      >
        <ArrowLeft size={20} />
        Back to Groups
      </button>

      {/* Hero Section */}
      <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
        <img
          src={group.coverImageUrl || 'https://images.unsplash.com/photo-1542751371-adc38448a05e'}
          alt={group.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="flex items-center gap-4 mb-4">
            {group.iconUrl && (
              <img
                src={group.iconUrl}
                alt={group.name}
                className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
              />
            )}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-orange-600 text-white rounded-full text-sm font-bold flex items-center gap-1">
                  {group.visibility === 'public' ? <Globe size={14} /> : <Lock size={14} />}
                  {group.visibility === 'public' ? 'Public' : 'Private'}
                </span>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">{group.name}</h1>
              <p className="text-gray-200">{group.membersCount} members</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleJoinLeave}
          className={`flex-1 py-3 px-6 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
            isJoined
              ? 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              : 'bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white shadow-lg'
          }`}
        >
          {isJoined ? (
            <>
              <UserMinus size={20} />
              Leave Group
            </>
          ) : (
            <>
              <UserPlus size={20} />
              Join Group
            </>
          )}
        </button>
        {isJoined && onOpenChat && (
          <button
            onClick={() => onOpenChat(groupId)}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-colors flex items-center gap-2"
          >
            <MessageCircle size={20} />
            Chat
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab('posts')}
            className={`pb-3 px-2 font-semibold transition-colors border-b-2 ${
              activeTab === 'posts'
                ? 'text-orange-600 border-orange-600'
                : 'text-gray-600 border-transparent hover:text-gray-900'
            }`}
          >
            Posts
          </button>
          <button
            onClick={() => setActiveTab('members')}
            className={`pb-3 px-2 font-semibold transition-colors border-b-2 ${
              activeTab === 'members'
                ? 'text-orange-600 border-orange-600'
                : 'text-gray-600 border-transparent hover:text-gray-900'
            }`}
          >
            Members ({group.membersCount})
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {activeTab === 'posts' ? (
            <>
              {/* About Section */}
              {group.description && (
                <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                  <h2 className="text-xl font-bold text-gray-900 mb-3">About</h2>
                  <p className="text-gray-700">{group.description}</p>
                </div>
              )}

              {/* Posts */}
              <div className="space-y-4">
                {posts.length > 0 ? (
                  posts.map((post) => (
                    <div key={post.id} className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      {/* Post Header */}
                      <div className="flex items-center gap-3 mb-4">
                        <img
                          src={post.user?.avatarUrl || 'https://i.pravatar.cc/150'}
                          alt={post.user?.username}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{post.user?.username}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(post.createdAt).toLocaleDateString('vi-VN')}
                          </p>
                        </div>
                      </div>

                      {/* Post Content */}
                      <p className="text-gray-700 mb-4 whitespace-pre-wrap">{post.content}</p>

                      {/* Post Media */}
                      {post.media && post.media.length > 0 && (
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          {post.media.map((media: any) => (
                            <img
                              key={media.id}
                              src={media.mediaUrl}
                              alt="Post media"
                              className="w-full h-48 object-cover rounded-lg"
                            />
                          ))}
                        </div>
                      )}

                      {/* Post Actions */}
                      <div className="flex items-center gap-6 pt-4 border-t border-gray-200">
                        <button className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors">
                          <Heart size={18} />
                          <span className="text-sm font-medium">{post.likesCount || 0}</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                          <MessageSquare size={18} />
                          <span className="text-sm font-medium">{post.commentsCount || 0}</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors">
                          <Share2 size={18} />
                          <span className="text-sm font-medium">{post.sharesCount || 0}</span>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Chưa có bài viết nào</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Members List */
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Members</h2>
              <div className="space-y-3">
                {group.members && group.members.length > 0 ? (
                  group.members.map((member: any) => (
                    <div key={member.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <img
                        src={member.user?.avatarUrl || 'https://i.pravatar.cc/150'}
                        alt={member.user?.username}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{member.user?.username}</p>
                        <p className="text-sm text-gray-500 capitalize">{member.role}</p>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(member.joinedAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">Chưa có thành viên</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Group Info */}
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Group Info</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Users size={20} className="text-orange-600" />
                <div>
                  <p className="text-sm text-gray-600">Members</p>
                  <p className="font-semibold text-gray-900">{group.membersCount}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar size={20} className="text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Created</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(group.createdAt).toLocaleDateString('vi-VN')}
                  </p>
                </div>
              </div>

              {group.visibility && (
                <div className="flex items-center gap-3">
                  {group.visibility === 'public' ? <Globe size={20} className="text-green-600" /> : <Lock size={20} className="text-red-600" />}
                  <div>
                    <p className="text-sm text-gray-600">Visibility</p>
                    <p className="font-semibold text-gray-900 capitalize">{group.visibility}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Creator Info */}
          {group.creator && (
            <div className="bg-gradient-to-br from-orange-50 to-purple-50 rounded-lg p-6 border border-orange-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Created By</h3>
              <div className="flex items-center gap-3">
                <img
                  src={group.creator.avatarUrl || 'https://i.pravatar.cc/150'}
                  alt={group.creator.username}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold text-gray-900">{group.creator.username}</p>
                  <p className="text-sm text-gray-600">Admin</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
