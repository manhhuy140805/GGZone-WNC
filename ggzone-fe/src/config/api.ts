// API Configuration
export const API_CONFIG = {
  BASE_URL: (import.meta as any).env?.VITE_API_URL || '',
  ENDPOINTS: {
    // Authentication
    AUTH: {
      LOGIN: '/api/auth/login',
      REGISTER: '/api/auth/register',
    },

    // Users
    USERS: {
      BASE: '/api/user',
      BY_ID: (id: string) => `/api/user/${id}`,
      BY_USERNAME: (username: string) => `/api/user/username/${username}`,
      ME: '/api/user/me',
      PROFILE: '/api/user/profile',
      PASSWORD: '/api/user/password',
      STATUS: '/api/user/status',
      SEARCH: (query: string, page?: number, pageSize?: number) => {
        let url = `/api/user/search?q=${query}`;
        if (page) url += `&page=${page}`;
        if (pageSize) url += `&pageSize=${pageSize}`;
        return url;
      },
      DELETE: '/api/user',
    },

    // Posts
    POSTS: {
      BASE: '/api/posts',
      FEED: '/api/posts/feed',
      BY_ID: (id: string) => `/api/posts/${id}`,
      LIKE: (id: string) => `/api/posts/${id}/like`,
      UNLIKE: (id: string) => `/api/posts/${id}/like`,
      DELETE: (id: string) => `/api/posts/${id}`,
    },

    // Comments
    COMMENTS: {
      BASE: '/api/comment',
      BY_ID: (id: string) => `/api/comment/${id}`,
      BY_POST: (postId: string, page?: number, pageSize?: number) => {
        let url = `/api/comment/post/${postId}`;
        if (page) url += `?page=${page}`;
        if (pageSize) url += `${page ? '&' : '?'}pageSize=${pageSize}`;
        return url;
      },
      UPDATE: (id: string) => `/api/comment/${id}`,
      DELETE: (id: string) => `/api/comment/${id}`,
    },

    // Games
    GAMES: {
      BASE: '/api/games',
      BY_ID: (id: string) => `/api/games/${id}`,
      BY_SLUG: (slug: string) => `/api/games/slug/${slug}`,
      TRENDING: (limit?: number) => `/api/games/trending${limit ? `?limit=${limit}` : ''}`,
    },

    // Groups
    GROUPS: {
      BASE: '/api/groups',
      BY_ID: (id: string) => `/api/groups/${id}`,
      POSTS: (id: string, page?: number, pageSize?: number) => {
        let url = `/api/groups/${id}/posts`;
        if (page) url += `?page=${page}`;
        if (pageSize) url += `${page ? '&' : '?'}pageSize=${pageSize}`;
        return url;
      },
      JOIN: (id: string) => `/api/groups/${id}/join`,
      LEAVE: (id: string) => `/api/groups/${id}/leave`,
    },

    // Friendships
    FRIENDSHIPS: {
      BASE: '/api/friendship',
      FRIENDS: (userId: string) => `/api/friendship/${userId}/friends`,
      REQUESTS: (userId: string) => `/api/friendship/${userId}/requests`,
      SENT: (userId: string) => `/api/friendship/${userId}/sent`,
      SUGGESTIONS: (userId: string) => `/api/friendship/${userId}/suggestions`,
      SEND: '/api/friendship/send',
      ACCEPT: (id: string) => `/api/friendship/${id}/accept`,
      DECLINE: (id: string) => `/api/friendship/${id}/decline`,
      REMOVE: (id: string) => `/api/friendship/${id}`,
      DISMISS_SUGGESTION: (id: string) => `/api/friendship/suggestion/${id}/dismiss`,
    },

    // Messages
    MESSAGES: {
      BASE: '/api/message',
      CONVERSATIONS: (userId: string) => `/api/message/${userId}/conversations`,
      WITH_USER: (userId: string, otherUserId: string, page?: number, pageSize?: number) => {
        let url = `/api/message/${userId}/with/${otherUserId}`;
        if (page) url += `?page=${page}`;
        if (pageSize) url += `${page ? '&' : '?'}pageSize=${pageSize}`;
        return url;
      },
      UNREAD_COUNT: (userId: string) => `/api/message/${userId}/unread-count`,
      MARK_AS_READ: (id: string) => `/api/message/${id}/read`,
      DELETE: (id: string) => `/api/message/${id}`,
    },

    // Notifications
    NOTIFICATIONS: {
      BASE: (userId: string) => `/api/notification/${userId}`,
      UNREAD_COUNT: (userId: string) => `/api/notification/${userId}/unread-count`,
      MARK_AS_READ: (id: string) => `/api/notification/${id}/read`,
      MARK_ALL_AS_READ: (userId: string) => `/api/notification/${userId}/read-all`,
      DELETE: (id: string) => `/api/notification/${id}`,
      CLEAR_ALL: (userId: string) => `/api/notification/${userId}/clear`,
    },

    // Trending
    TRENDING: {
      GAMES: (limit?: number) => `/api/trending/games${limit ? `?limit=${limit}` : ''}`,
      PLAYERS: (limit?: number) => `/api/trending/players${limit ? `?limit=${limit}` : ''}`,
      VIDEOS: (limit?: number) => `/api/trending/videos${limit ? `?limit=${limit}` : ''}`,
      POSTS: (limit?: number) => `/api/trending/posts${limit ? `?limit=${limit}` : ''}`,
    },

    // Search
    SEARCH: {
      BASE: (query: string, type?: string, limit?: number) => {
        let url = `/api/search?q=${query}`;
        if (type) url += `&type=${type}`;
        if (limit) url += `&limit=${limit}`;
        return url;
      },
    },

    // Badges
    BADGES: {
      BY_USER: (userId: string) => `/api/badge/${userId}`,
      ALL: '/api/badge/all',
      AWARD: '/api/badge',
      REMOVE: (id: string) => `/api/badge/${id}`,
    },

    // Upload
    UPLOAD: {
      IMAGE: (folder?: string) => `/api/upload/image${folder ? `?folder=${folder}` : ''}`,
      TEST: '/api/upload/test',
    },
  },
  TIMEOUT: 30000, // 30 seconds
};

// Helper function to build full URL
export const buildUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};
