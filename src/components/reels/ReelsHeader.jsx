/**
 * ReelsHeader Component (Phase 4)
 * Editorial section header for REELS showcase.
 * Matches Canva Slide 4: oversized condensed 'REELS' typography with the signature
 * upper-right arrow motif, interactive line extension, and index metadata.
 */

import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { editorialEase } from '../../styles/animations';

export default function ReelsHeader() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#2C2A35] pb-8 select-none">
      {/* Left: Section Index & Oversized REELS Display Heading */}
      <div className="space-y-3">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: editorialEase }}
          className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-[#8E8A85]"
        >
          <span className="text-[#C38A68] font-bold">04</span>
          <span className="w-8 h-[1px] bg-[#2C2A35]" />
          <span>SHORT-FORM VIDEO ARCHIVE</span>
        </motion.div>

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
            transition={{ duration: shouldReduceMotion ? 0.4 : 0.9, ease: editorialEase }}
            className="font-display text-[clamp(4.25rem,10vw,10.5rem)] leading-[0.84] text-[#E6E2DE] tracking-tight m-0"
          >
            REELS
          </motion.h2>
        </div>
      </div>

      {/* Right: Signature Canva Arrow Motif with Interactive Line Extension */}
      <motion.div
        initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, delay: 0.2, ease: editorialEase }}
        className="flex items-center gap-4 sm:pb-2 self-end sm:self-auto"
      >
        <div className="text-right">
          <span className="block font-mono text-xs text-[#C38A68] font-bold tracking-wider">
            55M+ COMBINED VIEWS
          </span>
          <span className="block font-mono text-[11px] text-[#8E8A85]">
            CURATED HIGHLIGHTS
          </span>
        </div>

        {/* Minimal Arrow Motif (Canva Slide 4 reference) */}
        <div className="group inline-flex items-center gap-2 p-2.5 rounded-full bg-[#1C1B22] border border-[#2C2A35] hover:border-[#C38A68] text-[#E6E2DE] hover:text-[#C38A68] transition-all duration-300">
          <div className="w-6 sm:w-10 h-[1.5px] bg-[#C38A68]/70 group-hover:w-12 transition-all duration-300 ease-out" />
          <ArrowUpRight className="w-5 h-5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </div>
      </motion.div>
    </div>
  );
}
