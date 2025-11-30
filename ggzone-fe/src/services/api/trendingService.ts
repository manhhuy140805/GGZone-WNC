import { HttpClient, ApiError } from '@/lib/utils/httpClient';
import { API_CONFIG } from '@/lib/constants/api';
import { Game } from '@/types';

export interface TrendingItem {
  id: string;
  contentId: string;
  viewsCount: number;
  engagementScore: number;
  game?: Game;
}

export interface TrendingPlayer {
  id: string;
  score: number;
  winRate: number;
  totalMatches: number;
  user?: {
    id: string;
    username: string;
    fullName: string;
    avatarUrl: string;
  };
  game?: Game;
}

export interface TrendingVideo {
  id: string;
  contentId: string;
  viewsCount: number;
  engagementScore: number;
  video?: {
    id: string;
    title: string;
    thumbnailUrl: string;
    viewsCount: number;
    likesCount: number;
    user: {
      id: string;
      username: string;
      avatarUrl: string;
    };
  };
}

export interface TrendingPost {
  id: string;
  contentId: string;
  viewsCount: number;
  engagementScore: number;
  post?: {
    id: string;
    content: string;
    likesCount: number;
    commentsCount: number;
    createdAt: string;
    user: {
      id: string;
      username: string;
      avatarUrl: string;
    };
  };
}

export interface TrendingResponse<T> {
  success: boolean;
  data?: T[];
  message?: string;
}

class TrendingService {
  // Lấy trending games
  async getTrendingGames(limit: number = 10): Promise<TrendingResponse<TrendingItem>> {
    try {
      const response = await HttpClient.get<any>(
        API_CONFIG.ENDPOINTS.TRENDING.GAMES(limit),
        false
      );
      const games = response.data || response;
      return {
        success: true,
        data: Array.isArray(games) ? games : games.data || [],
      };
    } catch (error) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError.message || 'Lỗi khi lấy trending games',
      };
    }
  }

  // Lấy trending players
  async getTrendingPlayers(limit: number = 10): Promise<TrendingResponse<TrendingPlayer>> {
    try {
      const response = await HttpClient.get<any>(
        API_CONFIG.ENDPOINTS.TRENDING.PLAYERS(limit),
        false
      );
      const players = response.data || response;
      return {
        success: true,
        data: Array.isArray(players) ? players : players.data || [],
      };
    } catch (error) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError.message || 'Lỗi khi lấy trending players',
      };
    }
  }

  // Lấy trending videos
  async getTrendingVideos(limit: number = 10): Promise<TrendingResponse<TrendingVideo>> {
    try {
      const response = await HttpClient.get<any>(
        API_CONFIG.ENDPOINTS.TRENDING.VIDEOS(limit),
        false
      );
      const videos = response.data || response;
      return {
        success: true,
        data: Array.isArray(videos) ? videos : videos.data || [],
      };
    } catch (error) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError.message || 'Lỗi khi lấy trending videos',
      };
    }
  }

  // Lấy trending posts
  async getTrendingPosts(limit: number = 10): Promise<TrendingResponse<TrendingPost>> {
    try {
      const response = await HttpClient.get<any>(
        API_CONFIG.ENDPOINTS.TRENDING.POSTS(limit),
        false
      );
      const posts = response.data || response;
      return {
        success: true,
        data: Array.isArray(posts) ? posts : posts.data || [],
      };
    } catch (error) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError.message || 'Lỗi khi lấy trending posts',
      };
    }
  }
}

export const trendingService = new TrendingService();
