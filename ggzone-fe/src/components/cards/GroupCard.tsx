import React from "react";
import { Users } from "lucide-react";
import { Badge, Button } from "../common";
import type { Group } from "../../assets/mock/groups";

interface GroupCardProps {
  group: Group;
  onJoin?: () => void;
  isJoined?: boolean;
}

export const GroupCard: React.FC<GroupCardProps> = ({
  group,
  onJoin,
  isJoined = false,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-32 bg-gradient-to-r from-blue-400 to-purple-500 relative">
        <img
          src={group.image_url}
          alt={group.name}
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute top-3 right-3">
          <Badge label="Gaming Group" variant="primary" size="sm" />
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{group.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {group.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1 text-gray-600">
            <Users size={16} />
            <span className="text-sm font-medium">
              {group.member_count} members
            </span>
          </div>
        </div>

        <Button
          variant={isJoined ? "secondary" : "primary"}
          size="sm"
          className="w-full"
          onClick={onJoin}
        >
          {isJoined ? "Joined" : "Join Group"}
        </Button>
      </div>
    </div>
  );
};
