/**
 * Hero Section (Phase 2 Implementation)
 * Section Anchor: #home
 * Reference: Canva Slide 1
 *
 * Implements:
 * - Asymmetric editorial layout (massive typography left, tall cutout portrait right)
 * - Bebas Neue condensed terracotta display headline ("PRATIKSHA MAIDPAWAR")
 * - Staggered entrance animations via Framer Motion
 * - Interactive desktop mouse parallax on portrait
 * - Minimal thin-line terracotta arrow indicator targeting #about
 * - Role tags, verified views badge, and interactive Instagram handle (@see.awkwards)
 * - Seamless dark canvas blending and fully responsive mobile stack
 */

import Container from '../components/Container';
import Section from '../components/Section';
import HeroTitle from '../components/hero/HeroTitle';
import HeroPortrait from '../components/hero/HeroPortrait';
import HeroMeta from '../components/hero/HeroMeta';
import HeroArrow from '../components/hero/HeroArrow';

export default function Hero() {
  return (
    <Section
      id="home"
      padded={false}
      className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center pt-28 sm:pt-32 lg:pt-20 pb-12 overflow-hidden"
    >
      {/* Subtle atmospheric ambient glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-[#C38A68]/[0.05] blur-[120px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full bg-[#C38A68]/[0.08] blur-[140px] pointer-events-none"
      />

      <Container className="relative z-10 w-full">
        {/* Asymmetric Desktop Grid / Stacked Mobile Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          {/* Left Column: Massive Editorial Typography & Information (Cols 1-7) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 sm:space-y-8 z-20">
            {/* Top Micro Eyebrow */}
            <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-[#1C1B22] border border-[#2C2A35] text-[11px] font-mono text-[#C38A68]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C38A68] animate-pulse" />
              <span>OFFICIAL PORTFOLIO • 2026</span>
            </div>

            {/* Massive Bebas Neue Headline */}
            <HeroTitle className="-ml-1 sm:-ml-2" />

            {/* Mobile portrait positioning (shown between title and meta on small screens) */}
            <div className="block lg:hidden my-2">
              <HeroPortrait />
            </div>

            {/* Subtitle, Instagram Handle & Roles */}
            <HeroMeta />

            {/* Minimal Editorial Arrow to #about */}
            <div className="pt-2 sm:pt-4">
              <HeroArrow targetId="about" />
            </div>
          </div>

          {/* Right Column: Tall Cutout Portrait (Cols 8-12 on Desktop) */}
          <div className="hidden lg:flex lg:col-span-5 items-end justify-end relative z-10 -ml-8 xl:-ml-14 pointer-events-none">
            <HeroPortrait className="pointer-events-auto" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
