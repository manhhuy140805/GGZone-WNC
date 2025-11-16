export interface GroupMember {
  id: string;
  groupId: string;
  userId: string;
  role: "admin" | "moderator" | "member";
  joinedAt: string;
}

export const mockGroupMembers: GroupMember[] = [
  // Gamers VN group members
  {
    id: "550e8400-e29b-41d4-a716-446655300000",
    groupId: "550e8400-e29b-41d4-a716-446655660000",
    userId: "550e8400-e29b-41d4-a716-446655440000",
    role: "admin",
    joinedAt: "2024-01-10T08:30:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655300001",
    groupId: "550e8400-e29b-41d4-a716-446655660000",
    userId: "550e8400-e29b-41d4-a716-446655440001",
    role: "moderator",
    joinedAt: "2024-01-12T10:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655300002",
    groupId: "550e8400-e29b-41d4-a716-446655660000",
    userId: "550e8400-e29b-41d4-a716-446655440002",
    role: "member",
    joinedAt: "2024-01-15T14:30:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655300003",
    groupId: "550e8400-e29b-41d4-a716-446655660000",
    userId: "550e8400-e29b-41d4-a716-446655440003",
    role: "member",
    joinedAt: "2024-01-20T09:15:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655300004",
    groupId: "550e8400-e29b-41d4-a716-446655660000",
    userId: "550e8400-e29b-41d4-a716-446655440004",
    role: "member",
    joinedAt: "2024-02-01T11:45:00Z",
  },
  // FPS Lovers group members
  {
    id: "550e8400-e29b-41d4-a716-446655300005",
    groupId: "550e8400-e29b-41d4-a716-446655660001",
    userId: "550e8400-e29b-41d4-a716-446655440001",
    role: "admin",
    joinedAt: "2024-01-20T14:15:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655300006",
    groupId: "550e8400-e29b-41d4-a716-446655660001",
    userId: "550e8400-e29b-41d4-a716-446655440000",
    role: "member",
    joinedAt: "2024-01-22T16:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655300007",
    groupId: "550e8400-e29b-41d4-a716-446655660001",
    userId: "550e8400-e29b-41d4-a716-446655440003",
    role: "member",
    joinedAt: "2024-01-25T10:30:00Z",
  },
  // Competitive Esports group members
  {
    id: "550e8400-e29b-41d4-a716-446655300008",
    groupId: "550e8400-e29b-41d4-a716-446655660002",
    userId: "550e8400-e29b-41d4-a716-446655440005",
    role: "admin",
    joinedAt: "2024-02-05T11:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655300009",
    groupId: "550e8400-e29b-41d4-a716-446655660002",
    userId: "550e8400-e29b-41d4-a716-446655440001",
    role: "moderator",
    joinedAt: "2024-02-06T09:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655300010",
    groupId: "550e8400-e29b-41d4-a716-446655660002",
    userId: "550e8400-e29b-41d4-a716-446655440003",
    role: "member",
    joinedAt: "2024-02-10T14:20:00Z",
  },
  // MOBA Players Unite group members
  {
    id: "550e8400-e29b-41d4-a716-446655300011",
    groupId: "550e8400-e29b-41d4-a716-446655660003",
    userId: "550e8400-e29b-41d4-a716-446655440002",
    role: "admin",
    joinedAt: "2024-01-25T09:20:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655300012",
    groupId: "550e8400-e29b-41d4-a716-446655660003",
    userId: "550e8400-e29b-41d4-a716-446655440000",
    role: "member",
    joinedAt: "2024-01-28T11:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655300013",
    groupId: "550e8400-e29b-41d4-a716-446655660003",
    userId: "550e8400-e29b-41d4-a716-446655440004",
    role: "member",
    joinedAt: "2024-02-02T15:30:00Z",
  },
  // Casual Gamers Squad group members
  {
    id: "550e8400-e29b-41d4-a716-446655300014",
    groupId: "550e8400-e29b-41d4-a716-446655660004",
    userId: "550e8400-e29b-41d4-a716-446655440003",
    role: "admin",
    joinedAt: "2024-02-15T13:45:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655300015",
    groupId: "550e8400-e29b-41d4-a716-446655660004",
    userId: "550e8400-e29b-41d4-a716-446655440000",
    role: "member",
    joinedAt: "2024-02-16T10:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655300016",
    groupId: "550e8400-e29b-41d4-a716-446655660004",
    userId: "550e8400-e29b-41d4-a716-446655440001",
    role: "member",
    joinedAt: "2024-02-17T14:15:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655300017",
    groupId: "550e8400-e29b-41d4-a716-446655660004",
    userId: "550e8400-e29b-41d4-a716-446655440002",
    role: "member",
    joinedAt: "2024-02-18T09:30:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655300018",
    groupId: "550e8400-e29b-41d4-a716-446655660004",
    userId: "550e8400-e29b-41d4-a716-446655440004",
    role: "moderator",
    joinedAt: "2024-02-19T16:00:00Z",
  },
];
