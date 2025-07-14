'use client';
import Icon, { IconNames } from '@/UI/components/Icon';
import styles from './styles.module.scss';

import Container from '@/UI/containers';
import Logo from '@/UI/components/Logo';
import Button from '@/UI/components/Button';
import Link from 'next/link';
import HeaderWrapper from './HeaderWrapper';
import { useMedia } from '@/hooks/useMedia';
import HeaderDesktop from './HeaderDesktop';
import HeaderMob from './HeaderMob';

const Header = () => {
  const isMobile = useMedia('(max-width: 1024px)');

  return (
    <HeaderWrapper>
      {!isMobile && <HeaderDesktop />}
      {isMobile && <HeaderMob />}
    </HeaderWrapper>
  );
};

export default Header;
