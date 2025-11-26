import { API_CONFIG, buildUrl } from '../config/api';

export interface ApiError {
  message: string;
  status?: number;
  errors?: Record<string, string[]>;
}

export class HttpClient {
  private static getAuthToken(): string | null {
    return localStorage.getItem('ggzone_auth_token');
  }

  private static getHeaders(includeAuth: boolean = true): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (includeAuth) {
      const token = this.getAuthToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  private static async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error: ApiError = {
        message: 'An error occurred',
        status: response.status,
      };

      try {
        const errorData = await response.json();
        error.message = errorData.message || errorData.title || 'An error occurred';
        error.errors = errorData.errors;
      } catch {
        error.message = response.statusText || 'An error occurred';
      }

      throw error;
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return {} as T;
    }

    return response.json();
  }

  static async get<T>(endpoint: string, requireAuth: boolean = false): Promise<T> {
    const response = await fetch(buildUrl(endpoint), {
      method: 'GET',
      headers: this.getHeaders(requireAuth),
    });

    return this.handleResponse<T>(response);
  }

  static async post<T>(
    endpoint: string,
    data?: unknown,
    requireAuth: boolean = false
  ): Promise<T> {
    const response = await fetch(buildUrl(endpoint), {
      method: 'POST',
      headers: this.getHeaders(requireAuth),
      body: data ? JSON.stringify(data) : undefined,
    });

    return this.handleResponse<T>(response);
  }

  static async put<T>(
    endpoint: string,
    data?: unknown,
    requireAuth: boolean = true
  ): Promise<T> {
    const response = await fetch(buildUrl(endpoint), {
      method: 'PUT',
      headers: this.getHeaders(requireAuth),
      body: data ? JSON.stringify(data) : undefined,
    });

    return this.handleResponse<T>(response);
  }

  static async delete<T>(endpoint: string, requireAuth: boolean = true): Promise<T> {
    const response = await fetch(buildUrl(endpoint), {
      method: 'DELETE',
      headers: this.getHeaders(requireAuth),
    });

    return this.handleResponse<T>(response);
  }
}
