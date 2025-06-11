'use client';

import Script from 'next/script';

export default function GoogleAnalytics() {
  return (
    <>
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
            page_path: window.location.pathname,
            transport_url: 'https://www.google-analytics.com',
            first_party_collection: true
          });
        `}
      </Script>
    </>
  );
} 