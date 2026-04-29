import type { Metadata } from 'next';
import { Space_Grotesk, DM_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/ui/CustomCursor';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://opnwrld.com'),
  title: {
    default: 'OPN WRLD — Blinding Lights Preorder | Lagos',
    template: '%s | OPN WRLD',
  },
  description: 'OPN WRLD Blinding Lights Drop. Preorder now. 280gsm heavyweight cotton, two colorways. Lagos-born streetwear. Secure your cargo.',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'OPN WRLD — Blinding Lights Preorder | Lagos',
    description: '280gsm heavyweight cotton tee. Two colorways. Preorder open now.',
    url: 'https://opnwrld.com',
    siteName: 'OPN WRLD',
    locale: 'en_NG',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'OPN WRLD 001 Tee — Preorder Open' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OPN WRLD — 001 Tee Preorder | Lagos',
    description: 'Preorder the OPN WRLD 001 Tee. ₦25,000. Two colorways.',
    images: ['/og-image.png'],
  },
  keywords: ['streetwear', 'Lagos', 'Nigeria', 'preorder', 'tee', 'OPN WRLD', '001 tee'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmMono.variable}`}>
      <body>
        <CustomCursor />
        <Header />
        <main className="page-transition">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
