/**
 * DesignSystemViewer Component (Phase 1 Token & System Inspector)
 * Allows live validation of color tokens, typography scales, responsive breakpoints,
 * and Framer Motion animation curves against the Canva slides.
 */

import { useState, useEffect } from 'react';
import { Palette, Type, Sliders, Eye, Sparkles, Check, ChevronDown, ChevronUp } from 'lucide-react';
import tokens from '../styles/tokens';

export default function DesignSystemViewer() {
  const [isOpen, setIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [activeTab, setActiveTab] = useState('colors'); // 'colors' | 'typography' | 'tokens'

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setWindowWidth(window.innerWidth);
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const getBreakpoint = (width) => {
    if (width >= 1536) return '2XL (1536px+)';
    if (width >= 1280) return 'XL (1280px+)';
    if (width >= 1024) return 'LG (1024px+)';
    if (width >= 768) return 'MD (768px+)';
    if (width >= 640) return 'SM (640px+)';
    return 'XS (<640px Mobile)';
  };

  const colorSwatches = [
    {
      name: 'Primary Background',
      token: '--background / #151419',
      hex: tokens.colors.background,
      text: '#E6E2DE',
      desc: 'Canva Dark Charcoal / Near-Black Canvas',
    },
    {
      name: 'Warm Off-White Text',
      token: '--foreground / #E6E2DE',
      hex: tokens.colors.foreground,
      text: '#151419',
      desc: 'Primary Editorial Text & Headers',
    },
    {
      name: 'Warm Copper / Terracotta',
      token: '--accent / #C38A68',
      hex: tokens.colors.accent,
      text: '#151419',
      desc: 'Title Highlight & Architectural Accent',
    },
    {
      name: 'Surface Subtle',
      token: '--surface / #1C1B22',
      hex: tokens.colors.surfaceSubtle,
      text: '#E6E2DE',
      desc: 'Card Backgrounds & Floating Elements',
    },
    {
      name: 'Structural Border',
      token: '--border / #2C2A35',
      hex: tokens.colors.border,
      text: '#E6E2DE',
      desc: 'Subtle Dividers & Card Edges',
    },
    {
      name: 'Muted Secondary',
      token: '--muted / #8E8A85',
      hex: tokens.colors.foregroundMuted,
      text: '#151419',
      desc: 'Meta labels, handles, category notes',
    },
  ];

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {/* Floating Trigger Pill */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#1C1B22] border border-[#C38A68]/40 hover:border-[#C38A68] text-xs font-body text-[#E6E2DE] shadow-xl hover:shadow-[#C38A68]/10 transition-all duration-200"
        aria-expanded={isOpen}
      >
        <span className="w-2 h-2 rounded-full bg-[#C38A68] animate-ping" />
        <span className="font-semibold tracking-wide">PHASE 1 DESIGN SYSTEM</span>
        <span className="hidden sm:inline font-mono text-[10px] text-[#8E8A85]">
          {windowWidth}px &bull; {getBreakpoint(windowWidth)}
        </span>
        {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
      </button>

      {/* Expanded Inspector Modal / Drawer */}
      {isOpen && (
        <div className="mt-2 w-[calc(100vw-2rem)] sm:w-[480px] max-h-[70vh] bg-[#151419]/95 backdrop-blur-xl border border-[#2C2A35] rounded-2xl p-5 shadow-2xl overflow-y-auto">
          <div className="flex items-center justify-between pb-3 border-b border-[#2C2A35]">
            <div>
              <div className="font-display text-lg text-[#E6E2DE] uppercase tracking-wider">
                Phase 1 Technical Foundation
              </div>
              <div className="text-[11px] text-[#8E8A85]">
                Calibrated against Canva Portfolio Slides
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-[#C38A68]/20 text-[#C38A68] font-mono text-[10px]">
              Active
            </span>
          </div>

          {/* Tab Selector */}
          <div className="flex gap-2 my-3 p-1 bg-[#1C1B22] rounded-lg">
            <button
              type="button"
              onClick={() => setActiveTab('colors')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs rounded-md transition-colors ${
                activeTab === 'colors'
                  ? 'bg-[#C38A68] text-[#151419] font-semibold'
                  : 'text-[#8E8A85] hover:text-[#E6E2DE]'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Colors</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('typography')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs rounded-md transition-colors ${
                activeTab === 'typography'
                  ? 'bg-[#C38A68] text-[#151419] font-semibold'
                  : 'text-[#8E8A85] hover:text-[#E6E2DE]'
              }`}
            >
              <Type className="w-3.5 h-3.5" />
              <span>Typography</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('tokens')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs rounded-md transition-colors ${
                activeTab === 'tokens'
                  ? 'bg-[#C38A68] text-[#151419] font-semibold'
                  : 'text-[#8E8A85] hover:text-[#E6E2DE]'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Tokens</span>
            </button>
          </div>

          {/* TAB 1: Colors */}
          {activeTab === 'colors' && (
            <div className="space-y-2.5">
              <div className="text-[11px] text-[#8E8A85] mb-2 font-mono">
                Extracted from 7 Canva portfolio screenshots:
              </div>
              <div className="grid grid-cols-2 gap-2">
                {colorSwatches.map((swatch) => (
                  <div
                    key={swatch.token}
                    className="p-3 rounded-xl border border-[#2C2A35] flex flex-col justify-between h-24"
                    style={{ backgroundColor: swatch.hex }}
                  >
                    <div
                      className="text-xs font-semibold uppercase font-display tracking-wider"
                      style={{ color: swatch.text }}
                    >
                      {swatch.name}
                    </div>
                    <div>
                      <div
                        className="text-[11px] font-mono font-medium"
                        style={{ color: swatch.text }}
                      >
                        {swatch.hex}
                      </div>
                      <div
                        className="text-[9px] opacity-80 truncate"
                        style={{ color: swatch.text }}
                      >
                        {swatch.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Typography Scale */}
          {activeTab === 'typography' && (
            <div className="space-y-4 pt-1">
              <div className="p-3 rounded-xl bg-[#1C1B22] border border-[#2C2A35]">
                <div className="text-[10px] uppercase font-mono text-[#C38A68] mb-1">
                  Display Font: Bebas Neue (Tall Condensed)
                </div>
                <div className="font-display text-4xl text-[#C38A68] leading-none">
                  PRATIKSHA MAIDPAWAR
                </div>
                <div className="font-display text-2xl text-[#E6E2DE] leading-none mt-2">
                  INTRODUCTION &bull; REELS &bull; BRANDS
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#1C1B22] border border-[#2C2A35]">
                <div className="text-[10px] uppercase font-mono text-[#C38A68] mb-1">
                  Body Font: Plus Jakarta Sans (Clean Modern)
                </div>
                <div className="font-body text-sm text-[#E6E2DE] leading-relaxed">
                  "Hi, I'm Pratiksha — a content creator, performer and creative mind who loves
                  turning everyday moments into entertaining stories."
                </div>
                <div className="text-xs text-[#8E8A85] mt-2">
                  Hierarchy: Display XL (120px) &rarr; Display L (80px) &rarr; Display M (48px) &rarr;
                  Body (16px) &rarr; Caption (12px)
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Tokens & Responsive Strategy */}
          {activeTab === 'tokens' && (
            <div className="space-y-2.5 text-xs text-[#E6E2DE] font-body">
              <div className="p-3 rounded-xl bg-[#1C1B22] border border-[#2C2A35] space-y-1.5 font-mono text-[11px]">
                <div className="flex justify-between">
                  <span className="text-[#8E8A85]">Viewport:</span>
                  <span className="text-[#C38A68]">{windowWidth}px</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8E8A85]">Breakpoint:</span>
                  <span>{getBreakpoint(windowWidth)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8E8A85]">Container Max:</span>
                  <span>1320px</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8E8A85]">Section Spacing:</span>
                  <span>clamp(4.5rem, 8vw, 8rem)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8E8A85]">Card Radius:</span>
                  <span>18px</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8E8A85]">Framer Easing:</span>
                  <span>[0.16, 1, 0.3, 1]</span>
                </div>
              </div>
              <div className="text-[11px] text-[#8E8A85] text-center pt-1">
                Zero horizontal overflow &bull; Accessible focus states &bull; Modularity active
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
