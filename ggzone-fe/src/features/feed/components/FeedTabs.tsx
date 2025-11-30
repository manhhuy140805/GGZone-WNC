import React from "react";
import { Image, Video, FileText, Zap, Filter } from "lucide-react";

type FeedTab = "all" | "posts" | "videos" | "photos" | "moments";
type SortType = "latest" | "trending" | "oldest";

interface FeedTabsProps {
  activeTab: FeedTab;
  sortBy: SortType;
  onTabChange: (tab: FeedTab) => void;
  onSortChange: (sort: SortType) => void;
}

export const FeedTabs: React.FC<FeedTabsProps> = ({
  activeTab,
  sortBy,
  onTabChange,
  onSortChange,
}) => {
  const tabs = [
    { id: "all" as FeedTab, label: "All Feed", icon: Zap },
    { id: "posts" as FeedTab, label: "Posts", icon: FileText },
    { id: "videos" as FeedTab, label: "Videos", icon: Video },
    { id: "photos" as FeedTab, label: "Photos", icon: Image },
    { id: "moments" as FeedTab, label: "Moments", icon: Zap },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-2">
      <div className="flex items-center justify-between gap-4 mb-2">
        <div className="flex gap-2 overflow-x-auto flex-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-orange-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sort Filter */}
      <div className="flex items-center gap-2 border-t border-gray-200 pt-2 mt-2">
        <Filter size={16} className="text-gray-600" />
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortType)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-500"
        >
          <option value="latest">Most Recent</option>
          <option value="trending">Trending</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
    </div>
  );
};
