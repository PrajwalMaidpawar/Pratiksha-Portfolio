/**
 * Design Tokens — Pratiksha Maidpawar Portfolio
 * Centralized design variables for typography, colors, spacing, borders, and transitions.
 * Derived directly from Canva portfolio slide analysis.
 */

export const tokens = {
  colors: {
    // Primary Canvas / Backgrounds
    background: '#151419',         // Deep charcoal / near-black Canva canvas
    surfaceSubtle: '#1C1B22',      // Slightly lighter card/surface tone
    surfaceCard: '#201F28',        // Distinct component card background
    border: '#2C2A35',             // Subtle structural border
    borderLight: '#3A3746',        // Highlighted card / hover border

    // Typography
    foreground: '#E6E2DE',         // Warm off-white / silver sand
    foregroundMuted: '#8E8A85',    // Muted secondary text
    foregroundDim: '#605D59',      // Dim tertiary / meta text

    // Accents
    accent: '#C38A68',             // Warm copper / terracotta (dominant title & accent color)
    accentLight: '#D59B79',        // Hover / lighter terracotta
    accentDark: '#9F6C4E',         // Deep burnished copper
    accentGlow: 'rgba(195, 138, 104, 0.15)',

    // Pure accents for high contrast (e.g., Instagram card)
    pureWhite: '#FFFFFF',
    pureBlack: '#000000',
  },

  typography: {
    fonts: {
      display: "'Bebas Neue', sans-serif",
      body: "'Plus Jakarta Sans', sans-serif",
    },
    // Scale hierarchy (Mathematical scale ~1.25 - 1.33 for high-impact editorial)
    scale: {
      displayXl: 'clamp(3.5rem, 9vw, 9.5rem)',     // 56px to 152px
      displayL: 'clamp(2.75rem, 6.5vw, 6.5rem)',   // 44px to 104px
      displayM: 'clamp(2rem, 4.5vw, 4.25rem)',     // 32px to 68px
      heading: 'clamp(1.25rem, 2vw, 1.875rem)',    // 20px to 30px
      subheading: 'clamp(1.125rem, 1.5vw, 1.375rem)', // 18px to 22px
      bodyLarge: '1.125rem',                       // 18px
      body: '1rem',                                // 16px (WCAG baseline)
      small: '0.875rem',                           // 14px
      caption: '0.75rem',                          // 12px
    },
    lineHeights: {
      none: '0.9',                                 // Ultra-condensed display headings
      tight: '1.1',
      snug: '1.3',
      normal: '1.6',                               // Baseline body readability
      relaxed: '1.75',
    },
    letterSpacing: {
      tightest: '-0.02em',
      condensed: '0.01em',
      wide: '0.05em',
      widest: '0.18em',                            // Eyebrows & micro-labels
    },
  },

  spacing: {
    containerMax: '1320px',
    sectionVertical: 'clamp(4.5rem, 8vw, 8rem)',  // Responsive section vertical rhythm
    gutter: 'clamp(1rem, 4vw, 2.5rem)',           // Container horizontal padding
    cardPadding: 'clamp(1.25rem, 2.5vw, 2rem)',
  },

  radii: {
    none: '0px',
    sm: '6px',
    md: '10px',
    card: '18px',                                  // Standard Canva reel/brand card radius
    cardLg: '24px',
    pill: '9999px',
  },

  transitions: {
    durationFast: 0.2,
    durationNormal: 0.35,
    durationSlow: 0.65,
    durationEditorial: 0.85,
    easeEditorial: [0.16, 1, 0.3, 1],             // Fluid editorial deceleration
    easeInOutEditorial: [0.65, 0, 0.35, 1],
  },
};

export default tokens;
