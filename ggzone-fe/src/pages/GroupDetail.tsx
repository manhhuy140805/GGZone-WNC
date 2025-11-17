import React, { useState } from "react";
import { mockGroups } from "../assets/mock/groups";
import { mockUsers } from "../assets/mock/users";
import { mockGroupMembers } from "../assets/mock/groupMembers";
import { mockPosts } from "../assets/mock/posts";
import {
  ArrowLeft,
  Users,
  MessageCircle,
  Settings,
  UserPlus,
  Image as ImageIcon,
  FileText,
  Calendar,
  Crown,
  Shield,
  Star,
  Send,
  Smile,
} from "lucide-react";

interface GroupDetailProps {
  groupId: string;
  onBack: () => void;
  onOpenChat?: (groupId: string) => void;
}

export const GroupDetail: React.FC<GroupDetailProps> = ({ groupId, onBack, onOpenChat }) => {
  const [activeTab, setActiveTab] = useState<"posts" | "members" | "about">("posts");
  const [newPost, setNewPost] = useState("");
  const [isMember, setIsMember] = useState(true);

  const group = mockGroups.find((g) => g.id === groupId);
  const members = mockGroupMembers.filter((m) => m.groupId === groupId);
  const groupPosts = mockPosts.filter((p) => p.groupId === groupId);

  if (!group) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Group Not Found</h2>
        <button onClick={onBack} className="px-6 py-3 bg-orange-600 text-white font-bold rounded-lg">
          Back to Groups
        </button>
      </div>
    );
  }

  const handleJoinGroup = () => {
    setIsMember(true);
    alert("Joined group successfully!");
  };

  const handleLeaveGroup = () => {
    setIsMember(false);
    alert("Left group successfully!");
  };

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      alert(`Posted: ${newPost}`);
      setNewPost("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-orange-600 font-semibold">
        <ArrowLeft size={20} />
        Back to Groups
      </button>

      {/* Cover Image */}
      <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
        <img src={group.coverImageUrl} alt={group.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-end justify-between">
            <div className="flex items-center gap-4">
              {group.iconUrl && (
                <img src={group.iconUrl} alt={group.name} className="w-20 h-20 rounded-xl border-4 border-white shadow-lg" />
              )}
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">{group.name}</h1>
                <div className="flex items-center gap-3 text-white/90 text-sm">
                  <span className="flex items-center gap-1">
                    <Users size={16} />
                    {group.membersCount} members
                  </span>
                  <span>•</span>
                  <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded">
                    {group.visibility}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {isMember ? (
                <>
                  <button
                    onClick={() => onOpenChat?.(groupId)}
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg flex items-center gap-2"
                  >
                    <MessageCircle size={20} />
                    Group Chat
                  </button>
                  <button
                    onClick={handleLeaveGroup}
                    className="px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-bold rounded-lg border border-white/40"
                  >
                    Leave Group
                  </button>
                </>
              ) : (
                <button
                  onClick={handleJoinGroup}
                  className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg flex items-center gap-2"
                >
                  <UserPlus size={20} />
                  Join Group
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center">
          <Users size={32} className="text-blue-600 mx-auto mb-2" />
          <p className="text-3xl font-bold text-gray-900">{group.membersCount}</p>
          <p className="text-sm text-gray-600">Members</p>
        </div>
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center">
          <FileText size={32} className="text-green-600 mx-auto mb-2" />
          <p className="text-3xl font-bold text-gray-900">{group.posts}</p>
          <p className="text-sm text-gray-600">Posts</p>
        </div>
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center">
          <Calendar size={32} className="text-purple-600 mx-auto mb-2" />
          <p className="text-3xl font-bold text-gray-900">
            {new Date(group.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
          </p>
          <p className="text-sm text-gray-600">Created</p>
        </div>
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center">
          <Star size={32} className="text-yellow-600 mx-auto mb-2" />
          <p className="text-3xl font-bold text-gray-900">4.8</p>
          <p className="text-sm text-gray-600">Rating</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("posts")}
            className={`flex-1 py-4 px-6 font-semibold transition-all ${
              activeTab === "posts" ? "bg-orange-50 text-orange-600 border-b-2 border-orange-600" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Posts
          </button>
          <button
            onClick={() => setActiveTab("members")}
            className={`flex-1 py-4 px-6 font-semibold transition-all ${
              activeTab === "members" ? "bg-orange-50 text-orange-600 border-b-2 border-orange-600" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Members
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className={`flex-1 py-4 px-6 font-semibold transition-all ${
              activeTab === "about" ? "bg-orange-50 text-orange-600 border-b-2 border-orange-600" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            About
          </button>
        </div>

        <div className="p-6">
          {activeTab === "posts" && (
            <div className="space-y-6">
              {isMember && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="Share something with the group..."
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 resize-none"
                    rows={3}
                  />
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-gray-200 rounded-lg"><ImageIcon size={20} className="text-gray-600" /></button>
                      <button className="p-2 hover:bg-gray-200 rounded-lg"><Smile size={20} className="text-gray-600" /></button>
                    </div>
                    <button onClick={handlePostSubmit} className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg flex items-center gap-2">
                      <Send size={18} />
                      Post
                    </button>
                  </div>
                </div>
              )}
              {groupPosts.map((post) => {
                const author = mockUsers.find((u) => u.id === post.userId);
                return (
                  <div key={post.id} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <img src={author?.avatarUrl} alt={author?.username} className="w-12 h-12 rounded-full" />
                      <div>
                        <h4 className="font-bold text-gray-900">{author?.username}</h4>
                        <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                    <p className="text-gray-800 mb-4">{post.content}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{post.likesCount} likes</span>
                      <span>{post.commentsCount} comments</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === "members" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {members.map((member) => {
                const user = mockUsers.find((u) => u.id === member.userId);
                if (!user) return null;
                return (
                  <div key={member.id} className="bg-gray-50 rounded-lg p-4 flex items-center gap-3">
                    <img src={user.avatarUrl} alt={user.username} className="w-12 h-12 rounded-full" />
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900">{user.username}</h4>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        {member.role === "admin" && <Crown size={14} className="text-yellow-500" />}
                        {member.role === "moderator" && <Shield size={14} className="text-blue-500" />}
                        {member.role}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === "about" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">{group.description}</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Group Rules</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Be respectful to all members</li>
                  <li>• No spam or self-promotion</li>
                  <li>• Stay on topic</li>
                  <li>• Follow community guidelines</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
