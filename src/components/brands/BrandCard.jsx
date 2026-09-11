/**
 * BrandCard Component (Phase 5)
 * Secondary collaborations presentation summary card.
 * Features the collective narrative quote for Westside, Jamunai, and JK Perfumes.
 */

import { motion, useReducedMotion } from 'motion/react';
import { Sparkles, Quote } from 'lucide-react';
import { editorialEase } from '../../styles/animations';

export default function BrandCard({ summary }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="pt-4">
      {/* Secondary Collaboration Single Sentence Box */}
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
            "{summary?.quote || 'Also Collaborated with Westside , Jamunai and JK Perfumes, bringing my extroverted personality and street-interview style to create spontaneous, engaging conversations with real people, while keeping the brand integration natural and entertaining.'}"
          </p>
        </div>
      </motion.div>
    </div>
  );
}
