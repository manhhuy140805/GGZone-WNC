import { HttpClient, ApiError } from '@/lib/utils/httpClient';
import { API_CONFIG } from '@/lib/constants/api';
import { Group } from '@/types';

export interface GroupsResponse {
  success: boolean;
  data?: Group[];
  message?: string;
}

export interface GroupResponse {
  success: boolean;
  data?: Group;
  message?: string;
}

export interface GroupPostsResponse {
  success: boolean;
  data?: any[];
  message?: string;
}

export interface GroupActionResponse {
  success: boolean;
  message?: string;
}

class GroupService {
  // Lấy tất cả groups
  async getAllGroups(): Promise<GroupsResponse> {
    try {
      const response = await HttpClient.get<any>(
        API_CONFIG.ENDPOINTS.GROUPS.BASE,
        false
      );
      const groups = response.data || response;
      return {
        success: true,
        data: Array.isArray(groups) ? groups : groups.data || [],
      };
    } catch (error) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError.message || 'Lỗi khi lấy danh sách groups',
      };
    }
  }

  // Lấy group theo ID
  async getGroupById(id: string): Promise<GroupResponse> {
    try {
      const response = await HttpClient.get<any>(
        API_CONFIG.ENDPOINTS.GROUPS.BY_ID(id),
        false
      );
      const group = response.data || response;
      return {
        success: true,
        data: group,
      };
    } catch (error) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError.message || 'Lỗi khi lấy thông tin group',
      };
    }
  }

  // Lấy posts của group
  async getGroupPosts(groupId: string, page: number = 1, pageSize: number = 20): Promise<GroupPostsResponse> {
    try {
      const response = await HttpClient.get<any>(
        API_CONFIG.ENDPOINTS.GROUPS.POSTS(groupId, page, pageSize),
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
        message: apiError.message || 'Lỗi khi lấy posts của group',
      };
    }
  }

  // Tạo group mới
  async createGroup(name: string, description?: string, coverImageUrl?: string, iconUrl?: string, visibility?: string): Promise<GroupResponse> {
    try {
      const token = localStorage.getItem('ggzone_auth_token');
      if (!token) {
        return {
          success: false,
          message: 'Vui lòng đăng nhập',
        };
      }

      const response = await HttpClient.post<any>(
        API_CONFIG.ENDPOINTS.GROUPS.BASE,
        {
          name,
          description,
          coverImageUrl,
          iconUrl,
          visibility,
        },
        true
      );
      const group = response.data || response;
      return {
        success: true,
        data: group,
        message: 'Tạo group thành công',
      };
    } catch (error) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError.message || 'Lỗi khi tạo group',
      };
    }
  }

  // Tham gia group
  async joinGroup(groupId: string): Promise<GroupActionResponse> {
    try {
      const token = localStorage.getItem('ggzone_auth_token');
      if (!token) {
        return {
          success: false,
          message: 'Vui lòng đăng nhập',
        };
      }

      await HttpClient.post(
        API_CONFIG.ENDPOINTS.GROUPS.JOIN(groupId),
        {},
        true
      );
      return {
        success: true,
        message: 'Tham gia group thành công',
      };
    } catch (error) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError.message || 'Lỗi khi tham gia group',
      };
    }
  }

  // Rời khỏi group
  async leaveGroup(groupId: string): Promise<GroupActionResponse> {
    try {
      const token = localStorage.getItem('ggzone_auth_token');
      if (!token) {
        return {
          success: false,
          message: 'Vui lòng đăng nhập',
        };
      }

      await HttpClient.delete(
        API_CONFIG.ENDPOINTS.GROUPS.LEAVE(groupId),
        true
      );
      return {
        success: true,
        message: 'Rời khỏi group thành công',
      };
    } catch (error) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError.message || 'Lỗi khi rời khỏi group',
      };
    }
  }
}

export const groupService = new GroupService();
