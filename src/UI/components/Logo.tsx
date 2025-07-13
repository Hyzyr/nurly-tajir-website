import Link from 'next/link';
import React from 'react';

type Props = {
  style?: 'main' | 'white';
};

const Logo = ({ style = 'main' }: Props) => {
  return (
    <Link className="logo" href="/">
      {style === 'main' && <img src="/images/logo-main.svg" alt="Nurly Tajir" />}
      {style === 'white' && <img src="/images/logo-white.svg" alt="Nurly Tajir" />}
    </Link>
  );
};

export default Logo;
