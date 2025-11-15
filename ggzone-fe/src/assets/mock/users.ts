export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  bio?: string;
  location?: string;
  status: "online" | "offline" | "in-game";
  role: "user" | "admin" | "moderator";
  isVerified: boolean;
  createdAt: string;
  stats?: UserStats;
}

export interface UserStats {
  friendsCount: number;
  winningCount: number;
  tournamentsCount: number;
  postsCount: number;
  photosCount: number;
}

export const mockUsers: User[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    username: "alice",
    email: "alice@example.com",
    fullName: "Alice Nguyen",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
    bio: "Gaming enthusiast | Valorant player | Community leader",
    location: "Ho Chi Minh City, VN",
    status: "online",
    role: "user",
    isVerified: true,
    createdAt: "2024-01-15T10:30:00Z",
    stats: {
      friendsCount: 2,
      winningCount: 5,
      tournamentsCount: 1,
      postsCount: 3,
      photosCount: 1,
    },
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    username: "bob",
    email: "bob@example.com",
    fullName: "Bob Tran",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
    bio: "CS2 competitive player | Esports caster",
    location: "Hanoi, VN",
    status: "offline",
    role: "moderator",
    isVerified: true,
    createdAt: "2024-02-10T14:45:00Z",
    stats: {
      friendsCount: 1,
      winningCount: 1,
      tournamentsCount: 0,
      postsCount: 1,
      photosCount: 0,
    },
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    username: "charlie",
    email: "charlie@example.com",
    fullName: "Charlie Pham",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie",
    bio: "League of Legends addict",
    location: "Da Nang, VN",
    status: "offline",
    role: "user",
    isVerified: false,
    createdAt: "2024-03-05T09:15:00Z",
    stats: {
      friendsCount: 1,
      winningCount: 8,
      tournamentsCount: 2,
      postsCount: 2,
      photosCount: 2,
    },
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    username: "david",
    email: "david@example.com",
    fullName: "David Le",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    bio: "FPS lover | Always learning",
    location: "Bangkok, Thailand",
    status: "in-game",
    role: "user",
    isVerified: true,
    createdAt: "2024-01-20T11:20:00Z",
    stats: {
      friendsCount: 5,
      winningCount: 12,
      tournamentsCount: 3,
      postsCount: 8,
      photosCount: 4,
    },
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    username: "emma",
    email: "emma@example.com",
    fullName: "Emma Vo",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    bio: "Streaming occasionally | Casual gamer",
    location: "Can Tho, VN",
    status: "online",
    role: "user",
    isVerified: true,
    createdAt: "2024-02-25T15:00:00Z",
    stats: {
      friendsCount: 3,
      winningCount: 6,
      tournamentsCount: 1,
      postsCount: 5,
      photosCount: 3,
    },
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440005",
    username: "frank",
    email: "frank@example.com",
    fullName: "Frank Duong",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Frank",
    bio: "Admin moderator | Community manager",
    location: "Ho Chi Minh City, VN",
    status: "online",
    role: "admin",
    isVerified: true,
    createdAt: "2024-01-01T00:00:00Z",
    stats: {
      friendsCount: 8,
      winningCount: 20,
      tournamentsCount: 5,
      postsCount: 15,
      photosCount: 8,
    },
  },
];
