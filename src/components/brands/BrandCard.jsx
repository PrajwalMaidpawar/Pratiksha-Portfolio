/**
 * BrandCard Component (Phase 5)
 * Secondary collaborations presentation for Jamunai & JK Perfumes.
 * Features the Canva collective narrative quote, two responsive cards with 16:10 / 4:3 media,
 * candidate resolution, and interactive modal openers.
 */

import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Sparkles, Layers, Upload, Quote } from 'lucide-react';
import { editorialEase } from '../../styles/animations';

export default function BrandCard({ summary }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="pt-4">
      {/* Secondary Collaboration Single Sentence Box for Jamunai & JK Perfumes */}
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7, ease: editorialEase }}
        className="rounded-2xl bg-gradient-to-r from-[#1C1B22] to-[#18171E] border border-[#2C2A35] hover:border-[#C38A68]/40 p-6 sm:p-8 relative overflow-hidden shadow-lg transition-colors"
      >
        <div
          aria-hidden="true"
          className="absolute -right-6 -bottom-6 text-[#C38A68]/5 pointer-events-none select-none"
        >
          <Quote className="w-36 h-36" />
        </div>

        <div className="relative z-10 space-y-2 max-w-3xl">
          <div className="flex items-center gap-2 font-mono text-xs text-[#C38A68] tracking-widest uppercase font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>MORE BRAND COLLABORATIONS</span>
          </div>

          <p className="font-body text-base sm:text-lg text-[#E6E2DE] leading-relaxed">
            "{summary?.quote || 'Also collaborated with Jamunai and JK Perfumes, bringing an extroverted personality and street-interview style to create spontaneous, engaging conversations with real people, while keeping the brand integration natural and entertaining.'}"
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function SecondaryBrandCardItem({
  brand,
  index,
  onSelect,
  shouldReduceMotion,
}) {
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [localPreview, setLocalPreview] = useState(null);

  const candidates = brand.thumbnailCandidates || [brand.thumbnail];
  const currentSrc = localPreview || candidates[candidateIndex] || brand.thumbnail;

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
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: shouldReduceMotion ? 0.35 : 0.75,
        delay: shouldReduceMotion ? 0 : index * 0.12,
        ease: editorialEase,
      }}
      onClick={() => onSelect(brand)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(brand);
        }
      }}
      aria-label={`Open collaboration details for ${brand.brand}`}
      className="group relative rounded-2xl bg-[#18171E] border border-[#2C2A35] hover:border-[#C38A68]/50 transition-all duration-400 p-6 flex flex-col justify-between space-y-6 cursor-pointer select-none shadow-lg transform hover:-translate-y-1"
    >
      <div className="space-y-4">
        {/* Media Preview Aspect Frame */}
        <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-[#151419] border border-[#2C2A35] group-hover:border-[#C38A68]/40 transition-colors">
          {!imageFailed ? (
            <img
              src={currentSrc}
              alt={`${brand.brand} collaboration`}
              referrerPolicy="no-referrer"
              loading="lazy"
              onLoad={() => {
                setImageLoaded(true);
                setImageFailed(false);
              }}
              onError={handleImageError}
              className={`w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ) : (
            <div className="w-full h-full p-4 flex flex-col items-center justify-between text-center bg-gradient-to-b from-[#1C1B22] to-[#151419]">
              <span className="text-[10px] font-mono text-[#8E8A85] uppercase">
                {brand.indexTag}
              </span>
              <div className="space-y-1">
                <Layers className="w-6 h-6 text-[#C38A68] mx-auto" />
                <span className="font-display text-lg text-[#E6E2DE] block uppercase">
                  {brand.brand}
                </span>
              </div>
              <div className="pt-1">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#201F28] group-hover:bg-[#C38A68] group-hover:text-[#151419] border border-[#2C2A35] text-[10px] font-mono text-[#E6E2DE] transition-colors">
                  <span>PARTNERSHIP DETAILS</span>
                </span>
              </div>
            </div>
          )}

          {/* Top Tag */}
          <div className="absolute top-3 left-3 z-10 pointer-events-none">
            <span className="px-2.5 py-0.5 rounded-full bg-[#151419]/85 backdrop-blur-md border border-[#2C2A35] text-[#C38A68] font-mono text-[10px] tracking-wider uppercase">
              {brand.category}
            </span>
          </div>
        </div>

        {/* Brand Information */}
        <div className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-wider text-[#8E8A85] block">
            {brand.campaignType}
          </span>
          <h4 className="font-display text-2xl sm:text-3xl text-[#E6E2DE] tracking-wide uppercase group-hover:text-[#C38A68] transition-colors m-0">
            {brand.brand}
          </h4>
          <p className="font-body text-xs sm:text-sm text-[#8E8A85] line-clamp-3 leading-relaxed">
            {brand.description}
          </p>
        </div>
      </div>

      {/* Footer Meta & Arrow */}
      <div className="pt-4 border-t border-[#2C2A35] flex items-center justify-between">
        <span className="font-mono text-[11px] text-[#8E8A85]">
          FORMAT: <span className="text-[#E6E2DE]">{brand.format}</span>
        </span>

        <span className="inline-flex items-center gap-1 font-mono text-xs text-[#C38A68] group-hover:translate-x-1 transition-transform">
          <span>DETAILS</span>
          <ArrowUpRight className="w-4 h-4" />
        </span>
      </div>
    </motion.div>
  );
}
