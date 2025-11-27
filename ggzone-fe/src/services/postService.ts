import { HttpClient, ApiError } from '../utils/httpClient';
import { API_CONFIG } from '../config/api';
import { Post } from '../types';

export interface PostsResponse {
  success: boolean;
  data?: Post[];
  message?: string;
}

export interface PostResponse {
  success: boolean;
  data?: Post;
  message?: string;
}

class PostService {
  // Lấy feed posts của user hiện tại
  async getUserFeed(page: number = 1, pageSize: number = 20): Promise<PostsResponse> {
    try {
      const token = localStorage.getItem('ggzone_auth_token');
      if (!token) {
        return {
          success: false,
          message: 'Vui lòng đăng nhập',
        };
      }

      const response = await HttpClient.get<any>(
        API_CONFIG.ENDPOINTS.POSTS.FEED + `?page=${page}&pageSize=${pageSize}`,
        true
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
        message: apiError.message || 'Lỗi khi lấy feed posts',
      };
    }
  }

  // Lấy tất cả posts
  async getAllPosts(): Promise<PostsResponse> {
    try {
      const response = await HttpClient.get<any>(
        API_CONFIG.ENDPOINTS.POSTS.BASE,
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
        message: apiError.message || 'Lỗi khi lấy posts',
      };
    }
  }

  // Lấy post theo ID
  async getPostById(id: string): Promise<PostResponse> {
    try {
      const response = await HttpClient.get<any>(
        API_CONFIG.ENDPOINTS.POSTS.BY_ID(id),
        false
      );
      const post = response.data || response;
      return {
        success: true,
        data: post,
      };
    } catch (error) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError.message || 'Lỗi khi lấy post',
      };
    }
  }

  // Tạo post mới
  async createPost(content: string, groupId?: string, postType: string = 'text', videoUrl?: string): Promise<PostResponse> {
    try {
      const token = localStorage.getItem('ggzone_auth_token');
      if (!token) {
        return {
          success: false,
          message: 'Vui lòng đăng nhập',
        };
      }

      const response = await HttpClient.post<any>(
        API_CONFIG.ENDPOINTS.POSTS.BASE,
        {
          content,
          groupId,
          postType,
          videoUrl,
        },
        true
      );
      const post = response.data || response;
      return {
        success: true,
        data: post,
        message: 'Tạo post thành công',
      };
    } catch (error) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError.message || 'Lỗi khi tạo post',
      };
    }
  }

  // Like post
  async likePost(postId: string): Promise<{ success: boolean; message?: string }> {
    try {
      const token = localStorage.getItem('ggzone_auth_token');
      if (!token) {
        return {
          success: false,
          message: 'Vui lòng đăng nhập',
        };
      }

      await HttpClient.post(
        API_CONFIG.ENDPOINTS.POSTS.LIKE(postId),
        {},
        true
      );
      return {
        success: true,
        message: 'Like post thành công',
      };
    } catch (error) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError.message || 'Lỗi khi like post',
      };
    }
  }

  // Unlike post
  async unlikePost(postId: string): Promise<{ success: boolean; message?: string }> {
    try {
      const token = localStorage.getItem('ggzone_auth_token');
      if (!token) {
        return {
          success: false,
          message: 'Vui lòng đăng nhập',
        };
      }

      await HttpClient.delete(
        API_CONFIG.ENDPOINTS.POSTS.UNLIKE(postId),
        true
      );
      return {
        success: true,
        message: 'Unlike post thành công',
      };
    } catch (error) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError.message || 'Lỗi khi unlike post',
      };
    }
  }

  // Xóa post
  async deletePost(postId: string): Promise<{ success: boolean; message?: string }> {
    try {
      const token = localStorage.getItem('ggzone_auth_token');
      if (!token) {
        return {
          success: false,
          message: 'Vui lòng đăng nhập',
        };
      }

      await HttpClient.delete(
        API_CONFIG.ENDPOINTS.POSTS.DELETE(postId),
        true
      );
      return {
        success: true,
        message: 'Xóa post thành công',
      };
    } catch (error) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError.message || 'Lỗi khi xóa post',
      };
    }
  }
}

export const postService = new PostService();
