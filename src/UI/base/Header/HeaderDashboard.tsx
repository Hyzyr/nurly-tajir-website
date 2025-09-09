'use client';
import styles from './styles.module.scss';

import React from 'react';
import HeaderWrapper from './HeaderWrapper';
import Container from '@/UI/containers';
import Logo from '@/UI/components/Logo';
import Button from '@/UI/components/Button';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase/client';

const HeaderDashboard = () => {
  const router = useRouter();

  const logout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <HeaderWrapper key={'header-admin'}>
      <div className={styles.header__main}>
        <Container size="lg">
          <div className={styles.header__main__body}>
            <Logo />
            <nav>
              <Button text={'Logout'} onClick={() => logout()} />
            </nav>
          </div>
        </Container>
      </div>
    </HeaderWrapper>
  );
};

export default HeaderDashboard;
