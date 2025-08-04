import styles from './styles.module.scss';

import React, { useEffect } from 'react';
import gsap from 'gsap';

type Props = {
  ref: React.RefObject<HTMLDivElement | null>;
};

const useModalAnimations = ({ ref: wrapperRef }: Props) => {
  const timeline = React.useRef<GSAPTimeline | null>(null);
  const closed = React.useRef(false);

  useEffect(() => {
    if (!timeline.current) timeline.current = gsap.timeline();
  }, []);

  const show = () => {
    const wrapper = wrapperRef.current;
    const modal = wrapper?.querySelector(`.${styles.modal}`) as HTMLDivElement;
    const tl = timeline.current;
    if (!tl || !wrapper || !modal) return;
    gsap.set(wrapper, { clearProps: 'display' });
    console.log('show');
    closed.current = false;

    tl.clear()
      .fromTo(
        wrapper,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.3,
          ease: 'power1.in',
          delay: 0.2,
          onStart: () => {},
        }
      )
      .fromTo(
        modal,
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          rotate: 0,
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        },
        '-=0.15'
      );
  };
  const hide = () => {
    const wrapper = wrapperRef.current;
    const modal = wrapper?.querySelector(`.${styles.modal}`) as HTMLDivElement;
    const tl = timeline.current;
    if (!tl || !wrapper || !modal) return;
    console.log('hide');
    closed.current = true;

    tl.clear()
      .to(modal, {
        opacity: 0,
        y: 50,
        rotate: 0,
        scale: 0.96,
        duration: 0.3,
        delay: 0,
        ease: 'power2.in',
      })
      .to(
        wrapper,
        {
          opacity: 1,
          duration: 0.3,
          ease: 'power1.in',
          onComplete: () => {
            gsap.set(wrapper, { display: 'none' });
          },
        },
        '-=0.05'
      );
  };
  const shake = () => {
    if (closed.current) return;
    const wrapper = wrapperRef.current;
    const modal = wrapper?.querySelector(`.${styles.modal}`) as HTMLDivElement;
    const tl = timeline.current;
    if (!tl || !wrapper || !modal) return;
    console.log('shake');

    tl.clear().to(modal, {
      rotate: 2,
      repeat: 7,
      yoyo: true,
      duration: 0.05,
      ease: 'power2.in',
    });
  };

  return {
    show,
    hide,
    shake,
  };
};

export default useModalAnimations;
