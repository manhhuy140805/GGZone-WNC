import { HttpClient, ApiError } from '@/lib/utils/httpClient';
import { API_CONFIG } from '@/lib/constants/api';
import { Game, Group } from '@/types';

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
      const [gamesRes, groupsRes] = await Promise.all([
        this.getAllGames(6),
        this.getAllGroups(4),
      ]);

      return {
        success: gamesRes.success && groupsRes.success,
        data: {
          trendingGames: gamesRes.data,
          popularGroups: groupsRes.data,
          trendingPosts: [],
          trendingPlayers: [],
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


}

export const homeService = new HomeService();
