import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

function sendToGoogleAnalytics({ name, delta, value, id }: any) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', name, {
      event_category: 'Web Vitals',
      value: Math.round(name === 'CLS' ? delta * 1000 : delta),
      event_label: id,
      non_interaction: true,
    });
  }
}

export function reportWebVitals() {
  getCLS(sendToGoogleAnalytics);
  getFID(sendToGoogleAnalytics);
  getFCP(sendToGoogleAnalytics);
  getLCP(sendToGoogleAnalytics);
  getTTFB(sendToGoogleAnalytics);
} 