/**
 * ScrollReveal Component
 * Reusable Framer Motion viewport reveal wrapper with reduced motion fallback.
 */

import { motion, useReducedMotion } from 'motion/react';
import {
  fadeUp,
  fadeIn,
  fadeLeft,
  fadeRight,
  scaleIn,
  reducedMotionVariants,
} from '../../styles/animations';

export default function ScrollReveal({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration,
  threshold = 0.15,
  once = true,
  className = '',
  custom = {},
  ...props
}) {
  const shouldReduceMotion = useReducedMotion();

  const variantMap = {
    fadeUp,
    fadeIn,
    fadeLeft,
    fadeRight,
    scaleIn,
  };

  const selectedVariant = shouldReduceMotion
    ? reducedMotionVariants
    : variantMap[variant] || fadeUp;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={selectedVariant}
      custom={{ delay, duration, ...custom }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
