'use client';

import styles from './styles.module.scss';

import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useWindowResize } from '@/hooks/useWindowResize';
import { cn } from '@/utils/cn';
gsap.registerPlugin(ScrollTrigger);

type Props = { children: React.ReactNode };

/**
 * Get offset distance from child element to parent element
 * @param child - The child element (can be deeply nested)
 * @param parent - The parent/ancestor element
 * @returns The offset top distance from child to parent
 */
const getOffsetToParent = (child: HTMLElement, parent: HTMLElement): number => {
  let offsetTop = 0;
  let currentElement: HTMLElement | null = child;

  while (currentElement && currentElement !== parent) {
    offsetTop += currentElement.offsetTop;
    currentElement = currentElement.offsetParent as HTMLElement | null;

    // Break if we've gone past the parent or reached document
    if (!currentElement || !parent.contains(currentElement)) {
      break;
    }
  }

  return offsetTop;
};

const ProjectsRow = ({ children }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trigger = useWindowResize();

  useLayoutEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const totalWidth = container.scrollWidth;
    const viewportWidth = container.offsetWidth;

    const scrollDistance = totalWidth - viewportWidth;

    const pinElement = document.getElementById('pin') as HTMLDivElement;

    if (!pinElement) return;
    const ctx = gsap.context(() => {
      const containerOffsetTop = getOffsetToParent(container, pinElement);

      // Responsive calculations based on container and screen size
      const isMobile = window.innerWidth <= 768;
      const isTablet = window.innerWidth <= 1024;

      let startOffset;
      if (isMobile) {
        startOffset = containerOffsetTop * 0.2;
      } else if (isTablet) {
        startOffset = containerOffsetTop * 0.3;
      } else {
        startOffset = containerOffsetTop * 0.65;
      }

      gsap.to(container, {
        x: -scrollDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: pinElement,
          pin: true,
          pinSpacing: true, // Disable fake spacing
          anticipatePin: 1,
          start: () => `+=${startOffset} top`,
          end: () => `+=${scrollDistance}`,
          scrub: 0.5,
          invalidateOnRefresh: true,
          // markers: true,
        },
      });
    }, container);

    return () => ctx.revert();
  }, [trigger]);

  return (
    <div className={cn(styles.projects__row, 'change-transform')} ref={containerRef}>
      {children}
    </div>
  );
};

export default ProjectsRow;
