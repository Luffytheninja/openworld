import type { Metadata, Viewport } from 'next';
import { Sedgwick_Ave_Display, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import Providers from './providers';

const sedgwickAveDisplay = Sedgwick_Ave_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-sedgwick',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://opnwrld.com'),
  title: {
    default: 'OPN WRLD — Lagos Born Streetwear | Heavyweight Drops',
    template: '%s | OPN WRLD',
  },
  description:
    'OPN WRLD is a Lagos-born streetwear brand engineered for raw energy and cultural frequency. Preorder Drop 001: Blinding Lights 280gsm heavyweight graphic tees with signature oversized boxy cuts.',
  applicationName: 'OPN WRLD',
  authors: [{ name: 'OPN WRLD', url: 'https://opnwrld.com' }],
  generator: 'Next.js',
  keywords: [
    'OPN WRLD',
    'Lagos Streetwear',
    'Nigerian Streetwear',
    'LTR',
    'Blinding Lights Drop',
    'Heavyweight Cotton Tee',
    '280gsm Graphic T-Shirt',
    'Boxy Fit Streetwear',
    'Lagos Fashion',
    'Afro Streetwear Brand',
  ],
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'OPN WRLD — Lagos Born Streetwear',
    description: 'Heavyweight drops, raw energy, LTR frequency. Preorder Drop 001: Blinding Lights.',
    url: 'https://opnwrld.com',
    siteName: 'OPN WRLD',
    locale: 'en_NG',
    type: 'website',
    images: [
      {
        url: '/opn-wrld-hero-image.png',
        width: 1200,
        height: 630,
        alt: 'OPN WRLD Lagos Streetwear — LTR Drop',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OPN WRLD — Lagos Born Streetwear',
    description: 'Preorder the latest OPN WRLD drops. Heavyweight 280gsm Lagos-born streetwear.',
    images: ['/opn-wrld-hero-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://opnwrld.com',
  },
};

// Rich JSON-LD Structured Data for Search Engines & AI Search Engines (AEO)
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ClothingStore',
      '@id': 'https://opnwrld.com/#organization',
      name: 'OPN WRLD',
      url: 'https://opnwrld.com',
      logo: 'https://opnwrld.com/favicon.png',
      image: 'https://opnwrld.com/opn-wrld-hero-image.png',
      description: 'Lagos-born streetwear brand creating heavyweight drops, raw frequency apparel, and oversized garments.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Lagos',
        addressCountry: 'NG',
      },
      priceRange: '₦30,000',
      sameAs: [
        'https://www.instagram.com/rocketmancave_/',
        'https://whatsapp.com/channel/0029VbC4xwK3rZZUI2Odc50b',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://opnwrld.com/#website',
      url: 'https://opnwrld.com',
      name: 'OPN WRLD',
      publisher: {
        '@id': 'https://opnwrld.com/#organization',
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://opnwrld.com/search?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'ItemList',
      name: 'Drop 001: Blinding Lights Collection',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@type': 'Product',
            name: 'Blinding Lights — Black',
            description: '280gsm heavyweight ringspun cotton tee with signature Lagos streetwear cut.',
            image: 'https://opnwrld.com/images/blbf.png',
            brand: { '@type': 'Brand', name: 'OPN WRLD' },
            offers: {
              '@type': 'Offer',
              price: '30000',
              priceCurrency: 'NGN',
              availability: 'https://schema.org/PreOrder',
              url: 'https://opnwrld.com/shirts',
            },
          },
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@type': 'Product',
            name: 'Blinding Lights — Yellow',
            description: '280gsm heavyweight ringspun cotton tee in electric yellow with frequency print.',
            image: 'https://opnwrld.com/images/blyf.png',
            brand: { '@type': 'Brand', name: 'OPN WRLD' },
            offers: {
              '@type': 'Offer',
              price: '30000',
              priceCurrency: 'NGN',
              availability: 'https://schema.org/PreOrder',
              url: 'https://opnwrld.com/shirts',
            },
          },
        },
        {
          '@type': 'ListItem',
          position: 3,
          item: {
            '@type': 'Product',
            name: 'Blinding Lights — White',
            description: '280gsm heavyweight ringspun cotton tee in raw optic white.',
            image: 'https://opnwrld.com/images/blwf.png',
            brand: { '@type': 'Brand', name: 'OPN WRLD' },
            offers: {
              '@type': 'Offer',
              price: '30000',
              priceCurrency: 'NGN',
              availability: 'https://schema.org/PreOrder',
              url: 'https://opnwrld.com/shirts',
            },
          },
        },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is OPN WRLD?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'OPN WRLD is a Lagos-born streetwear brand focused on raw energy, heavyweight 280gsm cotton garments, and cultural frequency drops.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I preorder from OPN WRLD?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can select your desired drop and colorway on opnwrld.com and click preorder to lock in your order with priority Lagos delivery via WhatsApp concierge.',
          },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sedgwickAveDisplay.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Providers>
          <CustomCursor />
          <Header />
          <main className="page-transition">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
