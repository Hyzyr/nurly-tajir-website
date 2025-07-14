'use client';
import styles from './styles.module.scss';
import React, { useState } from 'react';

type Props = {
  active?: boolean;
  onClick?: () => void;
};

const HamburgerBtn = ({ active: activeState, onClick }: Props) => {
  const [active, setActive] = useState(false);
  const clickHandler = () => {
    if (onClick) onClick();
    else setActive(!active);
  };
  
  return (
    <button
      id="nav-icon3"
      className={`${styles.hamburger} ${active || activeState ? 'open' : ''}`}
      onClick={clickHandler}>
      <div className={styles.hamburger__body}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </button>
  );
};

export default HamburgerBtn;
