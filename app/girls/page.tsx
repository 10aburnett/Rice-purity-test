import React from 'react';
import { RicePurityTestGirls } from '@/components/RicePurityTestGirls';
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#db2777' },
    { media: '(prefers-color-scheme: dark)', color: '#db2777' }
  ],
}

export const metadata: Metadata = {
  title: 'The Rice Purity Test for Girls',
  description: 'Take the Girls Rice Purity Test - 50 questions designed specifically for young women. Discover your innocence score and see how you compare. Free, anonymous, and fun!',
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
    title: 'The Rice Purity Test for Girls',
    description: 'Take the Girls Rice Purity Test - 50 questions designed specifically for young women. Discover your innocence score and see how you compare.',
    url: 'https://newricepurity.com/girls',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Rice Purity Test for Girls',
    description: 'Just took the Girls Rice Purity Test 2025! Take it yourself and see how you score 👑',
  },
}
 
export default function GirlsTestPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    "name": "The Rice Purity Test for Girls",
    "description": "Take the Girls Rice Purity Test - 50 questions designed specifically for young women. Discover your innocence score and see how you compare. Free, anonymous, and fun!",
    "url": "https://newricepurity.com/girls",
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
        id="girls-page-structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      <RicePurityTestGirls />
    </>
  );
} 