import React from 'react';
import { umeIcons, UmeIconName, UmeIconVariant } from '../icons/icons';
import './icon.css';

export type { UmeIconName, UmeIconVariant };

/* ---------- Icon ----------
   Every icon ships in two variants on the same 18px grid:
   fill (solid), outline (1.25px stroke). */
export interface IconProps {
  name: UmeIconName;
  variant?: UmeIconVariant;
  size?: number;
  className?: string;
  'aria-label'?: string;
  'aria-hidden'?: boolean;
}
export function Icon({
  name,
  variant = 'fill',
  size = 18,
  className = '',
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden,
}: IconProps) {
  // Decorative by default: hidden from assistive tech unless a label is given.
  const hidden = ariaHidden ?? !ariaLabel;
  return (
    <span
      className={`ume-icon ${className}`.trim()}
      role={hidden ? undefined : 'img'}
      aria-label={hidden ? undefined : ariaLabel}
      aria-hidden={hidden || undefined}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 18 18"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        focusable="false"
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: umeIcons[variant][name] }}
      />
    </span>
  );
}
