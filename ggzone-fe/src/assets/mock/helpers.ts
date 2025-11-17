/**
 * Helper functions for working with mock data
 */

import { mockUsers } from "./users";
import { mockFriendships } from "./friendships";
import { mockPosts } from "./posts";
import { mockGroups } from "./groups";
import { mockGroupMembers } from "./groupMembers";
import { mockUserAchievements } from "./achievements";
import { mockTournamentParticipants } from "./tournaments";
import { mockMessages } from "./messages";
import { mockNotifications } from "./notifications";

/**
 * Get user by ID
 */
export const getUserById = (userId: string) => {
  return mockUsers.find((u) => u.id === userId);
};

/**
 * Get user's friends (accepted friendships only)
 */
export const getUserFriends = (userId: string) => {
  const friendships = mockFriendships.filter(
    (f) =>
      (f.userId === userId || f.friendId === userId) && f.status === "accepted"
  );

  return friendships.map((f) => {
    const friendId = f.userId === userId ? f.friendId : f.userId;
    return getUserById(friendId);
  });
};

/**
 * Get pending friend requests for a user
 */
export const getPendingFriendRequests = (userId: string) => {
  return mockFriendships.filter(
    (f) => f.friendId === userId && f.status === "pending"
  );
};

/**
 * Get user's posts
 */
export const getUserPosts = (userId: string) => {
  return mockPosts.filter((p) => p.userId === userId);
};

/**
 * Get posts for a group
 */
export const getGroupPosts = (groupId: string) => {
  return mockPosts.filter((p) => p.groupId === groupId);
};

/**
 * Get user's groups
 */
export const getUserGroups = (userId: string) => {
  const memberships = mockGroupMembers.filter((gm) => gm.userId === userId);
  return memberships.map((m) => mockGroups.find((g) => g.id === m.groupId));
};

/**
 * Get group members
 */
export const getGroupMembers = (groupId: string) => {
  const memberships = mockGroupMembers.filter((gm) => gm.groupId === groupId);
  return memberships.map((m) => ({
    ...getUserById(m.userId),
    role: m.role,
    joinedAt: m.joinedAt,
  }));
};

/**
 * Get user's achievements with progress
 */
export const getUserAchievementsWithDetails = (userId: string) => {
  return mockUserAchievements
    .filter((ua) => ua.userId === userId)
    .map((ua) => {
      const achievement = mockUserAchievements.find(
        (a) => a.achievementId === ua.achievementId
      );
      return {
        ...achievement,
        progress: ua.progress,
        completed: ua.completed,
        completedAt: ua.completedAt,
      };
    });
};

/**
 * Get user's tournament participations
 */
export const getUserTournaments = (userId: string) => {
  return mockTournamentParticipants.filter((tp) => tp.userId === userId);
};

/**
 * Get unread messages count for user
 */
export const getUnreadMessagesCount = (userId: string) => {
  return mockMessages.filter((m) => m.receiverId === userId && !m.isRead)
    .length;
};

/**
 * Get unread notifications count for user
 */
export const getUnreadNotificationsCount = (userId: string) => {
  return mockNotifications.filter((n) => n.userId === userId && !n.isRead)
    .length;
};

/**
 * Check if two users are friends
 */
export const areFriends = (userId1: string, userId2: string) => {
  return mockFriendships.some(
    (f) =>
      ((f.userId === userId1 && f.friendId === userId2) ||
        (f.userId === userId2 && f.friendId === userId1)) &&
      f.status === "accepted"
  );
};

/**
 * Get user's feed (posts from friends and own posts)
 */
export const getUserFeed = (userId: string) => {
  const friends = getUserFriends(userId);
  const friendIds = friends.map((f) => f?.id).filter(Boolean);

  return mockPosts
    .filter((p) => p.userId === userId || friendIds.includes(p.userId))
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
};

/**
 * Search users by username or full name
 */
export const searchUsers = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return mockUsers.filter(
    (u) =>
      u.username.toLowerCase().includes(lowerQuery) ||
      u.fullName.toLowerCase().includes(lowerQuery)
  );
};

/**
 * Get online users
 */
export const getOnlineUsers = () => {
  return mockUsers.filter((u) => u.status === "online" || u.status === "in-game");
};

/**
 * Get user statistics summary
 */
export const getUserStatsSummary = (userId: string) => {
  const user = getUserById(userId);
  const friends = getUserFriends(userId);
  const posts = getUserPosts(userId);
  const groups = getUserGroups(userId);
  const achievements = getUserAchievementsWithDetails(userId);
  const tournaments = getUserTournaments(userId);

  return {
    user,
    friendsCount: friends.length,
    postsCount: posts.length,
    groupsCount: groups.length,
    achievementsCount: achievements.filter((a) => a.completed).length,
    tournamentsCount: tournaments.length,
  };
};

/**
 * Get user's conversations
 */
export const getUserConversations = (userId: string) => {
  const { mockConversations } = require("./messages");
  return mockConversations.filter((conv: any) =>
    conv.participants.includes(userId)
  );
};

/**
 * Get conversation between two users
 */
export const getConversationBetweenUsers = (userId1: string, userId2: string) => {
  const { mockConversations } = require("./messages");
  return mockConversations.find(
    (conv: any) =>
      conv.participants.includes(userId1) && conv.participants.includes(userId2)
  );
};

/**
 * Get messages for a conversation
 */
export const getConversationMessages = (conversationId: string) => {
  return mockMessages.filter((m) => m.conversationId === conversationId);
};
