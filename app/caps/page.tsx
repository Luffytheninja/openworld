import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Caps',
  description: 'OPN WRLD caps — coming soon.',
};

export default function CapsPage() {
  notFound();
}
