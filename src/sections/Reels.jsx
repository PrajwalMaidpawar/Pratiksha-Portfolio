/**
 * Reels Section (Phase 4 Implementation)
 * Target Section ID: #reels
 * Reference: Canva Slide 4 (REELS, Arrow, 5x 9:16 Video Cards with View Counts)
 * Layout: 5-column horizontal layout on desktop, 3-column on tablet,
 * and touch-snap horizontal carousel on mobile. Interactive lightbox modal with
 * scroll locking and Instagram link.
 */

import { useState } from 'react';
import Container from '../components/Container';
import Section from '../components/Section';
import ReelsHeader from '../components/reels/ReelsHeader';
import ReelGrid from '../components/reels/ReelGrid';
import ReelModal from '../components/reels/ReelModal';
import reelsData from '../data/reels';

export default function Reels() {
  const [selectedReel, setSelectedReel] = useState(null);

  const handleSelectReel = (reel) => {
    setSelectedReel(reel);
  };

  const handleCloseModal = () => {
    setSelectedReel(null);
  };

  return (
    <Section id="reels" className="relative overflow-hidden py-16 lg:py-24" hasDivider={true}>
      <Container>
        <div className="space-y-10 lg:space-y-14">
          {/* Section Header with oversized Bebas Neue REELS & signature arrow motif */}
          <ReelsHeader />

          {/* 5-Reel Showcase (Responsive Grid / Mobile Carousel) */}
          <ReelGrid reels={reelsData} onSelectReel={handleSelectReel} />
        </div>
      </Container>

      {/* Interactive Lightbox / Modal Player */}
      <ReelModal reel={selectedReel} onClose={handleCloseModal} />
    </Section>
  );
}
