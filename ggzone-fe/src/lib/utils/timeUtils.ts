/**
 * Time utility functions for handling UTC/Local time conversions
 */

/**
 * Convert time difference to human-readable format
 * @param dateString - ISO date string from server (UTC)
 * @returns Human-readable time ago string (e.g., "5m ago", "2h ago")
 */
export const getTimeAgo = (dateString: string): string => {
  // Parse date - JavaScript Date constructor handles both formats:
  // - "2025-11-30T16:47:35.36Z" (UTC with Z)
  // - "2025-11-30T16:47:35.36" (local time)
  // If no Z, it's treated as local time which is what we want
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  // Debug log for troubleshooting
  if (seconds < -60) {
    console.warn('Future date detected:', {
      dateString,
      parsed: date.toISOString(),
      now: now.toISOString(),
      secondsDiff: seconds
    });
  }

  // Handle negative values (future dates due to timezone issues)
  if (seconds < 0) return 'just now';
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d ago`; // 30 days
  if (seconds < 31536000) return `${Math.floor(seconds / 2592000)}mo ago`; // 12 months
  return `${Math.floor(seconds / 31536000)}y ago`;
};

/**
 * Format date to local date string
 * @param dateString - ISO date string from server (UTC)
 * @returns Formatted local date string
 */
export const formatDate = (dateString: string): string => {
  const utcDateString = dateString.endsWith('Z') ? dateString : `${dateString}Z`;
  const date = new Date(utcDateString);
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Format date and time to local string
 * @param dateString - ISO date string from server (UTC)
 * @returns Formatted local date and time string
 */
export const formatDateTime = (dateString: string): string => {
  const utcDateString = dateString.endsWith('Z') ? dateString : `${dateString}Z`;
  const date = new Date(utcDateString);
  return date.toLocaleString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Check if date is today
 * @param dateString - ISO date string from server (UTC)
 * @returns True if date is today
 */
export const isToday = (dateString: string): boolean => {
  const utcDateString = dateString.endsWith('Z') ? dateString : `${dateString}Z`;
  const date = new Date(utcDateString);
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

/**
 * Check if date is yesterday
 * @param dateString - ISO date string from server (UTC)
 * @returns True if date is yesterday
 */
export const isYesterday = (dateString: string): boolean => {
  const utcDateString = dateString.endsWith('Z') ? dateString : `${dateString}Z`;
  const date = new Date(utcDateString);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  );
};
