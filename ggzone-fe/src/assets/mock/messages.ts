export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  createdAt: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  participants: string[]; // user IDs
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export const mockConversations: Conversation[] = [
  {
    id: "conv1",
    participants: [
      "550e8400-e29b-41d4-a716-446655440000",
      "550e8400-e29b-41d4-a716-446655440001",
    ], // Alice & Bob
    lastMessage: "Hey! Want to play Valorant tonight?",
    lastMessageTime: "2024-02-15T18:30:00Z",
    unreadCount: 2,
  },
  {
    id: "conv2",
    participants: [
      "550e8400-e29b-41d4-a716-446655440000",
      "550e8400-e29b-41d4-a716-446655440002",
    ], // Alice & Charlie
    lastMessage: "Thanks for the game tips!",
    lastMessageTime: "2024-02-15T15:20:00Z",
    unreadCount: 0,
  },
  {
    id: "conv3",
    participants: [
      "550e8400-e29b-41d4-a716-446655440000",
      "550e8400-e29b-41d4-a716-446655440003",
    ], // Alice & David
    lastMessage: "See you in the tournament!",
    lastMessageTime: "2024-02-14T20:10:00Z",
    unreadCount: 1,
  },
];

export const mockMessages: Message[] = [
  // Conversation 1 (Alice & Bob) - Sorted by time (oldest first)
  {
    id: "m1",
    conversationId: "conv1",
    senderId: "550e8400-e29b-41d4-a716-446655440001", // Bob
    content: "Hey Alice! How are you?",
    createdAt: "2024-02-15T18:00:00Z",
    isRead: true,
  },
  {
    id: "m2",
    conversationId: "conv1",
    senderId: "550e8400-e29b-41d4-a716-446655440000", // Alice
    content: "Hi Bob! I'm good, thanks! How about you?",
    createdAt: "2024-02-15T18:05:00Z",
    isRead: true,
  },
  {
    id: "m3",
    conversationId: "conv1",
    senderId: "550e8400-e29b-41d4-a716-446655440001", // Bob
    content: "Doing great! Just finished a ranked match.",
    createdAt: "2024-02-15T18:10:00Z",
    isRead: true,
  },
  {
    id: "m4",
    conversationId: "conv1",
    senderId: "550e8400-e29b-41d4-a716-446655440000", // Alice
    content: "Nice! Did you win?",
    createdAt: "2024-02-15T18:15:00Z",
    isRead: true,
  },
  {
    id: "m5",
    conversationId: "conv1",
    senderId: "550e8400-e29b-41d4-a716-446655440001", // Bob
    content: "Yeah! 13-7. It was intense!",
    createdAt: "2024-02-15T18:20:00Z",
    isRead: true,
  },
  {
    id: "m6",
    conversationId: "conv1",
    senderId: "550e8400-e29b-41d4-a716-446655440000", // Alice
    content: "Awesome! Congrats! 🎉",
    createdAt: "2024-02-15T18:25:00Z",
    isRead: true,
  },
  {
    id: "m7",
    conversationId: "conv1",
    senderId: "550e8400-e29b-41d4-a716-446655440001", // Bob
    content: "Hey! Want to play Valorant tonight?",
    createdAt: "2024-02-15T18:30:00Z",
    isRead: false,
  },
  {
    id: "m8",
    conversationId: "conv1",
    senderId: "550e8400-e29b-41d4-a716-446655440001", // Bob
    content: "Around 8 PM?",
    createdAt: "2024-02-15T18:31:00Z",
    isRead: false,
  },

  // Conversation 2 (Alice & Charlie)
  {
    id: "m9",
    conversationId: "conv2",
    senderId: "550e8400-e29b-41d4-a716-446655440002", // Charlie
    content: "Hey, can you help me with League builds?",
    createdAt: "2024-02-15T15:00:00Z",
    isRead: true,
  },
  {
    id: "m10",
    conversationId: "conv2",
    senderId: "550e8400-e29b-41d4-a716-446655440000", // Alice
    content: "Sure! What champion are you playing?",
    createdAt: "2024-02-15T15:05:00Z",
    isRead: true,
  },
  {
    id: "m11",
    conversationId: "conv2",
    senderId: "550e8400-e29b-41d4-a716-446655440002", // Charlie
    content: "I'm trying to learn Yasuo",
    createdAt: "2024-02-15T15:10:00Z",
    isRead: true,
  },
  {
    id: "m12",
    conversationId: "conv2",
    senderId: "550e8400-e29b-41d4-a716-446655440000", // Alice
    content: "No problem! Let me know if you need more help.",
    createdAt: "2024-02-15T15:15:00Z",
    isRead: true,
  },
  {
    id: "m13",
    conversationId: "conv2",
    senderId: "550e8400-e29b-41d4-a716-446655440002", // Charlie
    content: "Thanks for the game tips!",
    createdAt: "2024-02-15T15:20:00Z",
    isRead: true,
  },

  // Conversation 3 (Alice & David)
  {
    id: "m14",
    conversationId: "conv3",
    senderId: "550e8400-e29b-41d4-a716-446655440003", // David
    content: "Are you joining the tournament this weekend?",
    createdAt: "2024-02-14T20:00:00Z",
    isRead: true,
  },
  {
    id: "m15",
    conversationId: "conv3",
    senderId: "550e8400-e29b-41d4-a716-446655440000", // Alice
    content: "Yes! I already registered.",
    createdAt: "2024-02-14T20:02:00Z",
    isRead: true,
  },
  {
    id: "m16",
    conversationId: "conv3",
    senderId: "550e8400-e29b-41d4-a716-446655440003", // David
    content: "Great! We should team up.",
    createdAt: "2024-02-14T20:04:00Z",
    isRead: true,
  },
  {
    id: "m17",
    conversationId: "conv3",
    senderId: "550e8400-e29b-41d4-a716-446655440000", // Alice
    content: "Good luck! We'll crush it!",
    createdAt: "2024-02-14T20:05:00Z",
    isRead: true,
  },
  {
    id: "m18",
    conversationId: "conv3",
    senderId: "550e8400-e29b-41d4-a716-446655440003", // David
    content: "See you in the tournament!",
    createdAt: "2024-02-14T20:10:00Z",
    isRead: false,
  },
];
