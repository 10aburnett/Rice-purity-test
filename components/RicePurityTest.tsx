'use client';

import React, { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { questions, categories } from '@/data/questions';
import LazyResultsChart from '@/components/LazyResultsChart';
import Link from 'next/link';

interface ScoreBadge {
  min: number;
  max: number;
  label: string;
  description: string;
  color: string;
}

const scoreBadges: ScoreBadge[] = [
  { min: 97, max: 100, label: "Innocent Soul", description: "You're either lying or you've been living under a rock", color: "bg-emerald-100 text-emerald-800" },
  { min: 93, max: 96, label: "Holy Saint", description: "Your halo is showing", color: "bg-emerald-100 text-emerald-800" },
  { min: 87, max: 92, label: "Pure & Simple", description: "Still got that innocent charm", color: "bg-teal-100 text-teal-800" },
  { min: 77, max: 86, label: "Pretty Pure", description: "A few bumps on the road", color: "bg-cyan-100 text-cyan-800" },
  { min: 63, max: 76, label: "Lightly Tainted", description: "You've dipped your toes in the water", color: "bg-amber-100 text-amber-800" },
  { min: 45, max: 62, label: "Somewhat Impure", description: "Living a little", color: "bg-orange-100 text-orange-800" },
  { min: 30, max: 44, label: "Moderately Corrupt", description: "You've got some stories", color: "bg-red-100 text-red-800" },
  { min: 16, max: 29, label: "Seriously Impure", description: "Your friends come to you for advice", color: "bg-violet-100 text-violet-800" },
  { min: 9, max: 15, label: "Extremely Corrupt", description: "You need therapy", color: "bg-purple-100 text-purple-800" },
  { min: 3, max: 8, label: "Irredeemably Corrupt", description: "Seek professional help immediately", color: "bg-slate-100 text-slate-800" },
  { min: 0, max: 2, label: "The Devil", description: "Your soul is beyond salvation. You've descended into the depths of depravity where even demons fear to tread", color: "bg-black text-red-500" }
];

export const RicePurityTest: React.FC = memo(() => {
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const [isCompleted, setIsCompleted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Memoized calculations
  const checkedCount = useMemo(() => checkedItems.size, [checkedItems]);
  const score = useMemo(() => 100 - checkedCount, [checkedCount]);
  const progressPercentage = useMemo(() => (checkedCount / 100) * 100, [checkedCount]);

  useEffect(() => {
    if (checkedCount > 0) {
      setIsCompleted(true);
    }
  }, [checkedCount]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDropdownOpen]);

  useEffect(() => {
    return () => {
      setIsDropdownOpen(false);
    };
  }, []);

  // Optimized checkbox handler
  const handleCheckboxChange = useCallback((questionId: number) => {
    setCheckedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  }, []);

  const getScoreBadge = (score: number): ScoreBadge => {
    return scoreBadges.find(badge => score >= badge.min && score <= badge.max) || scoreBadges[scoreBadges.length - 1];
  };

  // Memoized category scores calculation
  const categoryScores = useMemo(() => {
    return categories.map(category => {
      const categoryQuestions = category.questions;
      const checkedInCategory = categoryQuestions.filter(q => checkedItems.has(q.id)).length;
      const uncheckedInCategory = categoryQuestions.length - checkedInCategory;
      const purityPercentage = (uncheckedInCategory / categoryQuestions.length) * 100;
      
      return {
        name: category.name,
        score: uncheckedInCategory,
        maxScore: categoryQuestions.length,
        percentage: purityPercentage,
        purityLevel: '',
        color: ''
      };
    });
  }, [checkedItems]);

  const badge = getScoreBadge(score);

  const copyToClipboard = async () => {
    const text = `I just took the New Rice Purity Test 2025 and scored ${score}/100 (${badge.label})! Take it yourself at ${window.location.origin}`;
    try {
      await navigator.clipboard.writeText(text);
      alert('Link copied! You can now paste it anywhere to share your results.');
    } catch (err) {
      alert('Link copied! You can now paste it anywhere to share your results.');
    }
  };

  const getShareText = () => {
    return `I just took the New Rice Purity Test 2025 and scored ${score}/100 (${badge.label})! 🎯 How pure are you? Take the test and find out!`;
  };

  const getCurrentUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    return 'https://yoursite.com';
  };

  const shareToTwitter = () => {
    const text = getShareText();
    const url = getCurrentUrl();
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank');
  };

  const shareToFacebook = () => {
    const url = getCurrentUrl();
    const text = getShareText();
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Only try to open Facebook app
      const appUrl = `fb://share?link=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
      window.location.href = appUrl;
    } else {
      // Desktop behavior
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
      window.open(facebookUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const shareToInstagram = async () => {
    const text = `I just took the New Rice Purity Test 2025 and scored ${score}/100 (${badge.label})! Take it yourself at ${window.location.origin}`;
    try {
      await navigator.clipboard.writeText(text);
      alert('Link copied! You can now paste it in your Instagram story or bio.');
    } catch (err) {
      alert('Link copied! You can now paste it in your Instagram story or bio.');
    }
  };

  const shareToTikTok = async () => {
    const text = `I just took the New Rice Purity Test 2025 and scored ${score}/100 (${badge.label})! Take it yourself at ${window.location.origin}`;
    try {
      await navigator.clipboard.writeText(text);
      alert('Link copied! You can now paste it in your TikTok bio or share in a video.');
    } catch (err) {
      alert('Link copied! You can now paste it in your TikTok bio or share in a video.');
    }
  };

  const shareToWhatsApp = () => {
    const text = getShareText();
    const url = getCurrentUrl();
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
    window.open(whatsappUrl, '_blank');
  };

  const shareToReddit = () => {
    const text = getShareText();
    const url = getCurrentUrl();
    const redditUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`;
    window.open(redditUrl, '_blank');
  };

  const shareToTelegram = () => {
    const text = getShareText();
    const url = getCurrentUrl();
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    window.open(telegramUrl, '_blank');
  };

  const downloadAsImage = async () => {
    try {
      const [{ default: html2canvas }] = await Promise.all([
        import('html2canvas'),
        new Promise(resolve => setTimeout(resolve, 0)) // Yield to browser
      ]);
      const element = document.querySelector('.downloadable-content') as HTMLElement;
      if (!element) return;
      
      // Find the badge element and temporarily adjust its styling for download
      const badgeElement = element.querySelector('.inline-block.px-10.py-5') as HTMLElement;
      let originalStyle = '';
      
      if (badgeElement) {
        originalStyle = badgeElement.style.cssText;
        // Apply download-specific positioning
        badgeElement.style.display = 'inline-flex';
        badgeElement.style.alignItems = 'flex-start';
        badgeElement.style.justifyContent = 'center';
        badgeElement.style.padding = '12px 40px 28px 40px';
      }
      
      // Force a small delay to ensure CSS is fully loaded
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: 3,
        logging: false,
        useCORS: true,
        allowTaint: true,
        height: element.scrollHeight + 40,
        width: element.scrollWidth + 40,
        scrollX: 0,
        scrollY: 0,
        ignoreElements: (element) => {
          return element.classList.contains('hover:') || element.classList.contains('group-hover:');
        }
      });
      
      // Restore original badge styling
      if (badgeElement) {
        badgeElement.style.cssText = originalStyle;
      }
      
      const link = document.createElement('a');
      link.download = 'rice-purity-test-results.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      alert('Error downloading image. Please try again.');
    }
  };

  const downloadAsPDF = async () => {
    try {
      const [{ default: html2canvas }, jsPDF] = await Promise.all([
        import('html2canvas'),
        import('jspdf'),
        new Promise(resolve => setTimeout(resolve, 0)) // Yield to browser
      ]);
      
      const element = document.querySelector('.downloadable-content') as HTMLElement;
      if (!element) return;
      
      // Find the badge element and temporarily adjust its styling for download
      const badgeElement = element.querySelector('.inline-block.px-10.py-5') as HTMLElement;
      let originalStyle = '';
      
      if (badgeElement) {
        originalStyle = badgeElement.style.cssText;
        // Apply download-specific positioning
        badgeElement.style.display = 'inline-flex';
        badgeElement.style.alignItems = 'flex-start';
        badgeElement.style.justifyContent = 'center';
        badgeElement.style.padding = '12px 40px 28px 40px';
      }
      
      const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: 3,
        logging: false,
        useCORS: true,
        allowTaint: true,
        height: element.scrollHeight + 40,
        width: element.scrollWidth + 40,
        scrollX: 0,
        scrollY: 0,
      });
      
      // Restore original badge styling
      if (badgeElement) {
        badgeElement.style.cssText = originalStyle;
      }
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF.jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = 210;
      const pdfHeight = 297;
      const imgWidth = pdfWidth - 20; // 10mm margin on each side
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      const x = 10; // 10mm left margin
      const y = 10; // 10mm top margin
      
      if (imgHeight <= pdfHeight - 20) {
        // Image fits on one page
        pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
      } else {
        // Image needs multiple pages
        let heightLeft = imgHeight;
        let position = y;
        
        // First page
        pdf.addImage(imgData, 'PNG', x, position, imgWidth, imgHeight);
        heightLeft -= (pdfHeight - 20);
        
        // Additional pages if needed
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight + 10;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', x, position, imgWidth, imgHeight);
          heightLeft -= (pdfHeight - 20);
        }
      }
      
      pdf.save('rice-purity-test-results.pdf');
    } catch (error) {
      alert('Error downloading PDF. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-stone-50 to-neutral-100">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-stone-200 shadow-lg shadow-stone-200/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 sm:py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-2">
            <div className="flex-1 min-w-0 text-center sm:text-left">
              <h1 className="text-lg sm:text-2xl md:text-3xl font-black tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
                New Rice Purity Test 2025
              </h1>
              <p className="text-xs sm:text-sm font-medium text-stone-600 mt-1">
                The classic college quiz, updated for the modern era
              </p>
            </div>
            
            {/* Mobile: Stack score and dropdown horizontally, Desktop: normal order */}
            <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6">
              {/* Test Selector Dropdown */}
              <div className="relative dropdown-container">
              <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 sm:space-x-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] border border-violet-400/30"
                >
                  <span className="text-sm sm:text-lg">✨</span>
                  <span className="sm:hidden text-xs">Original</span>
                  <span className="hidden sm:inline text-sm">Original Test</span>
                  <svg className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute left-0 sm:right-0 mt-2 w-56 sm:w-64 bg-black/80 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-white/20 shadow-2xl shadow-purple-500/25 overflow-hidden z-50">
                    <div className="p-2 space-y-1">
                      <div className="bg-gradient-to-r from-violet-500 to-purple-500 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm flex items-center space-x-2 sm:space-x-3">
                        <span className="text-sm sm:text-lg">✨</span>
                        <span>Original Test</span>
                        <span className="ml-auto text-xs bg-white/20 px-2 py-1 rounded">Current</span>
                      </div>
                      <Link 
                        href="/boys" 
                        className="flex items-center space-x-2 sm:space-x-3 text-white hover:text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-gray-800/50 hover:bg-blue-600 transition-all duration-200 group relative font-semibold text-xs sm:text-sm"
                      >
                        <span className="text-sm sm:text-lg">💪</span>
                        <span>Boys' Test</span>
                      </Link>
                      <Link 
                        href="/girls" 
                        className="flex items-center space-x-2 sm:space-x-3 text-white hover:text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-gray-800/50 hover:bg-pink-600 transition-all duration-200 group relative font-semibold text-xs sm:text-sm"
                      >
                        <span className="text-sm sm:text-lg">💅</span>
                        <span>Girls' Test</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Score Section */}
              <div className="text-center sm:text-right">
                <div className="text-xl sm:text-3xl md:text-4xl font-black text-slate-800">
                  {checkedCount}<span className="text-stone-400">/{100}</span>
                </div>
                <div className="text-xs font-semibold text-stone-500">
                  Score: <span className="font-black text-indigo-600">{score}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-3 sm:mt-5 w-full bg-slate-200 rounded-full h-3 sm:h-4 overflow-hidden shadow-inner">
            <div 
              className="h-3 sm:h-4 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 rounded-full transition-all duration-700 ease-out shadow-lg"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6 sm:space-y-10">
        {/* Instructions */}
        <div className="p-6 sm:p-8 bg-gradient-to-br from-white via-stone-50 to-slate-50 rounded-xl sm:rounded-2xl border border-stone-300 shadow-xl shadow-stone-200/40">
          <h2 className="text-lg sm:text-xl font-black text-slate-800 mb-4 sm:mb-6">
            The New Rice Purity Test
          </h2>
          <div className="mb-4 sm:mb-6 text-center">
            <p className="text-base sm:text-lg font-bold text-indigo-600 bg-indigo-50 px-3 sm:px-4 py-2 rounded-lg inline-block">
              ✨ Questions updated for a modern audience
            </p>
          </div>
          <div className="text-slate-700 leading-relaxed space-y-3 sm:space-y-4">
            <p className="italic text-lg sm:text-xl font-semibold text-slate-800">
              The New Rice Purity Test is a scroll through your sins, not a checklist for your future.
            </p>
            <p className="text-sm sm:text-base">
              It's a (mostly) anonymous way to reflect on just how deep you've gone into the modern human experience — from the mildly reckless to the legally questionable. Think of it as a cultural X-ray: part therapy, part chaos, part group chat confession.
            </p>
            <p className="font-bold text-red-700 bg-red-50 p-3 sm:p-4 rounded-xl border-l-4 border-red-500 text-sm sm:text-base">
              <strong>Disclaimer:</strong> This isn't a to-do list. Trying to complete all 100 items will almost certainly end your career, your dignity, or result in you being cancelled.
            </p>
            <p className="font-bold text-base sm:text-lg">
              Click every item you've done. The more you check, the less innocent you are.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-violet-100 via-purple-100 to-pink-100 rounded-xl sm:rounded-2xl border border-violet-200 text-center">
          <p className="text-base sm:text-lg font-semibold text-slate-700">
            Looking for something more specific? Try the{' '}
            <Link href="/boys" className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 mx-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs sm:text-sm font-bold rounded-full hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl">
              boys'
            </Link>
            {' '}or{' '}
            <Link href="/girls" className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 mx-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs sm:text-sm font-bold rounded-full hover:from-pink-600 hover:to-rose-600 transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl">
              girls'
            </Link>
            {' '}version with questions tailored for each!
          </p>
        </div>

        {/* Clear All Button */}
        <div className="flex justify-center sm:justify-end">
          <button
            onClick={() => {
              setCheckedItems(new Set());
              setIsCompleted(false);
            }}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-sm font-bold bg-stone-200 hover:bg-stone-300 text-stone-700 rounded-lg sm:rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 hover:shadow-lg transform hover:scale-[1.02]"
          >
            🗑️ Clear All
          </button>
        </div>

        {/* Questions by Category */}
        <form className="space-y-6 sm:space-y-10">
          {categories.map((category) => (
            <fieldset key={category.name} className="border-2 border-stone-300 rounded-xl sm:rounded-2xl p-6 sm:p-8 bg-white shadow-xl shadow-stone-200/30 hover:shadow-2xl transition-all duration-300">
              <legend className="text-lg sm:text-xl font-black px-4 sm:px-6 py-2 text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg sm:rounded-xl shadow-lg">
                {category.name}
              </legend>
              <p className="text-sm sm:text-base text-stone-600 mb-6 sm:mb-8 font-semibold">
                {category.description}
              </p>
              
              <div className="grid grid-cols-1 gap-2 sm:gap-3">
                {category.questions.map((question) => (
                  <label 
                    key={question.id}
                    className="flex items-start space-x-3 sm:space-x-5 p-4 sm:p-5 rounded-xl sm:rounded-2xl hover:bg-stone-50 cursor-pointer transition-all duration-200 group border border-transparent hover:border-stone-300"
                  >
                    <input
                      type="checkbox"
                      checked={checkedItems.has(question.id)}
                      onChange={() => handleCheckboxChange(question.id)}
                      className="mt-1 w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 bg-stone-100 border-2 border-stone-300 rounded-lg focus:ring-indigo-500 focus:ring-2 transition-all duration-200 cursor-pointer"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="inline-block text-xs sm:text-sm font-black text-indigo-600 bg-indigo-50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg mr-3 sm:mr-4 flex-shrink-0">
                        {question.id}
                      </span>
                      <span className="text-sm sm:text-base font-medium text-stone-700 group-hover:text-stone-900 transition-colors duration-200 break-words">
                        {question.text}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
        </form>

        {/* Clear All Button */}
        <div className="flex justify-center sm:justify-end">
          <button
            onClick={() => {
              setCheckedItems(new Set());
              setIsCompleted(false);
            }}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-sm font-bold bg-stone-200 hover:bg-stone-300 text-stone-700 rounded-lg sm:rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 hover:shadow-lg transform hover:scale-[1.02]"
          >
            🗑️ Clear All
          </button>
        </div>

        {isCompleted && (
          <>
            <div className="mt-12 p-10 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 rounded-3xl border-2 border-purple-200 shadow-2xl shadow-purple-200/40 animate-in slide-in-from-bottom-4 duration-500 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] transition-all duration-500 group results-section">
              <div className="downloadable-content bg-white p-12 rounded-3xl border border-gray-200" style={{ backgroundColor: '#ffffff', padding: '48px', borderRadius: '24px', border: '1px solid #d1d5db' }}>
                <div className="text-center space-y-8" style={{ textAlign: 'center' }}>
                  <h2 className="text-4xl md:text-5xl font-black text-purple-600 mb-4" style={{ fontSize: '48px', fontWeight: '900', color: '#9333ea', marginBottom: '16px' }}>
                    Your Rice Purity Score
              </h2>
              
                  <div className="text-6xl md:text-7xl font-black text-slate-800 mb-6" style={{ fontSize: '72px', fontWeight: '900', color: '#1e293b', marginBottom: '6px', textAlign: 'center', marginLeft: '-15px' }}>
                {score}
                    <span className="text-4xl md:text-5xl text-purple-500" style={{ fontSize: '48px', color: '#a855f7' }}>/100</span>
              </div>
              
                  <div className={`inline-block px-10 py-5 rounded-2xl text-2xl font-black shadow-xl mb-4 ${badge.color} ${badge.label === 'Irredeemably Corrupt' ? 'irredeemably-corrupt-mobile' : ''} ${badge.label.toLowerCase().includes('corrupt') ? 'corrupt-result-badge' : 'result-badge-mobile'}`} style={{ 
                    fontSize: '24px', 
                    fontWeight: '900',
                    marginBottom: '16px',
                    backgroundColor: badge.color.includes('emerald') ? '#d1fae5' : badge.color.includes('teal') ? '#ccfbf1' : badge.color.includes('cyan') ? '#cffafe' : badge.color.includes('amber') ? '#fef3c7' : badge.color.includes('orange') ? '#fed7aa' : badge.color.includes('red') ? '#fecaca' : badge.color.includes('violet') ? '#e9d5ff' : badge.color.includes('purple') ? '#f3e8ff' : badge.color.includes('slate') ? '#f1f5f9' : '#d1fae5',
                    color: badge.color.includes('emerald') ? '#065f46' : badge.color.includes('teal') ? '#134e4a' : badge.color.includes('cyan') ? '#164e63' : badge.color.includes('amber') ? '#92400e' : badge.color.includes('orange') ? '#9a3412' : badge.color.includes('red') ? '#991b1b' : badge.color.includes('violet') ? '#5b21b6' : badge.color.includes('purple') ? '#6b21a8' : badge.color.includes('slate') ? '#475569' : '#065f46'
                  }}>
                {badge.label}
              </div>
              
                  <p className="text-xl font-semibold text-slate-700 max-w-2xl mx-auto leading-relaxed px-4 mb-8" style={{ fontSize: '20px', fontWeight: '600', color: '#374151', maxWidth: '672px', margin: '0 auto', lineHeight: '1.625', padding: '0 16px', marginBottom: '32px', marginTop: '24px' }}>
                {badge.description}
              </p>
              
                  <div className="text-base text-purple-600 space-y-3 pt-4" style={{ fontSize: '16px', color: '#9333ea', paddingTop: '16px' }}>
                    <p className="font-bold" style={{ fontWeight: '700' }}>Average college score: ~50</p>
                    <p className="font-medium" style={{ fontWeight: '500' }}>Share with your friends to compare scores!</p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <div className="flex flex-col gap-6 justify-center mb-10">
                  {/* Share & Download Section */}
                  <div className="w-full space-y-6">
                    <div className="flex flex-col gap-6">
                      {/* Social Media Sharing */}
                      <div className="w-full bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-2xl border border-white/60">
                        <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">Share Your Score</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
                          {/* Twitter/X */}
                          <button
                            onClick={() => shareToTwitter()}
                            className="flex flex-col items-center justify-center p-2 sm:p-3 h-16 sm:h-20 w-full bg-black hover:bg-gray-800 text-white rounded-xl sm:rounded-2xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-95 focus:outline-none focus:scale-100"
                          >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 mb-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                            <span className="text-xs sm:text-xs font-semibold leading-tight text-center">Twitter</span>
                          </button>

                          {/* Facebook */}
                          <button
                            onClick={() => shareToFacebook()}
                            className="flex flex-col items-center justify-center p-2 sm:p-3 h-16 sm:h-20 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl sm:rounded-2xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-95 focus:outline-none focus:scale-100"
                          >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 mb-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                            <span className="text-xs sm:text-xs font-semibold leading-tight text-center">Facebook</span>
                          </button>

                          {/* Instagram */}
                          <button
                            onClick={() => shareToInstagram()}
                            className="flex flex-col items-center justify-center p-2 sm:p-3 h-16 sm:h-20 w-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 hover:from-purple-700 hover:via-pink-600 hover:to-orange-500 text-white rounded-xl sm:rounded-2xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-95 focus:outline-none focus:scale-100"
                          >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 mb-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                            <span className="text-xs sm:text-xs font-semibold leading-tight text-center">Instagram</span>
                          </button>

                          {/* TikTok */}
                          <button
                            onClick={() => shareToTikTok()}
                            className="flex flex-col items-center justify-center p-2 sm:p-3 h-16 sm:h-20 w-full bg-black hover:bg-gray-800 text-white rounded-xl sm:rounded-2xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-95 focus:outline-none focus:scale-100"
                          >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 mb-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                            </svg>
                            <span className="text-xs sm:text-xs font-semibold leading-tight text-center">TikTok</span>
                          </button>

                          {/* WhatsApp */}
                          <button
                            onClick={() => shareToWhatsApp()}
                            className="flex flex-col items-center justify-center p-2 sm:p-3 h-16 sm:h-20 w-full bg-green-500 hover:bg-green-600 text-white rounded-xl sm:rounded-2xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-95 focus:outline-none focus:scale-100"
                          >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 mb-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                            </svg>
                            <span className="text-xs sm:text-xs font-semibold leading-tight text-center">WhatsApp</span>
                          </button>

                          {/* Reddit */}
                          <button
                            onClick={() => shareToReddit()}
                            className="flex flex-col items-center justify-center p-2 sm:p-3 h-16 sm:h-20 w-full bg-orange-600 hover:bg-orange-700 text-white rounded-xl sm:rounded-2xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-95 focus:outline-none focus:scale-100"
                          >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 mb-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                            </svg>
                            <span className="text-xs sm:text-xs font-semibold leading-tight text-center">Reddit</span>
                          </button>

                          {/* Telegram */}
                          <button
                            onClick={() => shareToTelegram()}
                            className="flex flex-col items-center justify-center p-2 sm:p-3 h-16 sm:h-20 w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl sm:rounded-2xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-95 focus:outline-none focus:scale-100"
                          >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 mb-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm4.962 7.224c.1-.002.321.023.365.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                            </svg>
                            <span className="text-xs sm:text-xs font-semibold leading-tight text-center">Telegram</span>
                          </button>

                          {/* Copy Link */}
                          <button
                            onClick={() => copyToClipboard()}
                            className="flex flex-col items-center justify-center p-2 sm:p-3 h-16 sm:h-20 w-full bg-gray-600 hover:bg-gray-700 text-white rounded-xl sm:rounded-2xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-95 focus:outline-none focus:scale-100"
                          >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 mb-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                            </svg>
                            <span className="text-xs sm:text-xs font-semibold leading-tight text-center">Copy Link</span>
                          </button>
                        </div>
                      </div>

                      {/* Download Options */}
                      <div className="w-full bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-2xl border border-white/60">
                        <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">Download & Save</h4>
                        <div className="space-y-3 sm:space-y-4">
                          <button
                            onClick={() => downloadAsImage()}
                            className="w-full flex items-center justify-center space-x-2 sm:space-x-3 p-3 sm:p-4 bg-gradient-to-r from-purple-400 to-violet-600 hover:shadow-2xl text-white rounded-xl sm:rounded-2xl transition-all duration-200 hover:scale-[1.02] active:scale-95 focus:outline-none focus:scale-100"
                          >
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-sm sm:text-lg font-bold">Download as Image</span>
                          </button>
                          
                <button
                            onClick={() => downloadAsPDF()}
                            className="w-full flex items-center justify-center space-x-2 sm:space-x-3 p-3 sm:p-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 hover:shadow-2xl text-white rounded-xl sm:rounded-2xl transition-all duration-200 hover:scale-[1.02] active:scale-95 focus:outline-none focus:scale-100"
                >
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3 3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span className="text-sm sm:text-lg font-bold">Download as PDF</span>
                </button>

                          <div className="pt-3 sm:pt-4 border-t border-gray-200">
                            <p className="text-xs sm:text-sm text-gray-600 text-center leading-relaxed">
                              Save your results to share later or keep as a personal record!
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    setCheckedItems(new Set());
                    setIsCompleted(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-slate-600 to-stone-600 hover:from-slate-700 hover:to-stone-700 text-white font-black rounded-xl sm:rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 hover:shadow-xl transform hover:scale-[1.02] sm:hover:scale-[1.05] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)]"
                >
                  🔄 Take Again
                </button>
              </div>
              </div>
              
            {/* Results Chart */}
            <div className="px-2 sm:px-0">
              <LazyResultsChart 
                categoryScores={categoryScores} 
                testType="original" 
                totalScore={score}
                totalQuestions={100}
                questions={questions}
                checkedItems={checkedItems}
              />
            </div>
          </>
        )}

        {/* Post-Results Call to Action */}
        {isCompleted && (
          <div className="mt-8 p-4 sm:p-6 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-xl sm:rounded-2xl border border-indigo-200 text-center hover:shadow-xl hover:scale-[1.01] transition-all duration-200 hover:border-indigo-300 group">
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-3 group-hover:text-slate-900 transition-colors duration-200">Want to compare your results?</h3>
            <p className="text-base sm:text-lg font-semibold text-slate-700 group-hover:text-slate-800 transition-colors duration-200">
              See how you score on the{' '}
              <Link href="/boys" className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 mx-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs sm:text-sm font-bold rounded-full hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 transform hover:scale-[1.05] shadow-lg hover:shadow-xl">
                boys'
              </Link>
              {' '}or{' '}
              <Link href="/girls" className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 mx-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs sm:text-sm font-bold rounded-full hover:from-pink-600 hover:to-rose-600 transition-all duration-200 transform hover:scale-[1.05] shadow-lg hover:shadow-xl">
                girls'
              </Link>
              {' '}version!
            </p>
          </div>
        )}

        {/* More Tests Section */}
        <div className="mt-16 p-6 sm:p-8 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl sm:rounded-2xl border border-indigo-300 hover:shadow-xl transition-all duration-200 hover:border-indigo-400 group">
          <h3 className="text-xl sm:text-2xl font-black text-center mb-4 sm:mb-6 text-slate-800 group-hover:text-slate-900 transition-colors duration-200">More Tests</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <Link href="/boys" className="block p-4 sm:p-6 bg-white rounded-xl shadow-lg hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)] transition-all duration-200 transform hover:scale-[1.02] border border-blue-200 hover:border-blue-300">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-xl sm:text-2xl">💪</span>
                <h4 className="text-lg sm:text-xl font-bold text-blue-600">Boys' Rice Purity Test</h4>
              </div>
              <p className="text-sm sm:text-base text-slate-600 mb-3">Questions tailored specifically for guys with modern, relatable scenarios.</p>
              <div className="flex items-center text-blue-700 font-semibold text-sm sm:text-base">
                Try the boys' version 
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
            <Link href="/girls" className="block p-4 sm:p-6 bg-white rounded-xl shadow-lg hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)] transition-all duration-200 transform hover:scale-[1.02] border border-pink-200 hover:border-pink-300">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-xl sm:text-2xl">💅</span>
                <h4 className="text-lg sm:text-xl font-bold text-pink-600">Girls' Rice Purity Test</h4>
              </div>
              <p className="text-sm sm:text-base text-slate-600 mb-3">Questions designed for girls with experiences that resonate with modern women.</p>
              <div className="flex items-center text-pink-700 font-semibold text-sm sm:text-base">
                Try the girls' version 
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 sm:mt-24 pt-6 sm:pt-10 border-t border-stone-300 text-center text-xs sm:text-sm text-stone-500">
          <p className="font-bold">
            © 2025 New Rice Purity Test • The Modern College Quiz
          </p>
          <p className="mt-2 sm:mt-3 max-w-3xl mx-auto font-medium px-4">
            This modern version updates the classic test questions for contemporary relevance.
          </p>
        </footer>
      </main>
    </div>
  );
});

RicePurityTest.displayName = 'RicePurityTest'; 