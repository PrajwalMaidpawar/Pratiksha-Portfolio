/**
 * AnimatedHeading Component
 * Implements the tall condensed editorial typography inspired by the Canva slides.
 */

import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { fadeUp, reducedMotionVariants } from '../../styles/animations';

export default function AnimatedHeading({
  children,
  as: Component = 'h2',
  size = 'displayL', // 'displayXl' | 'displayL' | 'displayM' | 'heading'
  color = 'cream',   // 'cream' | 'copper' | 'muted'
  withArrow = false,
  className = '',
  delay = 0,
  animate = true,
  ...props
}) {
  const shouldReduceMotion = useReducedMotion();

  const sizeClasses = {
    displayXl: 'text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-[0.88]',
    displayL: 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.9]',
    displayM: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[0.92]',
    heading: 'text-2xl sm:text-3xl md:text-4xl tracking-normal leading-tight',
  };

  const colorClasses = {
    cream: 'text-[#E6E2DE]',
    copper: 'text-[#C38A68]',
    muted: 'text-[#8E8A85]',
  };

  const headingClasses = `font-display uppercase select-none ${sizeClasses[size] || sizeClasses.displayL} ${colorClasses[color] || colorClasses.cream} ${className}`;

  if (!animate) {
    return (
      <div className="flex items-center justify-between gap-4">
        <Component className={headingClasses} {...props}>
          {children}
        </Component>
        {withArrow && (
          <div aria-hidden="true" className="hidden sm:flex items-center text-[#C38A68] opacity-80">
            <div className="w-12 md:w-20 h-px bg-[#C38A68]/60 mr-1" />
            <ArrowRight className="w-5 h-5 text-[#C38A68]" />
          </div>
        )}
      </div>
    );
  }

  const MotionComponent = motion[Component] || motion.h2;

  return (
    <div className="flex items-center justify-between gap-4">
      <MotionComponent
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={shouldReduceMotion ? reducedMotionVariants : fadeUp}
        custom={{ delay }}
        className={headingClasses}
        {...props}
      >
        {children}
      </MotionComponent>
      {withArrow && (
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 0.8, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: delay + 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="hidden sm:flex items-center text-[#C38A68]"
        >
          <div className="w-12 md:w-20 h-px bg-[#C38A68]/60 mr-1" />
          <ArrowRight className="w-5 h-5 text-[#C38A68]" />
        </motion.div>
      )}
    </div>
  );
}
