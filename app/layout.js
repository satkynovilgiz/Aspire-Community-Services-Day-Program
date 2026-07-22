import { Fraunces, Work_Sans, Space_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata = {
  title: 'Aspire Community Services Day Program | San Jose, CA',
  description:
    'Aspire Community Services Day Program (ACSDP) is a person-centered, community-based day program for adults with developmental disabilities in San Jose, CA. Regional Center vendor, service code 531.',
  metadataBase: new URL('https://aspire-community-services.vercel.app'),
  openGraph: {
    title: 'Aspire Community Services Day Program',
    description:
      'Person-centered, community-based day services for adults with developmental disabilities in San Jose, CA.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${workSans.variable} ${spaceMono.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
