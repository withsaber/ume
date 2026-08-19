import React from 'react';
import { umeIcons, UmeIconName } from '../icons/icons';
import './icon.css';

/* ---------- Icon ----------
   Single line-variant icon set rendered from src/icons/ (24px viewBox).
   Two-tier sizing model: the wrapper is 4px larger than the icon glyph
   so the icon optically centers in its target slot without hugging the
   edges. Default icon size 18 → wrapper 22.

   All paints are currentColor; the icon inherits the surrounding text
   colour. Use the `color` prop to force a colour (e.g. on an accent bg). */
export type { UmeIconName };
export type UmeIconVariant = 'line'; // single variant going forward

export interface IconProps {
  name: UmeIconName;
  variant?: UmeIconVariant;
  /** Rendered glyph size in px. Wrapper auto-grows by 4px. Default 18. */
  size?: number;
  className?: string;
  /** Override the inherited text colour (any CSS color). */
  color?: string;
  'aria-label'?: string;
  'aria-hidden'?: boolean;
}

export function Icon({
  name,
  variant: _variant = 'line',
  size = 18,
  className = '',
  color,
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden,
}: IconProps) {
  // Decorative by default; announced as an image only when labelled.
  const hidden = ariaHidden ?? !ariaLabel;
  const wrapperSize = size + 4;
  const path = umeIcons[name];
  if (!path) {
    // Unknown icon — render nothing rather than throwing so a missing entry
    // doesn't crash a whole page (common during icon-set curation).
    return null;
  }
  return (
    <span
      className={`ume-icon ${className}`.trim()}
      role={hidden ? undefined : 'img'}
      aria-label={hidden ? undefined : ariaLabel}
      aria-hidden={hidden || undefined}
      style={{
        width: wrapperSize,
        height: wrapperSize,
        color,
      }}
    >
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
        focusable="false"
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: path }}
      />
    </span>
  );
}