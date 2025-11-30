/**
 * Get avatar URL with fallback
 * @param avatarUrl - User's avatar URL
 * @param username - User's username for generating fallback
 * @returns Avatar URL or fallback placeholder
 */
export const getAvatarUrl = (
  avatarUrl?: string | null,
  username?: string
): string => {
  if (avatarUrl) {
    return avatarUrl;
  }

  // Generate a placeholder avatar based on username
  if (username) {
    // Using UI Avatars service for fallback
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      username
    )}&background=random&color=fff&size=128`;
  }

  // Default placeholder
  return "https://via.placeholder.com/128?text=User";
};

/**
 * Get cover image URL with fallback
 * @param coverUrl - User's cover image URL
 * @returns Cover URL or fallback placeholder
 */
export const getCoverUrl = (coverUrl?: string | null): string => {
  if (coverUrl) {
    return coverUrl;
  }

  // Default cover image
  return "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1920";
};

/**
 * Validate if URL is a valid image URL
 * @param url - URL to validate
 * @returns true if valid image URL
 */
export const isValidImageUrl = (url?: string | null): boolean => {
  if (!url) return false;

  try {
    const urlObj = new URL(url);
    const validExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];
    const pathname = urlObj.pathname.toLowerCase();

    return validExtensions.some((ext) => pathname.endsWith(ext));
  } catch {
    return false;
  }
};
