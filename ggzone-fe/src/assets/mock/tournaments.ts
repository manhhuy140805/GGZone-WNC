export interface Tournament {
  id: string;
  gameId?: string;
  name: string;
  description?: string;
  coverImageUrl?: string;
  startDate: string;
  endDate: string;
  maxParticipants: number;
  currentParticipants: number;
  prizePool: number;
  status: "upcoming" | "ongoing" | "completed";
  createdBy?: string;
  createdAt: string;
}

export interface TournamentParticipant {
  id: string;
  tournamentId: string;
  userId: string;
  rank?: number;
  score: number;
  joinedAt: string;
}

export const mockTournaments: Tournament[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655771000",
    gameId: "550e8400-e29b-41d4-a716-446655550000",
    name: "Vietnam Valorant Cup 2024",
    description:
      "National esports tournament for Valorant. Prize pool: 50 million VND",
    coverImageUrl:
      "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600",
    startDate: "2024-11-20T18:00:00Z",
    endDate: "2024-11-22T20:00:00Z",
    maxParticipants: 16,
    currentParticipants: 12,
    prizePool: 50000000,
    status: "upcoming",
    createdBy: "550e8400-e29b-41d4-a716-446655440005",
    createdAt: "2024-11-01T10:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655771001",
    gameId: "550e8400-e29b-41d4-a716-446655550001",
    name: "League of Legends Regional Finals",
    description: "Final battle for the regional championship title",
    coverImageUrl:
      "https://images.pexels.com/photos/3634539/pexels-photo-3634539.jpeg?auto=compress&cs=tinysrgb&w=600",
    startDate: "2024-12-01T17:00:00Z",
    endDate: "2024-12-03T21:00:00Z",
    maxParticipants: 8,
    currentParticipants: 8,
    prizePool: 100000000,
    status: "upcoming",
    createdBy: "550e8400-e29b-41d4-a716-446655440005",
    createdAt: "2024-10-15T12:30:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655771002",
    gameId: "550e8400-e29b-41d4-a716-446655550002",
    name: "CS2 Weekly Showdown",
    description: "Weekly competitive tournament, everyone welcome",
    coverImageUrl:
      "https://images.pexels.com/photos/3550652/pexels-photo-3550652.jpeg?auto=compress&cs=tinysrgb&w=600",
    startDate: "2024-11-17T19:00:00Z",
    endDate: "2024-11-17T23:00:00Z",
    maxParticipants: 32,
    currentParticipants: 24,
    prizePool: 10000000,
    status: "upcoming",
    createdBy: "550e8400-e29b-41d4-a716-446655440001",
    createdAt: "2024-11-10T08:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655771003",
    gameId: "550e8400-e29b-41d4-a716-446655550001",
    name: "Last Month's Championship",
    description: "Final tournament of the season",
    coverImageUrl:
      "https://images.pexels.com/photos/3808517/pexels-photo-3808517.jpeg?auto=compress&cs=tinysrgb&w=600",
    startDate: "2024-10-01T18:00:00Z",
    endDate: "2024-10-03T20:00:00Z",
    maxParticipants: 16,
    currentParticipants: 16,
    prizePool: 75000000,
    status: "completed",
    createdBy: "550e8400-e29b-41d4-a716-446655440005",
    createdAt: "2024-09-10T14:00:00Z",
  },
];

export const mockTournamentParticipants: TournamentParticipant[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655781000",
    tournamentId: "550e8400-e29b-41d4-a716-446655771000",
    userId: "550e8400-e29b-41d4-a716-446655440000",
    rank: 1,
    score: 25,
    joinedAt: "2024-11-05T10:30:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655781001",
    tournamentId: "550e8400-e29b-41d4-a716-446655771000",
    userId: "550e8400-e29b-41d4-a716-446655440002",
    rank: 2,
    score: 20,
    joinedAt: "2024-11-05T11:15:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655781002",
    tournamentId: "550e8400-e29b-41d4-a716-446655771001",
    userId: "550e8400-e29b-41d4-a716-446655440001",
    score: 0,
    joinedAt: "2024-11-08T09:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655781003",
    tournamentId: "550e8400-e29b-41d4-a716-446655771003",
    userId: "550e8400-e29b-41d4-a716-446655440003",
    rank: 1,
    score: 35,
    joinedAt: "2024-09-15T15:00:00Z",
  },
];


// Additional tournaments
export const additionalMockTournaments: Tournament[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655771004",
    gameId: "550e8400-e29b-41d4-a716-446655550004",
    name: "Overwatch 2 Community Cup",
    description: "Friendly community tournament for all skill levels",
    coverImageUrl:
      "https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=600",
    startDate: "2024-11-25T18:00:00Z",
    endDate: "2024-11-26T22:00:00Z",
    maxParticipants: 12,
    currentParticipants: 8,
    prizePool: 20000000,
    status: "upcoming",
    createdBy: "550e8400-e29b-41d4-a716-446655440005",
    createdAt: "2024-11-05T10:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655771005",
    gameId: "550e8400-e29b-41d4-a716-446655550003",
    name: "DOTA 2 International Qualifiers",
    description: "Regional qualifiers for The International",
    coverImageUrl:
      "https://images.pexels.com/photos/3977908/pexels-photo-3977908.jpeg?auto=compress&cs=tinysrgb&w=600",
    startDate: "2024-12-10T16:00:00Z",
    endDate: "2024-12-15T23:00:00Z",
    maxParticipants: 16,
    currentParticipants: 14,
    prizePool: 150000000,
    status: "upcoming",
    createdBy: "550e8400-e29b-41d4-a716-446655440005",
    createdAt: "2024-10-20T12:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655771006",
    gameId: "550e8400-e29b-41d4-a716-446655550005",
    name: "Minecraft Building Contest",
    description: "Show off your creative building skills",
    coverImageUrl:
      "https://images.pexels.com/photos/3945657/pexels-photo-3945657.jpeg?auto=compress&cs=tinysrgb&w=600",
    startDate: "2024-11-18T10:00:00Z",
    endDate: "2024-11-30T23:59:00Z",
    maxParticipants: 50,
    currentParticipants: 32,
    prizePool: 5000000,
    status: "ongoing",
    createdBy: "550e8400-e29b-41d4-a716-446655440003",
    createdAt: "2024-11-01T08:00:00Z",
  },
];
