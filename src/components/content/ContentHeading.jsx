/**
 * ContentHeading Component (Phase 3)
 * Left column of the My Content section.
 * Features stacked two-line Bebas Neue typography 'MY CONTENT',
 * the 'POSTS' category hierarchy, and interactive pillar selectors that synchronize with the gallery.
 */

import { motion, useReducedMotion } from 'motion/react';
import { Camera, Sparkles, CheckCircle2 } from 'lucide-react';
import { editorialEase } from '../../styles/animations';

export default function ContentHeading({
  pillars = [],
  activeItemId,
  onSelectPillar,
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="space-y-8 select-none">
      {/* Editorial Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: editorialEase }}
        className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-[#8E8A85]"
      >
        <span className="text-[#C38A68] font-bold">03</span>
        <span className="w-8 h-[1px] bg-[#2C2A35]" />
        <span>VISUAL ARCHIVE</span>
      </motion.div>

      {/* Massive Stacked Display Title: MY CONTENT */}
      <div className="overflow-hidden">
        <motion.h2
          initial={{
            opacity: 0,
            y: shouldReduceMotion ? 0 : 70,
            clipPath: shouldReduceMotion ? 'none' : 'inset(100% 0% 0% 0%)',
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            clipPath: 'inset(0% 0% 0% 0%)',
          }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: shouldReduceMotion ? 0.4 : 0.95, ease: editorialEase }}
          className="font-display text-[clamp(2.85rem,7.8vw,9.5rem)] leading-[0.86] text-[#E6E2DE] tracking-tight m-0"
        >
          <span className="block text-[#C38A68]">MY</span>
          <span className="block">CONTENT</span>
        </motion.h2>
      </div>

      {/* Category Hierarchy: POSTS */}
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, delay: 0.2, ease: editorialEase }}
        className="space-y-4 pt-2"
      >
        <div className="flex items-center gap-3 border-b border-[#2C2A35] pb-3">
          <Camera className="w-4 h-4 text-[#C38A68]" />
          <h3 className="font-display text-2xl sm:text-3xl text-[#E6E2DE] tracking-wider uppercase m-0">
            POSTS
          </h3>
          <span className="ml-auto font-mono text-xs text-[#8E8A85] tracking-widest">
            PHOTOSHOOT PILLARS
          </span>
        </div>

        {/* Interactive Pillar List Synchronized with Active Photoshoot */}
        <div className="space-y-3 pt-2 font-body">
          {pillars.map((pillar) => {
            const isActive = activeItemId === pillar.relatedItemId;
            return (
              <button
                key={pillar.id}
                type="button"
                onClick={() => onSelectPillar(pillar.relatedItemId)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-start gap-4 ${
                  isActive
                    ? 'bg-[#1C1B22] border-[#C38A68] shadow-lg'
                    : 'bg-[#18171E]/60 border-[#2C2A35] hover:border-[#3A3746] hover:bg-[#1C1B22]/40'
                }`}
              >
                {/* Number badge */}
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-colors ${
                    isActive
                      ? 'bg-[#C38A68] text-[#151419]'
                      : 'bg-[#151419] text-[#8E8A85] border border-[#2C2A35]'
                  }`}
                >
                  {pillar.number}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-base sm:text-lg font-semibold capitalize transition-colors ${
                        isActive ? 'text-[#E6E2DE]' : 'text-[#8E8A85] hover:text-[#E6E2DE]'
                      }`}
                    >
                      {pillar.title}
                    </span>
                    {isActive && (
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] text-[#C38A68] tracking-widest uppercase">
                        <Sparkles className="w-3 h-3" />
                        <span>Viewing</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#8E8A85] leading-relaxed mt-1 line-clamp-2">
                    {pillar.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
