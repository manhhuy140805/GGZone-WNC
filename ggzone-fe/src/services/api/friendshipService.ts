import { HttpClient, ApiError } from '@/lib/utils/httpClient';
import { API_CONFIG } from '@/lib/constants/api';
import { User } from '@/types';

export interface Friendship {
  id: string;
  friendshipId: string;
  friend?: User;
  createdAt: string;
}

export interface FriendRequest {
  id: string;
  createdAt: string;
  user?: User;
}

export interface FriendSuggestion {
  id: string;
  reason: string;
  score: number;
  user?: User;
}

export interface FriendsResponse {
  success: boolean;
  data?: Friendship[];
  message?: string;
}

export interface FriendRequestsResponse {
  success: boolean;
  data?: FriendRequest[];
  message?: string;
}

export interface SuggestionsResponse {
  success: boolean;
  data?: FriendSuggestion[];
  message?: string;
}

export interface FriendshipResponse {
  success: boolean;
  message?: string;
}

class FriendshipService {
  // Lấy danh sách bạn bè
  async getFriends(userId: string): Promise<FriendsResponse> {
    try {
      const token = localStorage.getItem('ggzone_auth_token');
      if (!token) {
        return {
          success: false,
          message: 'Vui lòng đăng nhập',
        };
      }

      const response = await HttpClient.get<any>(
        API_CONFIG.ENDPOINTS.FRIENDSHIPS.FRIENDS(userId),
        true
      );
      const friends = response.data || response;
      return {
        success: true,
        data: Array.isArray(friends) ? friends : friends.data || [],
      };
    } catch (error) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError.message || 'Lỗi khi lấy danh sách bạn bè',
      };
    }
  }

  // Lấy danh sách yêu cầu kết bạn
  async getFriendRequests(userId: string): Promise<FriendRequestsResponse> {
    try {
      const token = localStorage.getItem('ggzone_auth_token');
      if (!token) {
        return {
          success: false,
          message: 'Vui lòng đăng nhập',
        };
      }

      const response = await HttpClient.get<any>(
        API_CONFIG.ENDPOINTS.FRIENDSHIPS.REQUESTS(userId),
        true
      );
      const requests = response.data || response;
      return {
        success: true,
        data: Array.isArray(requests) ? requests : requests.data || [],
      };
    } catch (error) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError.message || 'Lỗi khi lấy yêu cầu kết bạn',
      };
    }
  }

  // Lấy danh sách yêu cầu đã gửi
  async getSentRequests(userId: string): Promise<FriendsResponse> {
    try {
      const token = localStorage.getItem('ggzone_auth_token');
      if (!token) {
        return {
          success: false,
          message: 'Vui lòng đăng nhập',
        };
      }

      const response = await HttpClient.get<any>(
        API_CONFIG.ENDPOINTS.FRIENDSHIPS.SENT(userId),
        true
      );
      const requests = response.data || response;
      return {
        success: true,
        data: Array.isArray(requests) ? requests : requests.data || [],
      };
    } catch (error) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError.message || 'Lỗi khi lấy yêu cầu đã gửi',
      };
    }
  }

  // Lấy gợi ý kết bạn
  async getFriendSuggestions(userId: string): Promise<SuggestionsResponse> {
    try {
      const token = localStorage.getItem('ggzone_auth_token');
      if (!token) {
        return {
          success: false,
          message: 'Vui lòng đăng nhập',
        };
      }

      const response = await HttpClient.get<any>(
        API_CONFIG.ENDPOINTS.FRIENDSHIPS.SUGGESTIONS(userId),
        true
      );
      const suggestions = response.data || response;
      return {
        success: true,
        data: Array.isArray(suggestions) ? suggestions : suggestions.data || [],
      };
    } catch (error) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError.message || 'Lỗi khi lấy gợi ý kết bạn',
      };
    }
  }

  // Gửi yêu cầu kết bạn
  async sendFriendRequest(friendId: string): Promise<FriendshipResponse> {
    try {
      const token = localStorage.getItem('ggzone_auth_token');
      if (!token) {
        return {
          success: false,
          message: 'Vui lòng đăng nhập',
        };
      }

      await HttpClient.post(
        API_CONFIG.ENDPOINTS.FRIENDSHIPS.SEND,
        { friendId },
        true
      );
      return {
        success: true,
        message: 'Yêu cầu kết bạn đã được gửi',
      };
    } catch (error) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError.message || 'Lỗi khi gửi yêu cầu kết bạn',
      };
    }
  }

  // Chấp nhận yêu cầu kết bạn
  async acceptFriendRequest(friendshipId: string): Promise<FriendshipResponse> {
    try {
      const token = localStorage.getItem('ggzone_auth_token');
      if (!token) {
        return {
          success: false,
          message: 'Vui lòng đăng nhập',
        };
      }

      await HttpClient.put(
        API_CONFIG.ENDPOINTS.FRIENDSHIPS.ACCEPT(friendshipId),
        {},
        true
      );
      return {
        success: true,
        message: 'Yêu cầu kết bạn đã được chấp nhận',
      };
    } catch (error) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError.message || 'Lỗi khi chấp nhận yêu cầu kết bạn',
      };
    }
  }

  // Từ chối yêu cầu kết bạn
  async declineFriendRequest(friendshipId: string): Promise<FriendshipResponse> {
    try {
      const token = localStorage.getItem('ggzone_auth_token');
      if (!token) {
        return {
          success: false,
          message: 'Vui lòng đăng nhập',
        };
      }

      await HttpClient.put(
        API_CONFIG.ENDPOINTS.FRIENDSHIPS.DECLINE(friendshipId),
        {},
        true
      );
      return {
        success: true,
        message: 'Yêu cầu kết bạn đã bị từ chối',
      };
    } catch (error) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError.message || 'Lỗi khi từ chối yêu cầu kết bạn',
      };
    }
  }

  // Xóa bạn bè
  async removeFriend(friendshipId: string): Promise<FriendshipResponse> {
    try {
      const token = localStorage.getItem('ggzone_auth_token');
      if (!token) {
        return {
          success: false,
          message: 'Vui lòng đăng nhập',
        };
      }

      await HttpClient.delete(
        API_CONFIG.ENDPOINTS.FRIENDSHIPS.REMOVE(friendshipId),
        true
      );
      return {
        success: true,
        message: 'Bạn bè đã bị xóa',
      };
    } catch (error) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError.message || 'Lỗi khi xóa bạn bè',
      };
    }
  }

  // Bỏ qua gợi ý
  async dismissSuggestion(suggestionId: string): Promise<FriendshipResponse> {
    try {
      const token = localStorage.getItem('ggzone_auth_token');
      if (!token) {
        return {
          success: false,
          message: 'Vui lòng đăng nhập',
        };
      }

      await HttpClient.put(
        API_CONFIG.ENDPOINTS.FRIENDSHIPS.DISMISS_SUGGESTION(suggestionId),
        {},
        true
      );
      return {
        success: true,
        message: 'Gợi ý đã bị bỏ qua',
      };
    } catch (error) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError.message || 'Lỗi khi bỏ qua gợi ý',
      };
    }
  }
}

export const friendshipService = new FriendshipService();
