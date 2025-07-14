import Logo from '@/UI/components/Logo';
import styles from './styles.module.scss';

import Container from '@/UI/containers';
import React, { useState } from 'react';
import Button from '@/UI/components/Button';
import HamburgerBtn from './HamburgerBtn';
import HeaderMenu from './HeaderMenu';

type Props = {};

const HeaderMob = (props: Props) => {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    const newState = !menuActive;
    console.log('toggle menu ', newState);
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
