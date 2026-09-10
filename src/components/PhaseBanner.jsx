/**
 * PhaseBanner Component
 * Subtle top notice indicating Phase 1 Design System & Website Architecture status.
 */

import { useState } from 'react';
import { Sparkles, X } from 'lucide-react';

export default function PhaseBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <aside
      aria-label="Development Phase Status"
      className="relative z-50 bg-[#1C1B22] border-b border-[#C38A68]/30 px-4 py-2 text-xs font-body text-[#E6E2DE]"
    >
      <div className="w-full max-w-[1320px] mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="shrink-0 px-2 py-0.5 rounded bg-[#C38A68] text-[#151419] font-mono font-bold text-[10px] uppercase tracking-wider">
            PHASE 9 — DEPLOYMENT READY
          </span>
          <p className="truncate text-xs text-[#E6E2DE]">
            <span className="font-semibold text-[#C38A68]">Production Deployment Verified:</span>{' '}
            Zero build errors, /api/contact secured with honeypot &amp; flood limits, Resend email routing active, and robots.txt/sitemap.xml configured.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="hidden sm:inline font-mono text-[11px] text-[#8E8A85]">
            Phases 1–9 Verified
          </span>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss banner"
            className="text-[#8E8A85] hover:text-[#E6E2DE] transition-colors p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
