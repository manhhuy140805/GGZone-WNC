import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/app/providers/AuthContext";
import { userService } from "@/services/api/userService";
import { postService } from "@/services/api/postService";
import { gameService } from "@/services/api/gameService";
import { friendshipService } from "@/services/api/friendshipService";
import { groupService } from "@/services/api/groupService";
import { badgeService } from "@/services/api/badgeService";
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
} from "./components";
import { EditProfileModal } from "./components/EditProfileModal";
import { User, Post, Game, Group } from "@/types";

export interface GameStats extends Game {
  hoursPlayed: number;
}

export const Profile: React.FC = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ProfileTab>("posts");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(user || null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [games, setGames] = useState<GameStats[]>([]);
  const [userFriends, setUserFriends] = useState<User[]>([]);
  const [userGroups, setUserGroups] = useState<Group[]>([]);
  const [userBadges, setUserBadges] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

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

    if (user && !currentUser) {
      loadUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load posts data when activeTab is "posts"
  useEffect(() => {
    if (activeTab === "posts" && currentUser?.id) {
      loadUserPosts();
    }
  }, [activeTab, currentUser?.id]);

  // Load games data when activeTab is "stats"
  useEffect(() => {
    if (activeTab === "stats") {
      loadGames();
    }
  }, [activeTab]);

  // Load about data when activeTab is "about"
  useEffect(() => {
    if (activeTab === "about" && currentUser?.id) {
      loadAboutData();
    }
  }, [activeTab, currentUser?.id]);

  // Load groups data when activeTab is "groups"
  useEffect(() => {
    if (activeTab === "groups" && currentUser?.id) {
      loadUserGroupsData();
    }
  }, [activeTab, currentUser?.id]);

  const loadUserPosts = async () => {
    try {
      if (!currentUser?.id) return;
      
      setLoading(true);
      // Lấy posts của user hiện tại
      const response = await postService.filterPosts(1, 20, undefined, currentUser.id);
      if (response.success && response.data) {
        setUserPosts(response.data.posts as any || []);
      }
    } catch (error) {
      console.error("Error loading posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadGames = async () => {
    try {
      // Lấy danh sách games phổ biến
      const response = await gameService.getFeaturedGames(6);
      if (response.success && response.data) {
        // Add stable hours played data to each game
        const gamesWithStats: GameStats[] = response.data.map((game) => ({
          ...game,
          hoursPlayed: Math.floor(Math.random() * 100) + 20,
        }));
        setGames(gamesWithStats);
      }
    } catch (error) {
      console.error("Error loading games:", error);
    }
  };

  const loadUserGroupsData = async () => {
    try {
      if (!currentUser?.id) return;

      // Load groups - chỉ lấy groups mà user đã tham gia
      const groupsResponse = await groupService.getUserGroups(currentUser.id);
      if (groupsResponse.success && groupsResponse.data) {
        setUserGroups(groupsResponse.data);
      }
    } catch (error) {
      console.error("Error loading user groups:", error);
    }
  };

  const loadAboutData = async () => {
    try {
      if (!currentUser?.id) return;

      // Load friends
      const friendsResponse = await friendshipService.getFriends(currentUser.id);
      if (friendsResponse.success && friendsResponse.data) {
        try {
          const friends = friendsResponse.data
            .map((f: any) => f.friend || f.Friend)
            .filter((f: any) => f !== undefined && f !== null) as User[];
          setUserFriends(friends);
        } catch (err) {
          console.error("Error processing friends:", err);
          setUserFriends([]);
        }
      }

      // Load groups - chỉ lấy groups mà user đã tham gia
      const groupsResponse = await groupService.getUserGroups(currentUser.id);
      if (groupsResponse.success && groupsResponse.data) {
        setUserGroups(groupsResponse.data);
      }

      // Load badges
      const badgesResponse = await badgeService.getUserBadges(currentUser.id);
      if (badgesResponse.success && badgesResponse.data) {
        setUserBadges(badgesResponse.data);
      }
    } catch (error) {
      console.error("Error loading about data:", error);
    }
  };

  // TODO: Fetch data from API
  const userPhotos: any[] = [];
  const comments: any[] = [];
  
  const earnedCount = userBadges.length;
  const totalPoints = currentUser?.stats?.totalPoints || 0;

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
        <PostsTab 
          user={currentUser} 
          userPosts={userPosts} 
          userPhotos={userPhotos}
        />
      )}

      {activeTab === "stats" && (
        <StatsTab 
          user={currentUser} 
          totalPoints={totalPoints} 
          games={games}
        />
      )}

      {activeTab === "about" && (
        <AboutTab 
          user={currentUser} 
          userFriends={userFriends} 
          userGroups={userGroups}
          earnedCount={earnedCount}
          userBadges={userBadges}
        />
      )}

      {activeTab === "teams" && <TeamsTab />}

      {activeTab === "groups" && (
        <GroupsTab 
          userGroups={userGroups} 
          onViewGroup={(groupId) => navigate(`/groups/${groupId}`)}
        />
      )}

      {activeTab === "forums" && (
        <ForumsTab user={currentUser} userPosts={userPosts} comments={comments} />
      )}

      {activeTab === "video" && <VideoTab userPosts={userPosts} />}

      {/* Newsletter CTA */}
      <NewsletterCTA />
    </div>
  );
};
