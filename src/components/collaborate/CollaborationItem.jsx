/**
 * CollaborationItem Component (Phase 6)
 * Editorial list row representing a single collaboration format:
 * - Number, title, short description, arrow indicator, divider
 * - Subtle hover animations: background shift, title translation, arrow glide
 * - Expandable drawer for deep deliverables, capabilities, and direct inquiry jump
 * - Accessible: aria-expanded, keyboard navigation (Enter/Space), high contrast
 */

import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ArrowRight, ChevronDown, Check, Sparkles, Tag } from 'lucide-react';
import { editorialEase } from '../../styles/animations';

export default function CollaborationItem({
  format,
  isExpanded,
  onToggle,
  index,
}) {
  const shouldReduceMotion = useReducedMotion();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle();
    }
  };

  const handleInquiryClick = (e) => {
    e.stopPropagation();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: shouldReduceMotion ? 0.3 : 0.6,
        delay: shouldReduceMotion ? 0 : index * 0.08,
        ease: editorialEase,
      }}
      className={`group border-b border-[#2C2A35] transition-colors duration-400 ${
        isExpanded ? 'bg-[#18171E]/90' : 'hover:bg-[#18171E]/40'
      }`}
    >
      {/* Primary Interactive Row Header */}
      <div
        role="button"
        tabIndex={0}
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        aria-expanded={isExpanded}
        aria-controls={`format-details-${format.id}`}
        className="w-full py-6 sm:py-8 px-4 sm:px-6 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C38A68]"
      >
        {/* Left: Number + Title + Tagline */}
        <div className="flex items-start md:items-center gap-4 sm:gap-6 flex-1">
          {/* Index Number */}
          <span
            className={`font-mono text-sm sm:text-base font-bold tracking-widest shrink-0 transition-colors duration-300 ${
              isExpanded
                ? 'text-[#C38A68]'
                : 'text-[#8E8A85] group-hover:text-[#C38A68]'
            }`}
          >
            {format.number}
          </span>

          {/* Title & Tagline */}
          <div className="space-y-1 transform transition-transform duration-300 group-hover:translate-x-1.5">
            <h3
              className={`font-display text-2xl sm:text-3xl lg:text-4xl uppercase tracking-wide leading-none transition-colors duration-300 m-0 ${
                isExpanded
                  ? 'text-[#C38A68]'
                  : 'text-[#E6E2DE] group-hover:text-[#E6E2DE]'
              }`}
            >
              {format.title}
            </h3>
            <p className="font-body text-xs sm:text-sm text-[#8E8A85] line-clamp-1">
              {format.tagline}
            </p>
          </div>
        </div>

        {/* Right: Tag Badge + Arrow Indicator */}
        <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 pl-8 md:pl-0">
          <div className="hidden sm:flex items-center gap-2">
            {format.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-full bg-[#151419] border border-[#2C2A35] text-[#8E8A85] font-mono text-[10px] tracking-wider uppercase"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[#8E8A85] group-hover:text-[#C38A68] transition-colors hidden sm:inline">
              {isExpanded ? 'CLOSE' : 'EXPLORE'}
            </span>
            <div
              className={`w-9 h-9 rounded-full border border-[#2C2A35] flex items-center justify-center transition-all duration-300 ${
                isExpanded
                  ? 'bg-[#C38A68] text-[#151419] border-[#C38A68]'
                  : 'bg-[#151419] text-[#8E8A85] group-hover:text-[#C38A68] group-hover:border-[#C38A68]/60 group-hover:translate-x-1'
              }`}
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 transform rotate-180 transition-transform duration-300" />
              ) : (
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform duration-300" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Case & Details Drawer */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            id={`format-details-${format.id}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0.2 : 0.45,
              ease: editorialEase,
            }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-6 pb-8 pt-2 space-y-6">
              {/* Highlight Ribbon */}
              {format.highlight && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#C38A68]/10 border border-[#C38A68]/30 text-[#C38A68] font-mono text-xs tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>{format.highlight}</span>
                </div>
              )}

              {/* In-depth Narrative */}
              <p className="font-body text-sm sm:text-base text-[#E6E2DE]/90 leading-relaxed max-w-4xl">
                {format.description}
              </p>

              {/* Grid: Deliverables vs What Pratiksha Creates */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
                {/* Left: What Pratiksha Creates */}
                <div className="lg:col-span-7 rounded-2xl bg-[#151419] border border-[#2C2A35] p-5 sm:p-6 space-y-3">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#C38A68] font-bold block">
                    WHAT PRATIKSHA CREATES
                  </span>
                  <ul className="space-y-2.5">
                    {format.capabilities.map((cap, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-[#E6E2DE] font-body"
                      >
                        <span className="w-4 h-4 rounded-full bg-[#C38A68]/15 text-[#C38A68] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5" />
                        </span>
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right: Package Deliverables & Quick Jump */}
                <div className="lg:col-span-5 rounded-2xl bg-[#151419] border border-[#2C2A35] p-5 sm:p-6 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#8E8A85] block">
                      STANDARD DELIVERABLES
                    </span>
                    <ul className="space-y-2">
                      {format.deliverablesList.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-xs text-[#8E8A85] font-body"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C38A68] mt-1.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={handleInquiryClick}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#C38A68] hover:bg-[#d49977] text-[#151419] font-body font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-md"
                  >
                    <span>Inquire About {format.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Tags bar */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-[#2C2A35]/60">
                {format.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#151419] border border-[#2C2A35] text-[#8E8A85] font-mono text-[10px] tracking-wider uppercase"
                  >
                    <Tag className="w-2.5 h-2.5 text-[#C38A68]" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
