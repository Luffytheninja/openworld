import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shorts',
  description: 'OPN WRLD shorts — coming soon.',
};

export default function ShortsPage() {
  notFound();
}
