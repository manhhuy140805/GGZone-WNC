export interface User {
  id: string;
  username: string;
  email: string;
  avatar_url: string;
  bio: string;
  level: number;
  experience: number;
  total_playtime: number;
}

export const mockUsers: User[] = [
  {
    id: "1",
    username: "ShadowNinja92",
    email: "shadow@example.com",
    avatar_url:
      "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=100",
    bio: "Pro gamer | Streaming daily 🎮",
    level: 45,
    experience: 125000,
    total_playtime: 3600,
  },
  {
    id: "2",
    username: "LunaStorm",
    email: "luna@example.com",
    avatar_url:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100",
    bio: "Fantasy RPG enthusiast | Always exploring",
    level: 38,
    experience: 98000,
    total_playtime: 2800,
  },
  {
    id: "3",
    username: "BlazeFury",
    email: "blaze@example.com",
    avatar_url:
      "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=100",
    bio: "Competitive racer | Speed is life",
    level: 42,
    experience: 110000,
    total_playtime: 3200,
  },
  {
    id: "4",
    username: "CrimsonPhoenix",
    email: "crimson@example.com",
    avatar_url:
      "https://images.pexels.com/photos/1661432/pexels-photo-1661432.jpeg?auto=compress&cs=tinysrgb&w=100",
    bio: "Strategy master | Building empires",
    level: 50,
    experience: 145000,
    total_playtime: 4100,
  },
  {
    id: "5",
    username: "VortexGamer",
    email: "vortex@example.com",
    avatar_url:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100",
    bio: "Casual player | Just having fun",
    level: 22,
    experience: 45000,
    total_playtime: 1200,
  },
];
