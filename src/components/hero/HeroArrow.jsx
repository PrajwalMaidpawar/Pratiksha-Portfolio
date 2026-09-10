/**
 * HeroArrow Component (Phase 2)
 * Minimal editorial thin-line terracotta directional indicator.
 * Interactive hover glide and smooth scroll targeting the #about section.
 * Reference: Canva Slide 1
 */

import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { editorialEase } from '../../styles/animations';

export default function HeroArrow({ targetId = 'about', className = '' }) {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const handleScroll = (e) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: shouldReduceMotion ? 0.3 : 0.8,
        delay: shouldReduceMotion ? 0.1 : 0.65,
        ease: editorialEase,
      }}
      className={`inline-flex items-center gap-4 ${className}`}
    >
      <a
        href={`#${targetId}`}
        onClick={handleScroll}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group inline-flex items-center gap-3.5 text-xs uppercase tracking-[0.2em] font-mono text-[#E6E2DE]/70 hover:text-[#E6E2DE] transition-colors py-2"
        aria-label="Scroll to introduction section"
      >
        <span className="font-medium text-[11px] sm:text-xs">
          Explore Portfolio
        </span>

        {/* Minimal thin-line terracotta arrow */}
        <div className="relative flex items-center text-[#C38A68] overflow-hidden py-1">
          {/* Thin horizontal track */}
          <motion.div
            animate={{
              width: isHovered ? (shouldReduceMotion ? 44 : 56) : 36,
              opacity: isHovered ? 1 : 0.75,
            }}
            transition={{ duration: 0.3, ease: editorialEase }}
            className="h-[1.5px] bg-[#C38A68]"
          />

          {/* Arrowhead */}
          <motion.div
            animate={{
              x: isHovered ? (shouldReduceMotion ? 0 : 4) : 0,
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="shrink-0 -ml-1 text-[#C38A68]"
          >
            <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
          </motion.div>
        </div>
      </a>
    </motion.div>
  );
}
