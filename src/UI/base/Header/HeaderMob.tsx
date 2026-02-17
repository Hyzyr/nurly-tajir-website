import Logo from '@/UI/components/Logo';
import styles from './styles.module.scss';

import Container from '@/UI/containers';
import React, { useState } from 'react';
import HamburgerBtn from './HamburgerBtn';
import HeaderMenu from './HeaderMenu';
import { useLenisScroll } from '@/hooks/useLenisScroll';

const HeaderMob = () => {
  const [menuActive, setMenuActive] = useState(false);
  const { stopScroll, startScroll } = useLenisScroll();

  const toggleMenu = (state?: boolean) => {
    const newState = state === undefined ? !menuActive : state;
    setMenuActive(newState);
    newState ? stopScroll() : startScroll();
  };

  return (
    <>
      <Container>
        <div className={styles.headermob}>
          <Logo />
          <HamburgerBtn onClick={toggleMenu} active={menuActive} />
        </div>
        <HeaderMenu active={menuActive} toggle={toggleMenu} />
      </Container>
    </>
  );
};

export default HeaderMob;
