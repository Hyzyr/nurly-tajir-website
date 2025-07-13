'use client';
import React from 'react';

import styles from './styles.module.scss';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';

type Props = {
  children: React.ReactNode;
};

const PartnersSlider = ({ children }: Props) => {
  const [ref, api] = useEmblaCarousel({ loop: true, dragFree: true }, [
    AutoScroll({ stopOnInteraction: true, speed:0.4 }),
  ]);

  return (
    <div className={styles.slider} ref={ref}>
      <div className={styles.slider__container}>{children}</div>
    </div>
  );
};

export const PartnersSliderItem = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className={styles.slider__item}>{children}</div>;
};

export default PartnersSlider;
