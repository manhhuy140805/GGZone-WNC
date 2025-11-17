import React from "react";
import { SuggestionCard } from "./SuggestionCard";
import { User } from "../../assets/mock/users";
import { UserPlus } from "lucide-react";

interface SuggestionsListProps {
  suggestions: User[];
}

export const SuggestionsList: React.FC<SuggestionsListProps> = ({ suggestions }) => {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900">People You May Know</h3>
      </div>

      {suggestions.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {suggestions.map((user) => (
            <SuggestionCard key={user.id} user={user} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <UserPlus size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 text-lg font-medium mb-2">No suggestions found</p>
          <p className="text-gray-500">Try adjusting your search criteria</p>
        </div>
      )}
    </section>
  );
};
