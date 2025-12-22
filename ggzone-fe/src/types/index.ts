// Common types used across the application

export interface User {
  id: string;
  username: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
  coverImageUrl?: string;
  bio?: string;
  location?: string;
  role?: string;
  isVerified?: boolean;
  status?: string;
  createdAt?: string;
  stats?: {
    friendsCount: number;
    winningCount: number;
    tournamentsCount: number;
    postsCount: number;
    photosCount: number;
    videosCount: number;
    forumsCount: number;
    groupsCount: number;
    totalPoints: number;
    level: number;
  };
}

export interface Game {
  id: string;
  name: string;
  description: string;
  coverImageUrl: string;
  genre: string;
  platform: string;
  releaseDate: string;
  publisher: string;
  gameType?: string;
  installSize?: string;
  minimumRequirements?: string;
  recommendedRequirements?: string;
  photos?: Array<{
    id: string;
    imageUrl: string;
    caption?: string;
  }>;
  videos?: Array<{
    id: string;
    title: string;
    videoUrl: string;
    thumbnailUrl: string;
    viewsCount: number;
  }>;
  gameReviews?: Array<{
    id: string;
    userId: string;
    rating: number;
    title: string;
    content: string;
    hoursPlayed: number;
    isRecommended: boolean;
    createdAt: string;
  }>;
}

export interface Group {
  id: string;
  name: string;
  description?: string;
  membersCount: number;
  posts: number;
  createdAt: string;
  coverImageUrl: string;
  iconUrl?: string;
  visibility: string;
}

export interface MarketplaceItem {
  id: string;
  title: string;
  name?: string;
  description: string;
  price: number;
  coverImageUrl: string;
  category: string;
  platform: string;
  rating: number;
  reviewsCount: number;
  status: string;
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  postType: string;
  videoUrl?: string;
  isPinned?: boolean;
  groupId?: string;
  isLiked?: boolean;
}

export interface Photo {
  id: string;
  userId: string;
  imageUrl: string;
  caption: string;
  likesCount: number;
}

export interface Comment {
  id: string;
  postId: string;
  content: string;
  createdAt: string;
  likesCount: number;
  user?: User;
}
