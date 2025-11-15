export interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  tags: string[];
  viewersCount: number;
}

export const mockCategories: Category[] = [
  {
    id: "1",
    name: "Flight Captain",
    description:
      "Gaming isn't just a pastime, it's a culture and community that spans continents and demographics that span continents and demographics",
    imageUrl:
      "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600",
    tags: ["Games", "Shooter"],
    viewersCount: 2000,
  },
  {
    id: "2",
    name: "Gridiron Glory",
    description:
      "Gaming isn't just a pastime, it's a culture and community that spans continents and demographics that span continents and demographics",
    imageUrl:
      "https://images.pexels.com/photos/3634539/pexels-photo-3634539.jpeg?auto=compress&cs=tinysrgb&w=600",
    tags: ["Sports", "Shooter"],
    viewersCount: 1500,
  },
];
