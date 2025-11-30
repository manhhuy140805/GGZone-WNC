import React from "react";
import { User } from "@/types";

interface ProfileHeaderProps {
  user: User | null;
  onShare?: () => void;
  onEdit?: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  user, 
  onShare, 
  onEdit 
}) => {
  const defaultCover = 'https://wallpapercat.com/w/full/4/d/7/1868806-3840x2160-desktop-4k-valorant-wallpaper-image.jpg';
  const coverImage = user?.coverImageUrl || defaultCover;

  return (
    <section className="relative rounded-2xl overflow-hidden shadow-lg">
      {/* Background Banner */}
      <div className="relative h-60">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${coverImage}')`,
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70" />
      </div>


      {/* Profile Content */}
      <div className="relative px-8 py-6">
        <div className="flex items-end gap-6 -mt-10">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <img
              src={user?.avatarUrl || "https://api.dicebear.com/7.x/avataaars/svg?seed=User"}
              alt={user?.fullName}
              className="w-32 h-32 rounded-2xl border-4 border-white shadow-xl bg-white object-cover"
            />
          </div>

          {/* Profile Details */}
          <div className="flex-1 pb-2">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              {user?.fullName || "Player"}
            </h1>
            <p className="text-gray-700 mb-3">@{user?.username || "username"}</p>
            <div className="flex flex-wrap gap-2">
              {user?.isVerified && (
                <span className="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-md flex items-center gap-1">
                  ✓ Verified
                </span>
              )}
              <span className="px-3 py-1 bg-gray-600 text-white text-xs font-bold rounded-md capitalize">
                {user?.role}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pb-2">
            <button 
              onClick={onShare}
              className="px-5 py-2.5 bg-white border border-gray-300 text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share
            </button>
            <button 
              onClick={onEdit}
              className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-all flex items-center gap-2 shadow-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Edit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
