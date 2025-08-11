import { useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

type ScrollOptions = {
  duration?: number;
  offsetY?: number;
  ease?: string;
};

export function useGsapScrollTo() {
  const scrollTo = useCallback(
    (selector: string, options: ScrollOptions = {}) => {
      if (!document) return;
      const target = document.querySelector(selector as string);
      if (!target) {
        console.log(`scrollTo errror: ${target} not found`);
        return;
      }

      gsap.to(window, {
        duration: options.duration ?? 1,
        scrollTo: {
          y: target,
          offsetY: options.offsetY ?? 0,
        },
        ease: options.ease ?? 'power2.inOut',
      });
    },
    []
  );

  return scrollTo;
}
