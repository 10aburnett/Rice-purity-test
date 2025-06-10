'use client';

import React, { useState, useEffect } from 'react';
import { girlsQuestions, girlsCategories, type Question } from '@/data/questionsGirlsData';
import { ResultsChart } from '@/components/ResultsChart';
import Link from 'next/link';

interface ScoreBadge {
  min: number;
  max: number;
  label: string;
  description: string;
  color: string;
}

const scoreBadges: ScoreBadge[] = [
  { min: 49, max: 50, label: "Innocent Soul", description: "You're either lying or you've been living under a rock", color: "bg-emerald-100 text-emerald-800" },
  { min: 47, max: 48, label: "Holy Saint", description: "Your halo is showing", color: "bg-emerald-100 text-emerald-800" },
  { min: 44, max: 46, label: "Pure & Simple", description: "Still got that innocent charm", color: "bg-teal-100 text-teal-800" },
  { min: 39, max: 43, label: "Pretty Pure", description: "A few bumps on the road", color: "bg-cyan-100 text-cyan-800" },
  { min: 32, max: 38, label: "Lightly Tainted", description: "You've dipped your toes in the water", color: "bg-amber-100 text-amber-800" },
  { min: 23, max: 31, label: "Somewhat Impure", description: "Living a little", color: "bg-orange-100 text-orange-800" },
  { min: 15, max: 22, label: "Moderately Corrupt", description: "You've got some stories", color: "bg-red-100 text-red-800" },
  { min: 8, max: 14, label: "Seriously Impure", description: "Your friends come to you for advice", color: "bg-violet-100 text-violet-800" },
  { min: 5, max: 7, label: "Extremely Corrupt", description: "You need therapy", color: "bg-purple-100 text-purple-800" },
  { min: 2, max: 4, label: "Irredeemably Corrupt", description: "Seek professional help immediately", color: "bg-slate-100 text-slate-800" },
  { min: 0, max: 1, label: "The Devil", description: "Your soul is beyond salvation. You've descended into the depths of depravity where even demons fear to tread", color: "bg-black text-red-500" }
];

