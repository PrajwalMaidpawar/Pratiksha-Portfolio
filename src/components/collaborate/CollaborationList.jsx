/**
 * CollaborationList Component (Phase 6)
 * Renders the editorial list of collaboration formats.
 * Coordinates single-expansion state and accessible list structure.
 */

import { useState } from 'react';
import CollaborationItem from './CollaborationItem';
import { Layers } from 'lucide-react';

export default function CollaborationList({ formats = [] }) {
  // All formats closed initially; expands when user clicks on explore
  const [expandedId, setExpandedId] = useState(null);

  const handleToggle = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-4">
      {/* Top list metadata bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 pb-2 text-xs font-mono text-[#8E8A85] border-b border-[#2C2A35]">
        <div className="flex items-center gap-2">
          <Layers className="w-3.5 h-3.5 text-[#C38A68]" />
          <span>{formats.length} CREATOR FORMATS AVAILABLE</span>
        </div>
        <span className="hidden sm:inline text-[11px] text-[#8E8A85]/70">
          SELECT A FORMAT TO EXPAND SCOPE & DELIVERABLES
        </span>
      </div>

      {/* Editorial Collaboration List Rows */}
      <div className="rounded-2xl border border-[#2C2A35] bg-[#151419] divide-y divide-[#2C2A35] overflow-hidden shadow-2xl">
        {formats.map((format, index) => (
          <CollaborationItem
            key={format.id}
            format={format}
            index={index}
            isExpanded={expandedId === format.id}
            onToggle={() => handleToggle(format.id)}
          />
        ))}
      </div>
    </div>
  );
}
