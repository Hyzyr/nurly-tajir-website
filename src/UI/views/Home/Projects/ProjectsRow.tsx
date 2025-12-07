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
    const hero = document.getElementById('hero') as HTMLDivElement;

    if (!pinElement || !hero) return;
    const ctx = gsap.context(() => {
      gsap.to(container, {
        x: -scrollDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: pinElement,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          start: () => `+=${hero.clientHeight * 0.7} top`,
          end: () => `+=${scrollDistance + 100}`, // how long to pin
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
