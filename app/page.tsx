import HeroSection from '@/components/sections/HeroSection';
import MaintenanceSection from '@/components/sections/MaintenanceSection';
import { IS_MAINTENANCE_MODE } from '@/lib/maintenance';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: IS_MAINTENANCE_MODE
    ? 'OPN WRLD — Coming Soon | Down for Maintenance'
    : 'OPN WRLD — Lagos Born Streetwear | Heavyweight Drops',
  description: IS_MAINTENANCE_MODE
    ? 'OPN WRLD is currently undergoing maintenance. Stay tuned for the upcoming drop.'
    : 'OPN WRLD Streetwear Lagos. Heavyweight 280gsm drops, raw energy, LTR frequency. Preorder Drop 001 Blinding Lights.',
};

export default function HomePage() {
  if (IS_MAINTENANCE_MODE) {
    return <MaintenanceSection />;
  }
  return <HeroSection />;
}

