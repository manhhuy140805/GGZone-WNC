import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { userService } from "../services/userService";
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
import { EditProfileModal } from "../components/profile/EditProfileModal";
import { User } from "../types";

export const Profile: React.FC = () => {
  const { user, setUser } = useAuth();
  const [activeTab, setActiveTab] = useState<ProfileTab>("posts");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(user || null);

  // Load user data from API on mount
  useEffect(() => {
    const loadUserData = async () => {
      const response = await userService.getCurrentUser();
      if (response.success && response.data) {
        setCurrentUser(response.data);
        if (setUser) {
          setUser(response.data);
        }
      }
    };

    if (user) {
      loadUserData();
    }
  }, [user, setUser]);

  // TODO: Fetch data from API
  const userPosts: any[] = [];
  const userPhotos: any[] = [];
  const userGroups: any[] = [];
  const userFriends: any[] = [];
  const games: any[] = [];
  const comments: any[] = [];
  
  const earnedCount = 0;
  const totalPoints = 0;

  const handleEditSuccess = (updatedUser: User) => {
    setCurrentUser(updatedUser);
    if (setUser) {
      setUser(updatedUser);
    }
  };

  return (
    <div className="space-y-8 bg-gradient-to-b from-white via-gray-50 to-gray-100 min-h-screen pb-12">
      {/* Edit Profile Modal */}
      <EditProfileModal
        user={currentUser}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={handleEditSuccess}
      />

      {/* Profile Header */}
      <ProfileHeader 
        user={currentUser} 
        onEdit={() => setIsEditModalOpen(true)}
      />

      {/* Tabs Navigation */}
      <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab Content */}
      {activeTab === "posts" && (
        <PostsTab user={currentUser} userPosts={userPosts} userPhotos={userPhotos} />
      )}

      {activeTab === "stats" && (
        <StatsTab user={currentUser} totalPoints={totalPoints} games={games} />
      )}

      {activeTab === "about" && (
        <AboutTab 
          user={currentUser} 
          userFriends={userFriends} 
          userGroups={userGroups}
          earnedCount={earnedCount}
        />
      )}

      {activeTab === "teams" && <TeamsTab />}

      {activeTab === "groups" && <GroupsTab userGroups={userGroups} />}

      {activeTab === "forums" && (
        <ForumsTab user={currentUser} userPosts={userPosts} comments={comments} />
      )}

      {activeTab === "video" && <VideoTab userPosts={userPosts} />}

      {/* Newsletter CTA */}
      <NewsletterCTA />
    </div>
  );
};
