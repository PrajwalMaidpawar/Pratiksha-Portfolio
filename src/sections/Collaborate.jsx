/**
 * Collaborate Section (Phase 6 Implementation)
 * Target Section ID: #collaborate
 * Reference: Canva Slide 6 (COLLABORATION FORMATS, Deliverables, Creative Partnership Menu)
 * Features: Asymmetric editorial composition, interactive 01–06 formats with expandable drawers,
 * and high-impact transition toward #contact.
 */

import Container from '../components/Container';
import Section from '../components/Section';
import CollaborateHeader from '../components/collaborate/CollaborateHeader';
import CollaborationList from '../components/collaborate/CollaborationList';
import CollaborationCTA from '../components/collaborate/CollaborationCTA';
import collaborationFormats from '../data/collaborations';
import { Sparkles, ShieldCheck, Zap, HeartHandshake } from 'lucide-react';

export default function Collaborate() {
  return (
    <Section id="collaborate" className="relative overflow-hidden py-16 lg:py-24" hasDivider={true}>
      <Container>
        <div className="space-y-16 lg:space-y-24">
          {/* Section Header */}
          <CollaborateHeader />

          {/* Asymmetric Layout (Desktop >= 1024px) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column (Desktop 4 cols): Creative Ethos & Partnership Guarantees */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
              {/* Ethos Card */}
              <div className="rounded-2xl bg-[#18171E] border border-[#2C2A35] p-6 sm:p-7 space-y-5 shadow-xl">
                <div className="flex items-center gap-2 font-mono text-xs text-[#C38A68] uppercase tracking-widest font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>COLLABORATION ETHOS</span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl text-[#E6E2DE] tracking-wide uppercase leading-tight m-0">
                  HOW PRATIKSHA INTEGRATES BRANDS
                </h3>

                <p className="font-body text-xs sm:text-sm text-[#8E8A85] leading-relaxed">
                  Pratiksha treats every sponsored segment as an organic piece of entertainment. Viewers never feel tricked; they feel entertained.
                </p>

                {/* 3 Core Tenets */}
                <div className="space-y-4 pt-2 border-t border-[#2C2A35]">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#151419] border border-[#C38A68]/30 flex items-center justify-center text-[#C38A68] shrink-0 mt-0.5">
                      <Zap className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="font-mono text-xs text-[#E6E2DE] uppercase font-bold tracking-wider m-0">
                        Organic Integration
                      </h4>
                      <p className="font-body text-xs text-[#8E8A85] mt-0.5 leading-relaxed">
                        Products embedded into spontaneous street comedy or relatable sketches rather than rigid teleprompter reads.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#151419] border border-[#C38A68]/30 flex items-center justify-center text-[#C38A68] shrink-0 mt-0.5">
                      <HeartHandshake className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="font-mono text-xs text-[#E6E2DE] uppercase font-bold tracking-wider m-0">
                        Audience Trust
                      </h4>
                      <p className="font-body text-xs text-[#8E8A85] mt-0.5 leading-relaxed">
                        High engagement and positive comments from viewers who appreciate unforced, honest brand storytelling.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#151419] border border-[#C38A68]/30 flex items-center justify-center text-[#C38A68] shrink-0 mt-0.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="font-mono text-xs text-[#E6E2DE] uppercase font-bold tracking-wider m-0">
                        Professional Delivery
                      </h4>
                      <p className="font-body text-xs text-[#8E8A85] mt-0.5 leading-relaxed">
                        Swift turnaround, transparent metric sharing, and clear communication from concept to live post.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stat callout */}
              <div className="p-4 rounded-xl bg-[#151419] border border-[#2C2A35] flex items-center justify-between text-xs font-mono">
                <span className="text-[#8E8A85]">PRIMARY FORMAT:</span>
                <span className="text-[#C38A68] font-bold">9:16 VERTICAL VIDEO</span>
              </div>
            </div>

            {/* Right Column (Desktop 8 cols): Interactive Collaboration Formats List */}
            <div className="lg:col-span-8">
              <CollaborationList formats={collaborationFormats} />
            </div>
          </div>

          {/* Bottom High-Impact CTA Transition to #contact */}
          <CollaborationCTA />
        </div>
      </Container>
    </Section>
  );
}
