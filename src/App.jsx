/**
 * App Component
 * Root component for Pratiksha Maidpawar Portfolio (Phase 1)
 * Adheres strictly to Phase 1 constraints: Pure React/JSX, modular architecture,
 * complete semantic section layout, zero database/auth overhead.
 */

import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';

// Section placeholders
import Hero from './sections/Hero';
import Introduction from './sections/Introduction';
import MyContent from './sections/MyContent';
import Reels from './sections/Reels';
import BrandWorks from './sections/BrandWorks';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#151419] text-[#E6E2DE] selection:bg-[#C38A68] selection:text-[#151419] font-body relative overflow-x-hidden">
      {/* Accessible skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#C38A68] focus:text-[#151419] focus:font-semibold focus:rounded-md focus:shadow-xl"
      >
        Skip to main content
      </a>

      {/* Subtle Desktop Custom Cursor */}
      <CustomCursor enabled={true} />

      {/* Global Navigation Header */}
      <Navbar />

      {/* Main Content: Single-page scrolling structure */}
      <main id="main-content" className="relative z-10">
        <Hero />
        <Introduction />
        <MyContent />
        <Reels />
        <BrandWorks />
        <Contact />
      </main>

      {/* Global Semantic Footer */}
      <Footer />
    </div>
  );
}
