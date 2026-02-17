'use client';
import React, { useRef } from 'react';
import styles from './styles.module.scss';
import { useHeroBg } from './useHeroBg';
import { useObserver } from '@/hooks/useObserver';
import { cn } from '@/utils/cn';

const HeroBg = ({ fixed }: { fixed?: boolean }) => {
  const yellow = useRef<HTMLSpanElement | null>(null);
  const blue = useRef<HTMLSpanElement | null>(null);
  const { ref, isVisible } = useObserver();

  useHeroBg({
    yellow,
    blue,
    active: isVisible,
  });

  return (
    <div className={cn('bg', styles.hero__bg, fixed ? styles.fixed : '')} ref={ref}>
      <span className={cn(styles.hero__bg__yellow, 'change-auto' )} ref={yellow}></span>
      <span className={cn(styles.hero__bg__blue, 'change-auto' )} ref={blue}></span>
    </div>
  );
};

export default HeroBg;
