import { ApiError } from '../utils/httpClient';
import { buildUrl } from '../config/api';
import { authService } from './authService';

export interface UploadResponse {
  success: boolean;
  data?: {
    url: string;
  };
  message?: string;
  error?: string;
}

export interface UploadProgressCallback {
  (progress: number): void;
}

class UploadService {
  private readonly MAX_RETRIES = 3;
  private readonly RETRY_DELAY = 1000; // ms

  /**
   * Upload image with authentication
   * @param file - Image file to upload
   * @param folder - Cloudinary folder path
   * @param onProgress - Optional progress callback (0-100)
   */
  async uploadImage(
    file: File,
    folder: string = 'ggzone',
    onProgress?: UploadProgressCallback
  ): Promise<UploadResponse> {
    const token = authService.getToken();

    if (!token) {
      // Token không tồn tại - redirect về login
      localStorage.removeItem('ggzone_auth_token');
      localStorage.removeItem('ggzone_user');
      window.location.href = '/login';
      return {
        success: false,
        message: 'Vui lòng đăng nhập để tải lên ảnh',
        error: 'NOT_AUTHENTICATED'
      };
    }

    // Kiểm tra token có hết hạn không
    if (!authService.isAuthenticated()) {
      localStorage.removeItem('ggzone_auth_token');
      localStorage.removeItem('ggzone_user');
      window.location.href = '/login';
      return {
        success: false,
        message: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
        error: 'TOKEN_EXPIRED'
      };
    }

    // Validate file
    const validation = this.validateFile(file);
    if (!validation.valid) {
      return {
        success: false,
        message: validation.error || 'File không hợp lệ',
        error: 'INVALID_FILE'
      };
    }

    return this.uploadWithRetry(file, folder, token, onProgress);
  }

  /**
   * Upload with retry logic
   */
  private async uploadWithRetry(
    file: File,
    folder: string,
    token: string,
    onProgress?: UploadProgressCallback,
    attempt: number = 1
  ): Promise<UploadResponse> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const url = new URL(buildUrl('/api/upload/image'));
      url.searchParams.append('folder', folder);

      onProgress?.(10);

      const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
        credentials: 'include'
      });

      onProgress?.(80);

      const data = await response.json();

      if (!response.ok) {
        // Retry on server errors (5xx)
        if (response.status >= 500 && attempt < this.MAX_RETRIES) {
          await this.delay(this.RETRY_DELAY * attempt);
          return this.uploadWithRetry(file, folder, token, onProgress, attempt + 1);
        }

        return {
          success: false,
          message: data.message || 'Tải lên thất bại',
          error: `HTTP_${response.status}`
        };
      }

      onProgress?.(100);

      return {
        success: true,
        data: data.data,
        message: data.message || 'Tải lên thành công'
      };
    } catch (error) {
      // Retry on network errors
      if (attempt < this.MAX_RETRIES) {
        await this.delay(this.RETRY_DELAY * attempt);
        return this.uploadWithRetry(file, folder, token, onProgress, attempt + 1);
      }

      const apiError = error as ApiError;
      return {
        success: false,
        message: 'Lỗi kết nối. Vui lòng thử lại.',
        error: apiError.message || 'NETWORK_ERROR'
      };
    }
  }

  /**
   * Test upload without authentication
   */
  async testUpload(file: File): Promise<UploadResponse> {
    const validation = this.validateFile(file);
    if (!validation.valid) {
      return {
        success: false,
        message: validation.error || 'File không hợp lệ',
        error: 'INVALID_FILE'
      };
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(buildUrl('/api/upload/test'), {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Tải lên thất bại',
          error: `HTTP_${response.status}`
        };
      }

      return {
        success: true,
        data: data.data,
        message: data.message || 'Tải lên thành công'
      };
    } catch (error) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: 'Lỗi kết nối',
        error: apiError.message || 'NETWORK_ERROR'
      };
    }
  }

  /**
   * Validate file before upload
   */
  private validateFile(file: File): { valid: boolean; error?: string } {
    if (!file) {
      return { valid: false, error: 'Không có file được chọn' };
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: 'Định dạng không hỗ trợ. Cho phép: JPG, PNG, GIF, WebP'
      };
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return {
        valid: false,
        error: `Kích thước file vượt quá 5MB (${this.formatFileSize(file.size)})`
      };
    }

    return { valid: true };
  }

  /**
   * Format file size for display
   */
  private formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  }

  /**
   * Delay helper for retry logic
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const uploadService = new UploadService();
