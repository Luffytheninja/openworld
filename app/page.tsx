import HeroSection from '@/components/sections/HeroSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OPN WRLD — Lagos Born Streetwear | Heavyweight Drops',
  description: 'OPN WRLD Streetwear Lagos. Heavyweight 280gsm drops, raw energy, LTR frequency. Preorder Drop 001 Blinding Lights.',
};

export default function HomePage() {
  return <HeroSection />;
}
