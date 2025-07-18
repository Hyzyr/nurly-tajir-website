import '@/UI/assets/css/main.scss';

import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-manrope',
});

export const metadata: Metadata = {
  title: 'Nurly Tajir | Dowrebap Tehnologiya',
  description: 'Nurly Tajir | Dowrebap Tehnologiya',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} `}>
        <main className={'main'} id="main">{children}</main>
      </body>
    </html>
  );
}
