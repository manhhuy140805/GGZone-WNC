export interface Friendship {
  id: string;
  userId: string;
  friendId: string;
  status: "pending" | "accepted" | "blocked";
  createdAt: string;
}

export const mockFriendships: Friendship[] = [
  // Alice's friends
  {
    id: "f1",
    userId: "550e8400-e29b-41d4-a716-446655440000", // Alice
    friendId: "550e8400-e29b-41d4-a716-446655440001", // Bob
    status: "accepted",
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "f2",
    userId: "550e8400-e29b-41d4-a716-446655440000", // Alice
    friendId: "550e8400-e29b-41d4-a716-446655440002", // Charlie
    status: "accepted",
    createdAt: "2024-01-20T14:30:00Z",
  },
  {
    id: "f3",
    userId: "550e8400-e29b-41d4-a716-446655440000", // Alice
    friendId: "550e8400-e29b-41d4-a716-446655440003", // David
    status: "accepted",
    createdAt: "2024-02-01T09:15:00Z",
  },
  {
    id: "f4",
    userId: "550e8400-e29b-41d4-a716-446655440000", // Alice
    friendId: "550e8400-e29b-41d4-a716-446655440004", // Emma
    status: "pending",
    createdAt: "2024-02-10T16:45:00Z",
  },
  // Other friendships
  {
    id: "f5",
    userId: "550e8400-e29b-41d4-a716-446655440001", // Bob
    friendId: "550e8400-e29b-41d4-a716-446655440002", // Charlie
    status: "accepted",
    createdAt: "2024-01-25T11:20:00Z",
  },
];
