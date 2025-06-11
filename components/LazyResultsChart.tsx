'use client';

import { lazy, Suspense } from 'react';

const ResultsChart = lazy(() => import('./ResultsChart').then(module => ({ default: module.ResultsChart })));

interface LazyResultsChartProps {
  categoryScores: Array<{
    name: string;
    score: number;
    maxScore: number;
    percentage: number;
    purityLevel: string;
    color: string;
  }>;
  testType: 'original' | 'boys' | 'girls';
  totalScore?: number;
  totalQuestions?: number;
  questions: Array<{
    id: number;
    text: string;
    category: string;
  }>;
  checkedItems: Set<number>;
}

export default function LazyResultsChart(props: LazyResultsChartProps) {
  return (
    <Suspense 
      fallback={
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full"></div>
          <span className="ml-3 text-gray-600">Loading results...</span>
        </div>
      }
    >
      <ResultsChart {...props} />
    </Suspense>
  );
} 