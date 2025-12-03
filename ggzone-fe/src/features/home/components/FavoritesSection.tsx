import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import type { Group } from "@/types";
import { Button } from "@/components/ui";

interface FavoritesSectionProps {
  groups: Group[];
}

export const FavoritesSection: React.FC<FavoritesSectionProps> = ({
  groups,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(groups.length / 2));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.ceil(groups.length / 2) - 1 : prev - 1
    );
  };

  return (
    <section className="py-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart size={24} className="text-red-500" />
          <h2 className="text-2xl font-bold text-white">Our Favorites</h2>
        </div>
        <button className="text-sm font-semibold text-gray-300 hover:text-white">
          Popular
        </button>
      </div>

      <div className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {groups
            .slice(currentIndex * 2, (currentIndex + 1) * 2)
            .map((group) => (
              <div
                key={group.id}
                className="bg-gray-800 rounded-lg overflow-hidden"
              >
                <div className="flex flex-col md:flex-row h-full">
                  <div className="md:w-1/2">
                    <img
                      src={group.coverImageUrl}
                      alt={group.name}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-6 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {group.name}
                    </h3>
                    <div className="flex gap-4 mb-4">
                      <div>
                        <div className="text-white font-bold">
                          {group.membersCount}
                        </div>
                        <div className="text-gray-400 text-sm">Members</div>
                      </div>
                      <div>
                        <div className="text-white font-bold">
                          {group.posts}
                        </div>
                        <div className="text-gray-400 text-sm">Posts</div>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm mb-4">
                      {group.description}
                    </p>
                    <Button variant="primary">Read More</Button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {groups.length > 2 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>
    </section>
  );
};
