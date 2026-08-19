import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useOnClickOutside, useOnEscapePress } from '../hooks';
import './popover.css';

/* ---------- Popover ----------
   A floating panel anchored to a trigger element. Rendered in a portal,
   positioned under the anchor; closes on outside click and Escape. */
export interface PopoverProps {
  open: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLElement>;
  children: React.ReactNode;
  align?: 'start' | 'center' | 'end';
  className?: string;
}

interface AnchorBox {
  top: number;
  left: number;
  width: number;
}

export function Popover({ open, onClose, anchorRef, children, align = 'start', className = '' }: PopoverProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState<AnchorBox | null>(null);

  // Measure the anchor when the popover opens.
  useEffect(() => {
    if (!open) return;
    const anchor = anchorRef.current;
    if (!anchor) return;
    const rect = anchor.getBoundingClientRect();
    setBox({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
    });
  }, [open, anchorRef]);

  useOnClickOutside(
    panelRef,
    (e) => {
      // Clicks on the anchor itself are the trigger's business (it toggles).
      if (anchorRef.current && e.target instanceof Node && anchorRef.current.contains(e.target)) return;
      onClose();
    },
    open
  );
  useOnEscapePress(() => {
    onClose();
    anchorRef.current?.focus();
  }, open);

  if (!open || !box) return null;

  const GAP = 6;
  const VIEWPORT_MARGIN = 8;
  let left = box.left;
  if (align === 'center') left = box.left + box.width / 2;
  if (align === 'end') left = box.left + box.width;
  // Never render off the left edge of the viewport.
  left = Math.max(VIEWPORT_MARGIN, left);

  return createPortal(
    <div
      ref={panelRef}
      className={`ume-popover ume-popover--${align} ${className}`.trim()}
      style={{ top: box.top + GAP, left }}
      role="dialog"
    >
      {children}
    </div>,
    document.body
  );
}
