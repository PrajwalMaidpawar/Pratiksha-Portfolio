/**
 * BrandShowcase Component (Phase 5)
 * Alternating editorial case-study presentation for featured brand partnerships:
 * - Row 1 (Flo Mattress): Image Left (58%) + Narrative Right (42%)
 * - Row 2 (Westside): Narrative Left (42%) + Image Right (58%)
 * On mobile, seamlessly stacks into an immersive visual + storytelling flow.
 */

import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Sparkles, Tag, Layers, Upload, CheckCircle2 } from 'lucide-react';
import { editorialEase } from '../../styles/animations';

export default function BrandShowcase({ brands = [], onSelectBrand }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="space-y-16 lg:space-y-24">
      {brands.map((brand, index) => {
        const isReversed = index % 2 !== 0; // Alternating layout for Row 2 (Westside)
        return (
          <BrandCaseStudyRow
            key={brand.id}
            brand={brand}
            index={index}
            isReversed={isReversed}
            onSelect={onSelectBrand}
            shouldReduceMotion={shouldReduceMotion}
          />
        );
      })}
    </div>
  );
}

function BrandCaseStudyRow({
  brand,
  index,
  isReversed,
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
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: shouldReduceMotion ? 0.35 : 0.85,
        delay: shouldReduceMotion ? 0 : index * 0.15,
        ease: editorialEase,
      }}
      className="relative group rounded-3xl bg-[#18171E] border border-[#2C2A35] hover:border-[#C38A68]/50 transition-all duration-500 overflow-hidden p-6 sm:p-8 lg:p-10 shadow-xl"
    >
      <div
        className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
          isReversed ? 'lg:flex-row-reverse' : ''
        }`}
      >
        {/* Visual Column (58% on desktop) */}
        <div
          className={`lg:col-span-7 ${
            isReversed ? 'lg:order-2' : 'lg:order-1'
          }`}
        >
          <div
            onClick={() => onSelect(brand)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelect(brand);
              }
            }}
            aria-label={`Open case study for ${brand.brand}`}
            className="group/img relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-[#151419] border border-[#2C2A35] hover:border-[#C38A68]/60 transition-all duration-500 cursor-pointer shadow-lg select-none"
          >
            {/* Corner Editorial Tick Markers */}
            <div className="absolute top-3 left-3 w-2 h-2 border-t border-l border-[#C38A68]/60 z-20 pointer-events-none" />
            <div className="absolute top-3 right-3 w-2 h-2 border-t border-r border-[#C38A68]/60 z-20 pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-2 h-2 border-b border-l border-[#C38A68]/60 z-20 pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-2 h-2 border-b border-r border-[#C38A68]/60 z-20 pointer-events-none" />

            {/* Campaign Category & Index Ribbon */}
            <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
              <span className="px-3 py-1 rounded-full bg-[#151419]/85 backdrop-blur-md border border-[#2C2A35] text-[#C38A68] font-mono text-[10px] tracking-widest uppercase font-bold">
                {brand.indexTag}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-[#151419]/85 backdrop-blur-md border border-[#2C2A35] text-[#8E8A85] font-mono text-[10px] uppercase">
                {brand.category}
              </span>
            </div>

            {/* Campaign Visual Image / Fallback */}
            {!imageFailed ? (
              <img
                src={currentSrc}
                alt={`${brand.brand} collaboration campaign with Pratiksha Maidpawar`}
                referrerPolicy="no-referrer"
                loading="lazy"
                onLoad={() => {
                  setImageLoaded(true);
                  setImageFailed(false);
                }}
                onError={handleImageError}
                className={`w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover/img:scale-105 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ) : (
              /* High-craft editorial case-study placeholder */
              <div className="w-full h-full p-6 sm:p-8 flex flex-col items-center justify-between text-center bg-gradient-to-b from-[#1C1B22] via-[#18171E] to-[#151419]">
                <span className="text-[10px] font-mono text-[#8E8A85] uppercase tracking-widest">
                  CAMPAIGN VISUAL SLOT
                </span>

                <div className="space-y-2 max-w-sm">
                  <div className="w-12 h-12 rounded-xl bg-[#151419] border border-[#C38A68]/40 flex items-center justify-center text-[#C38A68] mx-auto shadow-inner group-hover/img:scale-110 transition-transform">
                    <Layers className="w-6 h-6" />
                  </div>
                  <h4 className="font-display text-2xl text-[#E6E2DE] tracking-wide uppercase">
                    {brand.brand}
                  </h4>
                  <p className="font-mono text-xs text-[#C38A68]">
                    {brand.campaign}
                  </p>
                </div>

                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#201F28] group-hover/img:bg-[#C38A68] group-hover/img:text-[#151419] border border-[#2C2A35] text-xs font-mono text-[#E6E2DE] transition-colors shadow-md">
                    <span>VIEW CASE STUDY</span>
                  </span>
                </div>
              </div>
            )}

            {/* Subtle Gradient Shade */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#151419] via-transparent to-transparent opacity-60 pointer-events-none"
            />
          </div>
        </div>

        {/* Narrative Column (42% on desktop) */}
        <div
          className={`lg:col-span-5 space-y-6 ${
            isReversed ? 'lg:order-1' : 'lg:order-2'
          }`}
        >
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#C38A68] font-semibold block">
              {brand.campaignType}
            </span>
            <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#E6E2DE] tracking-wide uppercase leading-none m-0">
              {brand.brand}
            </h3>
          </div>

          {/* Original Canva Bio Statement */}
          <p className="font-body text-sm sm:text-base text-[#E6E2DE]/85 leading-relaxed">
            {brand.description}
          </p>

          {/* Campaign Format & Deliverables Metadata Pills */}
          <div className="space-y-3 pt-1 border-t border-[#2C2A35]">
            <div className="flex flex-wrap gap-2 pt-2">
              {brand.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#151419] border border-[#2C2A35] text-[#8E8A85] font-mono text-[11px] tracking-wider uppercase"
                >
                  <Tag className="w-2.5 h-2.5 text-[#C38A68]" />
                  <span>{tag}</span>
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-[#8E8A85] pt-1">
              <span>FORMAT:</span>
              <span className="text-[#E6E2DE]">{brand.format}</span>
            </div>
          </div>

          {/* Interactive CTA */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onSelect(brand)}
              className="group/cta inline-flex items-center gap-3 px-5 py-3 rounded-full bg-[#1C1B22] border border-[#2C2A35] hover:border-[#C38A68] text-xs font-mono font-semibold tracking-wider text-[#E6E2DE] hover:text-[#C38A68] transition-all duration-300 shadow-md"
            >
              <span>EXPLORE CASE STUDY</span>
              <div className="w-6 h-[1.5px] bg-[#C38A68] group-hover/cta:w-9 transition-all duration-300" />
              <ArrowUpRight className="w-4 h-4 transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
