import StoreSection from '@/components/sections/StoreSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shirts',
  description: 'Shop heavyweight cotton shirts from OPN WRLD. Lagos-born streetwear.',
};

export default function ShirtsPage() {
  return <StoreSection initialCategory="shirts" />;
}
