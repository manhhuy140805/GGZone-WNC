import { HttpClient, ApiError } from '../utils/httpClient';
import { API_CONFIG } from '../config/api';
import { Game } from '../types';

export interface Group {
  id: string;
  name: string;
  description?: string;
  image?: string;
  memberCount?: number;
}

export interface HomeDataResponse {
  success: boolean;
  data?: {
    trendingGames?: Game[];
    popularGroups?: Group[];
  };
  message?: string;
}

class HomeService {
  // Lấy dữ liệu cho trang Home (games + groups) - 6 items games (3x2), 4 items groups (2x2)
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

  // Lấy tất cả games
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
