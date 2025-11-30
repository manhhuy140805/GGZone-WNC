import { HttpClient, ApiError } from '@/lib/utils/httpClient';
import { API_CONFIG } from '@/lib/constants/api';

export interface PostMedia {
  id: string;
  mediaUrl: string;
  mediaType?: string;
}

export interface Post {
  id: string;
  content: string;
  createdAt: string;
  likesCount: number;
  commentsCount: number;
  author: {
    id: string;
    username: string;
    avatarUrl?: string;
  };
  media?: PostMedia[];
  groupId?: string;
  isLiked?: boolean;
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

  // Lọc posts theo group, user
  async filterPosts(
    page: number = 1,
    pageSize: number = 10,
    groupId?: string,
    userId?: string,
    sortBy: string = 'latest'
  ): Promise<PaginatedPostsResponse> {
    try {
      const response = await HttpClient.get<any>(
        API_CONFIG.ENDPOINTS.POSTS.FILTER(page, pageSize, groupId, userId, sortBy),
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

  // Tạo post mới với media
  async createPost(
    content: string,
    media?: PostMedia[],
    groupId?: string
  ): Promise<PostResponse> {
    try {
      const payload: any = { content, groupId };
      
      // Thêm media URLs nếu có
      if (media && media.length > 0) {
        payload.mediaUrls = media.map(m => ({
          Url: m.mediaUrl,
          Type: m.mediaType || 'image'
        }));
      }

      const response = await HttpClient.post<any>(
        API_CONFIG.ENDPOINTS.POSTS.BASE,
        payload,
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
        likeCount: data.likeCount || data.LikeCount,
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
        likeCount: data.likeCount || data.LikeCount,
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
