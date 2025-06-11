'use client';

import React, { useRef, useMemo, lazy, Suspense } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Lazy load heavy chart components
const LazyResponsiveContainer = lazy(() => import('recharts').then(module => ({ default: module.ResponsiveContainer })));

interface CategoryScore {
  name: string;
  score: number;
  maxScore: number;
  percentage: number;
  purityLevel: string;
  color: string;
}

interface ResultsChartProps {
  categoryScores: CategoryScore[];
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

const COLORS = {
  original: ['#8b5cf6', '#a855f7', '#c084fc', '#d8b4fe', '#e9d5ff'],
  boys: ['#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#c084fc'],
  girls: ['#ec4899', '#f472b6', '#f59e0b', '#10b981', '#8b5cf6']
};

const PIE_COLORS = {
  original: ['#2563eb', '#16a34a', '#f97316', '#ec4899', '#06b6d4'],
  boys: ['#1d4ed8', '#15803d', '#ea580c', '#eab308', '#0891b2'],
  girls: ['#3b82f6', '#22c55e', '#ff6b35', '#eab308', '#14b8a6']
};

const getPurityLevel = (percentage: number): string => {
  if (percentage >= 90) return 'Very Pure';
  if (percentage >= 70) return 'Mostly Pure';
  if (percentage >= 50) return 'Moderate';
  if (percentage >= 30) return 'Lightly Impure';
  return 'Very Impure';
};

const getPurityColor = (percentage: number): string => {
  if (percentage >= 90) return '#10b981'; // green
  if (percentage >= 70) return '#3b82f6'; // blue
  if (percentage >= 50) return '#f59e0b'; // yellow
  if (percentage >= 30) return '#f97316'; // orange
  return '#ef4444'; // red
};

// Shorten category names for better display
const shortenCategoryName = (name: string): string => {
  const abbreviations: { [key: string]: string } = {
    'Relationships & Romance': 'Romance',
    'Relationships & Dating': 'Dating', 
    'Relationships & Drama': 'Drama',
    'Substances & Partying': 'Partying',
    'Sexual Activity': 'Sexual',
    'Legal & Risky Behavior': 'Risky',
    'Academic & Professional': 'Academic',
    'Digital & Social Media': 'Digital',
    'Lifestyle & Personal': 'Lifestyle'
  };
  return abbreviations[name] || name;
};

export const ResultsChart: React.FC<ResultsChartProps> = ({ categoryScores, testType, totalScore, totalQuestions, questions, checkedItems }) => {
  const colors = COLORS[testType];
  const pieColors = PIE_COLORS[testType];
  const resultsRef = useRef<HTMLDivElement>(null);
  
  // Prepare data for pie chart (no labels to avoid overlap)
  const pieData = categoryScores.map((category, index) => ({
    name: shortenCategoryName(category.name),
    fullName: category.name,
    value: 100 - category.percentage,
    purity: category.percentage,
    color: pieColors[index % pieColors.length]
  }));

  // Prepare data for bar chart with shortened names
  const barData = categoryScores.map((category, index) => ({
    name: shortenCategoryName(category.name),
    fullName: category.name,
    purity: category.percentage,
    impurity: 100 - category.percentage,
    color: colors[index % colors.length]
  }));

  const themeColors = {
    original: { 
      primary: '#8b5cf6', 
      secondary: '#a855f7', 
      background: 'from-indigo-50 via-purple-50 to-pink-50',
      gradient: 'from-violet-400 to-purple-600'
    },
    boys: { 
      primary: '#3b82f6', 
      secondary: '#6366f1', 
      background: 'from-blue-50 via-indigo-50 to-purple-50',
      gradient: 'from-blue-400 to-indigo-600'
    },
    girls: { 
      primary: '#ec4899', 
      secondary: '#f472b6', 
      background: 'from-pink-50 via-rose-50 to-purple-50',
      gradient: 'from-pink-400 to-rose-600'
    }
  };

  const theme = themeColors[testType];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-2xl border border-gray-200 max-w-xs">
          <p className="font-bold text-gray-800 text-lg mb-2">{data.fullName}</p>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-green-600 font-semibold">Purity:</span>
              <span className="font-bold text-green-700">{data.purity?.toFixed(1)}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-red-600 font-semibold">Impurity:</span>
              <span className="font-bold text-red-700">{data.impurity?.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-2xl border border-gray-200 max-w-xs">
          <p className="font-bold text-gray-800 text-lg mb-2">{data.payload.fullName}</p>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-green-600 font-semibold">Purity:</span>
              <span className="font-bold text-green-700">{data.payload.purity?.toFixed(1)}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-red-600 font-semibold">Impurity:</span>
              <span className="font-bold text-red-700">{data.value?.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom label renderer for pie chart (positioned around slices, with special handling for single 100% category)
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    if (percent < 0.05) return null; // Don't show labels for very small slices
    
    // Special case: single dominant category (>=95%) OR only one visible slice - position above chart
    const visibleSlices = pieData.filter(d => d.value >= 5);
    if (visibleSlices.length === 1 || percent >= 0.95) {
      return (
        <text 
          x={cx} 
          y={cy - outerRadius - 15} 
          fill="#374151" 
          textAnchor="middle" 
          dominantBaseline="central"
          className="text-sm font-semibold"
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    }
    
    // Normal case: position labels around their respective pie slices
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 1.3;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    return (
      <text 
        x={x} 
        y={y} 
        fill="#374151" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-sm font-semibold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className={`mt-10 p-8 bg-gradient-to-br ${theme.background} rounded-3xl border-2 border-white/50 shadow-2xl backdrop-blur-sm hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] transition-all duration-500`} ref={resultsRef}>
      <div className="text-center mb-8">
        <div className={`inline-flex items-center space-x-3 bg-gradient-to-r ${theme.gradient} text-white px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]`}>
          <span className="text-2xl">📊</span>
          <h3 className="text-3xl font-black">Your Category Breakdown</h3>
        </div>
      </div>
      
      {/* Charts side by side */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Modern Pie Chart */}
        <div className="flex-1 bg-white/80 backdrop-blur-sm pt-4 px-4 pb-2 rounded-3xl shadow-2xl border border-white/60 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-[1.01] group">
          <div className="text-center mb-3">
            <h4 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-gray-900 transition-colors duration-200">Impurity Distribution</h4>
            <p className="text-gray-600 text-xs group-hover:text-gray-700 transition-colors duration-200">How your experiences shape the bigger picture</p>
          </div>
          <Suspense fallback={<div>Loading chart...</div>}>
            <LazyResponsiveContainer width="100%" height={280}>
              <PieChart>
                <defs>
                  {PIE_COLORS[testType].map((color, index) => (
                    <linearGradient key={index} id={`pie-gradient-${testType}-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={color} stopOpacity={0.8} />
                      <stop offset="100%" stopColor={color} stopOpacity={1} />
                    </linearGradient>
                  ))}
                </defs>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomLabel}
                  outerRadius={85}
                  innerRadius={35}
                  fill="#8884d8"
                  dataKey="value"
                  stroke="#ffffff"
                  strokeWidth={3}
                >
                  {pieData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={`url(#pie-gradient-${testType}-${index})`}
                      className="drop-shadow-lg hover:drop-shadow-2xl transition-all duration-300"
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
              </PieChart>
            </LazyResponsiveContainer>
          </Suspense>
          
          {/* Horizontal Legend Below Chart */}
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            {categoryScores.map((category, index) => (
              <div key={category.name} className="flex items-center space-x-1.5 hover:scale-[1.02] transition-transform duration-200">
                <div 
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0 shadow-sm"
                  style={{ backgroundColor: PIE_COLORS[testType][index % PIE_COLORS[testType].length] }}
                />
                <span className="text-xs font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200">{shortenCategoryName(category.name)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Modern Bar Chart */}
        <div className="flex-1 bg-white/80 backdrop-blur-sm pt-4 px-4 pb-0 rounded-3xl shadow-2xl border border-white/60 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-[1.01] group">
          <div className="text-center mb-3">
            <h4 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-gray-900 transition-colors duration-200">Purity vs Impurity</h4>
            <p className="text-gray-600 text-xs group-hover:text-gray-700 transition-colors duration-200">Compare your purity levels across categories</p>
          </div>
          <Suspense fallback={<div>Loading chart...</div>}>
            <LazyResponsiveContainer width="100%" height={350}>
              <BarChart
                data={barData}
                margin={{
                  top: 15,
                  right: 25,
                  left: -5,
                  bottom: 50,
                }}
              >
                <defs>
                  <linearGradient id="purityGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.9}/>
                    <stop offset="95%" stopColor="#047857" stopOpacity={1}/>
                  </linearGradient>
                  <linearGradient id="impurityGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#dc2626" stopOpacity={0.9}/>
                    <stop offset="95%" stopColor="#b91c1c" stopOpacity={1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.6} />
                <XAxis 
                  dataKey="name" 
                  fontSize={12}
                  fontWeight={600}
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  tick={{ fill: '#374151' }}
                  stroke="#6b7280"
                />
                <YAxis 
                  fontSize={12}
                  fontWeight={600}
                  tick={{ fill: '#374151' }}
                  stroke="#6b7280"
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  wrapperStyle={{ 
                    fontSize: '14px', 
                    fontWeight: '700',
                    paddingTop: '5px',
                    color: '#374151',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                  iconType="rect"
                  iconSize={10}
                  layout="vertical"
                />
                <Bar 
                  dataKey="purity" 
                  stackId="a" 
                  fill="url(#purityGradient)" 
                  name="Purity %" 
                  radius={[0, 0, 4, 4]}
                  className="drop-shadow-sm"
                />
                <Bar 
                  dataKey="impurity" 
                  stackId="a" 
                  fill="url(#impurityGradient)" 
                  name="Impurity %" 
                  radius={[4, 4, 0, 0]}
                  className="drop-shadow-sm"
                />
              </BarChart>
            </LazyResponsiveContainer>
          </Suspense>
        </div>
      </div>

      {/* Enhanced Category Summary Cards - Now in one line */}
      <div className="mt-12">
        <h4 className="text-2xl font-bold text-center text-gray-800 mb-8 hover:text-gray-900 transition-colors duration-200">Detailed Breakdown</h4>
        <div className="flex flex-wrap justify-center gap-4">
          {categoryScores.map((category, index) => (
            <div 
              key={category.name} 
              className="group bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-white/60 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)] hover:scale-[1.02] transition-all duration-300 cursor-pointer hover:border-white/80 flex flex-col items-center"
            >
              <div className="flex items-center justify-between mb-3 w-full">
                <h5 className="font-bold text-gray-800 text-sm leading-tight group-hover:text-gray-900 transition-colors duration-200">{shortenCategoryName(category.name)}</h5>
                <div 
                  className="w-4 h-4 rounded-full shadow-md ring-1 ring-white/50 flex-shrink-0 group-hover:shadow-lg group-hover:scale-[1.05] transition-all duration-300"
                  style={{ backgroundColor: PIE_COLORS[testType][index % PIE_COLORS[testType].length] }}
                />
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-black text-gray-800 mb-1 group-hover:text-gray-900 transition-colors duration-200">
                  {category.percentage.toFixed(1)}%
                </div>
                <div className="text-xs text-gray-600 mb-2 group-hover:text-gray-700 transition-colors duration-200">
                  {category.score}/{category.maxScore} pure
                </div>
                
                {/* Progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2 overflow-hidden group-hover:bg-gray-300 transition-colors duration-300">
                  <div 
                    className="h-2 rounded-full transition-all duration-1000 ease-out group-hover:shadow-lg"
                    style={{ 
                      width: `${category.percentage}%`,
                      background: `linear-gradient(90deg, ${getPurityColor(category.percentage)}, ${getPurityColor(category.percentage)}dd)`
                    }}
                  />
                </div>
                
                <div 
                  className="text-xs font-bold px-2 py-1 rounded-full inline-block shadow-sm group-hover:shadow-md group-hover:scale-[1.02] transition-all duration-300"
                  style={{ 
                    backgroundColor: getPurityColor(category.percentage) + '20',
                    color: getPurityColor(category.percentage),
                    border: `1px solid ${getPurityColor(category.percentage)}40`
                  }}
                >
                  {getPurityLevel(category.percentage)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center">
        <div className="inline-flex items-center space-x-2 bg-white/70 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg border border-white/60 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 hover:bg-white/80">
          <span className="text-2xl">💡</span>
          <p className="font-semibold text-gray-700 hover:text-gray-800 transition-colors duration-200">
            <strong>How to read this:</strong> Higher purity percentages mean you answered "no" to more questions in that category
          </p>
        </div>
      </div>
    </div>
  );
} 