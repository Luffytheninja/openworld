'use client';

import { StoreProvider } from '@/lib/store-context';
import ProductDetailModal from '@/components/ui/ProductDetailModal';
import { ReactNode } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <StoreProvider>
      {children}
      <ProductDetailModal />
    </StoreProvider>
  );
}
