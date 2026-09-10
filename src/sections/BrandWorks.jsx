/**
 * Brand Works Section (Phase 5 Implementation)
 * Target Section ID: #brands
 * Reference: Canva Slide 5 (BRAND WORKS, Flo Mattress, Westside, Jamunai, JK Perfumes)
 * Features: Alternating case studies for hero brands, secondary collaborations grid,
 * interactive case-study modal with background scroll lock, and understated transition to #collaborate.
 */

import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import Container from '../components/Container';
import Section from '../components/Section';
import BrandHeader from '../components/brands/BrandHeader';
import BrandShowcase from '../components/brands/BrandShowcase';
import BrandCard from '../components/brands/BrandCard';
import BrandModal from '../components/brands/BrandModal';
import brandsData, { secondarySummary } from '../data/brands';
import { editorialEase } from '../styles/animations';

export default function BrandWorks() {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  // Split brands into featured hero partnerships (Flo Mattress & Westside) and secondary collaborations
  const featuredBrands = brandsData.filter((b) => b.featured);
  const secondaryBrands = brandsData.filter((b) => !b.featured);

  const handleSelectBrand = (brand) => {
    setSelectedBrand(brand);
  };

  const handleCloseModal = () => {
    setSelectedBrand(null);
  };

  const handleScrollToCollaborate = (e) => {
    e.preventDefault();
    const target = document.getElementById('collaborate');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Section id="brands" className="relative overflow-hidden py-16 lg:py-24" hasDivider={true}>
      <Container>
        <div className="space-y-16 lg:space-y-24">
          {/* Section Header */}
          <BrandHeader />

          {/* Featured Hero Collaborations (Flo Mattress & Westside Alternating Layout) */}
          <BrandShowcase
            brands={featuredBrands}
            onSelectBrand={handleSelectBrand}
          />

          {/* Secondary Collaborations Summary Sentence (Jamunai & JK Perfumes) */}
          <BrandCard summary={secondarySummary} />

          {/* Editorial Transition Bridge to #collaborate */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: editorialEase }}
            className="pt-10 border-t border-[#2C2A35]"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-6 sm:p-8 rounded-2xl bg-[#18171E] border border-[#2C2A35]">
              <div className="space-y-1 max-w-xl">
                <span className="font-mono text-xs uppercase tracking-widest text-[#C38A68] flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  <span>NEXT STEPS</span>
                </span>
                <p className="font-display text-xl sm:text-2xl text-[#E6E2DE] tracking-wide uppercase m-0">
                  Looking for a creator who can make your brand part of the conversation?
                </p>
              </div>

              <a
                href="#collaborate"
                onClick={handleScrollToCollaborate}
                className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#1C1B22] border border-[#2C2A35] hover:border-[#C38A68] text-xs font-mono font-semibold tracking-wider text-[#E6E2DE] hover:text-[#C38A68] transition-all duration-300 shrink-0 self-start sm:self-auto shadow-md"
              >
                <span>LET'S COLLABORATE</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Case Study Lightbox Modal */}
      <BrandModal brand={selectedBrand} onClose={handleCloseModal} />
    </Section>
  );
}
