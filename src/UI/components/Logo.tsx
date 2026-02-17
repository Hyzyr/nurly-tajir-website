import { cn } from '@/utils/cn';
import Link from 'next/link';
import React from 'react';

type Props = {
  style?: 'main' | 'white';
  size?: 'md' | 'lg' | 'sm';
};

const Logo = ({ style = 'main', size = 'md' }: Props) => {
  return (
    <Link className={cn('logo', `_${size}`)} href="/">
      {style === 'main' && <img src="/images/logo-main.svg" alt="Nurly Tajir" />}
      {style === 'white' && <img src="/images/logo-white.svg" alt="Nurly Tajir" />}
    </Link>
  );
};

export default Logo;
