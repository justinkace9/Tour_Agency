import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  X, 
  ArrowRight, 
  Play, 
  Pause, 
  Layers, 
  Check, 
  Compass, 
  Tag, 
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BannerItem } from '../types/tour';

export const HighlightBannerSlider: React.FC = () => {
  const { siteContent, setActiveView } = useApp();
  const bannerConfig = siteContent.bannerAnnouncement;

  // Use items from siteContent or default
  const items: BannerItem[] = (bannerConfig.items && bannerConfig.items.length > 0)
    ? bannerConfig.items
    : [
        {
          id: 'banner-default',
          badge: '🏛️ Daily Quota',
          text: bannerConfig.text || 'ATM Cave is open daily — advance booking recommended for certified spelunking permits.',
          actionText: bannerConfig.actionText || 'Check ATM Slots',
          actionUrl: bannerConfig.actionUrl || 'tours',
          urgency: bannerConfig.urgency || 'highlight'
        }
      ];

  const totalItems = items.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');
  const [isAnimating, setIsAnimating] = useState(false);
  // User control: "not always sliding, just the ability to slide to display the next highlight or website offer in the queue"
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(() => bannerConfig.autoSlide ?? false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [showQueueDropdown, setShowQueueDropdown] = useState(false);

  // Touch swipe handling
  const touchStartX = useRef<number | null>(null);

  // Timed slide interval effect
  useEffect(() => {
    if (!isAutoPlay || isHovered || isDismissed || totalItems <= 1) return;

    const intervalSeconds = bannerConfig.slideInterval || 10;
    const timer = setInterval(() => {
      setSlideDirection('next');
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev + 1) % totalItems);
      const animTimeout = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(animTimeout);
    }, intervalSeconds * 1000);

    return () => clearInterval(timer);
  }, [isAutoPlay, isHovered, isDismissed, totalItems, bannerConfig.slideInterval]);

  if (!bannerConfig.enabled || isDismissed || totalItems === 0) {
    return null;
  }

  const currentItem = items[currentIndex] || items[0];

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSlideDirection('prev');
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSlideDirection('next');
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % totalItems);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleSelectIndex = (idx: number) => {
    if (idx === currentIndex) return;
    setSlideDirection(idx > currentIndex ? 'next' : 'prev');
    setIsAnimating(true);
    setCurrentIndex(idx);
    setShowQueueDropdown(false);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleActionClick = (url?: string) => {
    if (!url) {
      setActiveView('tours');
      return;
    }
    if (['home', 'tours', 'contact', 'guide', 'itinerary', 'blog'].includes(url)) {
      setActiveView(url as any);
    } else {
      setActiveView('tours');
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  // Urgency themes: Emerald Belize, Cyan River, Amber Alert
  const getUrgencyStyles = (urgency?: string) => {
    switch (urgency) {
      case 'alert':
        return {
          bg: 'bg-gradient-to-r from-amber-950 via-[#2C1808] to-amber-950',
          border: 'border-amber-500/40',
          badge: 'bg-amber-500/20 text-amber-300 border-amber-500/50',
          accent: 'text-amber-300',
          hoverAction: 'hover:text-amber-200'
        };
      case 'info':
        return {
          bg: 'bg-gradient-to-r from-teal-950 via-[#082025] to-teal-950',
          border: 'border-cyan-500/40',
          badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50',
          accent: 'text-cyan-300',
          hoverAction: 'hover:text-cyan-200'
        };
      case 'highlight':
      default:
        return {
          bg: 'bg-gradient-to-r from-[#071913] via-[#0F382C] to-[#071913]',
          border: 'border-[#E0A96D]/35',
          badge: 'bg-[#E0A96D]/15 text-[#E0A96D] border-[#E0A96D]/50',
          accent: 'text-[#E0A96D]',
          hoverAction: 'hover:text-[#F3C892]'
        };
    }
  };

  const styles = getUrgencyStyles(currentItem.urgency);

  return (
    <div 
      id="top-highlight-ribbon"
      role="region"
      aria-label="Website Highlights & Special Offers"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`relative w-full ${styles.bg} border-b ${styles.border} backdrop-blur-xl transition-colors duration-500 select-none shadow-md shadow-black/50 z-50`}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-2 sm:py-2.5 flex items-center justify-between gap-2 text-xs">
        
        {/* Left Controls: Prev Slide & Play/Pause */}
        <div className="flex items-center gap-1 shrink-0">
          {totalItems > 1 && (
            <button
              onClick={handlePrev}
              aria-label="Previous announcement in queue"
              title="Previous offer in queue"
              className="p-1 rounded-full text-slate-300 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 text-slate-300 hover:text-white" />
            </button>
          )}

          {/* Timed Slider Play / Pause Button */}
          {totalItems > 1 && (
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              aria-label={isAutoPlay ? "Pause auto-slide" : "Start auto-slide"}
              title={isAutoPlay ? "Auto-slide active (Click to pause)" : "Auto-slide paused (Click to start)"}
              className={`p-1 rounded-full transition-all cursor-pointer ${
                isAutoPlay 
                  ? 'text-emerald-400 hover:bg-emerald-500/20' 
                  : 'text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {isAutoPlay ? (
                <Pause className="w-3.5 h-3.5" />
              ) : (
                <Play className="w-3.5 h-3.5" />
              )}
            </button>
          )}

          {/* Queue Counter (e.g. 1/5) */}
          {totalItems > 1 && (
            <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-black/40 border border-white/10 text-slate-300">
              {currentIndex + 1}/{totalItems}
            </span>
          )}
        </div>

        {/* Center Content: Animated Highlight Message & Action */}
        <div className="flex-1 min-w-0 flex items-center justify-center gap-2 sm:gap-3 text-center overflow-hidden">
          
          <div 
            className={`flex items-center justify-center gap-2 sm:gap-3 transition-all duration-300 ${
              isAnimating 
                ? slideDirection === 'next'
                  ? 'opacity-0 translate-x-3'
                  : 'opacity-0 -translate-x-3'
                : 'opacity-100 translate-x-0'
            }`}
          >
            {/* Urgency Badge */}
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold border shrink-0 shadow-sm ${styles.badge}`}>
              <Sparkles className="w-3 h-3" />
              <span>{currentItem.badge}</span>
            </span>

            {/* Headline / Message */}
            <p className="text-slate-100 text-[11px] sm:text-xs font-medium truncate max-w-xs sm:max-w-lg md:max-w-xl">
              {currentItem.text}
            </p>

            {/* Action Callout Button */}
            {currentItem.actionText && (
              <button
                onClick={() => handleActionClick(currentItem.actionUrl)}
                className={`inline-flex items-center gap-1 font-bold text-[11px] sm:text-xs underline ${styles.accent} ${styles.hoverAction} whitespace-nowrap transition-colors shrink-0 cursor-pointer`}
              >
                <span>{currentItem.actionText}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Clickable Queue Pill Dots */}
          {totalItems > 1 && (
            <div className="hidden lg:flex items-center gap-1 ml-3 shrink-0" aria-label="Queue indicators">
              {items.map((item, idx) => (
                <button
                  key={item.id || idx}
                  onClick={() => handleSelectIndex(idx)}
                  aria-label={`Jump to ${item.badge}`}
                  title={`${item.badge}: ${item.text.slice(0, 40)}...`}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    idx === currentIndex 
                      ? 'w-5 bg-[#E0A96D] shadow-sm' 
                      : 'w-1.5 bg-white/25 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}

        </div>

        {/* Right Controls: Queue Dropdown Trigger, Next Slide & Dismiss */}
        <div className="flex items-center gap-1 shrink-0 relative">
          
          {/* Multi-Banner Queue Dropdown Toggle */}
          {totalItems > 1 && (
            <button
              onClick={() => setShowQueueDropdown(!showQueueDropdown)}
              aria-label="View all offers in queue"
              title="View all website highlights in queue"
              className={`hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold transition-all border ${
                showQueueDropdown 
                  ? 'bg-[#0F382C] text-[#E0A96D] border-[#E0A96D]' 
                  : 'bg-black/30 hover:bg-black/50 text-slate-300 border-white/10'
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>Offers ({totalItems})</span>
            </button>
          )}

          {/* Next Slide Arrow */}
          {totalItems > 1 && (
            <button
              onClick={handleNext}
              aria-label="Next announcement in queue"
              title="Next offer in queue"
              className="p-1 rounded-full text-slate-300 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 text-slate-300 hover:text-white" />
            </button>
          )}

          {/* Close / Dismiss Banner */}
          <button
            onClick={() => setIsDismissed(true)}
            aria-label="Dismiss announcement banner"
            title="Dismiss announcement banner"
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors ml-0.5 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          {/* Queue Peek Dropdown Menu */}
          {showQueueDropdown && totalItems > 1 && (
            <div className="absolute right-0 top-8 w-80 sm:w-96 p-3 rounded-2xl bg-[#0D1117]/98 border border-white/20 shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#E0A96D] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Highlights & Offers Queue</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {totalItems} Active in Queue
                </span>
              </div>

              <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                {items.map((item, idx) => {
                  const itemStyles = getUrgencyStyles(item.urgency);
                  const isCurrent = idx === currentIndex;
                  return (
                    <div
                      key={item.id || idx}
                      onClick={() => handleSelectIndex(idx)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isCurrent 
                          ? 'bg-[#0F382C]/70 border-[#E0A96D] shadow-md' 
                          : 'bg-black/30 hover:bg-white/5 border-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${itemStyles.badge}`}>
                          {item.badge}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] text-[#E0A96D] font-bold flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            <span>Viewing</span>
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed">
                        {item.text}
                      </p>
                      {item.actionText && (
                        <div className="mt-1 flex items-center gap-1 text-[11px] font-bold text-[#E0A96D]">
                          <span>{item.actionText}</span>
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
                <span>Use arrows to slide anytime</span>
                <button
                  onClick={() => setShowQueueDropdown(false)}
                  className="text-slate-300 hover:text-white font-bold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
