/**
 * HeroMeta Component (Phase 2)
 * Supporting subtitle, Instagram handle, and creative metadata for Pratiksha Maidpawar.
 * Reference: Canva Slide 1
 */

import { motion, useReducedMotion } from 'motion/react';
import { Instagram, Sparkles, ExternalLink } from 'lucide-react';
import siteConfig from '../../data/siteConfig';
import { editorialEase } from '../../styles/animations';

export default function HeroMeta({ className = '' }) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.35 : 0.8,
        delay: shouldReduceMotion ? 0.05 : 0.4,
        ease: editorialEase,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={`space-y-6 ${className}`}
    >
      {/* Editorial Subtitle / Tagline from Canva */}
      <div className="space-y-2">
        <p className="font-body text-lg sm:text-xl lg:text-2xl font-light text-[#E6E2DE] tracking-wide">
          <span className="font-normal text-[#E6E2DE]">Content Creator</span>
          <span className="text-[#C38A68] mx-2 sm:mx-3">|</span>
          <span className="font-normal text-[#E6E2DE]">Model</span>
          <span className="text-[#C38A68] mx-2 sm:mx-3">|</span>
          <span className="font-normal text-[#E6E2DE]">Standup</span>
        </p>

        {/* Instagram Handle Link */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1C1B22] border border-[#2C2A35] hover:border-[#C38A68]/80 text-[#E6E2DE] text-sm font-body transition-all duration-200 hover:bg-[#201F28]"
            aria-label={`Visit Instagram profile ${siteConfig.handle}`}
          >
            <Instagram className="w-4 h-4 text-[#C38A68] group-hover:scale-110 transition-transform duration-200" />
            <span className="font-medium text-xs sm:text-sm tracking-wide text-[#E6E2DE] group-hover:text-[#C38A68] transition-colors">
              {siteConfig.handle}
            </span>
            <ExternalLink className="w-3 h-3 text-[#8E8A85] group-hover:text-[#C38A68] transition-colors opacity-70 group-hover:opacity-100" />
          </a>

          {/* Views badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1C1B22]/80 border border-[#2C2A35]/60 text-xs font-mono text-[#8E8A85]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C38A68]" />
            <span className="text-[#E6E2DE] font-semibold">{siteConfig.stats.totalViews}</span>
            <span>Views Across Reels</span>
          </div>
        </div>
      </div>

      {/* Role / Discipline Tags */}
      <div className="flex flex-wrap gap-2 pt-1">
        {['Standup Performer', 'Street Interviewer', 'Fashion & Commercial', 'Comedy Creator'].map(
          (role) => (
            <span
              key={role}
              className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded bg-[#1C1B22]/60 border border-[#2C2A35]/60 text-[#8E8A85]"
            >
              {role}
            </span>
          )
        )}
      </div>
    </motion.div>
  );
}
