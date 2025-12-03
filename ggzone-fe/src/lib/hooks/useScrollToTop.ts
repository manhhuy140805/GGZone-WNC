import { useEffect } from 'react';

/**
 * Hook to scroll the main content area to top
 * Works with the overflow-auto main element in App.tsx
 */
export const useScrollToTop = (dependencies: any[] = []) => {
  useEffect(() => {
    // Find the main element with overflow-auto class
    const mainElement = document.querySelector('main.overflow-auto');
    if (mainElement) {
      mainElement.scrollTop = 0;
    }
  }, dependencies);
};