export const RicePurityTestGirls: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const [isCompleted, setIsCompleted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const score = 50 - checkedItems.size;
  const checkedCount = checkedItems.size;
  const progressPercentage = (checkedCount / 50) * 100;

  const handleCheckboxChange = (questionId: number) => {
    const newCheckedItems = new Set(checkedItems);
    if (newCheckedItems.has(questionId)) {
      newCheckedItems.delete(questionId);
    } else {
      newCheckedItems.add(questionId);
    }
    setCheckedItems(newCheckedItems);
  };

  const getScoreBadge = (score: number): ScoreBadge => {
    return scoreBadges.find(badge => score >= badge.min && score <= badge.max) || scoreBadges[scoreBadges.length - 1];
  };

  // Calculate category scores for the chart
  const getCategoryScores = () => {
    return girlsCategories.map(category => {
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
  };

  const badge = getScoreBadge(score);

  const copyToClipboard = async () => {
    const text = `I just took the Rice Purity Test for Girls 2025 and scored ${score}/50 (${badge.label})! Take it yourself at ${window.location.origin}/girls`;
    try {
      await navigator.clipboard.writeText(text);
      alert('Link copied! You can now paste it anywhere to share your results.');
    } catch (err) {
      console.error('Failed to copy:', err);
      alert('Link copied! You can now paste it anywhere to share your results.');
    }
  };

  // Sharing functions
  const getShareText = () => {
    return `I just took the Rice Purity Test for Girls 2025 and scored ${score}/50 (${badge.label})! 👑 How pure are you? Take the test!`;
  };

  const getCurrentUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    return 'https://yoursite.com/girls';
  };

  const shareToTwitter = () => {
    const text = getShareText();
    const url = getCurrentUrl();
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank');
  };

  const shareToFacebook = () => {
    const url = getCurrentUrl();
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank');
  };

  const shareToInstagram = async () => {
    const text = `I just took the Girls' Rice Purity Test 2025 and scored ${score}/50 (${badge.label})! Take it yourself at ${window.location.origin}/girls`;
    try {
      await navigator.clipboard.writeText(text);
      alert('Link copied! You can now paste it in your Instagram story or bio.');
    } catch (err) {
      console.error('Failed to copy:', err);
      alert('Link copied! You can now paste it in your Instagram story or bio.');
    }
  };

  const shareToTikTok = async () => {
    const text = `I just took the Girls' Rice Purity Test 2025 and scored ${score}/50 (${badge.label})! Take it yourself at ${window.location.origin}/girls`;
    try {
      await navigator.clipboard.writeText(text);
      alert('Link copied! You can now paste it in your TikTok bio or share in a video.');
    } catch (err) {
      console.error('Failed to copy:', err);
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
      const html2canvas = await import('html2canvas');
      const element = document.querySelector('.downloadable-content') as HTMLElement;
      if (!element) return;
      
      // Find the badge element and temporarily adjust its styling for download
      const badgeElement = element.querySelector('.inline-block.px-8.py-4.rounded-2xl') as HTMLElement;
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
      
      const canvas = await html2canvas.default(element, {
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
      link.download = 'rice-purity-test-girls-results.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error downloading image:', error);
      alert('Error downloading image. Please try again.');
    }
  };

  const downloadAsPDF = async () => {
    try {
      const [html2canvas, jsPDF] = await Promise.all([
        import('html2canvas'),
        import('jspdf')
      ]);
      
      const element = document.querySelector('.downloadable-content') as HTMLElement;
      if (!element) return;
      
      // Find the badge element and temporarily adjust its styling for download
      const badgeElement = element.querySelector('.inline-block.px-8.py-4.rounded-2xl') as HTMLElement;
      let originalStyle = '';
      
      if (badgeElement) {
        originalStyle = badgeElement.style.cssText;
        // Apply download-specific positioning
        badgeElement.style.display = 'inline-flex';
        badgeElement.style.alignItems = 'flex-start';
        badgeElement.style.justifyContent = 'center';
        badgeElement.style.padding = '12px 40px 28px 40px';
      }
      
      const canvas = await html2canvas.default(element, {
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
      
      pdf.save('rice-purity-test-girls-results.pdf');
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Error downloading PDF. Please try again.');
    }
  };

  useEffect(() => {
    if (checkedCount > 0) {
      setIsCompleted(true);
    }
  }, [checkedCount]);

  // Close dropdown when clicking outside
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

  // Close dropdown on route change (when component unmounts)
  useEffect(() => {
    return () => {
      setIsDropdownOpen(false);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-100">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-pink-200 shadow-lg shadow-pink-200/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 sm:py-5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-2xl md:text-3xl font-black tracking-tight bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                Rice Purity Test for Girls 2025
              </h1>
              <p className="text-xs sm:text-sm font-medium text-pink-600 mt-1">
                The classic college quiz, tailored for the ladies
              </p>
            </div>

            {/* Test Selector Dropdown */}
            <div className="relative dropdown-container order-3 sm:order-2">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 sm:space-x-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] border border-pink-400/30"
              >
                <span className="text-sm sm:text-lg">💅</span>
                <span className="sm:hidden text-xs">Girls'</span>
                <span className="hidden sm:inline text-sm">Girls' Test</span>
                <svg className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 sm:w-64 bg-black/80 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-white/20 shadow-2xl shadow-purple-500/25 overflow-hidden z-50">
                  <div className="p-2 space-y-1">
                    <Link 
                      href="/" 
                      className="flex items-center space-x-2 sm:space-x-3 text-white hover:text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-gray-800/50 hover:bg-purple-600 transition-all duration-200 group relative font-semibold text-xs sm:text-sm"
                    >
                      <span className="text-sm sm:text-lg">✨</span>
                      <span>Original Test</span>
                    </Link>
                    <Link 
                      href="/boys" 
                      className="flex items-center space-x-2 sm:space-x-3 text-white hover:text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-gray-800/50 hover:bg-blue-600 transition-all duration-200 group relative font-semibold text-xs sm:text-sm"
                    >
                      <span className="text-sm sm:text-lg">💪</span>
                      <span>Boys' Test</span>
                    </Link>
                    <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm flex items-center space-x-2 sm:space-x-3">
                      <span className="text-sm sm:text-lg">💅</span>
                      <span>Girls' Test</span>
                      <span className="ml-auto text-xs bg-white/20 px-2 py-1 rounded">Current</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="text-right order-2 sm:order-3">
              <div className="text-xl sm:text-3xl md:text-4xl font-black text-slate-800">
                {checkedCount}<span className="text-pink-400">/50</span>
              </div>
              <div className="text-xs font-semibold text-pink-500">
                Score: <span className="font-black text-pink-600">{score}</span>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-3 sm:mt-5 w-full bg-pink-200 rounded-full h-3 sm:h-4 overflow-hidden shadow-inner">
            <div 
              className="h-3 sm:h-4 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 rounded-full transition-all duration-700 ease-out shadow-lg"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6 sm:space-y-10">
        {/* Instructions */}
        <div className="p-6 sm:p-8 bg-gradient-to-br from-white via-pink-50 to-rose-50 rounded-xl sm:rounded-2xl border border-pink-300 shadow-xl shadow-pink-200/40">
          <h2 className="text-lg sm:text-xl font-black text-slate-800 mb-4 sm:mb-6">
            The Rice Purity Test for Girls
          </h2>
          <div className="mb-4 sm:mb-6 text-center">
            <p className="text-base sm:text-lg font-bold text-pink-600 bg-pink-50 px-3 sm:px-4 py-2 rounded-lg inline-block">
              💅 Questions tailored for girls
            </p>
          </div>
          <div className="text-slate-700 leading-relaxed space-y-3 sm:space-y-4">
            <p className="italic text-lg sm:text-xl font-semibold text-slate-800">
              The Girls' Rice Purity Test is a chance to reflect on your journey through life, love, and everything in between.
            </p>
            <p className="text-sm sm:text-base">
              Whether you're comparing with your girlfriends or just curious about where you stand, this test covers the modern female experience — from first dates to late-night group chats, from college parties to relationship drama.
            </p>
            <p className="font-bold text-red-600 bg-red-50 p-3 sm:p-4 rounded-xl border-l-4 border-red-500 text-sm sm:text-base">
              <strong>Disclaimer:</strong> This isn't about judgment or competition. Your experiences are your own, and there's no "right" score. It's all about self-reflection and maybe some fun conversations with friends.
            </p>
            <p className="font-bold text-base sm:text-lg">
              Click every item you've done. Be honest with yourself, queen.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-pink-100 via-rose-100 to-purple-100 rounded-xl sm:rounded-2xl border border-pink-200 text-center">
          <p className="text-base sm:text-lg font-semibold text-slate-700">
            Curious about the differences? Try the{' '}
            <Link href="/" className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 mx-1 bg-gradient-to-r from-violet-500 to-purple-500 text-white text-xs sm:text-sm font-bold rounded-full hover:from-violet-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl">
              original
            </Link>
            {' '}version or compare with the{' '}
            <Link href="/boys" className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 mx-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs sm:text-sm font-bold rounded-full hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl">
              boys'
            </Link>
            {' '}test!
          </p>
        </div>

        {/* Clear All Button */}
        <div className="flex justify-center sm:justify-end">
          <button
            onClick={() => {
              setCheckedItems(new Set());
              setIsCompleted(false);
            }}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-sm font-bold bg-pink-200 hover:bg-pink-300 text-pink-700 rounded-lg sm:rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 hover:shadow-lg transform hover:scale-[1.02]"
          >
            🗑️ Clear All
          </button>
        </div>

        {/* Questions by Category */}
        <form className="space-y-6 sm:space-y-10">
          {girlsCategories.map((category, categoryIndex) => (
            <fieldset key={category.name} className="border-2 border-pink-300 rounded-xl sm:rounded-2xl p-6 sm:p-8 bg-white shadow-xl shadow-pink-200/30 hover:shadow-2xl transition-all duration-300">
              <legend className="text-lg sm:text-xl font-black px-4 sm:px-6 py-2 text-white bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg sm:rounded-xl shadow-lg">
                {category.name}
              </legend>
              <p className="text-sm sm:text-base text-pink-600 mb-6 sm:mb-8 font-semibold">
                {category.description}
              </p>
              
              <div className="grid grid-cols-1 gap-2 sm:gap-3">
                {category.questions.map((question) => (
                  <label 
                    key={question.id}
                    className="flex items-start space-x-3 sm:space-x-5 p-4 sm:p-5 rounded-xl sm:rounded-2xl hover:bg-pink-50 cursor-pointer transition-all duration-200 group border border-transparent hover:border-pink-300"
                  >
                    <input
                      type="checkbox"
                      checked={checkedItems.has(question.id)}
                      onChange={() => handleCheckboxChange(question.id)}
                      className="mt-1 w-5 h-5 sm:w-6 sm:h-6 text-pink-600 bg-pink-100 border-2 border-pink-300 rounded-lg focus:ring-pink-500 focus:ring-2 transition-all duration-200 cursor-pointer"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="inline-block text-xs sm:text-sm font-black text-pink-600 bg-pink-50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg mr-3 sm:mr-4 flex-shrink-0">
                        {question.id}
                      </span>
                      <span className="text-sm sm:text-base font-medium text-slate-700 group-hover:text-slate-900 transition-colors duration-200 break-words">
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
            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-sm font-bold bg-pink-200 hover:bg-pink-300 text-pink-700 rounded-lg sm:rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 hover:shadow-lg transform hover:scale-[1.02]"
          >
            🗑️ Clear All
          </button>
        </div>

        {/* Results Section */}
        {isCompleted && (
          <>
            <div className="mt-12 p-10 bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 rounded-3xl border-2 border-pink-200 shadow-2xl shadow-pink-200/40 animate-in slide-in-from-bottom-4 duration-500 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] transition-all duration-500 group results-section">
              {/* Downloadable Content Only */}
              <div className="downloadable-content bg-white p-12 rounded-3xl border border-gray-200" style={{ backgroundColor: '#ffffff', padding: '48px', borderRadius: '24px', border: '1px solid #d1d5db' }}>
                <div className="text-center space-y-8" style={{ textAlign: 'center' }}>
                  <h2 className="text-4xl md:text-5xl font-black text-pink-600 mb-4" style={{ fontSize: '48px', fontWeight: '900', color: '#db2777', marginBottom: '6px' }}>
                    Your Rice Purity Score (Girls)
                  </h2>
                  
                  <div className="text-6xl md:text-7xl font-black text-slate-800 mb-6" style={{ fontSize: '72px', fontWeight: '900', color: '#1e293b', marginBottom: '6px', marginLeft: '-5px' }}>
                    {score}
                    <span className="text-4xl md:text-5xl text-pink-500" style={{ fontSize: '48px', color: '#ec4899' }}>/50</span>
                  </div>
                  
                  <div className={`inline-block px-8 py-4 rounded-2xl text-2xl font-black shadow-xl mb-4 ${badge.color}`} style={{ 
                    fontSize: '24px', 
                    fontWeight: '900',
                    marginBottom: '16px',
                    backgroundColor: badge.color.includes('emerald') ? '#d1fae5' : badge.color.includes('teal') ? '#ccfbf1' : badge.color.includes('cyan') ? '#cffafe' : badge.color.includes('amber') ? '#fef3c7' : badge.color.includes('orange') ? '#fed7aa' : badge.color.includes('red') ? '#fecaca' : badge.color.includes('violet') ? '#e9d5ff' : badge.color.includes('purple') ? '#f3e8ff' : badge.color.includes('slate') ? '#f1f5f9' : '#d1fae5',
                    color: badge.color.includes('emerald') ? '#065f46' : badge.color.includes('teal') ? '#134e4a' : badge.color.includes('cyan') ? '#164e63' : badge.color.includes('amber') ? '#92400e' : badge.color.includes('orange') ? '#9a3412' : badge.color.includes('red') ? '#991b1b' : badge.color.includes('violet') ? '#5b21b6' : badge.color.includes('purple') ? '#6b21a8' : badge.color.includes('slate') ? '#475569' : '#065f46'
                  }}>
                    {badge.label}
                  </div>
                  
                  <p className="text-xl font-semibold text-slate-700 mb-10 max-w-2xl mx-auto leading-relaxed" style={{ fontSize: '20px', fontWeight: '600', color: '#374151', marginTop: '24px' }}>
                    {badge.description}
                  </p>
                  
                  <div className="text-sm text-pink-500 space-y-1" style={{ fontSize: '14px', color: '#ec4899' }}>
                    <p className="font-bold" style={{ fontWeight: '700' }}>Average college girl score: ~25</p>
                    <p className="font-medium" style={{ fontWeight: '500' }}>Share with your girls to compare scores!</p>
                  </div>
                </div>
              </div>

              {/* Interactive Content (Not included in downloads) */}
              <div className="mt-10">
                <div className="flex flex-col sm:flex-row gap-6 justify-center mb-10">
                  {/* Share & Download Section */}
                  <div className="w-full space-y-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Social Media Sharing */}
                      <div className="flex-1 bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-2xl border border-white/60">
                        <h4 className="text-xl font-bold text-gray-800 mb-6 text-center">Share Your Score</h4>
                        <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                          {/* Twitter/X */}
                          <button
                            onClick={() => shareToTwitter()}
                            className="flex flex-col items-center justify-center p-3 h-20 w-full bg-black hover:bg-gray-800 text-white rounded-2xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-95 focus:outline-none focus:scale-100"
                          >
                            <svg className="w-5 h-5 mb-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                            <span className="text-xs font-semibold leading-tight text-center">Twitter</span>
                          </button>

                          {/* Facebook */}
                          <button
                            onClick={() => shareToFacebook()}
                            className="flex flex-col items-center justify-center p-3 h-20 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-95 focus:outline-none focus:scale-100"
                          >
                            <svg className="w-5 h-5 mb-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                            <span className="text-xs font-semibold leading-tight text-center">Facebook</span>
                          </button>

                          {/* Instagram */}
                          <button
                            onClick={() => shareToInstagram()}
                            className="flex flex-col items-center justify-center p-3 h-20 w-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 hover:from-purple-700 hover:via-pink-600 hover:to-orange-500 text-white rounded-2xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-95 focus:outline-none focus:scale-100"
                          >
                            <svg className="w-5 h-5 mb-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                            <span className="text-xs font-semibold leading-tight text-center">Instagram</span>
                          </button>

                          {/* TikTok */}
                          <button
                            onClick={() => shareToTikTok()}
                            className="flex flex-col items-center justify-center p-3 h-20 w-full bg-black hover:bg-gray-800 text-white rounded-2xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-95 focus:outline-none focus:scale-100"
                          >
                            <svg className="w-5 h-5 mb-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                            </svg>
                            <span className="text-xs font-semibold leading-tight text-center">TikTok</span>
                          </button>

                          {/* WhatsApp */}
                          <button
                            onClick={() => shareToWhatsApp()}
                            className="flex flex-col items-center justify-center p-3 h-20 w-full bg-green-500 hover:bg-green-600 text-white rounded-2xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-95 focus:outline-none focus:scale-100"
                          >
                            <svg className="w-5 h-5 mb-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                            </svg>
                            <span className="text-xs font-semibold leading-tight text-center">WhatsApp</span>
                          </button>

                          {/* Reddit */}
                          <button
                            onClick={() => shareToReddit()}
                            className="flex flex-col items-center justify-center p-3 h-20 w-full bg-orange-600 hover:bg-orange-700 text-white rounded-2xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-95 focus:outline-none focus:scale-100"
                          >
                            <svg className="w-5 h-5 mb-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                            </svg>
                            <span className="text-xs font-semibold leading-tight text-center">Reddit</span>
                          </button>

                          {/* Telegram */}
                          <button
                            onClick={() => shareToTelegram()}
                            className="flex flex-col items-center justify-center p-3 h-20 w-full bg-blue-500 hover:bg-blue-600 text-white rounded-2xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-95 focus:outline-none focus:scale-100"
                          >
                            <svg className="w-5 h-5 mb-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.365.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                            </svg>
                            <span className="text-xs font-semibold leading-tight text-center">Telegram</span>
                          </button>

                          {/* Copy Link */}
                          <button
                            onClick={() => copyToClipboard()}
                            className="flex flex-col items-center justify-center p-3 h-20 w-full bg-gray-600 hover:bg-gray-700 text-white rounded-2xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-95 focus:outline-none focus:scale-100"
                          >
                            <svg className="w-5 h-5 mb-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            <span className="text-xs font-semibold leading-tight text-center">Copy Link</span>
                          </button>
                        </div>
                      </div>

                      {/* Download Options */}
                      <div className="lg:w-80 bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-2xl border border-white/60">
                        <h4 className="text-xl font-bold text-gray-800 mb-6 text-center">Download & Save</h4>
                        <div className="space-y-4">
                          <button
                            onClick={() => downloadAsImage()}
                            className="w-full flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-pink-400 to-rose-600 hover:shadow-2xl text-white rounded-2xl transition-all duration-200 hover:scale-[1.02] active:scale-95 focus:outline-none focus:scale-100"
                          >
                            <svg className="w-6 h-6 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-xs font-bold">Download as Image</span>
                          </button>
                          
                          <button
                            onClick={() => downloadAsPDF()}
                            className="w-full flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 hover:shadow-2xl text-white rounded-2xl transition-all duration-200 hover:scale-[1.02] active:scale-95 focus:outline-none focus:scale-100"
                          >
                            <svg className="w-6 h-6 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span className="text-xs font-bold">Download as PDF</span>
                          </button>

                          <div className="pt-4 border-t border-gray-200">
                            <p className="text-sm text-gray-600 text-center leading-relaxed">
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
                  className="px-10 py-5 bg-gradient-to-r from-slate-600 to-stone-600 hover:from-slate-700 hover:to-stone-700 text-white font-black rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 hover:shadow-xl transform hover:scale-[1.05] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)]"
                >
                  🔄 Take Again
                </button>
              </div>
            </div>

            {/* Results Chart */}
            <ResultsChart 
              categoryScores={getCategoryScores()} 
              testType="girls" 
              totalScore={score}
              totalQuestions={50}
            />
          </>
        )}

        {/* Post-Results Call to Action */}
        {isCompleted && (
          <div className="mt-8 p-6 bg-gradient-to-r from-pink-50 via-rose-50 to-purple-50 rounded-2xl border border-pink-200 text-center hover:shadow-xl hover:scale-[1.01] transition-all duration-200 hover:border-pink-300 group">
            <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-slate-900 transition-colors duration-200">Want to compare your results?</h3>
            <p className="text-lg font-semibold text-slate-700 group-hover:text-slate-800 transition-colors duration-200">
              See how you score on the{' '}
              <Link href="/" className="inline-flex items-center px-3 py-1.5 mx-1 bg-gradient-to-r from-violet-500 to-purple-500 text-white text-sm font-bold rounded-full hover:from-violet-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-[1.05] shadow-lg hover:shadow-xl">
                original
              </Link>
              {' '}test or compare with the{' '}
              <Link href="/boys" className="inline-flex items-center px-3 py-1.5 mx-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-bold rounded-full hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 transform hover:scale-[1.05] shadow-lg hover:shadow-xl">
                boys'
              </Link>
              {' '}version!
            </p>
          </div>
        )}

        {/* More Tests Section */}
        <div className="mt-16 p-8 bg-gradient-to-r from-pink-100 to-rose-100 rounded-2xl border border-pink-300 hover:shadow-xl transition-all duration-200 hover:border-pink-400 group">
          <h3 className="text-2xl font-black text-center mb-6 text-slate-800 group-hover:text-slate-900 transition-colors duration-200">More Tests</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/" className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)] transition-all duration-200 transform hover:scale-[1.02] border border-purple-200 hover:border-purple-300">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">✨</span>
                <h4 className="text-xl font-bold text-purple-600">Original Rice Purity Test</h4>
              </div>
              <p className="text-slate-600 mb-3">The classic version for everyone with updated questions for modern relevance.</p>
              <div className="flex items-center text-purple-500 font-semibold">
                Try the original version 
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
            <Link href="/boys" className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)] transition-all duration-200 transform hover:scale-[1.02] border border-blue-200 hover:border-blue-300">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">💪</span>
                <h4 className="text-xl font-bold text-blue-600">Boys' Rice Purity Test</h4>
              </div>
              <p className="text-slate-600 mb-3">Questions tailored specifically for guys with modern, relatable scenarios.</p>
              <div className="flex items-center text-blue-500 font-semibold">
                Try the boys' version 
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-24 pt-10 border-t border-pink-300 text-center text-sm text-pink-500">
          <p className="font-bold">
            © 2025 Rice Purity Test for Girls • The Modern College Quiz
          </p>
          <p className="mt-3 max-w-3xl mx-auto font-medium">
            This version updates the classic test questions for modern women.
          </p>
        </footer>
      </main>
    </div>
  );
}; 