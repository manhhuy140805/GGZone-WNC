import React from "react";
import { ArrowLeft } from "lucide-react";

interface GroupDetailProps {
  groupId: string;
  onBack: () => void;
  onOpenChat?: (groupId: string) => void;
}

export const GroupDetail: React.FC<GroupDetailProps> = ({ groupId, onBack }) => {
  // TODO: Fetch data from API and implement full group detail view
  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-orange-600 font-semibold"
      >
        <ArrowLeft size={20} />
        Back to Groups
      </button>

      <div className="text-center py-16">
        <div className="text-6xl mb-4">👥</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Dữ liệu group sẽ được tải từ API</h2>
        <p className="text-gray-600 mb-4">Group ID: {groupId}</p>
        <p className="text-sm text-gray-500">
          Trang này sẽ hiển thị chi tiết group khi kết nối với backend API
        </p>
      </div>
    </div>
  );
};
