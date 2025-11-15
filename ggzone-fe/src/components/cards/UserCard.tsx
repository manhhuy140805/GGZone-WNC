import React from "react";
import { Zap } from "lucide-react";
import { Avatar, Button } from "../common";
import type { User } from "../../assets/mock/users";

interface UserCardProps {
  user: User;
  onFollow?: () => void;
  actionLabel?: string;
}

export const UserCard: React.FC<UserCardProps> = ({
  user,
  onFollow,
  actionLabel = "Follow",
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex flex-col items-center mb-3">
        <Avatar src={user.avatar_url} alt={user.username} size="lg" />
        <h3 className="text-lg font-bold text-gray-900 mt-2 text-center">
          {user.username}
        </h3>
        <p className="text-gray-600 text-sm text-center">{user.bio}</p>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="bg-blue-50 rounded-lg p-2 text-center">
          <div className="text-xs text-gray-600">Level</div>
          <div className="text-lg font-bold text-blue-600">{user.level}</div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-2 text-center flex flex-col items-center justify-center">
          <Zap size={16} className="text-yellow-600 mb-0.5" />
          <div className="text-xs text-gray-600">Playtime</div>
          <div className="text-lg font-bold text-yellow-600">
            {user.total_playtime}h
          </div>
        </div>
      </div>

      <Button variant="primary" size="sm" className="w-full" onClick={onFollow}>
        {actionLabel}
      </Button>
    </div>
  );
};
