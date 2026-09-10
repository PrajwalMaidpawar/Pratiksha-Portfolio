/**
 * BrandModal Component (Phase 5)
 * Editorial case-study modal for brand partnerships:
 * - Locks background scroll on mount and restores on unmount
 * - Handles keyboard navigation (ESC key) and click outside
 * - Renders high-resolution media area with candidate fallback
 * - Displays brand name, format, deliverables, creative strategy, and Instagram link
 */

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Instagram, ArrowUpRight, Sparkles, Tag, Layers } from 'lucide-react';
import { editorialEase } from '../../styles/animations';

export default function BrandModal({ brand, onClose }) {
  const modalRef = useRef(null);

  // Background scroll lock & ESC key listener
  useEffect(() => {
    if (!brand) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [brand, onClose]);

  if (!brand) return null;

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${brand.brand} Case Study`}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
      >
        {/* Backdrop blur overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#151419]/90 backdrop-blur-md"
        />

        {/* Modal Window Container */}
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.4, ease: editorialEase }}
          className="relative z-10 w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-3xl bg-[#18171E] border border-[#2C2A35] shadow-2xl flex flex-col md:flex-row"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-[#151419]/80 hover:bg-[#C38A68] text-[#E6E2DE] hover:text-[#151419] border border-[#2C2A35] flex items-center justify-center transition-all duration-300"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left / Media Column */}
          <div className="relative w-full md:w-1/2 bg-[#151419] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[4/5] rounded-2xl overflow-hidden bg-[#1C1B22] border border-[#2C2A35] shadow-xl flex items-center justify-center">
              {brand.videoUrl ? (
                <video
                  src={brand.videoUrl}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={brand.thumbnail}
                    alt={brand.brand}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                    className="w-full h-full object-cover object-center"
                  />

                  {/* Fallback frame in modal */}
                  <div className="absolute inset-0 p-6 flex flex-col items-center justify-between text-center bg-gradient-to-b from-[#1C1B22]/90 to-[#151419]/95 pointer-events-none">
                    <span className="px-2.5 py-1 rounded-full bg-[#C38A68] text-[#151419] font-mono text-[10px] font-bold uppercase">
                      {brand.indexTag}
                    </span>

                    <div className="space-y-2">
                      <div className="w-14 h-14 rounded-2xl bg-[#151419] border border-[#C38A68]/50 flex items-center justify-center text-[#C38A68] mx-auto">
                        <Layers className="w-7 h-7" />
                      </div>
                      <h4 className="font-display text-2xl text-[#E6E2DE] uppercase tracking-wide">
                        {brand.brand}
                      </h4>
                    </div>

                    <span className="font-mono text-xs text-[#8E8A85]">
                      {brand.category}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right / Content & Strategy Panel */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6 overflow-y-auto">
            <div className="space-y-4">
              {/* Category & Tag */}
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-[#1C1B22] text-[#C38A68] border border-[#2C2A35] font-mono text-xs uppercase tracking-wider font-semibold">
                  {brand.category}
                </span>
                <span className="font-mono text-xs text-[#8E8A85]">
                  {brand.campaignType}
                </span>
              </div>

              {/* Brand Title */}
              <h3 className="font-display text-3xl sm:text-4xl text-[#E6E2DE] tracking-wide uppercase leading-tight m-0">
                {brand.brand}
              </h3>

              {/* Description */}
              <p className="font-body text-sm sm:text-base text-[#E6E2DE]/90 leading-relaxed">
                {brand.description}
              </p>

              {/* Strategic Angle */}
              {brand.creativeAngle && (
                <div className="p-4 rounded-xl bg-[#151419] border border-[#2C2A35] space-y-1">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#C38A68] font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    <span>CREATIVE EXECUTION</span>
                  </span>
                  <p className="font-body text-xs text-[#8E8A85] leading-relaxed">
                    {brand.creativeAngle}
                  </p>
                </div>
              )}

              {/* Campaign Deliverables & Tags */}
              <div className="space-y-2 pt-2 border-t border-[#2C2A35]">
                <div className="flex items-center justify-between text-xs font-mono text-[#8E8A85]">
                  <span>DELIVERABLES:</span>
                  <span className="text-[#E6E2DE]">{brand.deliverables}</span>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {brand.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full bg-[#151419] border border-[#2C2A35] text-[#8E8A85] font-mono text-[10px] tracking-wider uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-[#2C2A35] space-y-3">
              {brand.instagramUrl && (
                <a
                  href={brand.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-[#C38A68] hover:bg-[#d49977] text-[#151419] font-body font-semibold text-sm transition-all duration-300 transform active:scale-98 shadow-lg"
                >
                  <Instagram className="w-4 h-4" />
                  <span>View Campaign on Instagram</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-transparent hover:bg-[#1C1B22] text-[#8E8A85] hover:text-[#E6E2DE] font-mono text-xs transition-colors"
              >
                Close Case Study (ESC)
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
