import React from "react";

export type ProfileTab = 
  | "posts" 
  | "stats" 
  | "about" 
  | "teams" 
  | "groups" 
  | "forums" 
  | "video";

interface ProfileTabsProps {
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
}

const tabs: { key: ProfileTab; label: string }[] = [
  { key: "posts", label: "Posts - Item" },
  { key: "stats", label: "Game - Stats" },
  { key: "about", label: "About" },
  { key: "teams", label: "Teams" },
  { key: "groups", label: "Groups" },
  { key: "forums", label: "Forums" },
  { key: "video", label: "Video" },
];

export const ProfileTabs: React.FC<ProfileTabsProps> = ({ 
  activeTab, 
  onTabChange 
}) => {
  return (
    <section className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="flex gap-8 overflow-x-auto px-6 py-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`pb-4 font-medium whitespace-nowrap transition-all border-b-2 ${
              activeTab === tab.key
                ? "text-orange-600 border-orange-600"
                : "text-gray-600 border-transparent hover:text-gray-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </section>
  );
};
