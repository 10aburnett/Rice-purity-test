import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: false,
})

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: false,
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export const metadata: Metadata = {
  title: 'New Rice Purity Test',
  description: 'Take the updated version of the classic Rice Purity Test - 100 questions to determine your innocence score. A modern college quiz experience.',
  keywords: [
    'rice purity test',
    'purity test',
    'college quiz',
    'purity score',
    'university quiz',
    'student quiz',
    '2025',
    'modern purity test'
  ],
  authors: [{ name: 'New Rice Purity Test' }],
  creator: 'New Rice Purity Test',
  publisher: 'New Rice Purity Test',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://newricepurity.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'New Rice Purity Test | How Pure Are You?',
    description: 'Take the New Rice Purity Test updated for 2025. 100 questions to determine your purity score. The modern college quiz experience.',
    url: 'https://newricepurity.com',
    siteName: 'New Rice Purity Test',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'New Rice Purity Test',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'New Rice Purity Test',
    description: 'Just took the New Rice Purity Test! Take it yourself and see how pure you are 📊',
    images: ['/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico?v=2', sizes: 'any' },
      { url: '/favicon.svg?v=2', type: 'image/svg+xml' },
      { url: '/favicon-16x16.svg?v=2', sizes: '16x16', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.svg?v=2', sizes: '180x180', type: 'image/svg+xml' },
    ],
    other: [
      { rel: 'mask-icon', url: '/favicon.svg?v=2', color: '#9333ea' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
      </head>
      <body className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 antialiased" suppressHydrationWarning={true}>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0HCW98CJ9Z"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0HCW98CJ9Z', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `}
        </Script>
        {children}
      </body>
    </html>
  )
} 