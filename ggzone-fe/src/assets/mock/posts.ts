export interface Post {
  id: string;
  userId: string;
  groupId?: string;
  content: string;
  postType: "text" | "video" | "image" | "gallery";
  videoUrl?: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PostMedia {
  id: string;
  postId: string;
  mediaUrl: string;
  mediaType: "image" | "video";
  orderIndex: number;
  createdAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  parentCommentId?: string;
  content: string;
  likesCount: number;
  createdAt: string;
  updatedAt: string;
  user?: {
    username: string;
    avatarUrl?: string;
  };
}

export const mockPosts: Post[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655441000",
    userId: "550e8400-e29b-41d4-a716-446655440000",
    groupId: "550e8400-e29b-41d4-a716-446655660000",
    content:
      "Hello everyone! Just joined this awesome gaming community. Looking forward to playing with all of you!",
    postType: "text",
    likesCount: 12,
    commentsCount: 3,
    sharesCount: 2,
    isPinned: false,
    createdAt: "2024-11-10T08:30:00Z",
    updatedAt: "2024-11-10T08:30:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655441001",
    userId: "550e8400-e29b-41d4-a716-446655440001",
    groupId: "550e8400-e29b-41d4-a716-446655660001",
    content: "Just got an ace in Valorant! FPS forever! 🎮",
    postType: "text",
    likesCount: 28,
    commentsCount: 8,
    sharesCount: 5,
    isPinned: false,
    createdAt: "2024-11-12T14:45:00Z",
    updatedAt: "2024-11-12T14:45:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655441002",
    userId: "550e8400-e29b-41d4-a716-446655440002",
    content:
      "Looking for teammates for competitive matches. Need dedicated players!",
    postType: "text",
    likesCount: 15,
    commentsCount: 5,
    sharesCount: 3,
    isPinned: false,
    createdAt: "2024-11-08T11:20:00Z",
    updatedAt: "2024-11-08T11:20:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655441003",
    userId: "550e8400-e29b-41d4-a716-446655440003",
    groupId: "550e8400-e29b-41d4-a716-446655660002",
    content: "Streaming CS2 tonight at 7 PM. Come watch and join the chat!",
    postType: "video",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    likesCount: 34,
    commentsCount: 12,
    sharesCount: 8,
    isPinned: true,
    createdAt: "2024-11-14T16:00:00Z",
    updatedAt: "2024-11-14T16:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655441004",
    userId: "550e8400-e29b-41d4-a716-446655440004",
    content: "Check out this amazing play in League of Legends!",
    postType: "image",
    likesCount: 42,
    commentsCount: 15,
    sharesCount: 10,
    isPinned: false,
    createdAt: "2024-11-13T13:15:00Z",
    updatedAt: "2024-11-13T13:15:00Z",
  },
];

export const mockPostMedia: PostMedia[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655441100",
    postId: "550e8400-e29b-41d4-a716-446655441004",
    mediaUrl:
      "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600",
    mediaType: "image",
    orderIndex: 0,
    createdAt: "2024-11-13T13:15:00Z",
  },
];

export const mockComments: Comment[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655441200",
    postId: "550e8400-e29b-41d4-a716-446655441000",
    userId: "550e8400-e29b-41d4-a716-446655440001",
    content: "Welcome to the community! Hope you enjoy gaming with us.",
    likesCount: 2,
    createdAt: "2024-11-10T09:00:00Z",
    updatedAt: "2024-11-10T09:00:00Z",
    user: {
      username: "bob",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
    },
  },
  {
    id: "550e8400-e29b-41d4-a716-446655441201",
    postId: "550e8400-e29b-41d4-a716-446655441000",
    userId: "550e8400-e29b-41d4-a716-446655440002",
    content: "Hello! Nice to meet you!",
    likesCount: 1,
    createdAt: "2024-11-10T10:30:00Z",
    updatedAt: "2024-11-10T10:30:00Z",
    user: {
      username: "charlie",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie",
    },
  },
  {
    id: "550e8400-e29b-41d4-a716-446655441202",
    postId: "550e8400-e29b-41d4-a716-446655441001",
    userId: "550e8400-e29b-41d4-a716-446655440000",
    content: "Great job! I can join you next time!",
    likesCount: 3,
    createdAt: "2024-11-12T15:00:00Z",
    updatedAt: "2024-11-12T15:00:00Z",
    user: {
      username: "alice",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
    },
  },
];
