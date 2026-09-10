/**
 * SectionTransition Component (Phase 3)
 * Editorial visual bridge connecting Introduction to My Content.
 * Features an animated hairline divider, editorial index marker 'WHAT I CREATE',
 * and a downward micro-glide indicator.
 */

import { motion, useReducedMotion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { editorialEase } from '../styles/animations';

export default function SectionTransition({
  label = 'WHAT I CREATE',
  index = '03 // 07',
  targetId = 'content',
}) {
  const shouldReduceMotion = useReducedMotion();

  const handleScroll = (e) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full py-12 lg:py-16 select-none">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between">
          {/* Hairline Left Line */}
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#2C2A35] to-[#2C2A35]" />

          {/* Central Editorial Bridge Action */}
          <motion.a
            href={`#${targetId}`}
            onClick={handleScroll}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: editorialEase }}
            className="group mx-4 sm:mx-8 inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#18171E] border border-[#2C2A35] hover:border-[#C38A68]/60 text-xs font-mono tracking-[0.2em] text-[#8E8A85] hover:text-[#E6E2DE] transition-all duration-300 shadow-lg"
            aria-label={`Scroll to ${label}`}
          >
            <span className="text-[#C38A68] font-bold">{index}</span>
            <span className="text-[#E6E2DE] font-medium">{label}</span>
            <span className="w-5 h-5 rounded-full bg-[#201F28] group-hover:bg-[#C38A68] text-[#8E8A85] group-hover:text-[#151419] flex items-center justify-center transition-all duration-300 transform group-hover:translate-y-0.5">
              <ArrowDown className="w-3 h-3" />
            </span>
          </motion.a>

          {/* Hairline Right Line */}
          <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-[#2C2A35] to-[#2C2A35]" />
        </div>
      </div>
    </div>
  );
}
