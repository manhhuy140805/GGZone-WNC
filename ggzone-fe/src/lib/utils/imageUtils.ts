import { API_CONFIG } from '@/lib/constants/api';

/**
 * Get full image URL
 * If URL is already absolute (starts with http/https), return as is
 * Otherwise, prepend API base URL
 */
export const getImageUrl = (url: string | null | undefined): string | null => {
  if (!url) return null;
  
  // If URL is already absolute (Cloudinary, external URL, etc.)
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // If URL is relative, prepend API base URL
  return `${API_CONFIG.BASE_URL}${url}`;
};

/**
 * Get image URL with fallback
 */
export const getImageUrlWithFallback = (
  url: string | null | undefined,
  fallback: string
): string => {
  const imageUrl = getImageUrl(url);
  return imageUrl || fallback;
};
