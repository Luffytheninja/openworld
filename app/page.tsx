import NewHomeSection from '@/components/sections/NewHomeSection';
import MaintenanceSection from '@/components/sections/MaintenanceSection';
import { IS_MAINTENANCE_MODE } from '@/lib/maintenance';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: IS_MAINTENANCE_MODE
    ? 'OPN WRLD — Coming Soon | Down for Maintenance'
    : 'OPN WRLD — Lagos Born Streetwear | Available Now',
  description: IS_MAINTENANCE_MODE
    ? 'OPN WRLD is currently undergoing maintenance. Stay tuned for the upcoming drop.'
    : 'OPN WRLD Streetwear Lagos. Heavyweight 280gsm drops, raw energy. Drop 001 Blinding Lights Available Now.',
};

export default function HomePage() {
  if (IS_MAINTENANCE_MODE) {
    return <MaintenanceSection />;
  }
  return <NewHomeSection />;
}
