/**
 * ReelModal Component (Phase 4)
 * Editorial lightbox/modal for short-form reel preview:
 * - Locks background scroll on mount and cleans up on unmount
 * - Supports keyboard navigation (ESC to close) and click-outside
 * - Renders 9:16 media viewer (video or high-res thumbnail)
 * - Displays metadata, views, description, and "Watch on Instagram →" action
 */

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Eye, Instagram, ArrowUpRight, Sparkles, Play } from 'lucide-react';
import { editorialEase } from '../../styles/animations';

export default function ReelModal({ reel, onClose }) {
  const modalRef = useRef(null);

  // Background scroll lock & ESC key listener
  useEffect(() => {
    if (!reel) return;

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
  }, [reel, onClose]);

  if (!reel) return null;

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${reel.title} Reel Preview`}
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
            aria-label="Close modal"
            className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-[#151419]/80 hover:bg-[#C38A68] text-[#E6E2DE] hover:text-[#151419] border border-[#2C2A35] flex items-center justify-center transition-all duration-300"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left / Center: 9:16 Media Canvas */}
          <div className="relative w-full md:w-1/2 bg-[#151419] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[9/16] rounded-2xl overflow-hidden bg-[#1C1B22] border border-[#2C2A35] shadow-xl flex items-center justify-center">
              {reel.videoUrl ? (
                <video
                  src={reel.videoUrl}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="relative w-full h-full flex flex-col items-center justify-between p-6 bg-[#18171E] text-center">
                  <div className="w-full flex justify-between items-center">
                    <span className="px-2.5 py-1 rounded-full bg-[#C38A68] text-[#151419] font-mono text-[10px] font-bold uppercase">
                      {reel.badge}
                    </span>
                    <span className="font-mono text-[10px] text-[#8E8A85]">
                      9:16 VERTICAL
                    </span>
                  </div>

                  <div className="space-y-4 max-w-[220px]">
                    <div className="w-16 h-16 rounded-full bg-[#1C1B22] border border-[#C38A68]/60 flex items-center justify-center text-[#C38A68] mx-auto shadow-xl">
                      <Instagram className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="font-display text-xl text-[#E6E2DE] uppercase tracking-wide">
                        {reel.title}
                      </h4>
                      <p className="font-mono text-xs text-[#C38A68] mt-1 font-bold">
                        {reel.views} VIEWS
                      </p>
                    </div>
                    <p className="font-body text-xs text-[#8E8A85] leading-relaxed">
                      Hosted directly on Instagram @see.awkwards
                    </p>
                  </div>

                  <a
                    href={reel.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 rounded-xl bg-[#201F28] hover:bg-[#C38A68] text-[#E6E2DE] hover:text-[#151419] border border-[#2C2A35] font-mono text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>OPEN ON INSTAGRAM</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Right / Information Panel */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6 overflow-y-auto">
            <div className="space-y-4">
              {/* Category & Badge */}
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-[#1C1B22] text-[#C38A68] border border-[#2C2A35] font-mono text-xs uppercase tracking-wider">
                  {reel.category}
                </span>
                {reel.featured && (
                  <span className="inline-flex items-center gap-1 text-xs font-mono text-[#C38A68]">
                    <Sparkles className="w-3 h-3" />
                    <span>Viral Standout</span>
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="font-display text-3xl sm:text-4xl text-[#E6E2DE] tracking-wide uppercase leading-tight">
                {reel.title}
              </h3>

              {/* Metric Card */}
              <div className="p-4 rounded-xl bg-[#151419] border border-[#2C2A35] flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-lg font-bold text-[#E6E2DE]">
                  <Eye className="w-5 h-5 text-[#C38A68]" />
                  <span>{reel.views}</span>
                </div>
                <span className="font-mono text-xs text-[#8E8A85] tracking-widest uppercase">
                  VERIFIED AUDIENCE
                </span>
              </div>

              {/* Editorial Description */}
              <p className="font-body text-sm sm:text-base text-[#8E8A85] leading-relaxed">
                {reel.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-[#2C2A35] space-y-3">
              {reel.instagramUrl && (
                <a
                  href={reel.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-[#C38A68] hover:bg-[#d49977] text-[#151419] font-body font-semibold text-sm transition-all duration-300 transform active:scale-98 shadow-lg"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Watch Reel on Instagram</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-transparent hover:bg-[#1C1B22] text-[#8E8A85] hover:text-[#E6E2DE] font-mono text-xs transition-colors"
              >
                Close Preview (ESC)
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
