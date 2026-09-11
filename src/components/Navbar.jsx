/**
 * Navbar Component (Phase 1 Global Navigation Foundation)
 * Semantic navigation with desktop anchor links and responsive mobile menu.
 */

import { useState, useEffect } from 'react';
import { Menu, X, Instagram } from 'lucide-react';
import navigationItems from '../data/navigation';
import siteConfig from '../data/siteConfig';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Robust viewport intersection check for current active section
      const sections = navigationItems.map((item) => item.id);
      let currentActive = 'home';

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Active if top is within upper half of viewport and bottom hasn't passed
          if (rect.top <= 240 && rect.bottom >= 120) {
            currentActive = sectionId;
          }
        }
      }
      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock background scroll & handle ESC key when mobile menu is open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#151419]/90 backdrop-blur-md border-b border-[#2C2A35]/80 py-3 shadow-lg shadow-black/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#home"
          className="group flex flex-col focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C38A68]"
        >
          <span className="font-display text-2xl sm:text-3xl tracking-wider text-[#E6E2DE] group-hover:text-[#C38A68] transition-colors leading-none">
            PRATIKSHA
          </span>
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#8E8A85] font-body mt-0.5">
            CREATOR &bull; MODEL &bull; COMEDY
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          aria-label="Main Navigation"
          className="hidden lg:flex items-center gap-7 xl:gap-8"
        >
          {navigationItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`relative py-1 font-body text-xs tracking-[0.16em] uppercase transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C38A68] ${
                  isActive
                    ? 'text-[#C38A68] font-semibold'
                    : 'text-[#8E8A85] hover:text-[#E6E2DE]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#C38A68] rounded-full"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Action: Instagram Handle Badge */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#2C2A35] bg-[#1C1B22]/60 hover:border-[#C38A68] hover:bg-[#C38A68]/10 text-xs tracking-wider font-body text-[#E6E2DE] hover:text-[#C38A68] transition-all duration-200"
            aria-label="Instagram Profile @see.awkwards"
          >
            <Instagram className="w-3.5 h-3.5 text-[#C38A68]" />
            <span>{siteConfig.handle}</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
          className="lg:hidden p-2 rounded-lg text-[#E6E2DE] hover:text-[#C38A68] hover:bg-[#1C1B22] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C38A68]"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay Drawer */}
      {isOpen && (
        <div
          id="mobile-nav-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          className="lg:hidden fixed inset-x-0 top-[60px] h-[calc(100dvh-60px)] bg-[#151419]/98 backdrop-blur-xl border-t border-[#2C2A35] p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] flex flex-col justify-between overflow-y-auto z-50"
        >
          <div className="flex flex-col space-y-2 pt-2">
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#8E8A85] mb-2">
              Navigation
            </span>
            {navigationItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  id={`mobile-nav-${item.id}`}
                  key={item.id}
                  href={item.href}
                  onClick={closeMenu}
                  className={`min-h-[48px] flex items-center text-2xl font-display uppercase tracking-wider px-2 border-b border-[#2C2A35]/50 transition-colors ${
                    isActive ? 'text-[#C38A68] bg-[#1C1B22]/50' : 'text-[#E6E2DE] hover:text-[#C38A68]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          <div className="pt-8 pb-4 border-t border-[#2C2A35] flex flex-col gap-4">
            <a
              id="mobile-nav-instagram"
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[48px] flex items-center justify-center gap-2 py-3 rounded-xl bg-[#1C1B22] border border-[#2C2A35] text-sm text-[#E6E2DE] font-medium"
            >
              <Instagram className="w-4 h-4 text-[#C38A68]" />
              <span>Follow {siteConfig.handle}</span>
            </a>
            <div className="text-center text-xs text-[#8E8A85]">
              Pratiksha Maidpawar &bull; Official Creator Portfolio
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
