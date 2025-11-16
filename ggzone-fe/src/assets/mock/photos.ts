export interface Photo {
  id: string;
  userId: string;
  imageUrl: string;
  caption?: string;
  gameId?: string;
  likesCount: number;
  createdAt: string;
}

export const mockPhotos: Photo[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655220000",
    userId: "550e8400-e29b-41d4-a716-446655440000",
    imageUrl:
      "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800",
    caption: "Epic Valorant clutch moment! 1v5 ace 🔥",
    gameId: "550e8400-e29b-41d4-a716-446655550000",
    likesCount: 45,
    createdAt: "2024-11-10T14:30:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655220001",
    userId: "550e8400-e29b-41d4-a716-446655440001",
    imageUrl:
      "https://images.pexels.com/photos/3550652/pexels-photo-3550652.jpeg?auto=compress&cs=tinysrgb&w=800",
    caption: "CS2 tournament victory! Team effort 💪",
    gameId: "550e8400-e29b-41d4-a716-446655550002",
    likesCount: 78,
    createdAt: "2024-11-08T18:45:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655220002",
    userId: "550e8400-e29b-41d4-a716-446655440002",
    imageUrl:
      "https://images.pexels.com/photos/3634539/pexels-photo-3634539.jpeg?auto=compress&cs=tinysrgb&w=800",
    caption: "League of Legends pentakill! Best game ever",
    gameId: "550e8400-e29b-41d4-a716-446655550001",
    likesCount: 92,
    createdAt: "2024-11-05T20:15:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655220003",
    userId: "550e8400-e29b-41d4-a716-446655440003",
    imageUrl:
      "https://images.pexels.com/photos/3808517/pexels-photo-3808517.jpeg?auto=compress&cs=tinysrgb&w=800",
    caption: "My gaming setup 2024 🎮",
    likesCount: 156,
    createdAt: "2024-10-28T16:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655220004",
    userId: "550e8400-e29b-41d4-a716-446655440004",
    imageUrl:
      "https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=800",
    caption: "Streaming setup complete! Going live tonight",
    likesCount: 67,
    createdAt: "2024-10-20T12:30:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655220005",
    userId: "550e8400-e29b-41d4-a716-446655440000",
    imageUrl:
      "https://images.pexels.com/photos/3977908/pexels-photo-3977908.jpeg?auto=compress&cs=tinysrgb&w=800",
    caption: "New gaming chair arrived! So comfortable",
    likesCount: 34,
    createdAt: "2024-10-15T10:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655220006",
    userId: "550e8400-e29b-41d4-a716-446655440002",
    imageUrl:
      "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=800",
    caption: "Team photo after winning the tournament 🏆",
    likesCount: 123,
    createdAt: "2024-10-10T19:45:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655220007",
    userId: "550e8400-e29b-41d4-a716-446655440003",
    imageUrl:
      "https://images.pexels.com/photos/3861458/pexels-photo-3861458.jpeg?auto=compress&cs=tinysrgb&w=800",
    caption: "Overwatch 2 highlight reel screenshot",
    gameId: "550e8400-e29b-41d4-a716-446655550004",
    likesCount: 41,
    createdAt: "2024-10-05T15:20:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655220008",
    userId: "550e8400-e29b-41d4-a716-446655440004",
    imageUrl:
      "https://images.pexels.com/photos/3945657/pexels-photo-3945657.jpeg?auto=compress&cs=tinysrgb&w=800",
    caption: "Minecraft build - my castle project",
    gameId: "550e8400-e29b-41d4-a716-446655550005",
    likesCount: 89,
    createdAt: "2024-09-28T11:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655220009",
    userId: "550e8400-e29b-41d4-a716-446655440005",
    imageUrl:
      "https://images.pexels.com/photos/3829227/pexels-photo-3829227.jpeg?auto=compress&cs=tinysrgb&w=800",
    caption: "Community meetup! Great to see everyone",
    likesCount: 201,
    createdAt: "2024-09-15T17:30:00Z",
  },
];
