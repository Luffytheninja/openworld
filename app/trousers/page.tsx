import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trousers',
  description: 'OPN WRLD trousers — coming soon.',
};

export default function TrousersPage() {
  notFound();
}
