/**
 * CollaborationCTA Component (Phase 6)
 * Editorial transition block bridging Collaborate to #contact.
 * Features:
 * - Editorial invitation headline: "SEEN THE WORK? LET'S MAKE YOURS."
 * - Signature extending arrow CTA: "LET'S WORK TOGETHER ━━━━━→"
 * - Smooth scroll handler to #contact
 */

import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Sparkles, Mail, MessageSquare } from 'lucide-react';
import { editorialEase } from '../../styles/animations';
import { collaborateIntro } from '../../data/collaborations';

export default function CollaborationCTA() {
  const shouldReduceMotion = useReducedMotion();

  const handleScrollToContact = (e) => {
    e.preventDefault();
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.75, ease: editorialEase }}
      className="relative rounded-3xl bg-gradient-to-br from-[#1C1B22] via-[#18171E] to-[#151419] border border-[#2C2A35] p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl"
    >
      {/* Background Decorative Grid/Accents */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-96 h-96 bg-[#C38A68]/5 rounded-full blur-3xl pointer-events-none"
      />

      {/* Corner editorial markers */}
      <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-[#C38A68]/60 pointer-events-none" />
      <div className="absolute top-4 right-4 w-3 h-3 border-t border-r border-[#C38A68]/60 pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-3 h-3 border-b border-l border-[#C38A68]/60 pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-[#C38A68]/60 pointer-events-none" />

      <div className="relative z-10 max-w-4xl space-y-8">
        {/* Eyebrow */}
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#C38A68] font-bold">
          <Sparkles className="w-4 h-4" />
          <span>START A CONVERSATION</span>
        </div>

        {/* Big Editorial Headline */}
        <div className="space-y-3">
          <h3 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#E6E2DE] tracking-wide uppercase leading-tight m-0">
            {collaborateIntro.ctaTitle}
          </h3>
          <p className="font-body text-base sm:text-lg text-[#8E8A85] max-w-2xl leading-relaxed">
            {collaborateIntro.ctaSubtext}
          </p>
        </div>

        {/* Primary Interactive Extending-Arrow CTA */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
          <a
            href="#contact"
            onClick={handleScrollToContact}
            className="group relative inline-flex items-center gap-4 px-8 py-4 rounded-full bg-[#C38A68] hover:bg-[#d49977] text-[#151419] font-body font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-xl self-start"
          >
            <span>LET'S WORK TOGETHER</span>
            {/* Extending animated arrow line */}
            <span className="inline-flex items-center">
              <span className="w-5 group-hover:w-10 h-[2px] bg-[#151419] transition-all duration-300 ease-out" />
              <ArrowRight className="w-4 h-4 -ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </a>

          <a
            href="mailto:business@pratikshamaidpawar.com"
            className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-[#151419] hover:bg-[#201F28] border border-[#2C2A35] hover:border-[#C38A68]/50 text-xs font-mono text-[#E6E2DE] hover:text-[#C38A68] transition-all duration-300 self-start"
          >
            <Mail className="w-3.5 h-3.5 text-[#C38A68]" />
            <span>DIRECT BUSINESS INQUIRY</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
