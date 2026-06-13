import React from "react";
import { Zap } from "lucide-react";
import { CategoryCard } from "@/features/store/components/CategoryCard";
import { Button } from "@/components/ui";

export interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  tags: string[];
  viewersCount: number;
}

interface CategoriesSectionProps {
  categories: Category[];
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  categories,
}) => {
  return (
    <section className="py-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap size={24} className="text-yellow-500" />
          <h2 className="text-2xl font-bold text-white">Popular Categories</h2>
        </div>
        <button className="text-sm font-semibold text-gray-300 hover:text-white">
          Most Recent
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
};
