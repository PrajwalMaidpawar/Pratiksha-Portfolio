/**
 * ContactHeader Component (Phase 7)
 * Editorial section header for the CONTACT & COLLABORATION section.
 * Massive condensed display typography with staggered reveal animation,
 * terracotta accents, and creator thesis statement.
 */

import { motion, useReducedMotion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { editorialEase } from '../../styles/animations';

export default function ContactHeader() {
  const shouldReduceMotion = useReducedMotion();

  const lines = [
    { text: "LET'S CREATE", isAccent: true },
    { text: 'SOMETHING', isAccent: false },
    { text: 'PEOPLE REMEMBER.', isAccent: false },
  ];

  return (
    <div className="space-y-6 border-b border-[#2C2A35] pb-10 select-none">
      {/* Section Eyebrow & Sequence Marker */}
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: editorialEase }}
        className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-[#8E8A85]"
      >
        <span className="text-[#C38A68] font-bold">07</span>
        <span className="w-8 h-[1px] bg-[#2C2A35]" />
        <span>GET IN TOUCH // INQUIRIES</span>
      </motion.div>

      {/* Massive Editorial Headline with Staggered Line Reveals */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="overflow-hidden space-y-1">
          {lines.map((line, idx) => (
            <div key={line.text} className="overflow-hidden">
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
                transition={{
                  duration: shouldReduceMotion ? 0.4 : 0.9,
                  delay: shouldReduceMotion ? 0 : idx * 0.14,
                  ease: editorialEase,
                }}
                className={`font-display text-[clamp(3.5rem,9.2vw,9.8rem)] leading-[0.85] tracking-tight m-0 ${
                  line.isAccent ? 'text-[#C38A68]' : 'text-[#E6E2DE]'
                }`}
              >
                {line.text}
              </motion.h2>
            </div>
          ))}
        </div>

        {/* Editorial Subtitle / Thesis Statement */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.35, ease: editorialEase }}
          className="max-w-md lg:pb-3 space-y-3"
        >
          <div className="flex items-center gap-2 font-mono text-xs text-[#C38A68] tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PARTNERSHIP DESK</span>
          </div>
          <p className="font-body text-base sm:text-lg text-[#E6E2DE] leading-relaxed">
            Have a campaign, video concept, brand activation, or live event? Let’s make content that captivates and connects.
          </p>
          <p className="font-body text-xs sm:text-sm text-[#8E8A85] leading-relaxed">
            Directly managed by Pratiksha &amp; representation.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
