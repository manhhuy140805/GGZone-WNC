import React, { useState, useEffect } from "react";
import { useAuth } from "@/app/providers/AuthContext";
import { Search, Send, MessageCircle, ArrowLeft } from "lucide-react";

interface User {
  id: string;
  fullName: string;
  username: string;
  avatarUrl?: string;
}

interface Conversation {
  id: string;
  participants: string[];
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  createdAt: string;
}

interface MessagesProps {
  selectedUserId?: string;
}

export const Messages: React.FC<MessagesProps> = ({ selectedUserId }) => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(
    null
  );
  const [messageText, setMessageText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth();

  const currentUserId = user?.id || "";

  // TODO: Fetch data from API
  const users: User[] = [];
  const conversations: Conversation[] = [];
  const messages: Message[] = [];

  // Auto-select conversation when coming from Friends page
  useEffect(() => {
    if (selectedUserId) {
      const conv = conversations.find((c) =>
        c.participants.includes(selectedUserId)
      );
      if (conv) {
        setSelectedConversation(conv.id);
      }
    }
  }, [selectedUserId, conversations]);

  // Filter conversations
  const filteredConversations = conversations.filter((conv) => {
    const otherUserId = conv.participants.find((id) => id !== currentUserId);
    const otherUser = users.find((u) => u.id === otherUserId);
    return (
      otherUser &&
      (otherUser.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        otherUser.username.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const selectedConv = conversations.find(
    (c) => c.id === selectedConversation
  );
  const conversationMessages = messages.filter(
    (m) => m.conversationId === selectedConversation
  );

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // In real app, send message to backend
      console.log("Sending message:", messageText);
      setMessageText("");
    }
  };

  return (
    <div className="h-[calc(100vh-120px)]">
      {/* Hero Banner */}
      <div className="relative h-32 rounded-xl overflow-hidden shadow-lg mb-6">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://wallpapercat.com/w/full/4/d/7/1868806-3840x2160-desktop-4k-valorant-wallpaper-image.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-center px-8">
          <div className="flex items-center gap-3">
            <MessageCircle size={28} className="text-purple-500" />
            <h1 className="text-3xl font-bold text-white">Messages</h1>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden h-[calc(100%-160px)]">
        <div className="flex h-full">
          {/* Conversations List */}
          <div className="w-80 border-r border-gray-200 flex flex-col">
            {/* Search */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((conv) => {
                const otherUserId = conv.participants.find(
                  (id) => id !== currentUserId
                );
                const otherUser = users.find((u) => u.id === otherUserId);

                if (!otherUser) return null;

                return (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv.id)}
                    className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors border-b border-gray-100 ${
                      selectedConversation === conv.id ? "bg-purple-50" : ""
                    }`}
                  >
                    {/* Avatar */}
                    {otherUser.avatarUrl ? (
                      <img
                        src={otherUser.avatarUrl}
                        alt={otherUser.fullName}
                        className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                        {otherUser.fullName.charAt(0)}
                      </div>
                    )}

                    {/* Info */}
                    <div className="flex-1 text-left min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-gray-900 truncate">
                          {otherUser.fullName}
                        </h4>
                        {conv.unreadCount > 0 && (
                          <span className="bg-purple-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                            {conv.unreadCount}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 truncate">
                        {conv.lastMessage}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(conv.lastMessageTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedConv ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 flex items-center gap-3">
                  <button
                    onClick={() => setSelectedConversation(null)}
                    className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  {(() => {
                    const otherUserId = selectedConv.participants.find(
                      (id) => id !== currentUserId
                    );
                    const otherUser = users.find((u) => u.id === otherUserId);
                    return (
                      <>
                        {otherUser?.avatarUrl ? (
                          <img
                            src={otherUser.avatarUrl}
                            alt={otherUser.fullName}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold">
                            {otherUser?.fullName.charAt(0)}
                          </div>
                        )}
                        <div>
                          <h3 className="font-bold text-gray-900">
                            {otherUser?.fullName}
                          </h3>
                          <p className="text-sm text-green-600">Online</p>
                        </div>
                      </>
                    );
                  })()}
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                  {conversationMessages.map((msg) => {
                    const isOwn = msg.senderId === currentUserId;
                    const sender = users.find((u) => u.id === msg.senderId);

                    return (
                      <div
                        key={msg.id}
                        className={`flex gap-2 ${isOwn ? "justify-end" : "justify-start"}`}
                      >
                        {/* Avatar for other user */}
                        {!isOwn && sender && (
                          sender.avatarUrl ? (
                            <img
                              src={sender.avatarUrl}
                              alt={sender.fullName}
                              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                              {sender.fullName.charAt(0)}
                            </div>
                          )
                        )}

                        <div className={`max-w-md`}>
                          <div
                            className={`px-4 py-2 rounded-2xl ${
                              isOwn
                                ? "bg-purple-600 text-white"
                                : "bg-white text-gray-900 border border-gray-200"
                            }`}
                          >
                            <p>{msg.content}</p>
                          </div>
                          <p
                            className={`text-xs text-gray-500 mt-1 ${
                              isOwn ? "text-right" : "text-left"
                            }`}
                          >
                            {new Date(msg.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>

                        {/* Avatar for own messages */}
                        {isOwn && (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                            A
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200 bg-white">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Send size={18} />
                      Send
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <MessageCircle size={64} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Select a conversation
                  </h3>
                  <p className="text-gray-600">
                    Choose a conversation from the list to start messaging
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
