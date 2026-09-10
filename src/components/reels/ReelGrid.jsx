/**
 * ReelGrid Component (Phase 4)
 * Responsive layout container for the 5 featured reels:
 * - Desktop (>= 1024px): 5-column horizontal editorial grid
 * - Tablet (640px - 1023px): 3-column responsive grid
 * - Mobile (< 640px): Smooth touch-snap horizontal carousel with card peek
 */

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ReelCard from './ReelCard';

export default function ReelGrid({ reels = [], onSelectReel }) {
  const scrollRef = useRef(null);

  const scrollBy = (direction) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.querySelector('div')?.offsetWidth || 260;
      scrollRef.current.scrollBy({
        left: direction * (cardWidth + 16),
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative w-full">
      {/* Mobile Horizontal Scroll Indicator / Hint */}
      <div className="flex sm:hidden items-center justify-between pb-3 text-[11px] font-mono text-[#8E8A85]">
        <span>SWIPE TO EXPLORE ({reels.length} REELS)</span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Previous reel"
            className="w-7 h-7 rounded-full bg-[#1C1B22] border border-[#2C2A35] flex items-center justify-center text-[#E6E2DE] active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Next reel"
            className="w-7 h-7 rounded-full bg-[#1C1B22] border border-[#2C2A35] flex items-center justify-center text-[#E6E2DE] active:scale-95"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 
        Responsive Container:
        - Mobile: flex row with overflow-x-auto, snap-x snap-mandatory, hide scrollbars
        - Tablet: sm:grid sm:grid-cols-3
        - Desktop: lg:grid lg:grid-cols-5
      */}
      <div
        ref={scrollRef}
        className="flex sm:grid sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-6 overflow-x-auto sm:overflow-x-visible snap-x snap-mandatory pb-4 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {reels.map((reel, index) => (
          <div
            key={reel.id}
            className="w-[78vw] max-w-[280px] sm:w-auto shrink-0 sm:shrink snap-start"
          >
            <ReelCard
              reel={reel}
              index={index}
              onSelect={onSelectReel}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
