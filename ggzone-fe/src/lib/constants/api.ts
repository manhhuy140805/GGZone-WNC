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
      FEED: (page?: number, pageSize?: number, sortBy?: string, groupId?: string) => {
        let url = '/api/posts/feed';
        const params = [];
        if (page) params.push(`page=${page}`);
        if (pageSize) params.push(`pageSize=${pageSize}`);
        if (sortBy) params.push(`sortBy=${sortBy}`);
        if (groupId) params.push(`groupId=${groupId}`);
        return url + (params.length ? `?${params.join('&')}` : '');
      },
      FILTER: (page?: number, pageSize?: number, groupId?: string, userId?: string, sortBy?: string) => {
        let url = '/api/posts/filter';
        const params = [];
        if (page) params.push(`page=${page}`);
        if (pageSize) params.push(`pageSize=${pageSize}`);
        if (groupId) params.push(`groupId=${groupId}`);
        if (userId) params.push(`userId=${userId}`);
        if (sortBy) params.push(`sortBy=${sortBy}`);
        return url + (params.length ? `?${params.join('&')}` : '');
      },
      SEARCH: (query: string, page?: number, pageSize?: number) => {
        let url = `/api/posts/search?q=${encodeURIComponent(query)}`;
        if (page) url += `&page=${page}`;
        if (pageSize) url += `&pageSize=${pageSize}`;
        return url;
      },
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
      LIKE: (id: string) => `/api/comment/${id}/like`,
      UNLIKE: (id: string) => `/api/comment/${id}/like`,
    },

    // Games
    GAMES: {
      BASE: '/api/games',
      BY_ID: (id: string) => `/api/games/${id}`,
      BY_SLUG: (slug: string) => `/api/games/slug/${slug}`,
      TRENDING: (limit?: number) => `/api/games/trending${limit ? `?limit=${limit}` : ''}`,
      SEARCH: (query: string, page?: number, pageSize?: number) => {
        let url = `/api/games/search?q=${encodeURIComponent(query)}`;
        if (page) url += `&page=${page}`;
        if (pageSize) url += `&pageSize=${pageSize}`;
        return url;
      },
      FILTER: (genre?: string, platform?: string, page?: number, pageSize?: number) => {
        let url = '/api/games/filter';
        const params = [];
        if (genre) params.push(`genre=${encodeURIComponent(genre)}`);
        if (platform) params.push(`platform=${encodeURIComponent(platform)}`);
        if (page) params.push(`page=${page}`);
        if (pageSize) params.push(`pageSize=${pageSize}`);
        return url + (params.length ? `?${params.join('&')}` : '');
      },
      GENRES: '/api/games/genres',
      PLATFORMS: '/api/games/platforms',
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
      VIDEO: (folder?: string) => `/api/upload/video${folder ? `?folder=${folder}` : ''}`,
      TEST: '/api/upload/test',
    },

    // Marketplace
    MARKETPLACE: {
      BASE: '/api/marketplace',
      BY_ID: (id: string) => `/api/marketplace/${id}`,
      FEATURED: (limit?: number) => `/api/marketplace/featured${limit ? `?limit=${limit}` : ''}`,
      BY_CATEGORY: (category: string, page?: number, pageSize?: number) => {
        let url = `/api/marketplace?category=${category}`;
        if (page) url += `&page=${page}`;
        if (pageSize) url += `&pageSize=${pageSize}`;
        return url;
      },
      REVIEWS: (id: string) => `/api/marketplace/${id}/reviews`,
    },

    // Store
    STORE: {
      PRODUCTS: '/api/store/products',
      PRODUCT_BY_ID: (id: string) => `/api/store/products/${id}`,
      CATEGORIES: '/api/store/categories',
    },

    // Shopping Cart
    CART: {
      BY_USER: (userId: string) => `/api/shoppingcart/${userId}`,
      ADD: '/api/shoppingcart',
      UPDATE: (id: string) => `/api/shoppingcart/${id}`,
      REMOVE: (id: string) => `/api/shoppingcart/${id}`,
      CLEAR: (userId: string) => `/api/shoppingcart/user/${userId}`,
    },

    // Orders
    ORDER: {
      BASE: '/api/order',
      BY_USER: (userId: string) => `/api/order/${userId}`,
      BY_ID: (orderId: string) => `/api/order/detail/${orderId}`,
      CANCEL: (orderId: string) => `/api/order/${orderId}`,
    },
  },
  TIMEOUT: 30000, // 30 seconds
};

// Helper function to build full URL
export const buildUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};
