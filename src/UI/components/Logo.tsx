import Link from 'next/link';
import React from 'react';

const Logo = () => {
  return (
    <Link className="logo" href="/">
      <img src="/images/logo-main.svg" alt="Nurly Tajir" />
    </Link>
  );
};

export default Logo;
