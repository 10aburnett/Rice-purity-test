import React from 'react';
import { RicePurityTestBoys } from '@/components/RicePurityTestBoys';
import type { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#2563eb' },
    { media: '(prefers-color-scheme: dark)', color: '#2563eb' }
  ],
}

export const metadata: Metadata = {
  title: 'New Rice Purity Test for Boys',
  description: 'Take the Rice Purity Test designed specifically for boys. 50 tailored questions to test your experiences. How do you stack up against other guys?',
  keywords: [
    'rice purity test boys',
    'boys purity test',
    'guys quiz',
    'male purity test',
    'college quiz boys',
    'bros test',
    '2025'
  ],
  openGraph: {
    title: 'New Rice Purity Test for Boys',
    description: 'Take the Rice Purity Test designed specifically for boys. 50 tailored questions to test your experiences.',
    url: 'https://newricepurity.com/boys',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'New Rice Purity Test for Boys',
    description: 'Just took the Boys Rice Purity Test 2025! Take it yourself and see how you stack up 🔥',
  },
}
 
export default function BoysTestPage() {
  return <RicePurityTestBoys />;
} 