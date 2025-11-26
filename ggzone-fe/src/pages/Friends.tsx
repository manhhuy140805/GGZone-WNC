import React, { useState, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import {
  FriendsHeader,
  FriendsSearch,
  FriendsTabs,
  FriendsList,
  SuggestionsList,
} from "../components/friends";

interface User {
  id: string;
  fullName: string;
  username: string;
  avatarUrl?: string;
}

interface Friendship {
  userId: string;
  friendId: string;
  status: string;
}

interface FriendsProps {
  onNavigate?: (page: string, userId?: string) => void;
}

export const Friends: React.FC<FriendsProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<"friends" | "suggestions">("friends");
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth();

  const currentUserId = user?.id || "";

  // TODO: Fetch data from API
  const users: User[] = [];
  const friendships: Friendship[] = [];

  // Get friends list
  const friends = useMemo(() => {
    const friendIds = friendships
      .filter(
        (f) =>
          f.status === "accepted" &&
          (f.userId === currentUserId || f.friendId === currentUserId)
      )
      .map((f) => (f.userId === currentUserId ? f.friendId : f.userId));

    return users.filter((u) => friendIds.includes(u.id));
  }, [currentUserId, users, friendships]);

  // Get friend suggestions (users not yet friends)
  const suggestions = useMemo(() => {
    const friendIds = friends.map((f) => f.id);
    return users.filter(
      (u) => u.id !== currentUserId && !friendIds.includes(u.id)
    );
  }, [currentUserId, friends, users]);

  // Filter based on search
  const filteredFriends = useMemo(() => {
    return friends.filter(
      (u) =>
        u.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [friends, searchTerm]);

  const filteredSuggestions = useMemo(() => {
    return suggestions.filter(
      (u) =>
        u.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [suggestions, searchTerm]);

  const handleMessageClick = (userId: string) => {
    onNavigate?.("MESSAGES", userId);
  };

  const handleNavigateToMessages = () => {
    onNavigate?.("MESSAGES");
  };

  return (
    <div className="space-y-8">
      <FriendsHeader />

      <FriendsSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <FriendsTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        friendsCount={friends.length}
        suggestionsCount={suggestions.length}
      />

      {activeTab === "friends" ? (
        <FriendsList
          friends={filteredFriends}
          onMessageClick={handleMessageClick}
          onNavigateToMessages={handleNavigateToMessages}
        />
      ) : (
        <SuggestionsList suggestions={filteredSuggestions} />
      )}
    </div>
  );
};
