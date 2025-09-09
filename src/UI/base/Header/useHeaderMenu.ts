'use client';
import React from 'react';
import gsap from 'gsap';

type Props = {
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  bodyRef: React.RefObject<HTMLDivElement | null>;
};

type useHeaderMenuReturns = {
  initStyles: () => void;
  setVisible: () => void;
  setHidden: () => void;
};

const useHeaderMenu = ({
  wrapperRef,
  bodyRef,
}: Props): useHeaderMenuReturns => {
  const initStyles = () => {
    const wrapper = wrapperRef?.current;
    const body = bodyRef?.current;

    if (!wrapper || !body) return;
    gsap.set(wrapper, {
      left: `200%`,
      opacity: 0,
      pointerEvents: 'none',
    });
    gsap.set(body, {
      opacity: 0,
      y: 30,
    });
  };
  const setVisible = () => {
    const wrapper = wrapperRef.current;
    const body = bodyRef.current;

    if (!wrapper || !body) return;
    gsap.set(wrapper, {
      left: `0`,
      y: 30,
      pointerEvents: 'all',
    });
    gsap.to(wrapper, {
      opacity: 1,
      duration: 0.3,
    });
    gsap.to(body, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      delay: 0.25,
    });
  };
  const setHidden = () => {
    const wrapper = wrapperRef.current;
    const body = bodyRef.current;

    if (!wrapper || !body) return;

    gsap.to(body, {
      opacity: 0,
      y: 30,
      duration: 0.23,
    });
    gsap.to(wrapper, {
      opacity: 0,
      duration: 0.3,
      delay: 0.2,

      onComplete: () => {
        gsap.set(wrapper, {
          left: `200%`,
          opacity: 0,
          pointerEvents: 'none',
        });
      },
    });
  };

  return {
    initStyles,
    setVisible,
    setHidden,
  };
};

export default useHeaderMenu;
