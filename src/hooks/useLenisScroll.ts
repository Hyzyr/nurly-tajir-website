import { useCallback } from 'react';
import Lenis from '@studio-freight/lenis';

// Extend Window interface to include lenis
declare global {
  interface Window {
    lenis?: Lenis;
  }
}

/**
 * Custom hook to control Lenis smooth scroll
 * Provides methods to stop and start scrolling (e.g., for modals, popups)
 */
export const useLenisScroll = () => {
  const getLenis = useCallback((): Lenis | null => {
    if (typeof window !== 'undefined') {
      return window.lenis || null;
    }
    return null;
  }, []);

  const stopScroll = useCallback(() => {
    const lenis = getLenis();
    if (lenis) {
      lenis.stop();
    }
  }, [getLenis]);

  const startScroll = useCallback(() => {
    const lenis = getLenis();
    if (lenis) {
      lenis.start();
    }
  }, [getLenis]);

  const scrollTo = useCallback(
    (target: string | number | HTMLElement, options?: { offset?: number; duration?: number }) => {
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(target, options);
      }
    },
    [getLenis]
  );

  return {
    stopScroll,
    startScroll,
    scrollTo,
    lenis: getLenis(),
  };
};
