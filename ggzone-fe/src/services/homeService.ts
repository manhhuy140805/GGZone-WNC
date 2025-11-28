import { HttpClient, ApiError } from '../utils/httpClient';
import { API_CONFIG } from '../config/api';
import { Game, Group } from '../types';

export interface Post {
  id: string;
  title?: string;
  content: string;
  author?: {
    id: string;
    username: string;
    avatar?: string;
  };
  createdAt?: string;
  likes?: number;
  comments?: number;
}

export interface User {
  id: string;
  username: string;
  avatar?: string;
  level?: number;
  followers?: number;
}

export interface HomeDataResponse {
  success: boolean;
  data?: {
    trendingGames?: Game[];
    popularGroups?: Group[];
    trendingPosts?: Post[];
    trendingPlayers?: User[];
  };
  message?: string;
}

class HomeService {
  // Lấy dữ liệu cho trang Home
  async getHomeData(): Promise<HomeDataResponse> {
    try {
      const [gamesRes, groupsRes, postsRes, playersRes] = await Promise.all([
        this.getAllGames(6),
        this.getAllGroups(4),
        this.getTrendingPosts(4),
        this.getTrendingPlayers(4),
      ]);

      return {
        success: gamesRes.success && groupsRes.success && postsRes.success && playersRes.success,
        data: {
          trendingGames: gamesRes.data,
          popularGroups: groupsRes.data,
          trendingPosts: postsRes.data,
          trendingPlayers: playersRes.data,
        },
      };
    } catch (error) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError.message || 'Lỗi khi tải dữ liệu trang Home',
      };
    }
  }

  // Lấy tất cả games (không lọc)
  async getAllGames(limit: number = 6): Promise<{ success: boolean; data?: Game[] }> {
    try {
      const response = await HttpClient.get<any>(
        API_CONFIG.ENDPOINTS.GAMES.BASE,
        false
      );
      const games = response.data || response;
      const gamesArray = Array.isArray(games) ? games : games.data || [];
      
      return {
        success: true,
        data: gamesArray.slice(0, limit),
      };
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Lỗi khi lấy games:', apiError);
      return {
        success: false,
        data: [],
      };
    }
  }

  // Lấy tất cả groups
  async getAllGroups(limit: number = 4): Promise<{ success: boolean; data?: Group[] }> {
    try {
      const response = await HttpClient.get<any>(
        API_CONFIG.ENDPOINTS.GROUPS.BASE,
        false
      );
      const groups = response.data || response;
      const groupsArray = Array.isArray(groups) ? groups : groups.data || [];
      
      return {
        success: true,
        data: groupsArray.slice(0, limit),
      };
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Lỗi khi lấy groups:', apiError);
      return {
        success: false,
        data: [],
      };
    }
  }

  // Lấy trending posts
  async getTrendingPosts(limit: number = 4): Promise<{ success: boolean; data?: Post[] }> {
    try {
      const response = await HttpClient.get<any>(
        API_CONFIG.ENDPOINTS.TRENDING.POSTS(limit),
        false
      );
      const posts = response.data || response;
      const postsArray = Array.isArray(posts) ? posts : posts.data || [];
      
      return {
        success: true,
        data: postsArray.slice(0, limit),
      };
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Lỗi khi lấy trending posts:', apiError);
      return {
        success: false,
        data: [],
      };
    }
  }

  // Lấy trending players
  async getTrendingPlayers(limit: number = 4): Promise<{ success: boolean; data?: User[] }> {
    try {
      const response = await HttpClient.get<any>(
        API_CONFIG.ENDPOINTS.TRENDING.PLAYERS(limit),
        false
      );
      const players = response.data || response;
      const playersArray = Array.isArray(players) ? players : players.data || [];
      
      return {
        success: true,
        data: playersArray.slice(0, limit),
      };
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Lỗi khi lấy trending players:', apiError);
      return {
        success: false,
        data: [],
      };
    }
  }
}

export const homeService = new HomeService();
