import StoreSection from '@/components/sections/StoreSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blinding Lights — Product Details',
  description: 'Detailed look at the OPN WRLD Blinding Lights 001 Tee. 280gsm heavyweight cotton, oversized fit, two colorways. Lagos-born streetwear.',
};

export default function ProductPage() {
  return (
    <div className="page-top-pad">
      <StoreSection />
      {/* Could add more detail sections here if needed */}
    </div>
  );
}
