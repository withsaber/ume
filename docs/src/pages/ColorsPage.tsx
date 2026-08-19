import React from 'react';
import { DocSection } from '../components/DocSection';
import './colors.css';

/* Token names are hardcoded; the rendered colors always come from var(), so
   this page stays correct when tokens.css changes. Dark chips render inside a
   [data-ume-theme="dark"] scope so both themes are visible side by side.
   Ume ships exactly two themes: light and dark. */

function Chip({ token, primitive, dark }: { token: string; primitive?: boolean; dark?: boolean }) {
  const chip = (
    <div
      className="colors-role__chip"
      style={{ background: primitive ? `rgb(var(${token}))` : `var(${token})` }}
    />
  );
  return dark ? (
    <div className="colors-role__darkscope" data-ume-theme="dark">
      {chip}
    </div>
  ) : (
    chip
  );
}

function Role({ token, primitive }: { token: string; primitive?: boolean }) {
  return (
    <div className="colors-role">
      <span className="colors-role__name">{token.replace('--ume-', '')}</span>
      <Chip token={token} primitive={primitive} />
      <Chip token={token} primitive={primitive} dark />
    </div>
  );
}

function RoleGroup({ label, tokens, primitive }: { label: string; tokens: string[]; primitive?: boolean }) {
  return (
    <div className="colors-rolegroup">
      <p className="colors-grouplabel">{label}</p>
      <div className="colors-rolehead">
        <span />
        <span>Light</span>
        <span>Dark</span>
      </div>
      {tokens.map((t) => (
        <Role key={t} token={t} primitive={primitive} />
      ))}
    </div>
  );
}

const TEXT = [
  '--ume-text-primary',
  '--ume-text-secondary',
  '--ume-text-tertiary',
  '--ume-text-disabled',
  '--ume-text-inverse',
  '--ume-text-link',
  '--ume-text-danger',
];

const BACKGROUND = [
  '--ume-bg-canvas',
  '--ume-bg-raised',
  '--ume-bg-sunken',
  '--ume-bg-overlay',
  '--ume-bg-emphasis',
  '--ume-bg-scrim',
  '--ume-bg-hover',
  '--ume-bg-active',
  '--ume-bg-field',
];

const BORDER = ['--ume-border-default', '--ume-border-strong', '--ume-border-subtle', '--ume-border-focus'];

const ACTION = [
  '--ume-action-primary-bg',
  '--ume-action-primary-bg-hover',
  '--ume-action-primary-bg-active',
  '--ume-action-primary-text',
  '--ume-action-accent-bg',
  '--ume-action-accent-bg-hover',
  '--ume-action-accent-bg-active',
  '--ume-action-accent-text',
  '--ume-action-danger-bg',
  '--ume-action-danger-bg-hover',
];

const STATUS: Array<{ label: string; tokens: string[] }> = [
  { label: 'Success', tokens: ['--ume-accent-success', '--ume-accent-success-soft', '--ume-accent-success-fg'] },
  { label: 'Warning', tokens: ['--ume-accent-warning', '--ume-accent-warning-soft', '--ume-accent-warning-fg'] },
  { label: 'Danger', tokens: ['--ume-accent-danger', '--ume-accent-danger-soft', '--ume-accent-danger-fg'] },
  { label: 'Info', tokens: ['--ume-accent-info', '--ume-accent-info-soft', '--ume-accent-info-fg'] },
  { label: 'Plum', tokens: ['--ume-accent-plum', '--ume-accent-plum-soft', '--ume-accent-plum-fg'] },
  { label: 'Blue (brand accent)', tokens: ['--ume-accent-blue-soft', '--ume-accent-blue-fg'] },
];

const GREYS = [
  '--ume-white', '--ume-grey-50', '--ume-grey-100', '--ume-grey-200', '--ume-grey-300',
  '--ume-grey-400', '--ume-grey-500', '--ume-grey-600', '--ume-grey-700', '--ume-grey-800',
  '--ume-grey-900', '--ume-black',
];

const BLUE = [
  '--ume-blue-100', '--ume-blue-200', '--ume-blue-300', '--ume-blue-400',
  '--ume-blue-500', '--ume-blue-600', '--ume-blue-700', '--ume-blue-800',
];

const HUES: Array<{ label: string; tokens: string[] }> = [
  { label: 'Green', tokens: ['--ume-green-100', '--ume-green-300', '--ume-green-500', '--ume-green-700'] },
  { label: 'Yellow', tokens: ['--ume-yellow-100', '--ume-yellow-300', '--ume-yellow-500', '--ume-yellow-700'] },
  { label: 'Red', tokens: ['--ume-red-100', '--ume-red-300', '--ume-red-500', '--ume-red-700'] },
  { label: 'Plum', tokens: ['--ume-plum-100', '--ume-plum-300', '--ume-plum-500', '--ume-plum-700'] },
];

function Swatch({ token }: { token: string }) {
  return (
    <div className="colors-swatch">
      <div className="colors-swatch__chip" style={{ background: `rgb(var(${token}))` }} />
      <span className="colors-swatch__name">{token.replace('--ume-', '')}</span>
    </div>
  );
}

export default function ColorsPage() {
  return (
    <>
      <header className="docs-pagehead">
        <h1 className="docs-h1">Colors</h1>
        <p className="docs-lede">
          Every color is a semantic token; products never hardcode hex values. Ume ships exactly two
          themes — light and dark — shown side by side below.
        </p>
      </header>

      <DocSection
        id="text"
        title="Text"
        description="Foreground roles. Primary for body, secondary/tertiary for hierarchy, inverse on emphasis surfaces."
      >
        <RoleGroup label="Text colors" tokens={TEXT} />
      </DocSection>

      <DocSection
        id="background"
        title="Background"
        description="Surface roles: canvas under everything, raised for cards, sunken for wells, field for inputs."
      >
        <RoleGroup label="Surfaces" tokens={BACKGROUND} />
      </DocSection>

      <DocSection
        id="border"
        title="Border"
        description="Three strengths plus the focus color. Default for most separations, subtle inside raised surfaces."
      >
        <RoleGroup label="Borders" tokens={BORDER} />
      </DocSection>

      <DocSection
        id="action"
        title="Action"
        description="Buttons and interactive fills with their hover/active steps. Accent is the royal blue brand action."
      >
        <RoleGroup label="Actions" tokens={ACTION} />
      </DocSection>

      <DocSection
        id="status"
        title="Status"
        description="Each family pairs a solid accent with a soft surface and a foreground readable on it (all AA)."
      >
        {STATUS.map((g) => (
          <RoleGroup key={g.label} label={g.label} tokens={g.tokens} />
        ))}
      </DocSection>

      <DocSection
        id="primitives"
        title="Primitives"
        description="The raw ramps semantic tokens draw from. Reference them only when building new semantic tokens."
      >
        <p className="colors-grouplabel">Grey</p>
        <div className="colors-grid">
          {GREYS.map((t) => (
            <Swatch key={t} token={t} />
          ))}
        </div>
        <p className="colors-grouplabel">Blue — brand accent</p>
        <div className="colors-grid">
          {BLUE.map((t) => (
            <Swatch key={t} token={t} />
          ))}
        </div>
        {HUES.map((hue) => (
          <div key={hue.label}>
            <p className="colors-grouplabel">{hue.label}</p>
            <div className="colors-grid">
              {hue.tokens.map((t) => (
                <Swatch key={t} token={t} />
              ))}
            </div>
          </div>
        ))}
      </DocSection>
    </>
  );
}
