import '@/UI/assets/css/main.scss';
import HeaderDashboard from '@/UI/base/Header/HeaderDashboard';

import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-manrope',
});

type RootPropsType = {
  children: React.ReactNode;
};
export const metadata: Metadata = {
  title: 'Nurly Tajir | Dowrebap Tehnologiya',
  description: 'Nurly Tajir | Dowrebap Tehnologiya',
};

export default async function RootLayout({ children }: RootPropsType) {
  return (
    <html lang={'en'}>
      <body className={`${manrope.variable} `}>
        <main className={'main'} id="main">
          <HeaderDashboard />
          {children}
        </main>
      </body>
    </html>
  );
}
