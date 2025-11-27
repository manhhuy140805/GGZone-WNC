import { HttpClient, ApiError } from '../utils/httpClient';
import { API_CONFIG } from '../config/api';
import { Game } from '../types';

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

class GameService {
  // Lấy tất cả games
  async getAllGames(): Promise<GamesResponse> {
    try {
      const response = await HttpClient.get<any>(
        API_CONFIG.ENDPOINTS.GAMES.BASE,
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
        message: apiError.message || 'Lỗi khi lấy danh sách games',
      };
    }
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

  // Lấy trending games
  async getTrendingGames(limit: number = 10): Promise<TrendingGamesResponse> {
    try {
      const response = await HttpClient.get<any>(
        API_CONFIG.ENDPOINTS.GAMES.TRENDING(limit),
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
}

export const gameService = new GameService();
