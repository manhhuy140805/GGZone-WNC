export interface TrendingItem {
  id: string;
  contentType: "game" | "post" | "video" | "stream";
  contentId: string;
  gameId?: string;
  viewsCount: number;
  engagementScore: number;
  trendingDate: string;
  createdAt: string;
}

export const mockTrendingItems: TrendingItem[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655200000",
    contentType: "game",
    contentId: "550e8400-e29b-41d4-a716-446655550000",
    gameId: "550e8400-e29b-41d4-a716-446655550000",
    viewsCount: 15420,
    engagementScore: 92.5,
    trendingDate: "2024-11-15",
    createdAt: "2024-11-15T00:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655200001",
    contentType: "stream",
    contentId: "550e8400-e29b-41d4-a716-446655791001",
    gameId: "550e8400-e29b-41d4-a716-446655550002",
    viewsCount: 8934,
    engagementScore: 88.3,
    trendingDate: "2024-11-15",
    createdAt: "2024-11-15T09:30:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655200002",
    contentType: "post",
    contentId: "550e8400-e29b-41d4-a716-446655441004",
    viewsCount: 6721,
    engagementScore: 85.7,
    trendingDate: "2024-11-15",
    createdAt: "2024-11-13T13:15:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655200003",
    contentType: "game",
    contentId: "550e8400-e29b-41d4-a716-446655550001",
    gameId: "550e8400-e29b-41d4-a716-446655550001",
    viewsCount: 12890,
    engagementScore: 90.1,
    trendingDate: "2024-11-15",
    createdAt: "2024-11-15T00:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655200004",
    contentType: "stream",
    contentId: "550e8400-e29b-41d4-a716-446655791000",
    gameId: "550e8400-e29b-41d4-a716-446655550000",
    viewsCount: 5234,
    engagementScore: 82.4,
    trendingDate: "2024-11-15",
    createdAt: "2024-11-15T08:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655200005",
    contentType: "game",
    contentId: "550e8400-e29b-41d4-a716-446655550002",
    gameId: "550e8400-e29b-41d4-a716-446655550002",
    viewsCount: 11567,
    engagementScore: 87.9,
    trendingDate: "2024-11-15",
    createdAt: "2024-11-15T00:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655200006",
    contentType: "post",
    contentId: "550e8400-e29b-41d4-a716-446655441003",
    viewsCount: 4892,
    engagementScore: 79.6,
    trendingDate: "2024-11-14",
    createdAt: "2024-11-14T16:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655200007",
    contentType: "video",
    contentId: "550e8400-e29b-41d4-a716-446655441003",
    gameId: "550e8400-e29b-41d4-a716-446655550002",
    viewsCount: 7654,
    engagementScore: 84.2,
    trendingDate: "2024-11-14",
    createdAt: "2024-11-14T16:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655200008",
    contentType: "game",
    contentId: "550e8400-e29b-41d4-a716-446655550004",
    gameId: "550e8400-e29b-41d4-a716-446655550004",
    viewsCount: 9234,
    engagementScore: 81.5,
    trendingDate: "2024-11-14",
    createdAt: "2024-11-14T00:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655200009",
    contentType: "game",
    contentId: "550e8400-e29b-41d4-a716-446655550003",
    gameId: "550e8400-e29b-41d4-a716-446655550003",
    viewsCount: 8123,
    engagementScore: 78.3,
    trendingDate: "2024-11-13",
    createdAt: "2024-11-13T00:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655200010",
    contentType: "post",
    contentId: "550e8400-e29b-41d4-a716-446655441001",
    viewsCount: 3456,
    engagementScore: 76.8,
    trendingDate: "2024-11-12",
    createdAt: "2024-11-12T14:45:00Z",
  },
];
