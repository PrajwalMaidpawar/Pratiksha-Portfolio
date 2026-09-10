/**
 * My Content Section (Phase 3)
 * Target Section ID: #content
 * Reference: Canva Slide 3 (MY CONTENT, POSTS category, Photoshoot Gallery)
 * Layout: Asymmetric editorial composition with interactive content pillar synchronization,
 * 4:5 photoshoot framing, curtain reveal animation, and desktop spring parallax.
 */

import { useState } from 'react';
import Container from '../components/Container';
import Section from '../components/Section';
import ContentHeading from '../components/content/ContentHeading';
import ContentGallery from '../components/content/ContentGallery';
import contentData from '../data/content';

export default function MyContent() {
  const [activeItemId, setActiveItemId] = useState('fashion');

  const handleSelectPillar = (relatedItemId) => {
    if (relatedItemId) {
      setActiveItemId(relatedItemId);
    }
  };

  const handleSelectIndex = (index) => {
    const item = contentData.items[index];
    if (item) {
      setActiveItemId(item.id);
    }
  };

  return (
    <Section id="content" className="relative overflow-hidden py-16 lg:py-24" hasDivider={true}>
      <Container>
        {/* Asymmetric Split Layout: Left Content Pillars (Cols 1-5) / Right Editorial Gallery (Cols 6-12) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: MY CONTENT heading + POSTS category pillars */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <ContentHeading
              pillars={contentData.pillars}
              activeItemId={activeItemId}
              onSelectPillar={handleSelectPillar}
            />
          </div>

          {/* Right Column: 4:5 Editorial Photoshoot Frame with Curtain Reveal & Parallax */}
          <div className="lg:col-span-7">
            <ContentGallery
              items={contentData.items}
              activeItemId={activeItemId}
              onSelectIndex={handleSelectIndex}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
