'use client';
import HeaderWrapper from './HeaderWrapper';
import { useMedia } from '@/hooks/useMedia';
import HeaderDesktop from './HeaderDesktop';
import HeaderMob from './HeaderMob';
import { useContactModal } from '@/UI/components/ContactModal';

const Header = () => {
  const isMobile = useMedia('(max-width: 1024px)');
  const contacUse = useContactModal();
  
  return (
    <HeaderWrapper>
      {!isMobile && <HeaderDesktop />}
      {isMobile && <HeaderMob />}
    </HeaderWrapper>
  );
};

export default Header;
