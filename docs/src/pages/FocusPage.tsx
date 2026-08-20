import React from 'react';
import { DocSection } from '../components/DocSection';

/* Mirrors the "Focus" board on Paper (Foundation page).
   Per-state focus rings: the ring colour matches the element's intent. */

const VARIANTS = [
  {
    name: 'default',
    token: '--color-focus',
    light: '#0066D9',
    dark: '#65A0FD',
    note: 'Neutral / informational elements — inputs, primary buttons, links',
    inputText: 'saber@ume.design',
    buttonText: 'Save',
    buttonBg: '#201D1D',
    buttonColor: '#FAFAF9',
  },
  {
    name: 'danger',
    token: '--color-focus-danger',
    light: '#D9393E',
    dark: '#FF7A7A',
    note: 'Destructive buttons and error-state inputs',
    inputText: 'not-an-email',
    buttonText: 'Delete',
    buttonBg: '#D9393E',
    buttonColor: '#FFFFFF',
  },
  {
    name: 'success',
    token: '--color-focus-success',
    light: '#00884F',
    dark: '#4DE7A5',
    note: 'Validated inputs and confirm buttons',
    inputText: 'saber@ume.design ✓',
    buttonText: 'Confirm',
    buttonBg: '#00884F',
    buttonColor: '#FFFFFF',
  },
  {
    name: 'warning',
    token: '--color-focus-warning',
    light: '#966F04',
    dark: '#FFCF42',
    note: 'Warning-state inputs (weak password, near-limit)',
    inputText: 'weak password ⚠',
    buttonText: 'Review',
    buttonBg: '#966F04',
    buttonColor: '#FFFFFF',
  },
];

function hexA(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function FocusDemo({ v, theme }: { v: (typeof VARIANTS)[number]; theme: 'light' | 'dark' }) {
  const isDark = theme === 'dark';
  const ring = isDark ? v.dark : v.light;
  const opacity = isDark ? 0.35 : 0.28;
  const bg = isDark ? '#201D1D' : '#FFFFFF';
  const text = isDark ? '#FAFAF9' : '#201D1D';
  const border = isDark ? 'rgba(255,240,230,0.10)' : 'rgba(15,0,0,0.12)';
  return (
    <div
      data-ume-theme={theme}
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 24,
        padding: 24,
        background: isDark ? '#201D1D' : '#FDFCFC',
        borderRadius: 8,
        border: `1px solid ${border}`,
        flexWrap: 'wrap',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 240 }}>
        <span style={{ fontSize: 12, color: isDark ? '#9A9898' : '#6E6E73' }}>Input ({theme})</span>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            height: 38,
            padding: '0 12px',
            background: bg,
            border: `1.5px solid ${ring}`,
            borderRadius: 6,
            boxShadow: `0 0 0 3px ${hexA(ring, opacity)}`,
            fontSize: 14,
            color: text,
          }}
        >
          {v.inputText}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span style={{ fontSize: 12, color: isDark ? '#9A9898' : '#6E6E73' }}>Button ({theme})</span>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 36,
            padding: '0 16px',
            borderRadius: 6,
            background: isDark && v.name === 'default' ? '#FAFAF9' : v.buttonBg,
            color: isDark && v.name === 'default' ? '#201D1D' : v.buttonColor,
            fontSize: 14,
            fontWeight: 500,
            boxShadow: `0 0 0 3px ${hexA(ring, opacity)}`,
            width: 'fit-content',
          }}
        >
          {v.buttonText}
        </div>
      </div>
    </div>
  );
}

export default function FocusPage() {
  return (
    <>
      <header className="docs-pagehead">
        <h1 className="docs-h1">Focus</h1>
        <p className="docs-lede">
          The focus ring matches the element's intent. Apple Blue for neutral, red for destructive,
          green for validated, yellow for warning. Same shape everywhere: 1.5px border + 3px outer
          ring.
        </p>
      </header>

      {VARIANTS.map((v) => (
        <DocSection
          key={v.name}
          id={v.name}
          title={`${v.name} — ${v.token}`}
          description={v.note}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <FocusDemo v={v} theme="light" />
            <FocusDemo v={v} theme="dark" />
          </div>
        </DocSection>
      ))}

      <DocSection
        id="rules"
        title="Rules"
        description="Ring geometry and behaviour invariants."
      >
        <ul style={{ lineHeight: 1.9, fontSize: 14, color: 'var(--ume-text-secondary)' }}>
          <li>Shape: 1.5px border + 3px outer ring (box-shadow), zero offset — sits flush on the element.</li>
          <li>Dark theme uses the lighter (300/400) ring colour and 35% outer opacity vs 28% in light.</li>
          <li>Only one focus ring visible per page — no stacked rings on nested elements.</li>
          <li>Ring colour must match intent; never show a blue ring on a destructive control.</li>
        </ul>
      </DocSection>
    </>
  );
}
