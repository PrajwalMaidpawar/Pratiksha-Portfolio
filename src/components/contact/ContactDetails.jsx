/**
 * ContactDetails Component (Phase 7)
 * Editorial contact block showcasing verified communication channels,
 * creator availability, and quick direct touchpoints.
 */

import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Mail, Instagram, Phone, ArrowUpRight, Copy, Check, Sparkles, MapPin, Clock } from 'lucide-react';
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
      className="space-y-6 lg:sticky lg:top-28"
    >
      {/* Availability Status Badge */}
      <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#18171E] border border-[#2C2A35]">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C38A68] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C38A68]" />
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#E6E2DE] font-semibold">
          OPEN FOR COLLABORATIONS
        </span>
      </div>

      {/* Editorial Overview Card */}
      <div className="rounded-3xl bg-[#18171E] border border-[#2C2A35] p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-widest text-[#C38A68] font-bold block">
            DIRECT CHANNELS
          </span>
          <h3 className="font-display text-3xl sm:text-4xl text-[#E6E2DE] tracking-wide uppercase leading-tight m-0">
            CONNECT DIRECTLY
          </h3>
          <p className="font-body text-xs sm:text-sm text-[#8E8A85] leading-relaxed">
            For brand campaigns, live street activations, styling showcases, and event bookings across India and beyond.
          </p>
        </div>

        {/* Primary Contact Channels */}
        <div className="space-y-3 pt-2">
          {/* Email Channel */}
          <div className="group rounded-2xl bg-[#151419] border border-[#2C2A35] hover:border-[#C38A68] transition-all duration-300 p-4">
            <div className="flex items-center justify-between gap-3">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3.5 flex-1 min-w-0"
              >
                <div className="w-10 h-10 rounded-xl bg-[#1C1B22] border border-[#2C2A35] flex items-center justify-center text-[#C38A68] group-hover:bg-[#C38A68] group-hover:text-[#151419] transition-all duration-300 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="font-mono text-[10px] text-[#8E8A85] uppercase tracking-wider">
                    OFFICIAL EMAIL
                  </div>
                  <div className="font-body text-sm font-semibold text-[#E6E2DE] group-hover:text-[#C38A68] truncate transition-colors">
                    {siteConfig.email}
                  </div>
                </div>
              </a>

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
            {copied && (
              <div className="pt-2 text-[10px] font-mono text-[#C38A68] flex items-center gap-1.5">
                <Check className="w-3 h-3" />
                <span>Copied to clipboard!</span>
              </div>
            )}
          </div>

          {/* Instagram Channel */}
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl bg-[#151419] border border-[#2C2A35] hover:border-[#C38A68] transition-all duration-300 p-4 flex items-center justify-between gap-3 block"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#1C1B22] border border-[#2C2A35] flex items-center justify-center text-[#C38A68] group-hover:bg-[#C38A68] group-hover:text-[#151419] transition-all duration-300 shrink-0">
                <Instagram className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="font-mono text-[10px] text-[#8E8A85] uppercase tracking-wider">
                  INSTAGRAM
                </div>
                <div className="font-body text-sm font-semibold text-[#E6E2DE] group-hover:text-[#C38A68] truncate transition-colors">
                  {siteConfig.handle}
                </div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#8E8A85] group-hover:text-[#C38A68] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0" />
          </a>

          {/* Phone Channel */}
          <a
            href={`tel:${siteConfig.phone}`}
            className="group rounded-2xl bg-[#151419] border border-[#2C2A35] hover:border-[#C38A68] transition-all duration-300 p-4 flex items-center justify-between gap-3 block"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#1C1B22] border border-[#2C2A35] flex items-center justify-center text-[#C38A68] group-hover:bg-[#C38A68] group-hover:text-[#151419] transition-all duration-300 shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="font-mono text-[10px] text-[#8E8A85] uppercase tracking-wider">
                  DIRECT CALL / WHATSAPP
                </div>
                <div className="font-body text-sm font-semibold text-[#E6E2DE] group-hover:text-[#C38A68] truncate transition-colors">
                  {siteConfig.phoneFormatted}
                </div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#8E8A85] group-hover:text-[#C38A68] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0" />
          </a>
        </div>

        {/* Location & Turnaround Indicators */}
        <div className="pt-4 border-t border-[#2C2A35] grid grid-cols-2 gap-3 text-xs font-mono text-[#8E8A85]">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-[#C38A68]">
              <MapPin className="w-3.5 h-3.5" />
              <span className="font-bold">LOCATION</span>
            </div>
            <p className="text-[#E6E2DE] text-[11px]">Pune &amp; Mumbai, India</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-[#C38A68]">
              <Clock className="w-3.5 h-3.5" />
              <span className="font-bold">RESPONSE</span>
            </div>
            <p className="text-[#E6E2DE] text-[11px]">Within 24–48 Hours</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
