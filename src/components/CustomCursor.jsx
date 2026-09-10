/**
 * CustomCursor Component (Foundation)
 * Subtle, non-intrusive cursor indicator for desktop devices.
 * Completely disabled on touch devices (@media (pointer: coarse)) and when reduced motion is preferred.
 */

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

export default function CustomCursor({ enabled = true }) {
  const shouldReduceMotion = useReducedMotion();
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Only enable on precise pointer devices (not mobile touch screens)
    if (typeof window === 'undefined') return;
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    setIsSupported(hasFinePointer && !shouldReduceMotion && enabled);

    if (!hasFinePointer || shouldReduceMotion || !enabled) return;

    const onMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target;
      const isInteractive = Boolean(
        target?.closest?.('a, button, input, textarea, [role="button"], [data-cursor="pointer"]')
      );
      setIsPointer(isInteractive);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [shouldReduceMotion, enabled]);

  if (!isSupported || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#C38A68]/60 bg-[#C38A68]/10 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-100 ease-out"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: isPointer ? 1.6 : 1,
          borderColor: isPointer ? '#D59B79' : 'rgba(195, 138, 104, 0.6)',
          backgroundColor: isPointer ? 'rgba(195, 138, 104, 0.2)' : 'rgba(195, 138, 104, 0.08)',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 280, mass: 0.15 }}
      />
      <div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#C38A68] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0)`,
        }}
      />
    </div>
  );
}
