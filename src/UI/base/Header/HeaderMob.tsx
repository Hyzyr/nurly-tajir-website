import Logo from '@/UI/components/Logo';
import styles from './styles.module.scss';

import Container from '@/UI/containers';
import React, { useState } from 'react';
import HamburgerBtn from './HamburgerBtn';
import HeaderMenu from './HeaderMenu';



const HeaderMob = () => {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    const newState = !menuActive;
    setMenuActive(newState);
    document.body.style.overflow = newState ? 'hidden' : '';
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
