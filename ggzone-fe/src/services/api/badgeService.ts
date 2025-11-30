import { HttpClient, ApiError } from '@/lib/utils/httpClient';
import { API_CONFIG } from '@/lib/constants/api';

export interface Badge {
  id: string;
  badgeName: string;
  badgeType: string;
  iconUrl: string;
  awardedAt: string;
}

export interface BadgesResponse {
  success: boolean;
  data?: Badge[];
  message?: string;
}

export interface AllBadgesResponse {
  success: boolean;
  data?: Badge[];
  message?: string;
}

class BadgeService {
  // Lấy badges của user
  async getUserBadges(userId: string): Promise<BadgesResponse> {
    try {
      const response = await HttpClient.get<any>(
        API_CONFIG.ENDPOINTS.BADGES.BY_USER(userId),
        false
      );
      const badges = response.data || response;
      return {
        success: true,
        data: Array.isArray(badges) ? badges : badges.data || [],
      };
    } catch (error) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError.message || 'Lỗi khi lấy badges',
      };
    }
  }

  // Lấy tất cả badges
  async getAllBadges(): Promise<AllBadgesResponse> {
    try {
      const response = await HttpClient.get<any>(
        API_CONFIG.ENDPOINTS.BADGES.ALL,
        false
      );
      const badges = response.data || response;
      return {
        success: true,
        data: Array.isArray(badges) ? badges : badges.data || [],
      };
    } catch (error) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError.message || 'Lỗi khi lấy danh sách badges',
      };
    }
  }

  // Award badge cho user
  async awardBadge(userId: string, badgeName: string, badgeType: string, iconUrl: string): Promise<BadgesResponse> {
    try {
      const token = localStorage.getItem('ggzone_auth_token');
      if (!token) {
        return {
          success: false,
          message: 'Vui lòng đăng nhập',
        };
      }

      const response = await HttpClient.post<any>(
        API_CONFIG.ENDPOINTS.BADGES.AWARD,
        {
          userId,
          badgeName,
          badgeType,
          iconUrl,
        },
        true
      );
      const badge = response.data || response;
      return {
        success: true,
        data: [badge],
        message: 'Award badge thành công',
      };
    } catch (error) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError.message || 'Lỗi khi award badge',
      };
    }
  }

  // Xóa badge
  async removeBadge(badgeId: string): Promise<{ success: boolean; message?: string }> {
    try {
      const token = localStorage.getItem('ggzone_auth_token');
      if (!token) {
        return {
          success: false,
          message: 'Vui lòng đăng nhập',
        };
      }

      await HttpClient.delete(
        API_CONFIG.ENDPOINTS.BADGES.REMOVE(badgeId),
        true
      );
      return {
        success: true,
        message: 'Xóa badge thành công',
      };
    } catch (error) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError.message || 'Lỗi khi xóa badge',
      };
    }
  }
}

export const badgeService = new BadgeService();
