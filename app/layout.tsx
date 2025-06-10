import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#9333ea' },
    { media: '(prefers-color-scheme: dark)', color: '#9333ea' }
  ],
}

export const metadata: Metadata = {
  title: 'Rice Purity Test 2025 | The Original College Quiz',
  description: 'Take the classic Rice Purity Test updated for 2025. Answer 100 questions honestly to find out your purity score. The modern college quiz experience.',
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
  authors: [{ name: 'Rice Purity Test 2025' }],
  creator: 'Rice Purity Test 2025',
  publisher: 'Rice Purity Test 2025',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://rice-purity-test-2025.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Rice Purity Test 2025 | How Pure Are You?',
    description: 'Take the classic Rice Purity Test updated for 2025. 100 questions to determine your purity score. The modern college quiz experience.',
    url: 'https://rice-purity-test-2025.vercel.app',
    siteName: 'Rice Purity Test 2025',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Rice Purity Test 2025 - The Original College Quiz',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rice Purity Test 2025 | The Original College Quiz',
    description: 'Just took the Rice Purity Test 2025! Take it yourself and see how pure you are 📊',
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
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 antialiased">
        {children}
      </body>
    </html>
  )
} 