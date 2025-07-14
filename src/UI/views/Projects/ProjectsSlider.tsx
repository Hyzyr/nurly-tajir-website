'use client';
import styles from './styles.module.scss';

import useEmblaCarousel from 'embla-carousel-react';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const ProjectsSlider = ({ children }: Props) => {
  const [ref] = useEmblaCarousel({ dragFree: true, loop: false });

  return (
    <div ref={ref} className={styles.slider}>
      <div className={styles.slider__container}>{children}</div>
    </div>
  );
};

export default ProjectsSlider;
