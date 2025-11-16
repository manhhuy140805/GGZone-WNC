export interface Friendship {
  id: string;
  userId: string;
  friendId: string;
  status: "pending" | "accepted" | "blocked";
  createdAt: string;
}

export const mockFriendships: Friendship[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655330000",
    userId: "550e8400-e29b-41d4-a716-446655440000",
    friendId: "550e8400-e29b-41d4-a716-446655440001",
    status: "accepted",
    createdAt: "2024-02-15T10:30:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655330001",
    userId: "550e8400-e29b-41d4-a716-446655440000",
    friendId: "550e8400-e29b-41d4-a716-446655440002",
    status: "accepted",
    createdAt: "2024-03-10T14:20:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655330002",
    userId: "550e8400-e29b-41d4-a716-446655440001",
    friendId: "550e8400-e29b-41d4-a716-446655440002",
    status: "accepted",
    createdAt: "2024-03-15T09:45:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655330003",
    userId: "550e8400-e29b-41d4-a716-446655440003",
    friendId: "550e8400-e29b-41d4-a716-446655440000",
    status: "pending",
    createdAt: "2024-11-10T16:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655330004",
    userId: "550e8400-e29b-41d4-a716-446655440004",
    friendId: "550e8400-e29b-41d4-a716-446655440000",
    status: "accepted",
    createdAt: "2024-04-20T11:30:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655330005",
    userId: "550e8400-e29b-41d4-a716-446655440004",
    friendId: "550e8400-e29b-41d4-a716-446655440003",
    status: "accepted",
    createdAt: "2024-05-05T13:15:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655330006",
    userId: "550e8400-e29b-41d4-a716-446655440005",
    friendId: "550e8400-e29b-41d4-a716-446655440000",
    status: "accepted",
    createdAt: "2024-01-25T08:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655330007",
    userId: "550e8400-e29b-41d4-a716-446655440005",
    friendId: "550e8400-e29b-41d4-a716-446655440001",
    status: "accepted",
    createdAt: "2024-02-01T10:20:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655330008",
    userId: "550e8400-e29b-41d4-a716-446655440003",
    friendId: "550e8400-e29b-41d4-a716-446655440004",
    status: "pending",
    createdAt: "2024-11-12T15:30:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655330009",
    userId: "550e8400-e29b-41d4-a716-446655440002",
    friendId: "550e8400-e29b-41d4-a716-446655440005",
    status: "accepted",
    createdAt: "2024-03-20T12:00:00Z",
  },
];
