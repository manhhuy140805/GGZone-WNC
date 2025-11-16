import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { 
  mockAchievements, 
  mockUserAchievements 
} from "../assets/mock/achievements";
import { mockGames } from "../assets/mock/games";
import { 
  mockPosts, 
  mockComments 
} from "../assets/mock/posts";
import { mockPhotos } from "../assets/mock/photos";
import { 
  getUserGroups, 
  getUserFriends,
  getUserPosts 
} from "../assets/mock/helpers";
import {
  ProfileHeader,
  ProfileTabs,
  ProfileTab,
  PostsTab,
  StatsTab,
  AboutTab,
  TeamsTab,
  GroupsTab,
  ForumsTab,
  VideoTab,
  AchievementsTab,
  NewsletterCTA,
} from "../components/profile";

export const Profile: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<ProfileTab>("achievements");

  // Get user data
  const userPosts = user ? getUserPosts(user.id) : [];
  const userPhotos = user ? mockPhotos.filter(p => p.userId === user.id) : [];
  const userGroups = user ? getUserGroups(user.id) : [];
  const userFriends = user ? getUserFriends(user.id) : [];
  
  // Get user achievements
  const userAchievementRecords = user 
    ? mockUserAchievements.filter(ua => ua.userId === user.id)
    : [];
  
  const earnedAchievementIds = userAchievementRecords
    .filter(ua => ua.completed)
    .map(ua => ua.achievementId);

  const earnedCount = mockAchievements.filter((a) =>
    earnedAchievementIds.includes(a.id)
  ).length;

  // Calculate total points
  const totalPoints = userAchievementRecords
    .filter(ua => ua.completed)
    .reduce((sum, ua) => {
      const achievement = mockAchievements.find(a => a.id === ua.achievementId);
      return sum + (achievement?.points || 0);
    }, 0);

  return (
    <div className="space-y-8 bg-gradient-to-b from-white via-gray-50 to-gray-100 min-h-screen pb-12">
      {/* Profile Header */}
      <ProfileHeader user={user} />

      {/* Tabs Navigation */}
      <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab Content */}
      {activeTab === "posts" && (
        <PostsTab user={user} userPosts={userPosts} userPhotos={userPhotos} />
      )}

      {activeTab === "stats" && (
        <StatsTab user={user} totalPoints={totalPoints} games={mockGames} />
      )}

      {activeTab === "about" && (
        <AboutTab 
          user={user} 
          userFriends={userFriends} 
          userGroups={userGroups}
          earnedCount={earnedCount}
        />
      )}

      {activeTab === "teams" && <TeamsTab />}

      {activeTab === "groups" && <GroupsTab userGroups={userGroups} />}

      {activeTab === "forums" && (
        <ForumsTab user={user} userPosts={userPosts} comments={mockComments} />
      )}

      {activeTab === "video" && <VideoTab userPosts={userPosts} />}

      {activeTab === "achievements" && (
        <AchievementsTab
          achievements={mockAchievements}
          games={mockGames}
          earnedAchievementIds={earnedAchievementIds}
          earnedCount={earnedCount}
          totalPoints={totalPoints}
          winningCount={user?.stats?.winningCount || 0}
          friendsCount={userFriends.length}
        />
      )}

      {/* Newsletter CTA */}
      <NewsletterCTA />
    </div>
  );
};
