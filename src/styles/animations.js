/**
 * Animation Utilities & Framer Motion Variants
 * Built with cinematic, editorial, smooth easing (no cartoonish or erratic bounce).
 * Full support for prefers-reduced-motion.
 */

export const editorialEase = [0.16, 1, 0.3, 1];
export const editorialSnappy = [0.25, 1, 0.5, 1];

// Base duration configs
export const transitionConfig = {
  fast: { duration: 0.25, ease: editorialEase },
  normal: { duration: 0.55, ease: editorialEase },
  slow: { duration: 0.85, ease: editorialEase },
  editorial: { duration: 1.0, ease: editorialEase },
};

// Fade Up Variant
export const fadeUp = {
  hidden: {
    opacity: 0,
    y: 32,
  },
  visible: (custom = {}) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: custom.duration || 0.65,
      delay: custom.delay || 0,
      ease: editorialEase,
    },
  }),
};

// Fade In Variant
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (custom = {}) => ({
    opacity: 1,
    transition: {
      duration: custom.duration || 0.55,
      delay: custom.delay || 0,
      ease: editorialEase,
    },
  }),
};

// Fade Left Variant
export const fadeLeft = {
  hidden: { opacity: 0, x: -36 },
  visible: (custom = {}) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: custom.duration || 0.65,
      delay: custom.delay || 0,
      ease: editorialEase,
    },
  }),
};

// Fade Right Variant
export const fadeRight = {
  hidden: { opacity: 0, x: 36 },
  visible: (custom = {}) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: custom.duration || 0.65,
      delay: custom.delay || 0,
      ease: editorialEase,
    },
  }),
};

// Scale In Variant
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (custom = {}) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: custom.duration || 0.6,
      delay: custom.delay || 0,
      ease: editorialEase,
    },
  }),
};

// Image Curtain / Mask Reveal Variant
export const imageReveal = {
  hidden: {
    clipPath: 'inset(100% 0% 0% 0%)',
    scale: 1.06,
  },
  visible: (custom = {}) => ({
    clipPath: 'inset(0% 0% 0% 0%)',
    scale: 1,
    transition: {
      duration: custom.duration || 0.9,
      delay: custom.delay || 0.1,
      ease: editorialEase,
    },
  }),
};

// Stagger Container
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: (custom = {}) => ({
    opacity: 1,
    transition: {
      staggerChildren: custom.stagger || 0.12,
      delayChildren: custom.delayChildren || 0.05,
    },
  }),
};

// Fallback for reduced motion
export const reducedMotionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
};
