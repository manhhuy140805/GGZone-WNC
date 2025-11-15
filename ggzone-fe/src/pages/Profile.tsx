import React from "react";
import { Avatar, Badge, Button } from "../components/common";
import { UserCard } from "../components/cards";
import { Zap, Award, Users } from "lucide-react";
import { mockUsers } from "../assets/mock/users";

export const Profile: React.FC = () => {
  const currentUser = mockUsers[0];
  const followingUsers = mockUsers.slice(1, 4);

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <Avatar
            src={currentUser.avatar_url}
            alt={currentUser.username}
            size="xl"
          />

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">
                {currentUser.username}
              </h1>
              <Badge label={`Level ${currentUser.level}`} variant="primary" />
            </div>
            <p className="text-gray-600 mb-4">{currentUser.bio}</p>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <Award size={24} className="mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold text-blue-600">8</div>
                <div className="text-sm text-gray-600">Achievements</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <Users size={24} className="mx-auto mb-2 text-purple-600" />
                <div className="text-2xl font-bold text-purple-600">342</div>
                <div className="text-sm text-gray-600">Followers</div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4 text-center flex flex-col items-center justify-center">
                <Zap size={24} className="mb-2 text-yellow-600" />
                <div className="text-2xl font-bold text-yellow-600">
                  {currentUser.total_playtime}h
                </div>
                <div className="text-sm text-gray-600">Playtime</div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="primary" size="md">
                Edit Profile
              </Button>
              <Button variant="outline" size="md">
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Following</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {followingUsers.map((user) => (
            <UserCard key={user.id} user={user} actionLabel="Unfollow" />
          ))}
        </div>
      </div>
    </div>
  );
};
