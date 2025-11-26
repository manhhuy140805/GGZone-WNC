import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
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

  // TODO: Fetch data from API
  const userPosts: any[] = [];
  const userPhotos: any[] = [];
  const userGroups: any[] = [];
  const userFriends: any[] = [];
  const games: any[] = [];
  const comments: any[] = [];
  
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
        <StatsTab user={user} totalPoints={totalPoints} games={games} />
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
        <ForumsTab user={user} userPosts={userPosts} comments={comments} />
      )}

      {activeTab === "video" && <VideoTab userPosts={userPosts} />}

      {/* Newsletter CTA */}
      <NewsletterCTA />
    </div>
  );
};
