/**
 * ContactCTA Component (Phase 7 - Final Visual Moment)
 * Cinematic typography-driven transition bridging the Contact section to the Footer.
 * Features:
 * - Massive oversized '@SEE.AWKWARDS' display typography
 * - Ambient terracotta aura and editorial corner frame markers
 * - Creator signature quote: "I don't just create content. I create moments people remember."
 * - Direct external Instagram portal
 */

import { motion, useReducedMotion } from 'motion/react';
import { Instagram, ArrowUpRight, Sparkles } from 'lucide-react';
import siteConfig from '../../data/siteConfig';
import { editorialEase } from '../../styles/animations';

export default function ContactCTA() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: editorialEase }}
      className="relative rounded-3xl bg-gradient-to-b from-[#18171E] via-[#151419] to-[#121115] border border-[#2C2A35] p-8 sm:p-14 lg:p-20 overflow-hidden text-center shadow-2xl"
    >
      {/* Cinematic Ambient Glow & Subtle Grid Background */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#C38A68]/10 rounded-full blur-[100px] pointer-events-none"
      />

      {/* Editorial Corner Brackets */}
      <div className="absolute top-5 left-5 w-4 h-4 border-t-2 border-l-2 border-[#C38A68]/60 pointer-events-none" />
      <div className="absolute top-5 right-5 w-4 h-4 border-t-2 border-r-2 border-[#C38A68]/60 pointer-events-none" />
      <div className="absolute bottom-5 left-5 w-4 h-4 border-b-2 border-l-2 border-[#C38A68]/60 pointer-events-none" />
      <div className="absolute bottom-5 right-5 w-4 h-4 border-b-2 border-r-2 border-[#C38A68]/60 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto space-y-6 sm:space-y-8">
        {/* Subtle Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C1B22] border border-[#2C2A35] text-[#C38A68] font-mono text-[11px] uppercase tracking-[0.2em]">
          <Sparkles className="w-3 h-3" />
          <span>FOLLOW THE JOURNEY</span>
        </div>

        {/* Massive Oversized Display Handle */}
        <div className="overflow-hidden">
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <h3 className="font-display text-[clamp(2.8rem,11vw,10.5rem)] text-[#E6E2DE] group-hover:text-[#C38A68] leading-[0.85] tracking-tight uppercase transition-colors duration-400 m-0 select-none">
              @SEE.AWKWARDS
            </h3>
          </a>
        </div>

        {/* Creator Credo */}
        <p className="font-body text-base sm:text-xl text-[#8E8A85] max-w-xl mx-auto italic leading-relaxed">
          &ldquo;{siteConfig.quote}&rdquo;
        </p>

        {/* Direct Action Link */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#1C1B22] hover:bg-[#C38A68] text-[#E6E2DE] hover:text-[#151419] border border-[#2C2A35] hover:border-[#C38A68] font-body text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow-lg group"
          >
            <Instagram className="w-4 h-4" />
            <span>VISIT INSTAGRAM PROFILE</span>
            <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-transparent hover:bg-[#1C1B22] text-[#8E8A85] hover:text-[#E6E2DE] border border-transparent hover:border-[#2C2A35] font-mono text-xs uppercase tracking-wider transition-all duration-300"
          >
            <span>OFFICIAL BUSINESS DESK</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
