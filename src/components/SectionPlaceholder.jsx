/**
 * SectionPlaceholder Component
 * Clean, structured architectural placeholder establishing container bounds,
 * typography scale, responsive layout guidelines, and data bindings for future phases.
 */

import { ArrowUpRight, Layers, Layout, Database } from 'lucide-react';
import AnimatedHeading from './animations/AnimatedHeading';
import ScrollReveal from './animations/ScrollReveal';

export default function SectionPlaceholder({
  stepNumber,
  title,
  subtitle,
  slideReference,
  targetPhase = 'Phase 2',
  layoutStrategy,
  dataBinding,
  plannedComponents = [],
  children,
}) {
  return (
    <div className="w-full">
      {/* Top Header Grid with Slide Reference & Phase Badge */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#2C2A35]/60 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-mono tracking-widest uppercase bg-[#C38A68]/15 text-[#C38A68] border border-[#C38A68]/30">
              0{stepNumber} &bull; {targetPhase}
            </span>
            <span className="text-xs font-body text-[#8E8A85] tracking-wider uppercase">
              Ref: {slideReference}
            </span>
          </div>

          <AnimatedHeading size="displayL" color="cream" withArrow={true}>
            {title}
          </AnimatedHeading>

          {subtitle && (
            <p className="text-sm md:text-base text-[#8E8A85] font-body mt-1 max-w-xl">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 self-start sm:self-end text-xs font-mono text-[#8E8A85]">
          <span className="w-2 h-2 rounded-full bg-[#C38A68] animate-pulse" />
          <span>Foundation Ready</span>
        </div>
      </div>

      {/* Structural Architecture Preview Card */}
      <ScrollReveal variant="fadeUp" delay={0.1}>
        <div className="rounded-2xl border border-[#2C2A35] bg-[#1C1B22]/40 backdrop-blur-sm p-5 sm:p-7 md:p-8">
          {/* Metadata Specs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8 pb-6 border-b border-[#2C2A35]/60">
            <div className="flex items-start gap-3">
              <Layout className="w-4 h-4 text-[#C38A68] mt-0.5 shrink-0" />
              <div>
                <div className="text-[11px] uppercase tracking-wider text-[#8E8A85] font-body">
                  Responsive Layout
                </div>
                <div className="text-xs sm:text-sm text-[#E6E2DE] font-medium mt-0.5">
                  {layoutStrategy || 'Asymmetric 2-column desktop / Stacked mobile'}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Database className="w-4 h-4 text-[#C38A68] mt-0.5 shrink-0" />
              <div>
                <div className="text-[11px] uppercase tracking-wider text-[#8E8A85] font-body">
                  Data Architecture
                </div>
                <div className="text-xs sm:text-sm text-[#E6E2DE] font-mono mt-0.5">
                  {dataBinding || 'Integrated in /src/data/'}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Layers className="w-4 h-4 text-[#C38A68] mt-0.5 shrink-0" />
              <div>
                <div className="text-[11px] uppercase tracking-wider text-[#8E8A85] font-body">
                  Planned Components
                </div>
                <div className="text-xs sm:text-sm text-[#E6E2DE] font-medium mt-0.5">
                  {plannedComponents.length > 0
                    ? plannedComponents.join(', ')
                    : 'Interactive View Modules'}
                </div>
              </div>
            </div>
          </div>

          {/* Section Layout Preview / Interactive Blueprint */}
          {children}
        </div>
      </ScrollReveal>
    </div>
  );
}
