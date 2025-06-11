'use client';

import { useEffect } from 'react';
import { reportWebVitals } from '../utils/web-vitals';

export default function WebVitalsReporter() {
  useEffect(() => {
    // Wait for Google Analytics to load
    const timer = setTimeout(() => {
      reportWebVitals();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return null; // This component doesn't render anything
} 