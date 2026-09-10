/**
 * MagneticButton Component
 * Subtle tactile button for editorial links and actions with graceful mobile fallback.
 */

import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

export default function MagneticButton({
  children,
  onClick,
  href,
  className = '',
  variant = 'primary', // 'primary' | 'outline' | 'ghost'
  as = 'button',
  ...props
}) {
  const shouldReduceMotion = useReducedMotion();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (shouldReduceMotion) return;
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.18, y: middleY * 0.18 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles =
    'relative inline-flex items-center justify-center font-medium transition-colors duration-200 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C38A68] focus-visible:ring-offset-2 focus-visible:ring-offset-[#151419]';

  const variants = {
    primary:
      'bg-[#C38A68] text-[#151419] font-semibold px-6 py-3 text-sm tracking-wider uppercase hover:bg-[#D59B79]',
    outline:
      'border border-[#2C2A35] text-[#E6E2DE] px-6 py-3 text-sm tracking-wider uppercase hover:border-[#C38A68] hover:text-[#C38A68] bg-[#1C1B22]/50',
    ghost:
      'text-[#8E8A85] hover:text-[#E6E2DE] px-4 py-2 text-sm tracking-wider uppercase',
  };

  const combinedClasses = `${baseStyles} ${variants[variant] || variants.primary} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        className={combinedClasses}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={position}
        transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.1 }}
        {...props}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={combinedClasses}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={position}
      transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.1 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
