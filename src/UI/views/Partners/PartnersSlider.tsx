'use client';
import React from 'react';

import styles from './styles.module.scss';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { useObserver } from '@/hooks/useObserver';

type Props = {
  children: React.ReactNode;
};

const PartnersSlider = ({ children }: Props) => {
  const [wrapperRef, emblaApi] = useEmblaCarousel(
    { loop: true, dragFree: true },
    [AutoScroll({ stopOnInteraction: true, speed: 0.4 })]
  );
  const { ref } = useObserver({
    onChange: (state) => {
      // window.api = api;
      console.log('state', state);
      // state? api.stop()
    },
  });
  return (
    <div className={styles.slider} ref={wrapperRef}>
      <div className={styles.slider__container} ref={ref}>
        {children}
      </div>
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
