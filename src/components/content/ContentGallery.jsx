/**
 * ContentGallery Component (Phase 3)
 * Right column of the My Content section.
 * Editorial 4:5 photoshoot showcase with curtain reveal animation,
 * desktop spring mouse parallax, corner tick markers, category switching,
 * and robust multi-candidate asset resolution.
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useReducedMotion } from 'motion/react';
import { Sparkles, Camera, Upload, ArrowRight, Eye } from 'lucide-react';
import { editorialEase } from '../../styles/animations';

export default function ContentGallery({
  items = [],
  activeItemId,
  onSelectIndex,
}) {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef(null);

  // Active item lookup
  const currentIndex = items.findIndex((it) => it.id === activeItemId);
  const activeIndex = currentIndex !== -1 ? currentIndex : 0;
  const activeItem = items[activeIndex] || items[0];

  // Image load & error handling per item
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [userUploadedOverrides, setUserUploadedOverrides] = useState({});

  // Reset candidate index when active item changes
  useEffect(() => {
    setCandidateIndex(0);
    setImageLoaded(false);
    setImageFailed(false);
  }, [activeItem?.id]);

  // Determine current active source
  const currentSrc =
    userUploadedOverrides[activeItem?.id] ||
    activeItem?.imageCandidates?.[candidateIndex] ||
    activeItem?.image;

  // Spring physics for subtle desktop mouse parallax (5-12px)
  const springConfig = { damping: 28, stiffness: 200, mass: 0.5 };
  const parallaxX = useSpring(0, springConfig);
  const parallaxY = useSpring(0, springConfig);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMouseMove = (e) => {
      if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      // Only track when cursor is within/near this container
      if (
        e.clientX < rect.left - 50 ||
        e.clientX > rect.right + 50 ||
        e.clientY < rect.top - 50 ||
        e.clientY > rect.bottom + 50
      ) {
        parallaxX.set(0);
        parallaxY.set(0);
        return;
      }

      const relativeX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const relativeY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

      // Clamped subtle range: ±8px horizontal, ±6px vertical
      parallaxX.set(Math.max(-8, Math.min(8, relativeX * 8)));
      parallaxY.set(Math.max(-6, Math.min(6, relativeY * 6)));
    };

    const handleMouseLeave = () => {
      parallaxX.set(0);
      parallaxY.set(0);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [shouldReduceMotion, parallaxX, parallaxY]);

  // Cycle through image fallback candidates
  const handleImageError = () => {
    const candidates = activeItem?.imageCandidates || [];
    if (candidateIndex + 1 < candidates.length) {
      setCandidateIndex((prev) => prev + 1);
    } else {
      setImageFailed(true);
    }
  };

  // Local file upload preview handler
  const handleLocalFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file && activeItem?.id) {
      const url = URL.createObjectURL(file);
      setUserUploadedOverrides((prev) => ({
        ...prev,
        [activeItem.id]: url,
      }));
      setImageFailed(false);
      setImageLoaded(true);
    }
  };

  return (
    <div ref={containerRef} className="space-y-6 select-none">
      {/* Editorial Minimal Switcher Tabs (01 CLOTHING / 02 CREATIVE) */}
      <div className="flex items-center justify-between gap-4 border-b border-[#2C2A35] pb-4">
        <div className="flex items-center gap-2 sm:gap-3">
          {items.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectIndex(idx)}
                className={`group relative px-3 sm:px-4 py-2 rounded-lg font-mono text-xs tracking-wider transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#1C1B22] text-[#C38A68] border border-[#C38A68]/50 shadow-md'
                    : 'bg-[#151419] text-[#8E8A85] hover:text-[#E6E2DE] border border-[#2C2A35]'
                }`}
              >
                <span className="font-bold">{item.number}</span>
                <span className="hidden sm:inline uppercase">{item.id}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C38A68] animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* Index counter */}
        <div className="font-mono text-xs text-[#8E8A85] tracking-widest">
          <span className="text-[#E6E2DE] font-bold">0{activeIndex + 1}</span>
          <span className="mx-1 text-[#2C2A35]">/</span>
          <span>0{items.length}</span>
        </div>
      </div>

      {/* Main 4:5 Editorial Image Frame with Curtain Reveal */}
      <motion.div
        style={
          shouldReduceMotion
            ? {}
            : {
                x: parallaxX,
                y: parallaxY,
              }
        }
        className="relative w-full max-w-[540px] mx-auto rounded-2xl overflow-hidden bg-[#18171E] border border-[#2C2A35] shadow-2xl group"
      >
        {/* Subtle Corner Editorial Ticks */}
        <div className="absolute top-3 left-3 w-2 h-2 border-t border-l border-[#C38A68]/60 z-20 pointer-events-none" />
        <div className="absolute top-3 right-3 w-2 h-2 border-t border-r border-[#C38A68]/60 z-20 pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-2 h-2 border-b border-l border-[#C38A68]/60 z-20 pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-2 h-2 border-b border-r border-[#C38A68]/60 z-20 pointer-events-none" />

        {/* Top Editorial Ribbon Badge */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
          <span className="px-3 py-1 rounded-full bg-[#151419]/80 backdrop-blur-md border border-[#2C2A35] text-[#C38A68] font-mono text-[11px] tracking-widest uppercase">
            {activeItem.tag}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-[#151419]/80 backdrop-blur-md border border-[#2C2A35] text-[#8E8A85] font-mono text-[10px]">
            4:5 RATIO
          </span>
        </div>

        {/* 4:5 Aspect Ratio Container */}
        <div className="relative aspect-[4/5] w-full overflow-hidden flex items-center justify-center bg-[#151419]">
          <AnimatePresence mode="wait">
            {!imageFailed ? (
              <motion.div
                key={activeItem.id + currentSrc}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.65, ease: editorialEase }}
                className="relative w-full h-full flex items-center justify-center"
              >
                {/* Visual Editorial Image */}
                <img
                  src={currentSrc}
                  alt={activeItem.alt}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  onLoad={() => {
                    setImageLoaded(true);
                    setImageFailed(false);
                  }}
                  onError={handleImageError}
                  className={`w-full h-full object-cover object-center transition-all duration-700 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                {/* Step 2-4: Vertical Dark Mask Curtain Reveal */}
                <motion.div
                  initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                  animate={{
                    clipPath: imageLoaded ? 'inset(0% 0% 100% 0%)' : 'inset(0% 0% 0% 0%)',
                  }}
                  transition={{
                    duration: shouldReduceMotion ? 0.3 : 1.05,
                    delay: 0.15,
                    ease: editorialEase,
                  }}
                  className="absolute inset-0 bg-[#151419] z-10 pointer-events-none flex items-center justify-center"
                >
                  <div className="w-8 h-8 rounded-full border-2 border-[#C38A68]/30 border-t-[#C38A68] animate-spin" />
                </motion.div>

                {/* Subtle dark gradient overlay at bottom for title legibility */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#151419] via-transparent to-transparent opacity-80 pointer-events-none z-10"
                />
              </motion.div>
            ) : (
              /* High-craft editorial placeholder slot if image file isn't physically present */
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative w-full h-full p-8 flex flex-col items-center justify-between text-center bg-gradient-to-b from-[#1C1B22] to-[#151419]"
              >
                <div className="w-full flex justify-between items-center">
                  <span className="font-mono text-[10px] text-[#C38A68] tracking-widest uppercase font-bold">
                    {activeItem.tag}
                  </span>
                  <span className="font-mono text-[10px] text-[#8E8A85]">
                    4:5 EDITORIAL
                  </span>
                </div>

                <div className="space-y-3 max-w-sm my-auto">
                  <div className="w-16 h-16 rounded-2xl bg-[#151419] border border-[#C38A68]/40 flex items-center justify-center text-[#C38A68] mx-auto shadow-xl">
                    <Camera className="w-8 h-8" />
                  </div>

                  <div>
                    <h4 className="font-display text-2xl text-[#E6E2DE] tracking-wide uppercase">
                      {activeItem.title}
                    </h4>
                    <p className="font-mono text-xs text-[#C38A68] mt-0.5">
                      {activeItem.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-[#8E8A85] font-body leading-relaxed">
                    {activeItem.description}
                  </p>
                </div>

                {/* Subtle upload option */}
                <div className="w-full pt-4 border-t border-[#2C2A35]/60">
                  <label className="cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#201F28] hover:bg-[#2C2A35] border border-[#2C2A35] hover:border-[#C38A68]/60 text-xs font-mono text-[#8E8A85] hover:text-[#E6E2DE] transition-all duration-300 w-full">
                    <Upload className="w-3.5 h-3.5 text-[#C38A68]" />
                    <span>Preview Custom Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLocalFileSelect}
                      className="hidden"
                    />
                  </label>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Editorial Caption Card */}
        <div className="p-5 sm:p-6 bg-[#18171E] border-t border-[#2C2A35] space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C38A68] font-bold">
                {activeItem.category}
              </span>
              <h4 className="font-display text-xl sm:text-2xl text-[#E6E2DE] tracking-wide uppercase mt-0.5">
                {activeItem.title}
              </h4>
            </div>

            <button
              type="button"
              onClick={() => onSelectIndex((activeIndex + 1) % items.length)}
              className="p-2 rounded-lg bg-[#201F28] hover:bg-[#2C2A35] text-[#8E8A85] hover:text-[#C38A68] border border-[#2C2A35] transition-colors shrink-0"
              aria-label="Next photoshoot"
              title="Next photoshoot"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <p className="font-body text-xs sm:text-sm text-[#8E8A85] leading-relaxed">
            {activeItem.description}
          </p>

          {/* Micro Metadata Grid */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#2C2A35]/60 font-mono text-[11px]">
            {activeItem.metadata?.map((meta) => (
              <div key={meta.label} className="flex items-center justify-between text-[#8E8A85]">
                <span>{meta.label}:</span>
                <span className="text-[#E6E2DE] truncate ml-1">{meta.value}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
