'use client';

import styles from './styles.module.scss';

import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useWindowResize } from '@/hooks/useWindowResize';
gsap.registerPlugin(ScrollTrigger);

type Props = { children: React.ReactNode };

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
      // Use container dimensions for calculations
      const containerHeight = container.clientHeight;
      const containerOffsetHeight = container.offsetHeight;

      // Responsive calculations based on container and screen size
      const isMobile = window.innerWidth <= 768;
      const isTablet = window.innerWidth <= 1024;

      let startOffset;
      if (isMobile) {
        startOffset = containerHeight * 0.2; // Start earlier on mobile
      } else if (isTablet) {
        startOffset = containerHeight * 0.3; // Medium start on tablet
      } else {
        startOffset = containerHeight * 0.5; // Balanced start on desktop
      }

      gsap.to(container, {
        x: -scrollDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: pinElement,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          start: () => `+=${startOffset} top`,
          end: () => `+=${scrollDistance + containerOffsetHeight * 0.1}`, // End based on container height
          scrub: 1,
          // markers: true
        },
      });
    }, container);

    return () => ctx.revert();
  }, [trigger]);

  return (
    <div className={styles.projects__row} ref={containerRef}>
      {children}
    </div>
  );
};

export default ProjectsRow;
