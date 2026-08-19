import React from 'react';
import './monotag.css';

/* ---------- MonoTag ---------- */
export type MonoTagTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'plum';
export interface MonoTagProps {
  label: string;
  tone?: MonoTagTone;
  className?: string;
}
export function MonoTag({ label, tone = 'neutral', className = '' }: MonoTagProps) {
  return (
    <span className={`ume-monotag${tone !== 'neutral' ? ` ume-monotag--${tone}` : ''} ${className}`.trim()}>
      {label}
    </span>
  );
}
