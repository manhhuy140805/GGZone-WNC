export interface Game {
  id: string;
  name: string;
  description: string;
  image_url: string;
  category: string;
  release_date: string;
  rating: number;
  players_count: number;
}

export const mockGames: Game[] = [
  {
    id: "1",
    name: "Cyber Legends",
    description: "Futuristic action RPG with stunning graphics",
    image_url:
      "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Action RPG",
    release_date: "2024-01-15",
    rating: 4.8,
    players_count: 2500000,
  },
  {
    id: "2",
    name: "Mystic Quest",
    description: "Epic fantasy adventure with real-time PvP",
    image_url:
      "https://images.pexels.com/photos/3634539/pexels-photo-3634539.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Fantasy RPG",
    release_date: "2023-06-20",
    rating: 4.6,
    players_count: 1800000,
  },
  {
    id: "3",
    name: "Neon Racer",
    description: "High-speed arcade racing with customization",
    image_url:
      "https://images.pexels.com/photos/3550652/pexels-photo-3550652.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Racing",
    release_date: "2024-03-10",
    rating: 4.5,
    players_count: 3200000,
  },
  {
    id: "4",
    name: "Pixel Wars",
    description: "Retro-style strategy game with online battles",
    image_url:
      "https://images.pexels.com/photos/3808517/pexels-photo-3808517.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Strategy",
    release_date: "2024-02-01",
    rating: 4.4,
    players_count: 1200000,
  },
  {
    id: "5",
    name: "Shadow Chronicles",
    description: "Dark action game with stealth mechanics",
    image_url:
      "https://images.pexels.com/photos/3587620/pexels-photo-3587620.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Action",
    release_date: "2023-11-05",
    rating: 4.7,
    players_count: 2100000,
  },
];
