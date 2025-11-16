export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  coverImageUrl?: string;
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
    avatarUrl: "https://lienquan.garena.vn/wp-content/uploads/2024/05/12106.jpg",
    coverImageUrl: "https://phongvu.vn/cong-nghe/wp-content/uploads/2025/07/33.jpg",
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
    coverImageUrl: "https://dmarket.com/blog/best-dota2-wallpapers/qop1_hu_867c7cf84c620e27.jpg",
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
    coverImageUrl: "https://dmarket.com/blog/best-dota2-wallpapers/qop1_hu_867c7cf84c620e27.jpg",
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
    coverImageUrl: "https://dmarket.com/blog/best-dota2-wallpapers/qop1_hu_867c7cf84c620e27.jpg",
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
    coverImageUrl: "https://dmarket.com/blog/best-dota2-wallpapers/qop1_hu_867c7cf84c620e27.jpg",
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
    coverImageUrl: "https://dmarket.com/blog/best-dota2-wallpapers/qop1_hu_867c7cf84c620e27.jpg",
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

// Additional users for more comprehensive testing
export const additionalMockUsers: User[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440006",
    username: "grace",
    email: "grace@example.com",
    fullName: "Grace Hoang",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Grace",
    coverImageUrl: "https://4kwallpapers.com/images/wallpapers/minecraft-spring-to-3840x2160-21999.jpg",
    bio: "Minecraft builder | Creative mode enthusiast",
    location: "Singapore",
    status: "offline",
    role: "user",
    isVerified: false,
    createdAt: "2024-03-15T12:00:00Z",
    stats: {
      friendsCount: 4,
      winningCount: 3,
      tournamentsCount: 0,
      postsCount: 6,
      photosCount: 5,
    },
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440007",
    username: "henry",
    email: "henry@example.com",
    fullName: "Henry Nguyen",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Henry",
    coverImageUrl: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/crops/phantom_assassin.png",
    bio: "DOTA 2 pro player | Team captain",
    location: "Hanoi, VN",
    status: "in-game",
    role: "user",
    isVerified: true,
    createdAt: "2024-02-20T08:30:00Z",
    stats: {
      friendsCount: 15,
      winningCount: 45,
      tournamentsCount: 8,
      postsCount: 12,
      photosCount: 7,
    },
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440008",
    username: "isabel",
    email: "isabel@example.com",
    fullName: "Isabel Tran",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Isabel",
    coverImageUrl: "https://images8.alphacoders.com/131/1318379.png",
    bio: "Overwatch support main | Friendly player",
    location: "Da Nang, VN",
    status: "online",
    role: "user",
    isVerified: true,
    createdAt: "2024-04-01T10:15:00Z",
    stats: {
      friendsCount: 7,
      winningCount: 18,
      tournamentsCount: 2,
      postsCount: 9,
      photosCount: 4,
    },
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440009",
    username: "jack",
    email: "jack@example.com",
    fullName: "Jack Pham",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jack",
    coverImageUrl: "https://cdn1.epicgames.com/offer/cbd5b3d310a54b12bf3fe8c41994174f/EGS_ApexLegends_RespawnEntertainment_S1_2560x1440",
    bio: "Casual gamer | Just here for fun",
    location: "Ho Chi Minh City, VN",
    status: "offline",
    role: "user",
    isVerified: false,
    createdAt: "2024-05-10T14:45:00Z",
    stats: {
      friendsCount: 2,
      winningCount: 4,
      tournamentsCount: 0,
      postsCount: 3,
      photosCount: 1,
    },
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440010",
    username: "kate",
    email: "kate@example.com",
    fullName: "Kate Le",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kate",
    coverImageUrl: "https://cdn2.unrealengine.com/fortnite-chapter-4-season-1-key-art-3840x2160.jpg",
    bio: "Content creator | Gaming streamer",
    location: "Seoul, South Korea",
    status: "online",
    role: "moderator",
    isVerified: true,
    createdAt: "2024-01-05T09:00:00Z",
    stats: {
      friendsCount: 25,
      winningCount: 30,
      tournamentsCount: 5,
      postsCount: 45,
      photosCount: 20,
    },
  },
];
