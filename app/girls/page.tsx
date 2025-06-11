import React from 'react';
import { RicePurityTestGirls } from '@/components/RicePurityTestGirls';
import type { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#db2777' },
    { media: '(prefers-color-scheme: dark)', color: '#db2777' }
  ],
}

export const metadata: Metadata = {
  title: 'Rice Purity Test for Girls 2025 | The Ultimate Girls Quiz',
  description: 'Take the Rice Purity Test designed specifically for girls. 50 tailored questions about modern female experiences. How pure are you, queen?',
  keywords: [
    'rice purity test girls',
    'girls purity test',
    'female purity test',
    'women quiz',
    'college quiz girls',
    'girls test',
    '2025'
  ],
  openGraph: {
    title: 'Rice Purity Test for Girls 2025 | How Pure Are You?',
    description: 'Take the Rice Purity Test designed specifically for girls. 50 tailored questions about modern female experiences.',
    url: 'https://rice-purity-test-2025.vercel.app/girls',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rice Purity Test for Girls 2025 | The Ultimate Girls Quiz',
    description: 'Just took the Girls Rice Purity Test 2025! Take it yourself and see how you score 👑',
  },
}
 
export default function GirlsTestPage() {
  return <RicePurityTestGirls />;
} 