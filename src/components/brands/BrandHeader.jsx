/**
 * BrandHeader Component (Phase 5)
 * Editorial section header for BRAND WORKS.
 * Matches Canva Slide 5: stacked condensed 'BRAND WORKS' display typography,
 * section indexing, and editorial thesis on commercial brand storytelling.
 */

import { motion, useReducedMotion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { editorialEase } from '../../styles/animations';

export default function BrandHeader() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="space-y-6 border-b border-[#2C2A35] pb-8 select-none">
      {/* Section Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: editorialEase }}
        className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-[#8E8A85]"
      >
        <span className="text-[#C38A68] font-bold">05</span>
        <span className="w-8 h-[1px] bg-[#2C2A35]" />
        <span>COMMERCIAL PORTFOLIO</span>
      </motion.div>

      {/* Main Display Title: BRAND WORKS */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="overflow-hidden">
          <motion.h2
            initial={{
              opacity: 0,
              y: shouldReduceMotion ? 0 : 60,
              clipPath: shouldReduceMotion ? 'none' : 'inset(100% 0% 0% 0%)',
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              clipPath: 'inset(0% 0% 0% 0%)',
            }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: shouldReduceMotion ? 0.4 : 0.95, ease: editorialEase }}
            className="font-display text-[clamp(4.25rem,10vw,10.5rem)] leading-[0.84] text-[#E6E2DE] tracking-tight m-0"
          >
            <span className="block text-[#C38A68]">BRAND</span>
            <span className="block">WORKS</span>
          </motion.h2>
        </div>

        {/* Editorial Subtitle & Credo */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.2, ease: editorialEase }}
          className="max-w-md lg:pb-3 space-y-2"
        >
          <div className="flex items-center gap-2 font-mono text-xs text-[#C38A68] tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AUTHENTIC BRAND INTEGRATIONS</span>
          </div>
          <p className="font-body text-sm sm:text-base text-[#8E8A85] leading-relaxed">
            Creative collaborations built around personality, humor, and organic street dialogue — giving brands a natural and entertaining place in the story.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
