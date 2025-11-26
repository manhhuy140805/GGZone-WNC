import { API_CONFIG, buildUrl } from '../config/api';

export interface ApiError {
  message: string;
  status?: number;
  errors?: Record<string, string[]>;
}

// Convert PascalCase to camelCase
function toCamelCase(str: string): string {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

// Recursively convert object keys from PascalCase to camelCase
function convertKeysToCamelCase(obj: any): any {
  if (obj === null || obj === undefined) return obj;
  
  if (Array.isArray(obj)) {
    return obj.map(convertKeysToCamelCase);
  }
  
  if (typeof obj !== 'object') {
    return obj;
  }
  
  const converted: any = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const camelKey = toCamelCase(key);
      converted[camelKey] = convertKeysToCamelCase(obj[key]);
    }
  }
  return converted;
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

    const data = await response.json();
    // Convert PascalCase keys to camelCase
    return convertKeysToCamelCase(data);
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
