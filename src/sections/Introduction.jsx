/**
 * Introduction Section (Phase 3)
 * Target Section ID: #about
 * Reference: Canva Slide 2 (Introduction Title, Instagram Handle, Bio Paragraphs)
 * Layout: Asymmetric 40/60 editorial magazine spread with progressive stagger reveal
 * and transition bridge to My Content.
 */

import Container from '../components/Container';
import Section from '../components/Section';
import IntroductionHeading from '../components/introduction/IntroductionHeading';
import IntroductionCopy from '../components/introduction/IntroductionCopy';

export default function Introduction() {
  return (
    <Section id="about" className="relative overflow-hidden py-16 lg:py-24">
      <Container>
        {/* Asymmetric Magazine Spread: 40% Left (Heading + Signature) / 60% Right (Story + Credo) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column (Columns 1–5 on desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <IntroductionHeading />
          </div>

          {/* Right Column (Columns 6–12 on desktop) */}
          <div className="lg:col-span-7">
            <IntroductionCopy />
          </div>
        </div>
      </Container>
    </Section>
  );
}
