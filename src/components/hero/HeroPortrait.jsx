/**
 * HeroPortrait Component
 * High-impact tall floating cutout portrait of Pratiksha Maidpawar.
 */

import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion, useSpring } from 'motion/react';
import { Mic, Sparkles } from 'lucide-react';
import { editorialEase } from '../../styles/animations';

const CANDIDATE_SOURCES = [
  '/images/hero/hero-portrait-transparent.png',
  '/images/hero/P.png',
  '/P.png',
  '/hero-portrait-transparent.png',
];

export default function HeroPortrait({ className = '' }) {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef(null);

  // Source resolution state
  const [currentSourceIndex, setCurrentSourceIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Parallax spring values for smooth, organic physics (subtle 8-12px movement)
  const springConfig = { damping: 32, stiffness: 220, mass: 0.5 };
  const parallaxX = useSpring(0, springConfig);
  const parallaxY = useSpring(0, springConfig);

  // Mouse parallax handler (desktop only)
  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMouseMove = (e) => {
      if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

      const { innerWidth, innerHeight } = window;
      const normalizedX = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const normalizedY = (e.clientY - innerHeight / 2) / (innerHeight / 2);

      parallaxX.set(normalizedX * -10);
      parallaxY.set(normalizedY * -7);
    };

    const handleMouseLeave = () => {
      parallaxX.set(0);
      parallaxY.set(0);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [shouldReduceMotion, parallaxX, parallaxY]);

  // Handle image error by cycling through candidate sources
  const handleImageError = () => {
    if (currentSourceIndex < CANDIDATE_SOURCES.length - 1) {
      setCurrentSourceIndex((prev) => prev + 1);
    } else {
      setImageError(true);
    }
  };

  const activeSrc = CANDIDATE_SOURCES[currentSourceIndex];

  return (
    <div
      ref={containerRef}
      className={`relative w-full flex justify-center lg:justify-end items-end select-none pointer-events-auto bg-transparent ${className}`}
    >
      {/* Background theatrical spotlight */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none"
      >
        <div className="w-[90%] h-[90%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(195,138,104,0.11)_0%,rgba(195,138,104,0.03)_45%,transparent_72%)] blur-3xl transform translate-y-6" />
      </div>

      {/* Main animated portrait container with parallax */}
      <motion.div
        style={
          shouldReduceMotion
            ? {}
            : {
                x: parallaxX,
                y: parallaxY,
              }
        }
        initial={{
          opacity: 0,
          x: shouldReduceMotion ? 0 : 44,
          scale: shouldReduceMotion ? 1 : 1.01,
        }}
        animate={{
          opacity: 1,
          x: 0,
          scale: 1,
        }}
        transition={{
          duration: shouldReduceMotion ? 0.35 : 1.05,
          delay: shouldReduceMotion ? 0.05 : 0.2,
          ease: editorialEase,
        }}
        className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[470px] xl:max-w-[510px] bg-transparent"
      >
        {/* Tall portrait container */}
        <div className="relative aspect-[377/1100] sm:aspect-[377/1180] lg:aspect-[377/1280] w-full max-h-[84vh] flex items-end justify-center overflow-visible bg-transparent">
          {!imageError ? (
            <div className="relative w-full h-full flex items-end justify-center bg-transparent">
              <img
                src={activeSrc}
                alt="Pratiksha Maidpawar holding microphone on stage"
                referrerPolicy="no-referrer"
                loading="eager"
                decoding="async"
                onLoad={() => {
                  setImageLoaded(true);
                  setImageError(false);
                }}
                onError={handleImageError}
                className={`w-full h-full object-contain object-bottom transition-opacity duration-700 ease-out bg-transparent ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  maskImage:
                    'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 94%, rgba(0,0,0,0.5) 98%, rgba(0,0,0,0) 100%)',
                  WebkitMaskImage:
                    'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 94%, rgba(0,0,0,0.5) 98%, rgba(0,0,0,0) 100%)',
                }}
              />

              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-8 h-8 rounded-full border-2 border-[#C38A68]/30 border-t-[#C38A68] animate-spin" />
                </div>
              )}
            </div>
          ) : (
            <div className="relative w-full h-full flex flex-col items-center justify-end pb-8 text-center bg-transparent pointer-events-auto">
              <div className="flex-1 flex flex-col items-center justify-center relative py-6">
                <div className="relative mb-5">
                  <div className="w-24 h-24 rounded-full bg-[#1C1B22]/90 border border-[#C38A68]/50 flex items-center justify-center text-[#C38A68] shadow-[0_0_50px_rgba(195,138,104,0.25)]">
                    <Mic className="w-10 h-10 text-[#C38A68]" strokeWidth={1.75} />
                  </div>
                </div>

                <div className="font-display text-2xl sm:text-3xl text-[#E6E2DE] uppercase tracking-wider mb-1">
                  PRATIKSHA MAIDPAWAR
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C1B22] border border-[#2C2A35] text-[#C38A68] font-mono text-[11px] mb-3">
                  <Sparkles className="w-3 h-3" />
                  <span>EDITORIAL &amp; STAGE SPOTLIGHT</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
