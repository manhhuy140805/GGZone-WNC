import React, { useState } from "react";
import { GroupCard } from "../components/cards";
import { Button, Input } from "../components/common";
import { Search, Plus } from "lucide-react";
import { mockGroups } from "../assets/mock/groups";

export const Groups: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [joinedGroups, setJoinedGroups] = useState<string[]>([]);

  const filteredGroups = mockGroups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleJoinGroup = (groupId: string) => {
    if (joinedGroups.includes(groupId)) {
      setJoinedGroups(joinedGroups.filter((id) => id !== groupId));
    } else {
      setJoinedGroups([...joinedGroups, groupId]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Gaming Groups
          </h1>
          <p className="text-gray-600">
            Join communities and play with friends
          </p>
        </div>
        <Button variant="primary" size="lg">
          <Plus size={20} />
          Create Group
        </Button>
      </div>

      <Input
        icon={<Search size={18} />}
        placeholder="Search groups..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredGroups.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGroups.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              isJoined={joinedGroups.includes(group.id)}
              onJoin={() => handleJoinGroup(group.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No groups found</p>
        </div>
      )}
    </div>
  );
};
