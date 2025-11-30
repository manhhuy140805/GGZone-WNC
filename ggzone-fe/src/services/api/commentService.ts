import { HttpClient, ApiError } from '@/lib/utils/httpClient';
import { API_CONFIG } from '@/lib/constants/api';

export interface CommentUser {
  id: string;
  username: string;
  fullName?: string;
  avatarUrl?: string;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: CommentUser;
}

export interface CommentResponse {
  success: boolean;
  data?: Comment;
  message?: string;
}

class CommentService {
  // Lấy comments của post
  async getCommentsByPost(postId: string, page: number = 1, pageSize: number = 20): Promise<{ success: boolean; data?: Comment[]; message?: string }> {
    try {
      const response = await HttpClient.get<any>(
        API_CONFIG.ENDPOINTS.COMMENTS.BY_POST(postId, page, pageSize),
        false
      );
      
      // BE trả về array trực tiếp
      const comments = Array.isArray(response) ? response : (response.data || []);

      return {
        success: true,
        data: comments,
      };
    } catch (error) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError.message || 'Lỗi khi tải comments',
      };
    }
  }

  // Tạo comment mới
  async createComment(postId: string, userId: string, content: string): Promise<CommentResponse> {
    try {
      const payload = {
        postId,
        userId,
        content,
      };

      console.log('Creating comment with payload:', payload);

      const response = await HttpClient.post<any>(
        API_CONFIG.ENDPOINTS.COMMENTS.BASE,
        payload,
        true
      );
      
      console.log('Comment created response:', response);
      const comment = response.data || response;

      return {
        success: true,
        data: comment,
        message: 'Comment created successfully',
      };
    } catch (error) {
      console.error('Error creating comment:', error);
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError.message || 'Lỗi khi tạo comment',
      };
    }
  }

  // Cập nhật comment
  async updateComment(id: string, content: string): Promise<CommentResponse> {
    try {
      const response = await HttpClient.put<any>(
        API_CONFIG.ENDPOINTS.COMMENTS.UPDATE(id),
        { content },
        true
      );
      const comment = response.data || response;

      return {
        success: true,
        data: comment,
        message: 'Comment updated successfully',
      };
    } catch (error) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError.message || 'Lỗi khi cập nhật comment',
      };
    }
  }

  // Xóa comment
  async deleteComment(id: string): Promise<{ success: boolean; message?: string }> {
    try {
      await HttpClient.delete(
        API_CONFIG.ENDPOINTS.COMMENTS.DELETE(id),
        true
      );

      return {
        success: true,
        message: 'Comment deleted successfully',
      };
    } catch (error) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError.message || 'Lỗi khi xóa comment',
      };
    }
  }
}

export const commentService = new CommentService();
