/**
 * Reels Showcase Data
 * Extracted from Canva Slide 4: "REELS"
 * Features 5 viral short-form reels with views, categories, and flexible asset candidate paths.
 */

export const reelsData = [
  {
    id: 'street-interview',
    title: "Letter 'R'",
    category: 'Street Interview',
    views: '53.4M',
    viewsRaw: 53400000,
    badge: 'VIRAL',
    featured: true,
    thumbnail: '/images/reels/p_r.jpeg',
    thumbnailCandidates: [
      '/images/reels/p_r.jpeg',
      '/images/reels/p_r.jpg',
      '/images/reels/p_r.png',
      '/images/reels/street-interview.jpg',
      '/images/reels/street-interview.jpeg',
      '/images/reels/reel-street-interview.jpg',
    ],
    videoUrl: null,
    aspectRatio: '9:16',
    description:
      'The viral "Letter R" street interaction that captured over 53.4 million views across Instagram and YouTube shorts. Fast-paced, witty, and spontaneous crowd chemistry.',
    instagramUrl: 'https://www.instagram.com/see.awkwards',
  },
  {
    id: 'my-interview',
    title: 'In personal life ?',
    category: 'My Interview',
    views: '1.7M',
    viewsRaw: 1700000,
    badge: 'HIGHLIGHT',
    featured: false,
    thumbnail: '/images/reels/p_selfinterview.jpeg',
    thumbnailCandidates: [
      '/images/reels/p_selfinterview.jpeg',
      '/images/reels/p_selfinterview.jpg',
      '/images/reels/p_selfinterview.png',
      '/images/reels/my-interview.jpg',
      '/images/reels/my-interview.jpeg',
      '/images/reels/reel-my-interview.jpg',
    ],
    videoUrl: null,
    aspectRatio: '9:16',
    description:
      'Candid personal interview exploring life behind the camera, balancing standup comedy, fashion storytelling, and full-time content creation.',
    instagramUrl: 'https://www.instagram.com/see.awkwards',
  },
  {
    id: 'standup',
    title: 'Standup Comedy Set',
    category: 'Standup',
    views: '115K',
    viewsRaw: 115000,
    badge: 'LIVE STAGE',
    featured: false,
    thumbnail: '/images/reels/standup.jpg',
    thumbnailCandidates: [
      '/images/reels/standup.jpg',
      '/images/reels/standup.jpeg',
      '/images/reels/standup.png',
      '/images/reels/reel-standup.jpg',
      '/standup.jpg',
    ],
    videoUrl: null,
    aspectRatio: '9:16',
    description:
      'Live stage standup set spotlighting relatable observational humor, family dynamics, and punchy self-deprecating comedy.',
    instagramUrl: 'https://www.instagram.com/see.awkwards',
  },
  {
    id: 'comedy',
    title: 'Comedy',
    category: 'Comedy',
    views: '315K',
    viewsRaw: 315000,
    badge: 'SKETCH',
    featured: false,
    thumbnail: '/images/reels/p_standup.jpeg',
    thumbnailCandidates: [
      '/images/reels/p_standup.jpeg',
      '/images/reels/p_standup.jpg',
      '/images/reels/p_standup.png',
      '/images/reels/comedy.jpg',
      '/images/reels/comedy.jpeg',
      '/images/reels/reel-comedy.jpg',
    ],
    videoUrl: null,
    aspectRatio: '9:16',
    description:
      'Signature situational comedy sketch blending deadpan delivery, hilarious everyday awkwardness, and crowd reactions.',
    instagramUrl: 'https://www.instagram.com/see.awkwards',
  },
  {
    id: 'dance',
    title: 'Chatpate songs',
    category: 'Dance',
    views: '10K',
    viewsRaw: 10000,
    badge: 'TREND',
    featured: false,
    thumbnail: '/images/reels/dance.jpg',
    thumbnailCandidates: [
      '/images/reels/dance.jpg',
      '/images/reels/dance.jpeg',
      '/images/reels/dance.png',
      '/images/reels/reel-dance.jpg',
      '/dance.jpg',
    ],
    videoUrl: null,
    aspectRatio: '9:16',
    description:
      'High-vibe dance reel synchronizing Bollywood beats, energetic choreography, and playful expressions.',
    instagramUrl: 'https://www.instagram.com/see.awkwards',
  },
];

export default reelsData;

