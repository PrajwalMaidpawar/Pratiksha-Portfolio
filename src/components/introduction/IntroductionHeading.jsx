/**
 * IntroductionHeading Component (Phase 3)
 * Left column of the asymmetric editorial magazine spread.
 * Features ultra-bold condensed 'INTRODUCTION' display typography,
 * signature @see.awkwards handle with interactive hover dynamics,
 * and section indexing metadata.
 */

import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Instagram } from 'lucide-react';
import siteConfig from '../../data/siteConfig';
import { editorialEase } from '../../styles/animations';

export default function IntroductionHeading() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="space-y-6 lg:space-y-8 select-none">
      {/* Editorial Index Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: editorialEase }}
        className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-[#8E8A85]"
      >
        <span className="text-[#C38A68] font-bold">02</span>
        <span className="w-8 h-[1px] bg-[#2C2A35]" />
        <span>BIOGRAPHICAL SPREAD</span>
      </motion.div>

      {/* Massive Display Title */}
      <div className="overflow-visible pr-2">
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
          className="font-display text-[clamp(2.5rem,4.6vw,5.2rem)] xl:text-[5.8rem] leading-[0.9] text-[#C38A68] tracking-tight m-0 whitespace-nowrap"
        >
          INTRODUCTION
        </motion.h2>
      </div>

      {/* Signature Instagram Handle with Hover Dynamics */}
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, delay: 0.2, ease: editorialEase }}
        className="pt-2"
      >
        <a
          href={siteConfig.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 text-lg sm:text-xl lg:text-2xl font-body font-semibold text-[#E6E2DE] hover:text-[#C38A68] transition-colors duration-300 py-1"
          aria-label={`Visit Pratiksha's Instagram profile ${siteConfig.handle}`}
        >
          <span className="w-9 h-9 rounded-full bg-[#1C1B22] border border-[#2C2A35] group-hover:border-[#C38A68] flex items-center justify-center text-[#C38A68] transition-all duration-300 group-hover:scale-105 shrink-0">
            <Instagram className="w-4 h-4" />
          </span>

          <span className="relative">
            {siteConfig.handle}
            {/* Animated underline */}
            <span className="absolute left-0 bottom-0 w-0 h-[1.5px] bg-[#C38A68] transition-all duration-300 ease-out group-hover:w-full" />
          </span>

          <span className="inline-block transform transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1 text-[#8E8A85] group-hover:text-[#C38A68]">
            <ArrowUpRight className="w-5 h-5" />
          </span>
        </a>

        {/* Subtle Signature Descriptor */}
        <p className="font-mono text-xs text-[#8E8A85] mt-2 tracking-wide">
          Verified Content Creator &amp; Standup Performer
        </p>
      </motion.div>

      {/* Decorative vertical ruler on desktop */}
      <div className="hidden lg:block pt-8">
        <div className="w-16 h-[1px] bg-gradient-to-r from-[#C38A68]/60 to-transparent" />
      </div>
    </div>
  );
}
