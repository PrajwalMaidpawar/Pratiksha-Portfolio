/**
 * ContactFooter Component (Phase 7)
 * Semantic creator portfolio footer.
 * Features:
 * - Brand wordmark & creator summary
 * - Full section anchor navigation: HOME, ABOUT, CONTENT, REELS, BRANDS, COLLABORATE, CONTACT
 * - Direct social & email links
 * - Smooth "↑ BACK TO TOP" interaction respecting prefers-reduced-motion
 * - Dynamic copyright year
 */

import { motion, useReducedMotion } from 'motion/react';
import { ArrowUp, Instagram, Mail } from 'lucide-react';
import navigationItems from '../../data/navigation';
import siteConfig from '../../data/siteConfig';

export default function ContactFooter() {
  const shouldReduceMotion = useReducedMotion();

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: shouldReduceMotion ? 'auto' : 'smooth',
      });
    }
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <footer className="w-full border-t border-[#2C2A35] bg-[#121116] pt-16 pb-12 text-[#E6E2DE]">
      <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-[#2C2A35]/80">
          {/* Brand & Creator Bio (Cols 1–5) */}
          <div className="lg:col-span-5 space-y-4">
            <a
              href="#home"
              onClick={(e) => scrollToSection(e, '#home')}
              className="inline-block font-display text-4xl sm:text-5xl text-[#E6E2DE] hover:text-[#C38A68] transition-colors leading-none tracking-wider m-0"
            >
              PRATIKSHA MAIDPAWAR
            </a>
            <div className="flex items-center gap-2 font-mono text-xs text-[#C38A68] tracking-widest uppercase">
              <span>{siteConfig.handle}</span>
              <span>•</span>
              <span>CONTENT CREATOR &amp; PERFORMER</span>
            </div>
            <p className="text-sm font-body text-[#8E8A85] max-w-md leading-relaxed">
              Turning everyday moments into viral short-form entertainment, candid street interviews, fashion storytelling, and authentic brand collaborations.
            </p>

            {/* Social & Channel Icons */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#18171E] border border-[#2C2A35] hover:border-[#C38A68] hover:bg-[#C38A68] hover:text-[#151419] flex items-center justify-center text-[#E6E2DE] transition-all duration-300"
                aria-label="Instagram Profile"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="w-10 h-10 rounded-full bg-[#18171E] border border-[#2C2A35] hover:border-[#C38A68] hover:bg-[#C38A68] hover:text-[#151419] flex items-center justify-center text-[#E6E2DE] transition-all duration-300"
                aria-label="Official Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Section Navigation (Cols 6–8) */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs uppercase font-mono tracking-widest text-[#C38A68] font-bold block mb-4">
              SECTION INDEX
            </span>
            <nav aria-label="Footer Navigation">
              <ul className="grid grid-cols-2 gap-2 text-xs font-mono tracking-wider uppercase text-[#8E8A85]">
                {navigationItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      onClick={(e) => scrollToSection(e, item.href)}
                      className="hover:text-[#C38A68] transition-colors py-1 inline-block"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Portfolio & Availability Specs (Cols 9–12) */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs uppercase font-mono tracking-widest text-[#C38A68] font-bold block mb-4">
              COLLABORATION STATUS
            </span>
            <div className="p-4 rounded-2xl bg-[#18171E] border border-[#2C2A35] space-y-2 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C38A68] animate-pulse" />
                <span className="text-[#E6E2DE] font-bold">ACCEPTING INQUIRIES</span>
              </div>
              <p className="text-[11px] text-[#8E8A85] leading-relaxed">
                Brand integration, fashion styling, red carpet &amp; event emceeing, and viral street interviews.
              </p>
              <div className="pt-2 border-t border-[#2C2A35] text-[10px] text-[#8E8A85]">
                Base: Pune &amp; Mumbai, India
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#8E8A85]">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span>&copy; {new Date().getFullYear()} PRATIKSHA MAIDPAWAR. ALL RIGHTS RESERVED.</span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-4 py-2 rounded-full border border-[#2C2A35] hover:border-[#C38A68] text-[#E6E2DE] hover:text-[#C38A68] transition-all duration-300 cursor-pointer"
          >
            <span className="text-xs tracking-wider uppercase font-semibold">BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 transform group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
