/**
 * IntroductionCopy Component (Phase 3)
 * Right column of the editorial magazine spread.
 * Presents Pratiksha's personal creator story with progressive scroll reveal,
 * micro-hover brightness enhancements, and prominent visual framing for the final signature quote.
 */

import { motion, useReducedMotion } from 'motion/react';
import { Sparkles, Quote, Award } from 'lucide-react';
import siteConfig from '../../data/siteConfig';
import { editorialEase } from '../../styles/animations';

export default function IntroductionCopy() {
  const shouldReduceMotion = useReducedMotion();

  // Paragraph items from bio array
  const paragraphs = siteConfig.bio.slice(0, 4);
  const signatureStatement = siteConfig.bio[4] || siteConfig.quote;

  return (
    <div className="space-y-6 lg:space-y-8 font-body">
      {/* Editorial Meta Header */}
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: editorialEase }}
        className="flex items-center justify-between pb-4 border-b border-[#2C2A35]"
      >
        <span className="font-mono text-xs uppercase tracking-[0.16em] text-[#C38A68] flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Creative Journey</span>
        </span>
        <span className="font-mono text-[11px] text-[#8E8A85]">
          PUMBA MBA // STANDUP // COMEDY
        </span>
      </motion.div>

      {/* Narrative Paragraphs with Progressive Stagger */}
      <div className="space-y-5 sm:space-y-6">
        {paragraphs.map((paragraph, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              duration: shouldReduceMotion ? 0.35 : 0.75,
              delay: shouldReduceMotion ? 0 : index * 0.14,
              ease: editorialEase,
            }}
            className="group relative p-4 -ml-4 rounded-xl transition-all duration-300 hover:bg-[#1C1B22]/50"
          >
            {/* Subtle left hover accent line */}
            <div className="absolute left-0 top-3 bottom-3 w-[2px] bg-transparent group-hover:bg-[#C38A68]/60 transition-colors duration-300 rounded-full" />

            <p className="text-base sm:text-lg text-[#E6E2DE]/85 group-hover:text-[#E6E2DE] leading-relaxed transition-colors duration-200">
              {/* Highlight brand mentions in paragraph 3 for immediate credibility scan */}
              {index === 2 ? (
                <>
                  With <span className="text-[#C38A68] font-semibold">52M+ views</span> on my content
                  and collaborations with brands like{' '}
                  <span className="text-[#E6E2DE] font-semibold underline decoration-[#C38A68]/50 decoration-1 underline-offset-4">
                    Westside
                  </span>{' '}
                  and{' '}
                  <span className="text-[#E6E2DE] font-semibold underline decoration-[#C38A68]/50 decoration-1 underline-offset-4">
                    Flo Mattress
                  </span>
                  , I love creating ideas that entertain audiences while giving brands a natural and
                  creative place in the story.
                </>
              ) : (
                paragraph
              )}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Prominent Visual Accent: Standout Final Statement */}
      <motion.div
        initial={{
          opacity: 0,
          y: shouldReduceMotion ? 0 : 36,
          scale: shouldReduceMotion ? 1 : 0.98,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{
          duration: shouldReduceMotion ? 0.4 : 0.85,
          delay: shouldReduceMotion ? 0 : 0.45,
          ease: editorialEase,
        }}
        className="relative mt-8 pt-8 border-t border-[#2C2A35]"
      >
        <div className="relative rounded-2xl bg-gradient-to-br from-[#1C1B22] to-[#18171E] border border-[#2C2A35] hover:border-[#C38A68]/50 transition-colors duration-300 p-6 sm:p-8 overflow-hidden shadow-xl">
          {/* Subtle Background Icon Watermark */}
          <div
            aria-hidden="true"
            className="absolute -bottom-6 -right-6 text-[#C38A68]/5 pointer-events-none select-none"
          >
            <Quote className="w-36 h-36" />
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#151419] border border-[#C38A68]/40 flex items-center justify-center text-[#C38A68] shrink-0 shadow-inner">
              <Award className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#C38A68] font-bold">
                Creator Credo
              </span>
              <blockquote className="font-display text-2xl sm:text-3xl md:text-4xl text-[#E6E2DE] tracking-wide leading-snug">
                "{signatureStatement}"
              </blockquote>
            </div>
          </div>

          {/* Glowing bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C38A68]/80 to-transparent" />
        </div>
      </motion.div>
    </div>
  );
}
