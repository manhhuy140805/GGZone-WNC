export interface Achievement {
  id: string;
  name: string;
  description?: string;
  iconUrl?: string;
  gameId?: string;
  badgeType: "bronze" | "silver" | "gold";
  points: number;
  maxProgress: number;
  createdAt: string;
}

export interface UserAchievement {
  id: string;
  userId: string;
  achievementId: string;
  progress: number;
  completed: boolean;
  completedAt?: string;
  createdAt: string;
}

export const mockAchievements: Achievement[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655770000",
    name: "First Win",
    description: "Win your first competitive match",
    iconUrl: "⚔️",
    gameId: "550e8400-e29b-41d4-a716-446655550000",
    badgeType: "bronze",
    points: 10,
    maxProgress: 20,
    createdAt: "2024-01-10T00:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655770001",
    name: "Sharpshooter",
    description: "Get 10 headshots in a single match",
    iconUrl: "🎯",
    gameId: "550e8400-e29b-41d4-a716-446655550002",
    badgeType: "gold",
    points: 20,
    maxProgress: 20,
    createdAt: "2024-01-12T00:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655770002",
    name: "Team Player",
    description: "Play 100 matches with teammates",
    iconUrl: "👥",
    gameId: "550e8400-e29b-41d4-a716-446655550000",
    badgeType: "silver",
    points: 15,
    maxProgress: 20,
    createdAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655770003",
    name: "Legendary Hero",
    description: "Reach maximum level",
    iconUrl: "⭐",
    gameId: "550e8400-e29b-41d4-a716-446655550001",
    badgeType: "gold",
    points: 50,
    maxProgress: 20,
    createdAt: "2024-01-20T00:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655770004",
    name: "Collector",
    description: "Collect all cosmetic items",
    iconUrl: "🎨",
    badgeType: "silver",
    points: 25,
    maxProgress: 20,
    createdAt: "2024-02-01T00:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655770005",
    name: "Tournament Champion",
    description: "Win a tournament",
    iconUrl: "🏆",
    badgeType: "gold",
    points: 100,
    maxProgress: 20,
    createdAt: "2024-02-10T00:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655770006",
    name: "Consistency Master",
    description: "Win 30 consecutive matches",
    iconUrl: "📈",
    gameId: "550e8400-e29b-41d4-a716-446655550001",
    badgeType: "gold",
    points: 75,
    maxProgress: 20,
    createdAt: "2024-02-15T00:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655770007",
    name: "Night Owl",
    description: "Play 50 matches after midnight",
    iconUrl: "🌙",
    badgeType: "bronze",
    points: 5,
    maxProgress: 20,
    createdAt: "2024-03-01T00:00:00Z",
  },
];

export const mockUserAchievements: UserAchievement[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655880000",
    userId: "550e8400-e29b-41d4-a716-446655440000",
    achievementId: "550e8400-e29b-41d4-a716-446655770000",
    progress: 20,
    completed: true,
    completedAt: "2024-01-20T15:30:00Z",
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655880001",
    userId: "550e8400-e29b-41d4-a716-446655440001",
    achievementId: "550e8400-e29b-41d4-a716-446655770000",
    progress: 5,
    completed: false,
    createdAt: "2024-02-10T14:45:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655880002",
    userId: "550e8400-e29b-41d4-a716-446655440000",
    achievementId: "550e8400-e29b-41d4-a716-446655770001",
    progress: 15,
    completed: false,
    createdAt: "2024-01-22T09:15:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655880003",
    userId: "550e8400-e29b-41d4-a716-446655440003",
    achievementId: "550e8400-e29b-41d4-a716-446655770003",
    progress: 20,
    completed: true,
    completedAt: "2024-02-25T18:45:00Z",
    createdAt: "2024-01-25T11:20:00Z",
  },
];
