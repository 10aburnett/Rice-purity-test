import React from 'react';
import { RicePurityTestBoys } from '@/components/RicePurityTestBoys';
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';

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
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    "name": "New Rice Purity Test for Boys",
    "description": "Take the Rice Purity Test designed specifically for boys. 50 tailored questions to test your experiences. How do you stack up against other guys?",
    "url": "https://newricepurity.com/boys",
    "creator": {
      "@type": "Organization",
      "name": "New Rice Purity Test"
    },
    "publisher": {
      "@type": "Organization",
      "name": "New Rice Purity Test"
    },
    "datePublished": "2025-01-01",
    "inLanguage": "en-US",
    "isAccessibleForFree": true,
    "audience": {
      "@type": "Audience",
      "audienceType": "College Students"
    }
  };

  return (
    <>
      <Script
        id="boys-page-structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      <RicePurityTestBoys />
    </>
  );
} 