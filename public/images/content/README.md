# Content Section Assets Directory

Place photoshoot images here:

1. `p_lehenga.jpeg` (or `fashion.jpg` / `lehenga.jpeg`)
   - Clothing brands photoshoot
   - Recommended: Portrait orientation (~4:5 ratio)
   - Used for: Slide 3 "Clothings brands photoshoot"

2. `p_mic.jpeg` (or `creative.jpg` / `p_creative.jpeg`)
   - Creative & standup performance photoshoot
   - Recommended: Portrait orientation (~4:5 ratio)
   - Used for: Slide 3 "Other creative photoshoots"

The `ContentGallery` component automatically checks for these files at `/images/content/p_lehenga.jpeg` and `/images/content/p_mic.jpeg` with graceful candidate fallbacks and an in-browser local file loader.
