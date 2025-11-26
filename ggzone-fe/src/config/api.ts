// API Configuration
export const API_CONFIG = {
  BASE_URL: (import.meta as any).env?.VITE_API_URL || 'http://localhost:7009',
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/api/auth/login',
      REGISTER: '/api/auth/register',
    },
    USERS: {
      BASE: '/api/users',
      BY_ID: (id: string) => `/api/users/${id}`,
    },
    POSTS: {
      BASE: '/api/posts',
      FEED: '/api/posts/feed',
      BY_ID: (id: string) => `/api/posts/${id}`,
      LIKE: (id: string) => `/api/posts/${id}/like`,
    },
    GAMES: {
      BASE: '/api/games',
      BY_ID: (id: string) => `/api/games/${id}`,
      TRENDING: '/api/games/trending',
    },
    GROUPS: {
      BASE: '/api/groups',
      BY_ID: (id: string) => `/api/groups/${id}`,
      POSTS: (id: string) => `/api/groups/${id}/posts`,
      JOIN: (id: string) => `/api/groups/${id}/join`,
      LEAVE: (id: string) => `/api/groups/${id}/leave`,
    },
  },
  TIMEOUT: 30000, // 30 seconds
};

// Helper function to build full URL
export const buildUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};
