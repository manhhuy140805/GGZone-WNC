import React from "react";
import { FriendCard } from "./FriendCard";
import { User } from "../../assets/mock/users";
import { MessageCircle, Users } from "lucide-react";

interface FriendsListProps {
  friends: User[];
  onMessageClick: (userId: string) => void;
  onNavigateToMessages: () => void;
}

export const FriendsList: React.FC<FriendsListProps> = ({
  friends,
  onMessageClick,
  onNavigateToMessages,
}) => {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900">Your Friends</h3>
        <button
          onClick={onNavigateToMessages}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
        >
          <MessageCircle size={18} />
          Messages
        </button>
      </div>

      {friends.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {friends.map((user) => (
            <FriendCard
              key={user.id}
              user={user}
              onMessageClick={onMessageClick}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <Users size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 text-lg font-medium mb-2">No friends found</p>
          <p className="text-gray-500">Try adjusting your search or add new friends</p>
        </div>
      )}
    </section>
  );
};
