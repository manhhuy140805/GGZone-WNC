export interface Achievement {
  id: string;
  game_id: string;
  name: string;
  description: string;
  icon_url: string;
  difficulty: "easy" | "medium" | "hard" | "legendary";
}

export const mockAchievements: Achievement[] = [
  {
    id: "1",
    game_id: "1",
    name: "First Blood",
    description: "Win your first battle",
    icon_url: "⚔️",
    difficulty: "easy",
  },
  {
    id: "2",
    game_id: "1",
    name: "Cyber Master",
    description: "Reach level 50 in Cyber Legends",
    icon_url: "🤖",
    difficulty: "hard",
  },
  {
    id: "3",
    game_id: "2",
    name: "Dragon Slayer",
    description: "Defeat the legendary dragon",
    icon_url: "🐉",
    difficulty: "legendary",
  },
  {
    id: "4",
    game_id: "2",
    name: "Quest Complete",
    description: "Complete 10 quests",
    icon_url: "✨",
    difficulty: "medium",
  },
  {
    id: "5",
    game_id: "3",
    name: "Speed Demon",
    description: "Complete a race in under 2 minutes",
    icon_url: "🏎️",
    difficulty: "hard",
  },
  {
    id: "6",
    game_id: "3",
    name: "Collection Master",
    description: "Unlock 20 different cars",
    icon_url: "🏆",
    difficulty: "medium",
  },
  {
    id: "7",
    game_id: "4",
    name: "Empire Builder",
    description: "Build an empire with 1000+ citizens",
    icon_url: "🏰",
    difficulty: "legendary",
  },
  {
    id: "8",
    game_id: "5",
    name: "Ghost Shadow",
    description: "Complete mission without being detected",
    icon_url: "👻",
    difficulty: "hard",
  },
];
