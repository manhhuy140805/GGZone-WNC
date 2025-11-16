export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}

export interface Conversation {
  userId: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export const mockMessages: Message[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655100000",
    senderId: "550e8400-e29b-41d4-a716-446655440000",
    receiverId: "550e8400-e29b-41d4-a716-446655440001",
    content: "Hey Bob! Want to play some Valorant tonight?",
    isRead: true,
    createdAt: "2024-11-14T18:30:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655100001",
    senderId: "550e8400-e29b-41d4-a716-446655440001",
    receiverId: "550e8400-e29b-41d4-a716-446655440000",
    content: "Sure! I'll be online around 8 PM. Let's do some ranked games.",
    isRead: true,
    createdAt: "2024-11-14T18:45:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655100002",
    senderId: "550e8400-e29b-41d4-a716-446655440000",
    receiverId: "550e8400-e29b-41d4-a716-446655440001",
    content: "Perfect! See you then 🎮",
    isRead: true,
    createdAt: "2024-11-14T18:50:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655100003",
    senderId: "550e8400-e29b-41d4-a716-446655440002",
    receiverId: "550e8400-e29b-41d4-a716-446655440000",
    content: "Alice, did you see the tournament announcement?",
    isRead: false,
    createdAt: "2024-11-15T07:30:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655100004",
    senderId: "550e8400-e29b-41d4-a716-446655440003",
    receiverId: "550e8400-e29b-41d4-a716-446655440004",
    content: "Emma, thanks for the gaming tips yesterday!",
    isRead: true,
    createdAt: "2024-11-14T10:15:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655100005",
    senderId: "550e8400-e29b-41d4-a716-446655440004",
    receiverId: "550e8400-e29b-41d4-a716-446655440003",
    content: "No problem! Happy to help. Let me know if you need more coaching.",
    isRead: true,
    createdAt: "2024-11-14T10:30:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655100006",
    senderId: "550e8400-e29b-41d4-a716-446655440005",
    receiverId: "550e8400-e29b-41d4-a716-446655440000",
    content: "Hi Alice, we'd love to have you as a moderator for the upcoming tournament.",
    isRead: true,
    createdAt: "2024-11-13T14:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655100007",
    senderId: "550e8400-e29b-41d4-a716-446655440000",
    receiverId: "550e8400-e29b-41d4-a716-446655440005",
    content: "That sounds great! I'd be honored. When do we start?",
    isRead: true,
    createdAt: "2024-11-13T14:30:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655100008",
    senderId: "550e8400-e29b-41d4-a716-446655440001",
    receiverId: "550e8400-e29b-41d4-a716-446655440002",
    content: "Charlie, are you joining the CS2 tournament this weekend?",
    isRead: true,
    createdAt: "2024-11-12T16:20:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655100009",
    senderId: "550e8400-e29b-41d4-a716-446655440002",
    receiverId: "550e8400-e29b-41d4-a716-446655440001",
    content: "Yes! Already registered. Need one more player for our team.",
    isRead: true,
    createdAt: "2024-11-12T16:45:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655100010",
    senderId: "550e8400-e29b-41d4-a716-446655440003",
    receiverId: "550e8400-e29b-41d4-a716-446655440000",
    content: "Hey, I sent you a friend request. Hope we can play together sometime!",
    isRead: false,
    createdAt: "2024-11-15T10:30:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655100011",
    senderId: "550e8400-e29b-41d4-a716-446655440004",
    receiverId: "550e8400-e29b-41d4-a716-446655440001",
    content: "Bob, your stream yesterday was amazing! Keep it up 👍",
    isRead: true,
    createdAt: "2024-11-14T20:00:00Z",
  },
];

// Helper function to get conversations for a user
export const getConversationsForUser = (userId: string): Conversation[] => {
  const conversations = new Map<string, Conversation>();

  mockMessages.forEach((message) => {
    let otherUserId: string;
    if (message.senderId === userId) {
      otherUserId = message.receiverId;
    } else if (message.receiverId === userId) {
      otherUserId = message.senderId;
    } else {
      return;
    }

    const existing = conversations.get(otherUserId);
    const messageTime = new Date(message.createdAt).getTime();

    if (
      !existing ||
      new Date(existing.lastMessageTime).getTime() < messageTime
    ) {
      conversations.set(otherUserId, {
        userId: otherUserId,
        lastMessage: message.content,
        lastMessageTime: message.createdAt,
        unreadCount:
          message.receiverId === userId && !message.isRead
            ? (existing?.unreadCount || 0) + 1
            : existing?.unreadCount || 0,
      });
    }
  });

  return Array.from(conversations.values()).sort(
    (a, b) =>
      new Date(b.lastMessageTime).getTime() -
      new Date(a.lastMessageTime).getTime()
  );
};
