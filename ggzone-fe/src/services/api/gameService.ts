import { HttpClient, ApiError } from '@/lib/utils/httpClient';
import { API_CONFIG } from '@/lib/constants/api';
import { Game } from '@/types';

export interface GamesResponse {
  success: boolean;
  data?: Game[];
  message?: string;
}

export interface GameResponse {
  success: boolean;
  data?: Game;
  message?: string;
}

export interface TrendingGamesResponse {
  success: boolean;
  data?: Game[];
  message?: string;
}

export interface PaginatedGamesResponse {
  success: boolean;
  data?: {
    games: Game[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
  message?: string;
}

class GameService {
  // Lấy tất cả games
  async getAllGames(page?: number, pageSize?: number): Promise<GamesResponse> {
    try {
      let url: string;
      
      // Nếu có page và pageSize, sử dụng endpoint filter
      if (page && pageSize) {
        url = API_CONFIG.ENDPOINTS.GAMES.FILTER(undefined, undefined, page, pageSize);
      } else {
        url = API_CONFIG.ENDPOINTS.GAMES.BASE;
      }
      
      const response = await HttpClient.get<any>(url, false);
      const data = response.data || response;
      
      // Nếu có phân trang, trả về games từ data.games
      if (data.games) {
        return {
          success: true,
          data: Array.isArray(data.games) ? data.games : [],
        };
      }
      
      // Nếu không có phân trang, trả về toàn bộ data
      return {
        success: true,
        data: Array.isArray(data) ? data : [],
      };
    } catch (error) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError.message || 'Lỗi khi lấy danh sách games',
      };
    }
  }

  // Lấy số lượng games giới hạn (dùng cho featured games)
  async getFeaturedGames(limit: number = 3): Promise<GamesResponse> {
    return this.getAllGames(1, limit);
  }

  // Lấy game theo ID
  async getGameById(id: string): Promise<GameResponse> {
    try {
      const response = await HttpClient.get<any>(
        API_CONFIG.ENDPOINTS.GAMES.BY_ID(id),
        false
      );
      const game = response.data || response;
      return {
        success: true,
        data: game,
      };
    } catch (error) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError.message || 'Lỗi khi lấy thông tin game',
      };
    }
  }

  // Lấy game theo slug
  async getGameBySlug(slug: string): Promise<GameResponse> {
    try {
      const response = await HttpClient.get<any>(
        API_CONFIG.ENDPOINTS.GAMES.BY_SLUG(slug),
        false
      );
      const game = response.data || response;
      return {
        success: true,
        data: game,
      };
    } catch (error) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError.message || 'Lỗi khi lấy thông tin game',
      };
    }
  }
  
  // Lấy games với phân trang
  async getGamesPaginated(
    page: number = 1,
    pageSize: number = 12,
    genre?: string,
    platform?: string
  ): Promise<PaginatedGamesResponse> {
    try {
      const url = API_CONFIG.ENDPOINTS.GAMES.FILTER(genre, platform, page, pageSize);
      const response = await HttpClient.get<any>(url, false);
      const data = response.data || response;

      return {
        success: true,
        data: {
          games: Array.isArray(data) ? data : data.games || [],
          total: data.total || 0,
          page: data.page || page,
          pageSize: data.pageSize || pageSize,
          totalPages: data.totalPages || Math.ceil((data.total || 0) / pageSize),
        },
      };
    } catch (error) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError.message || 'Lỗi khi lấy danh sách games',
      };
    }
  }

  // Tìm kiếm games
  async searchGames(
    query: string,
    page: number = 1,
    pageSize: number = 12
  ): Promise<PaginatedGamesResponse> {
    try {
      const url = API_CONFIG.ENDPOINTS.GAMES.SEARCH(query, page, pageSize);
      const response = await HttpClient.get<any>(url, false);
      const data = response.data || response;

      return {
        success: true,
        data: {
          games: Array.isArray(data) ? data : data.games || [],
          total: data.total || 0,
          page: data.page || page,
          pageSize: data.pageSize || pageSize,
          totalPages: data.totalPages || Math.ceil((data.total || 0) / pageSize),
        },
      };
    } catch (error) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError.message || 'Lỗi khi tìm kiếm games',
      };
    }
  }

  // Lấy danh sách genres
  async getGenres(): Promise<{ success: boolean; data?: string[]; message?: string }> {
    try {
      const response = await HttpClient.get<any>(
        API_CONFIG.ENDPOINTS.GAMES.GENRES,
        false
      );
      const genres = Array.isArray(response) ? response : (response?.data || []);

      return {
        success: true,
        data: genres,
      };
    } catch (error) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError.message || 'Lỗi khi lấy danh sách genres',
      };
    }
  }

  // Lấy danh sách platforms
  async getPlatforms(): Promise<{ success: boolean; data?: string[]; message?: string }> {
    try {
      const response = await HttpClient.get<any>(
        API_CONFIG.ENDPOINTS.GAMES.PLATFORMS,
        false
      );
      const platforms = Array.isArray(response) ? response : (response?.data || []);

      return {
        success: true,
        data: platforms,
      };
    } catch (error) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError.message || 'Lỗi khi lấy danh sách platforms',
      };
    }
  }

  // Lấy games theo thể loại
  async getGamesByGenre(
    genre: string,
    page: number = 1,
    pageSize: number = 12
  ): Promise<PaginatedGamesResponse> {
    return this.getGamesPaginated(page, pageSize, genre);
  }

  // Lấy games theo nền tảng
  async getGamesByPlatform(
    platform: string,
    page: number = 1,
    pageSize: number = 12
  ): Promise<PaginatedGamesResponse> {
    return this.getGamesPaginated(page, pageSize, undefined, platform);
  }
}

export const gameService = new GameService();
