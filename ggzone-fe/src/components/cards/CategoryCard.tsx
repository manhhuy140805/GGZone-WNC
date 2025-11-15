import React from "react";
import { Button } from "../common";
import type { Category } from "../sections/CategoriesSection";

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-48 md:h-full overflow-hidden">
          <img
            src={category.imageUrl}
            alt={category.name}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          />
        </div>

        <div className="p-6 flex flex-col justify-center">
          <h3 className="text-xl font-bold text-white mb-3">{category.name}</h3>

          <div className="flex flex-wrap gap-2 mb-4">
            {category.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-xs font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="text-gray-300 text-sm mb-4">{category.description}</p>

          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-400 text-sm">
              {category.viewersCount}+ Viewers
            </span>
          </div>

          <Button variant="primary">Follow</Button>
        </div>
      </div>
    </div>
  );
};
