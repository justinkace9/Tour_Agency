import React, { useState, useEffect, useRef } from 'react';
import { RefreshCw, CheckCircle2 } from 'lucide-react';

interface PullToRefreshProps {
  onRefresh?: () => Promise<void> | void;
  children: React.ReactNode;
}

export const PullToRefresh: React.FC<PullToRefreshProps> = ({ onRefresh, children }) => {
  const [pullY, setPullY] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshComplete, setRefreshComplete] = useState(false);
  const startY = useRef(0);
  const isPulling = useRef(false);

  const PULL_THRESHOLD = 70;

  const handleTouchStart = (e: React.TouchEvent) => {
    if (window.scrollY <= 2 && !isRefreshing) {
      startY.current = e.touches[0].clientY;
      isPulling.current = true;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isPulling.current || isRefreshing) return;
    const currentY = e.touches[0].clientY;
    const diff = currentY - startY.current;
    if (diff > 0 && window.scrollY <= 2) {
      // Apply rubber-band friction
      const distance = Math.min(diff * 0.45, 90);
      setPullY(distance);
    } else {
      setPullY(0);
    }
  };

  const handleTouchEnd = async () => {
    if (!isPulling.current || isRefreshing) return;
    isPulling.current = false;

    if (pullY >= PULL_THRESHOLD) {
      setIsRefreshing(true);
      setPullY(50);

      try {
        if (onRefresh) {
          await onRefresh();
        } else {
          // Simulation delay
          await new Promise((r) => setTimeout(r, 900));
        }
        setRefreshComplete(true);
        setTimeout(() => {
          setRefreshComplete(false);
          setIsRefreshing(false);
          setPullY(0);
        }, 600);
      } catch {
        setIsRefreshing(false);
        setPullY(0);
      }
    } else {
      setPullY(0);
    }
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative min-h-screen"
    >
      {/* Pull indicator */}
      {pullY > 0 && (
        <div
          style={{ height: `${pullY}px` }}
          className="overflow-hidden flex items-center justify-center transition-height duration-75 text-center text-xs font-medium text-slate-300 pointer-events-none"
        >
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0F382C]/90 border border-[#E0A96D]/30 shadow-lg">
            {refreshComplete ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300">Tours & Weather Synced</span>
              </>
            ) : isRefreshing ? (
              <>
                <RefreshCw className="w-4 h-4 text-[#E0A96D] animate-spin" />
                <span className="text-white">Updating Cayo tours...</span>
              </>
            ) : (
              <>
                <RefreshCw
                  className="w-4 h-4 text-[#E0A96D] transition-transform duration-200"
                  style={{ transform: `rotate(${pullY * 4}deg)` }}
                />
                <span>{pullY >= PULL_THRESHOLD ? 'Release to refresh' : 'Pull down to refresh'}</span>
              </>
            )}
          </div>
        </div>
      )}

      {children}
    </div>
  );
};
