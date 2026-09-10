/**
 * My Content & Posts Data
 * Extracted from Canva Slide 3: "MY CONTENT"
 * Supports editorial content switching, multi-candidate asset resolution, and deep metadata.
 */

export const contentItems = [
  {
    id: 'fashion',
    number: '01',
    category: 'Fashion & Styling',
    tag: 'FASHION // LEHENGA',
    title: 'Clothings Brands Photoshoot',
    subtitle: 'Traditional Couture & Editorial Lookbooks',
    description:
      'Editorial fashion shoot featuring exquisite traditional attire, modern styling, and dramatic interior staging. Bringing confidence, poise, and expressive elegance to every frame.',
    aspectRatio: '4/5',
    image: '/images/content/p_lehenga.jpeg',
    imageCandidates: [
      '/images/content/p_lehenga.jpeg',
      '/p_lehenga.jpeg',
      '/images/content/fashion.jpg',
      '/images/content/lehenga.jpeg',
      '/images/content/content-fashion-lehenga.jpg',
    ],
    metadata: [
      { label: 'Category', value: 'Clothing Brands' },
      { label: 'Styling', value: 'Embroidered Lehenga' },
      { label: 'Mood', value: 'Refined Elegance' },
      { label: 'Palette', value: 'Champagne & Gold' },
    ],
    alt: 'Pratiksha Maidpawar in embroidered champagne lehenga seated on velvet sofa',
  },
  {
    id: 'creative',
    number: '02',
    category: 'Creative & Stage',
    tag: 'CREATIVE // STAGE',
    title: 'Other Creative Photoshoots',
    subtitle: 'Standup Comedy, Stage Persona & Energy',
    description:
      'Spontaneous performance photography capturing the raw energy of live stage comedy, expressive storytelling, and genuine laughter. Where humor meets unapologetic personal style.',
    aspectRatio: '4/5',
    image: '/images/content/p_wwhite.jpeg',
    imageCandidates: [
      '/images/content/p_wwhite.jpeg',
      '/images/content/p_wwhite.jpg',
      '/images/content/p_wwhite.png',
      '/images/content/p_mic.jpeg',
      '/images/content/creative.jpg',
    ],
    metadata: [
      { label: 'Category', value: 'Stage & Performance' },
      { label: 'Vibe', value: 'Standup & Comedy' },
      { label: 'Energy', value: 'Spontaneous & Electric' },
      { label: 'Signature', value: 'Live Mic & Bandana Wrap' },
    ],
    alt: 'Pratiksha Maidpawar smiling on stage holding microphone during performance',
  },
];

export const contentData = {
  sectionTitle: 'MY CONTENT',
  subtitle: 'POSTS',
  items: contentItems,
  pillars: [
    {
      id: 'clothing-brands',
      number: '01',
      title: 'Clothings brands photoshoot',
      category: 'Fashion & Modelling',
      description:
        'High-energy editorial fashion shoots, traditional wear styling, and modern lookbooks designed for fashion and apparel brands.',
      relatedItemId: 'fashion',
    },
    {
      id: 'creative-photoshoots',
      number: '02',
      title: 'Other creative photoshoots',
      category: 'Creative Expression',
      description:
        'Conceptual portraits, stage comedy aesthetics, behind-the-scenes moments, and lifestyle storytelling that connect with real people.',
      relatedItemId: 'creative',
    },
  ],
  categories: [
    'Street Interviews',
    'Standup Performer',
    'Comedy Sketches',
    'Fashion & Modelling',
    'Dance & Trends',
  ],
};

export default contentData;

