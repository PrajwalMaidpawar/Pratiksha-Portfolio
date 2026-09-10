/**
 * ReelCard Component (Phase 4)
 * Premium vertical 9:16 card for short-form reel showcase.
 * Matches Canva Slide 4: rounded card containers, view count at bottom,
 * custom play indicator, hover lift & zoom micro-interactions,
 * and keyboard accessibility.
 */

import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Play, Eye, Sparkles, Upload } from 'lucide-react';
import { editorialEase } from '../../styles/animations';

export default function ReelCard({
  reel,
  index = 0,
  onSelect,
}) {
  const shouldReduceMotion = useReducedMotion();
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [localPreview, setLocalPreview] = useState(null);

  const candidates = reel.thumbnailCandidates || [reel.thumbnail];
  const currentSrc = localPreview || candidates[candidateIndex] || reel.thumbnail;

  const handleImageError = () => {
    if (candidateIndex + 1 < candidates.length) {
      setCandidateIndex((prev) => prev + 1);
    } else {
      setImageFailed(true);
    }
  };

  const handleLocalFileSelect = (e) => {
    e.stopPropagation();
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLocalPreview(url);
      setImageFailed(false);
      setImageLoaded(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: shouldReduceMotion ? 0.35 : 0.75,
        delay: shouldReduceMotion ? 0 : index * 0.09,
        ease: editorialEase,
      }}
      className="h-full"
    >
      <div
        role="button"
        tabIndex={0}
        onClick={() => onSelect(reel)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelect(reel);
          }
        }}
        aria-label={`Open reel: ${reel.title}, Category: ${reel.category}, ${reel.views} views`}
        className={`group relative w-full aspect-[9/16] rounded-2xl overflow-hidden bg-[#18171E] border transition-all duration-500 cursor-pointer flex flex-col justify-between p-4 select-none focus:outline-none focus:ring-2 focus:ring-[#C38A68] focus:ring-offset-2 focus:ring-offset-[#151419] ${
          reel.featured
            ? 'border-[#C38A68]/60 shadow-[0_12px_40px_-15px_rgba(195,138,104,0.25)] hover:border-[#C38A68]'
            : 'border-[#2C2A35] hover:border-[#C38A68]/50 hover:shadow-xl'
        } transform hover:-translate-y-1.5`}
      >
        {/* Background Image / Poster */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#151419]">
          {!imageFailed ? (
            <img
              src={currentSrc}
              alt={`${reel.title} - ${reel.category} by Pratiksha Maidpawar`}
              referrerPolicy="no-referrer"
              loading="lazy"
              onLoad={() => {
                setImageLoaded(true);
                setImageFailed(false);
              }}
              onError={handleImageError}
              className={`w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ) : (
            /* Editorial Placeholder Poster if thumbnail asset is awaiting upload */
            <div className="w-full h-full p-5 flex flex-col items-center justify-between text-center bg-gradient-to-b from-[#1C1B22] via-[#18171E] to-[#151419]">
              <div className="w-full flex justify-between items-center text-[10px] font-mono text-[#8E8A85]">
                <span className="text-[#C38A68] font-bold">{reel.badge}</span>
                <span>9:16 REEL</span>
              </div>

              <div className="space-y-2 max-w-[180px]">
                <div className="w-12 h-12 rounded-full bg-[#151419] border border-[#C38A68]/40 flex items-center justify-center text-[#C38A68] mx-auto shadow-inner group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
                <h4 className="font-display text-xl text-[#E6E2DE] tracking-wide line-clamp-2 uppercase">
                  {reel.title}
                </h4>
                <p className="font-mono text-[11px] text-[#C38A68] font-bold">
                  {reel.views} VIEWS
                </p>
              </div>

              {/* Editorial prompt */}
              <div className="w-full">
                <span className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#201F28] group-hover:bg-[#C38A68] group-hover:text-[#151419] border border-[#2C2A35] text-[10px] font-mono text-[#E6E2DE] transition-colors w-full">
                  <span>VIEW REEL</span>
                </span>
              </div>
            </div>
          )}

          {/* Cinematic Gradient Overlays (Preserves image while ensuring readability) */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#151419] via-[#151419]/30 to-[#151419]/70 pointer-events-none transition-opacity duration-300 group-hover:opacity-85"
          />
        </div>

        {/* Top Header Information */}
        <div className="relative z-10 flex items-center justify-between gap-2">
          {/* Category / Featured Badge */}
          <div className="flex items-center gap-1.5">
            <span
              className={`px-2.5 py-1 rounded-full font-mono text-[10px] tracking-wider uppercase backdrop-blur-md border ${
                reel.featured
                  ? 'bg-[#C38A68] text-[#151419] font-bold border-[#C38A68]'
                  : 'bg-[#151419]/80 text-[#C38A68] border-[#2C2A35]'
              }`}
            >
              {reel.featured && <Sparkles className="w-2.5 h-2.5 inline mr-1 -mt-0.5" />}
              {reel.badge}
            </span>
          </div>

          {/* Minimal Play Icon Badge (Top Right) */}
          <div className="w-8 h-8 rounded-full bg-[#151419]/80 backdrop-blur-md border border-[#2C2A35] group-hover:border-[#C38A68] text-[#E6E2DE] group-hover:text-[#C38A68] flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 shadow-lg">
            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
          </div>
        </div>

        {/* Center Hover Play Glint */}
        <div className="relative z-10 flex-1 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-14 h-14 rounded-full bg-[#C38A68]/90 text-[#151419] flex items-center justify-center shadow-2xl transform scale-90 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-6 h-6 fill-current ml-0.5" />
          </div>
        </div>

        {/* Bottom Metadata & Views (Canva Slide 4 reference) */}
        <div className="relative z-10 space-y-2 pt-3">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8E8A85] block">
              {reel.category}
            </span>
            <h3 className="font-display text-xl sm:text-2xl text-[#E6E2DE] tracking-wide line-clamp-1 uppercase mt-0.5 group-hover:text-[#C38A68] transition-colors">
              {reel.title}
            </h3>
          </div>

          {/* View Metric Bar */}
          <div className="flex items-center justify-between pt-2 border-t border-[#2C2A35]/80">
            <div className="flex items-center gap-1.5 font-mono text-xs sm:text-sm font-bold text-[#E6E2DE]">
              <Eye className="w-3.5 h-3.5 text-[#C38A68]" />
              <span>{reel.views}</span>
            </div>
            <span className="font-mono text-[10px] text-[#8E8A85] tracking-widest uppercase">
              VIEWS
            </span>
          </div>
        </div>

        {/* Subtle Bottom Accent Glow on Hover */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C38A68] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </motion.div>
  );
}
