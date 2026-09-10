/**
 * CollaborateHeader Component (Phase 6)
 * Editorial section header for the COLLABORATE section.
 * Massive condensed display typography, section index '06 // COLLABORATION MENU',
 * and the personality-led thesis statement.
 */

import { motion, useReducedMotion } from 'motion/react';
import { Sparkles, ArrowDownRight } from 'lucide-react';
import { editorialEase } from '../../styles/animations';
import { collaborateIntro } from '../../data/collaborations';

export default function CollaborateHeader() {
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
        <span className="text-[#C38A68] font-bold">06</span>
        <span className="w-8 h-[1px] bg-[#2C2A35]" />
        <span>{collaborateIntro.eyebrow}</span>
      </motion.div>

      {/* Main Display Title: LET'S COLLABORATE */}
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
            className="font-display text-[clamp(3.75rem,9.5vw,10.5rem)] leading-[0.85] text-[#E6E2DE] tracking-tight m-0"
          >
            <span className="block text-[#C38A68]">{collaborateIntro.headingLine1}</span>
            <span className="block">{collaborateIntro.headingLine2}</span>
          </motion.h2>
        </div>

        {/* Editorial Subtitle & Thesis Statement */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.2, ease: editorialEase }}
          className="max-w-md lg:pb-2 space-y-3"
        >
          <div className="flex items-center gap-2 font-mono text-xs text-[#C38A68] tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PARTNERSHIP OPPORTUNITIES</span>
          </div>
          <p className="font-body text-base sm:text-lg text-[#E6E2DE] leading-relaxed">
            {collaborateIntro.subheading}
          </p>
          <p className="font-body text-xs sm:text-sm text-[#8E8A85] leading-relaxed">
            {collaborateIntro.credo}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
