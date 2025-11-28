import { HttpClient, ApiError } from '../utils/httpClient';
import { API_CONFIG } from '../config/api';

export interface Post {
  id: string;
  content: string;
  createdAt: string;
  likeCount: number;
  commentCount: number;
  author: {
    id: string;
    username: string;
    avatarUrl?: string;
  };
  gameId?: string;
  groupId?: string;
}

export interface PaginatedPostsResponse {
  success: boolean;
  data?: {
    posts: Post[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
  message?: string;
}

export interface PostResponse {
  success: boolean;
  data?: Post;
  message?: string;
}

class PostService {
  // Lấy feed posts (cho user đã login)
  async getFeed(
    page: number = 1,
    pageSize: number = 10,
    sortBy: string = 'latest',
    groupId?: string
  ): Promise<PaginatedPostsResponse> {
    try {
      const response = await HttpClient.get<any>(
        API_CONFIG.ENDPOINTS.POSTS.FEED(page, pageSize, sortBy, groupId),
        true
      );
      const data = response.data || response;

      return {
        success: true,
        data: {
          posts: Array.isArray(data.posts) ? data.posts : [],
          total: data.total || 0,
          page: data.page || page,
          pageSize: data.pageSize || pageSize,
          pageSize: data.pageSize || pageSize,
          totalPages: data.totalPages || Math.ceil((data.total || 0) / pageSize),
        },
      };
    } catch (error) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError.message || 'Lỗi khi tải feed',
      };
    }
  }

  // Lọc posts theo game, group, user
  async filterPosts(
    page: number = 1,
    pageSize: number = 10,
    gameId?: string,
    groupId?: string,
    userId?: string,
    sortBy: string = 'latest'
  ): Promise<PaginatedPostsResponse> {
    try {
      const response = await HttpClient.get<any>(
        API_CONFIG.ENDPOINTS.POSTS.FILTER(page, pageSize, gameId, groupId, userId, sortBy),
        false
      );
      const data = response.data || response;

      return {
        success: true,
        data: {
          posts: Array.isArray(data.posts) ? data.posts : [],
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
        message: apiError.message || 'Lỗi khi lọc posts',
      };
    }
  }

  // Tìm kiếm posts
  async searchPosts(
    query: string,
    page: number = 1,
    pageSize: number = 10
  ): Promise<PaginatedPostsResponse> {
    try {
      const response = await HttpClient.get<any>(
        API_CONFIG.ENDPOINTS.POSTS.SEARCH(query, page, pageSize),
        false
      );
      const data = response.data || response;

      return {
        success: true,
        data: {
          posts: Array.isArray(data.posts) ? data.posts : [],
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
        message: apiError.message || 'Lỗi khi tìm kiếm posts',
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
  async createPost(
    content: string,
    gameId?: string,
    groupId?: string
  ): Promise<PostResponse> {
    try {
      const response = await HttpClient.post<any>(
        API_CONFIG.ENDPOINTS.POSTS.BASE,
        { content, gameId, groupId },
        true
      );
      const post = response.data || response;

      return {
        success: true,
        data: post,
        message: 'Post created successfully',
      };
    } catch (error) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError.message || 'Lỗi khi tạo post',
      };
    }
  }

  // Cập nhật post
  async updatePost(id: string, content: string): Promise<PostResponse> {
    try {
      const response = await HttpClient.put<any>(
        API_CONFIG.ENDPOINTS.POSTS.BY_ID(id),
        { content },
        true
      );
      const post = response.data || response;

      return {
        success: true,
        data: post,
        message: 'Post updated successfully',
      };
    } catch (error) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError.message || 'Lỗi khi cập nhật post',
      };
    }
  }

  // Xóa post
  async deletePost(id: string): Promise<{ success: boolean; message?: string }> {
    try {
      await HttpClient.delete(
        API_CONFIG.ENDPOINTS.POSTS.DELETE(id),
        true
      );

      return {
        success: true,
        message: 'Post deleted successfully',
      };
    } catch (error) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError.message || 'Lỗi khi xóa post',
      };
    }
  }

  // Like post
  async likePost(id: string): Promise<{ success: boolean; likeCount?: number; message?: string }> {
    try {
      const response = await HttpClient.post<any>(
        API_CONFIG.ENDPOINTS.POSTS.LIKE(id),
        {},
        true
      );
      const data = response.data || response;

      return {
        success: true,
        likeCount: data.likeCount,
        message: 'Post liked',
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
  async unlikePost(id: string): Promise<{ success: boolean; likeCount?: number; message?: string }> {
    try {
      const response = await HttpClient.delete<any>(
        API_CONFIG.ENDPOINTS.POSTS.UNLIKE(id),
        true
      );
      const data = response.data || response;

      return {
        success: true,
        likeCount: data.likeCount,
        message: 'Post unliked',
      };
    } catch (error) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError.message || 'Lỗi khi unlike post',
      };
    }
  }
}

export const postService = new PostService();
