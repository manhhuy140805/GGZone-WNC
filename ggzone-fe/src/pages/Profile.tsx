import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
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
  NewsletterCTA,
} from "../components/profile";

export const Profile: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<ProfileTab>("posts");

  // Get user data
  const userPosts = user ? getUserPosts(user.id) : [];
  const userPhotos = user ? mockPhotos.filter(p => p.userId === user.id) : [];
  const userGroups = user ? getUserGroups(user.id) : [];
  const userFriends = user ? getUserFriends(user.id) : [];
  
  // Removed achievements feature
  const earnedCount = 0;
  const totalPoints = 0;

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

      {/* Newsletter CTA */}
      <NewsletterCTA />
    </div>
  );
};
