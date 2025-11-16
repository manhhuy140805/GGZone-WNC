import React from "react";
import { Trophy } from "lucide-react";

export const TeamsTab: React.FC = () => {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900">My Teams</h2>
      </div>

      <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
        <Trophy size={48} className="mx-auto text-gray-400 mb-4" />
        <p className="text-gray-600 mb-2">No teams yet</p>
        <p className="text-sm text-gray-500 mb-4">Create or join a team to compete in tournaments</p>
        <button className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition">
          Create Team
        </button>
      </div>
    </section>
  );
};
