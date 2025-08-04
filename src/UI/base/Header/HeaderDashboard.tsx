import styles from './styles.module.scss';

import React from 'react';
import HeaderWrapper from './HeaderWrapper';
import Container from '@/UI/containers';
import Logo from '@/UI/components/Logo';
import Button from '@/UI/components/Button';

const HeaderDashboard = () => {
  return (
    <HeaderWrapper>
      <div className={styles.header__main}>
        <Container size='lg'>
          <div className={styles.header__main__body}>
            <Logo />
            <nav>
              <Button text={'Logout'} />
            </nav>
          </div>
        </Container>
      </div>
    </HeaderWrapper>
  );
};

export default HeaderDashboard;
