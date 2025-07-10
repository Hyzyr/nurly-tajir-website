'use client';
import React, { useRef } from 'react';
import styles from './styles.module.scss';
import { useHeroBg } from './useHeroBg';

type Props = {};

const HeroBg = (props: Props) => {
  const yellow = useRef<HTMLSpanElement | null>(null);
  const blue = useRef<HTMLSpanElement | null>(null);
  useHeroBg({
    yellow,
    blue,
  });

  return (
    <div className={`bg ${styles.hero__bg}`}>
      <span className={styles.hero__bg__yellow} ref={yellow}></span>
      <span className={styles.hero__bg__blue} ref={blue}></span>
    </div>
  );
};

export default HeroBg;
