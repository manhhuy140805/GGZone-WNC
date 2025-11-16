export interface StoreProduct {
  id: string;
  name: string;
  description: string;
  coverImageUrl: string;
  price: number;
  category: string;
  gameId?: string;
  rating: number;
  reviewsCount: number;
  status: "online" | "offline";
  createdAt: string;
}

export interface StoreOrder {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  totalAmount: number;
  status: "pending" | "completed" | "cancelled";
  createdAt: string;
}

export const mockStoreProducts: StoreProduct[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655880000",
    name: "Valorant Premium Battle Pass",
    description:
      "Unlock exclusive skins, sprays, and rewards throughout the season",
    coverImageUrl:
      "https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt0e0e2e0e0e0e0e0e/valorant-battlepass.jpg",
    price: 250000,
    category: "in-game-currency",
    gameId: "550e8400-e29b-41d4-a716-446655550000",
    rating: 4.8,
    reviewsCount: 1250,
    status: "online",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655880001",
    name: "League of Legends RP Card 1000",
    description: "1000 Riot Points for League of Legends",
    coverImageUrl:
      "https://images.contentstack.io/v3/assets/blt731023b3d79e8f7c/blt0e0e2e0e0e0e0e0e/lol-rp.jpg",
    price: 200000,
    category: "in-game-currency",
    gameId: "550e8400-e29b-41d4-a716-446655550001",
    rating: 4.9,
    reviewsCount: 3420,
    status: "online",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655880002",
    name: "CS2 Operation Pass",
    description: "Access exclusive missions and rewards in Counter-Strike 2",
    coverImageUrl:
      "https://cdn.cloudflare.steamstatic.com/apps/csgo/images/operation.jpg",
    price: 150000,
    category: "dlc",
    gameId: "550e8400-e29b-41d4-a716-446655550002",
    rating: 4.6,
    reviewsCount: 890,
    status: "online",
    createdAt: "2024-02-01T00:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655880003",
    name: "Overwatch 2 Coins 2000",
    description: "2000 Overwatch Coins for premium shop items",
    coverImageUrl:
      "https://images.blz-contentstack.com/v3/assets/overwatch-coins.jpg",
    price: 400000,
    category: "in-game-currency",
    gameId: "550e8400-e29b-41d4-a716-446655550004",
    rating: 4.5,
    reviewsCount: 567,
    status: "online",
    createdAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655880004",
    name: "Minecraft Realms Plus 6 Months",
    description: "6 months subscription to Minecraft Realms Plus",
    coverImageUrl:
      "https://www.minecraft.net/content/dam/games/minecraft/realms-plus.jpg",
    price: 600000,
    category: "subscription",
    gameId: "550e8400-e29b-41d4-a716-446655550005",
    rating: 4.7,
    reviewsCount: 2100,
    status: "online",
    createdAt: "2024-01-10T00:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655880005",
    name: "DOTA 2 Battle Pass 2024",
    description: "Exclusive Battle Pass with arcanas and immortal treasures",
    coverImageUrl:
      "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/battlepass.jpg",
    price: 300000,
    category: "in-game-currency",
    gameId: "550e8400-e29b-41d4-a716-446655550003",
    rating: 4.8,
    reviewsCount: 1890,
    status: "online",
    createdAt: "2024-03-01T00:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655880006",
    name: "Gaming Gift Card $50",
    description: "Universal gaming gift card - works on multiple platforms",
    coverImageUrl:
      "https://images.pexels.com/photos/6633920/pexels-photo-6633920.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 1200000,
    category: "gift-card",
    rating: 5.0,
    reviewsCount: 4500,
    status: "online",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655880007",
    name: "Steam Wallet Code $20",
    description: "Add $20 to your Steam Wallet",
    coverImageUrl:
      "https://images.pexels.com/photos/7915286/pexels-photo-7915286.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 480000,
    category: "gift-card",
    rating: 4.9,
    reviewsCount: 8900,
    status: "online",
    createdAt: "2024-01-01T00:00:00Z",
  },
];

export const mockStoreOrders: StoreOrder[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655890000",
    userId: "550e8400-e29b-41d4-a716-446655440000",
    productId: "550e8400-e29b-41d4-a716-446655880000",
    quantity: 1,
    totalAmount: 250000,
    status: "completed",
    createdAt: "2024-11-01T10:30:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655890001",
    userId: "550e8400-e29b-41d4-a716-446655440001",
    productId: "550e8400-e29b-41d4-a716-446655880002",
    quantity: 1,
    totalAmount: 150000,
    status: "completed",
    createdAt: "2024-11-05T14:20:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655890002",
    userId: "550e8400-e29b-41d4-a716-446655440002",
    productId: "550e8400-e29b-41d4-a716-446655880001",
    quantity: 2,
    totalAmount: 400000,
    status: "completed",
    createdAt: "2024-11-08T09:15:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655890003",
    userId: "550e8400-e29b-41d4-a716-446655440003",
    productId: "550e8400-e29b-41d4-a716-446655880006",
    quantity: 1,
    totalAmount: 1200000,
    status: "pending",
    createdAt: "2024-11-15T11:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655890004",
    userId: "550e8400-e29b-41d4-a716-446655440004",
    productId: "550e8400-e29b-41d4-a716-446655880004",
    quantity: 1,
    totalAmount: 600000,
    status: "completed",
    createdAt: "2024-10-20T16:45:00Z",
  },
];
