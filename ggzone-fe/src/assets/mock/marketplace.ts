export interface Buyer {
  name: string;
  avatar: string;
}

export interface MarketplaceItem {
  id: string;
  sellerId: string;
  gameId?: string;
  title: string;
  name?: string;
  description?: string;
  imageUrl?: string;
  coverImageUrl?: string;
  category: string;
  platform: string;
  price: number;
  rating: number;
  reviewsCount?: number;
  reviewCount?: number;
  status: "online" | "offline" | "sold";
  buyers?: Buyer[];
  buyersCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface MarketplaceReview {
  id: string;
  itemId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

const mockBuyers: Buyer[] = [
  {
    name: "Alice",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Bob",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Charlie",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    name: "Daisy",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

export const mockMarketplaceItems: MarketplaceItem[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655990000",
    sellerId: "550e8400-e29b-41d4-a716-446655440000",
    title: "Gaming Mouse Logitech G102",
    description:
      "Professional gaming mouse with 6400 DPI, RGB lighting, lightweight design",
    coverImageUrl:
      "https://bizweb.dktcdn.net/100/433/921/products/chuot-choi-game-logitech-gaming-mouse-g102-gen2-chinh-hang-tai-vanphongstar-5.jpg?v=1715588748153",
    category: "gear",
    platform: "pc",
    price: 350000,
    rating: 4.8,
    reviewsCount: 12,
    reviewCount: 12,
    buyers: mockBuyers.slice(0, 2),
    buyersCount: 2,
    status: "online",
    createdAt: "2024-10-15T10:30:00Z",
    updatedAt: "2024-11-15T10:30:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655990001",
    sellerId: "550e8400-e29b-41d4-a716-446655440001",
    title: "Mechanical Keyboard RGB",
    description:
      "High-quality mechanical keyboard with Cherry MX switches, customizable RGB",
    coverImageUrl:
      "https://media.wired.com/photos/5b21913a985bbd041c32d13d/master/pass/keyboard-TA.jpg",
    category: "gear",
    platform: "pc",
    price: 790000,
    rating: 4.7,
    reviewsCount: 8,
    reviewCount: 8,
    buyers: mockBuyers.slice(1, 3),
    buyersCount: 2,
    status: "online",
    createdAt: "2024-09-20T14:45:00Z",
    updatedAt: "2024-11-14T14:45:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655990002",
    sellerId: "550e8400-e29b-41d4-a716-446655440002",
    title: "Gaming Headset Razer",
    description:
      "7.1 surround sound headset with noise cancellation microphone",
    coverImageUrl:
      "https://static.tandoanh.vn/wp-content/uploads/2024/11/Razer-Barracuda-X-Chroma-White-H1.jpg",
    category: "gear",
    platform: "pc",
    price: 1200000,
    rating: 4.6,
    reviewsCount: 15,
    reviewCount: 15,
    buyers: mockBuyers.slice(0, 3),
    buyersCount: 3,
    status: "online",
    createdAt: "2024-08-10T09:00:00Z",
    updatedAt: "2024-11-13T09:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655990003",
    sellerId: "550e8400-e29b-41d4-a716-446655440003",
    title: "Monitor 144Hz Gaming",
    description:
      "27 inch 1440p gaming monitor with 144Hz refresh rate, IPS panel",
    coverImageUrl:
      "https://product.hstatic.net/1000333506/product/g34wqcp_gaming_monitor-09_7f2433f7561545a1b4ff329d0038b21f.png",
    category: "equipment",
    platform: "pc",
    price: 3500000,
    rating: 4.9,
    reviewsCount: 25,
    reviewCount: 25,
    buyers: mockBuyers,
    buyersCount: 4,
    status: "online",
    createdAt: "2024-07-15T11:20:00Z",
    updatedAt: "2024-11-15T11:20:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655990004",
    sellerId: "550e8400-e29b-41d4-a716-446655440004",
    title: "PC Gaming Case",
    description:
      "Full tower gaming case with tempered glass, excellent airflow",
    coverImageUrl:
      "https://pcmarket.vn/media/lib/12-09-2024/tu-build-pc-gaming.jpg",
    category: "equipment",
    platform: "pc",
    price: 890000,
    rating: 4.5,
    reviewsCount: 7,
    reviewCount: 7,
    buyers: mockBuyers.slice(2),
    buyersCount: 2,
    status: "online",
    createdAt: "2024-06-25T15:30:00Z",
    updatedAt: "2024-11-12T15:30:00Z",
  },
];

export const mockMarketplaceReviews: MarketplaceReview[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655991000",
    itemId: "550e8400-e29b-41d4-a716-446655990000",
    userId: "550e8400-e29b-41d4-a716-446655440001",
    rating: 5,
    comment: "Great mouse! Very precise and responsive. Highly recommended!",
    createdAt: "2024-10-20T16:45:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655991001",
    itemId: "550e8400-e29b-41d4-a716-446655990000",
    userId: "550e8400-e29b-41d4-a716-446655440003",
    rating: 4,
    comment: "Good quality, comfortable grip",
    createdAt: "2024-10-25T12:30:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655991002",
    itemId: "550e8400-e29b-41d4-a716-446655990001",
    userId: "550e8400-e29b-41d4-a716-446655440000",
    rating: 5,
    comment: "Excellent keyboard! Perfect for gaming and typing",
    createdAt: "2024-09-25T10:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655991003",
    itemId: "550e8400-e29b-41d4-a716-446655990003",
    userId: "550e8400-e29b-41d4-a716-446655440002",
    rating: 5,
    comment: "Best gaming monitor I've ever owned! Crystal clear and smooth",
    createdAt: "2024-07-20T14:15:00Z",
  },
];
