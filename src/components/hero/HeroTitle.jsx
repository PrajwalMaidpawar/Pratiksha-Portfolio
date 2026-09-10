/**
 * HeroTitle Component (Phase 2)
 * Renders the massive, condensed, editorial Bebas Neue display typography
 * for "PRATIKSHA MAIDPAWAR" with staggered entrance animations.
 * Reference: Canva Slide 1
 */

import { motion, useReducedMotion } from 'motion/react';
import { editorialEase } from '../../styles/animations';

export default function HeroTitle({ className = '' }) {
  const shouldReduceMotion = useReducedMotion();

  const lineVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 48,
    },
    visible: (custom = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.4 : 0.95,
        delay: shouldReduceMotion ? custom * 0.05 : custom * 0.18 + 0.1,
        ease: editorialEase,
      },
    }),
  };

  return (
    <h1
      className={`font-display uppercase select-none tracking-[0.01em] ${className}`}
      aria-label="Pratiksha Maidpawar"
    >
      <span className="block overflow-hidden pb-1">
        <motion.span
          custom={0}
          initial="hidden"
          animate="visible"
          variants={lineVariants}
          className="block text-[#C38A68] text-[clamp(2.85rem,9.5vw,11.5rem)] leading-[0.86] font-bold drop-shadow-[0_4px_24px_rgba(195,138,104,0.12)]"
        >
          PRATIKSHA
        </motion.span>
      </span>

      <span className="block overflow-hidden pt-0.5">
        <motion.span
          custom={1}
          initial="hidden"
          animate="visible"
          variants={lineVariants}
          className="block text-[#C38A68] text-[clamp(2.85rem,9.5vw,11.5rem)] leading-[0.86] font-bold drop-shadow-[0_4px_24px_rgba(195,138,104,0.12)]"
        >
          MAIDPAWAR
        </motion.span>
      </span>
    </h1>
  );
}
