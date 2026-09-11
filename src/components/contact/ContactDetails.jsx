/**
 * ContactDetails Component (Phase 7 Refinement)
 * Expanded editorial contact showcase featuring verified communication channels,
 * creator availability, and direct touchpoints.
 */

import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Mail, Instagram, ArrowUpRight, Copy, Check, Sparkles, MapPin, Clock } from 'lucide-react';
import siteConfig from '../../data/siteConfig';
import { editorialEase } from '../../styles/animations';

export default function ContactDetails() {
  const shouldReduceMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, ease: editorialEase }}
      className="space-y-6 w-full"
    >
      {/* Availability Status Badge */}
      <div className="flex justify-center sm:justify-start">
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#18171E] border border-[#2C2A35]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C38A68] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C38A68]" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#E6E2DE] font-semibold">
            OPEN FOR COLLABORATIONS
          </span>
        </div>
      </div>

      {/* Editorial Overview Card */}
      <div className="rounded-3xl bg-[#18171E] border border-[#2C2A35] p-6 sm:p-10 space-y-8 shadow-2xl">
        <div className="space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-[#C38A68] font-bold block">
            DIRECT CHANNELS
          </span>
          <h3 className="font-display text-3xl sm:text-5xl text-[#E6E2DE] tracking-wide uppercase leading-tight m-0">
            CONNECT DIRECTLY
          </h3>
          <p className="font-body text-sm sm:text-base text-[#8E8A85] leading-relaxed max-w-2xl">
            For brand campaigns, live street activations, styling showcases, comedy appearances, and event bookings across India and beyond.
          </p>
        </div>

        {/* Primary Contact Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Email Channel */}
          <div className="group rounded-2xl bg-[#151419] border border-[#2C2A35] hover:border-[#C38A68] transition-all duration-300 p-5 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#1C1B22] border border-[#2C2A35] flex items-center justify-center text-[#C38A68] group-hover:bg-[#C38A68] group-hover:text-[#151419] transition-all duration-300 shrink-0">
                <Mail className="w-5 h-5" />
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg text-[#8E8A85] hover:text-[#C38A68] hover:bg-[#1C1B22] transition-colors"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-[#C38A68]" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="p-2 rounded-lg text-[#8E8A85] hover:text-[#C38A68] hover:bg-[#1C1B22] transition-colors"
                  aria-label="Open mail client"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="space-y-1">
              <div className="font-mono text-[10px] text-[#8E8A85] uppercase tracking-wider">
                OFFICIAL EMAIL
              </div>
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-body text-base sm:text-lg font-semibold text-[#E6E2DE] group-hover:text-[#C38A68] block truncate transition-colors"
              >
                {siteConfig.email}
              </a>
            </div>

            {copied && (
              <div className="pt-1 text-[11px] font-mono text-[#C38A68] flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                <span>Copied to clipboard!</span>
              </div>
            )}
          </div>

          {/* Instagram Channel */}
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl bg-[#151419] border border-[#2C2A35] hover:border-[#C38A68] transition-all duration-300 p-5 flex flex-col justify-between space-y-4 block"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#1C1B22] border border-[#2C2A35] flex items-center justify-center text-[#C38A68] group-hover:bg-[#C38A68] group-hover:text-[#151419] transition-all duration-300 shrink-0">
                <Instagram className="w-5 h-5" />
              </div>

              <div className="p-2 rounded-lg text-[#8E8A85] group-hover:text-[#C38A68] transition-colors">
                <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="font-mono text-[10px] text-[#8E8A85] uppercase tracking-wider">
                INSTAGRAM PROFILE
              </div>
              <div className="font-body text-base sm:text-lg font-semibold text-[#E6E2DE] group-hover:text-[#C38A68] truncate transition-colors">
                {siteConfig.handle}
              </div>
            </div>
          </a>
        </div>

        {/* Location & Turnaround Indicators */}
        <div className="pt-6 border-t border-[#2C2A35] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-[#8E8A85]">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#151419] border border-[#2C2A35]">
            <div className="w-8 h-8 rounded-lg bg-[#1C1B22] flex items-center justify-center text-[#C38A68] shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-[#C38A68] block">LOCATION</span>
              <p className="text-[#E6E2DE] text-xs m-0">Pune &amp; Mumbai, India</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#151419] border border-[#2C2A35]">
            <div className="w-8 h-8 rounded-lg bg-[#1C1B22] flex items-center justify-center text-[#C38A68] shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-[#C38A68] block">RESPONSE TIME</span>
              <p className="text-[#E6E2DE] text-xs m-0">Within 24–48 Hours</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
