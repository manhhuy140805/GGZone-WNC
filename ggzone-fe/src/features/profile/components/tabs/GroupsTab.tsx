import React from "react";
import { Users } from "lucide-react";
import { Group } from "@/types";

interface GroupsTabProps {
  userGroups: (Group | undefined)[];
  onViewGroup?: (groupId: string) => void;
}

export const GroupsTab: React.FC<GroupsTabProps> = ({ userGroups, onViewGroup }) => {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900">My Groups</h2>
        <span className="text-sm text-gray-600">{userGroups.length} groups</span>
      </div>

      {userGroups.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userGroups.map((group) => {
            if (!group) return null;
            return (
              <div 
                key={group.id} 
                onClick={() => onViewGroup?.(group.id)}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all cursor-pointer"
              >
                <div
                  className="h-32 bg-cover bg-center"
                  style={{ backgroundImage: `url(${group.coverImageUrl})` }}
                >
                  <div className="h-full bg-gradient-to-b from-transparent to-black/60 flex items-end p-4">
                    <h3 className="text-white font-bold text-lg">{group.name}</h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {group.description}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users size={16} />
                      <span>{group.membersCount} members</span>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      group.visibility === 'public' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {group.visibility}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
          <Users size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 mb-2">Not a member of any groups yet</p>
          <p className="text-sm text-gray-500">Join groups to connect with other gamers</p>
        </div>
      )}
    </section>
  );
};
