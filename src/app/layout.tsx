import '@/UI/assets/css/main.scss';

import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-montserrat',
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
      <body className={`${montserrat.variable} `}>
        <main className={'main'}>{children}</main>
      </body>
    </html>
  );
}
