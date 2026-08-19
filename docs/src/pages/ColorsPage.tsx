import React from 'react';
import { DocSection } from '../components/DocSection';
import './colors.css';

/* Token names are hardcoded; the rendered colors always come from var(), so
   this page stays correct when tokens.css changes. */

function Swatch({ token, primitive }: { token: string; primitive?: boolean }) {
  return (
    <div className="colors-swatch">
      <div
        className="colors-swatch__chip"
        style={{ background: primitive ? `rgb(var(${token}))` : `var(${token})` }}
      />
      <span className="colors-swatch__name">{token}</span>
    </div>
  );
}

const GREYS = [
  '--ume-white',
  '--ume-grey-50',
  '--ume-grey-100',
  '--ume-grey-200',
  '--ume-grey-300',
  '--ume-grey-400',
  '--ume-grey-500',
  '--ume-grey-600',
  '--ume-grey-700',
  '--ume-grey-800',
  '--ume-grey-900',
  '--ume-black',
];

const PERSIMMON = [
  '--ume-persimmon-100',
  '--ume-persimmon-200',
  '--ume-persimmon-300',
  '--ume-persimmon-400',
  '--ume-persimmon-500',
  '--ume-persimmon-600',
  '--ume-persimmon-700',
  '--ume-persimmon-800',
];

const HUES: Array<{ label: string; tokens: string[] }> = [
  { label: 'Green', tokens: ['--ume-green-100', '--ume-green-300', '--ume-green-500', '--ume-green-700'] },
  { label: 'Yellow', tokens: ['--ume-yellow-100', '--ume-yellow-300', '--ume-yellow-500', '--ume-yellow-700'] },
  { label: 'Blue', tokens: ['--ume-blue-100', '--ume-blue-300', '--ume-blue-500', '--ume-blue-700'] },
  { label: 'Red', tokens: ['--ume-red-100', '--ume-red-300', '--ume-red-500', '--ume-red-700'] },
  { label: 'Plum', tokens: ['--ume-plum-100', '--ume-plum-300', '--ume-plum-500', '--ume-plum-700'] },
];

const SEMANTIC = [
  '--ume-text-primary',
  '--ume-text-secondary',
  '--ume-text-tertiary',
  '--ume-bg-canvas',
  '--ume-bg-raised',
  '--ume-bg-sunken',
  '--ume-border-default',
  '--ume-action-primary-bg',
  '--ume-action-accent-bg',
];

export default function ColorsPage() {
  return (
    <>
      <header className="docs-pagehead">
        <h1 className="docs-h1">Colors</h1>
        <p className="docs-lede">
          The ume palette. Every color is a token; products never hardcode hex values.
        </p>
      </header>

      <DocSection
        id="greys"
        title="Greys"
        description="The neutral ramp, from white to near-black. Interfaces are built almost entirely from these."
      >
        <div className="colors-grid">
          {GREYS.map((t) => (
            <Swatch key={t} token={t} primitive />
          ))}
        </div>
      </DocSection>

      <DocSection
        id="persimmon"
        title="Persimmon"
        description="The brand accent ramp — named for the fruit, used for primary actions and highlights."
      >
        <div className="colors-grid">
          {PERSIMMON.map((t) => (
            <Swatch key={t} token={t} primitive />
          ))}
        </div>
      </DocSection>

      <DocSection
        id="supporting-hues"
        title="Supporting hues"
        description="Status and accent hues, each in four stops. Pair the 100/300 stops with the 700 stop for text."
      >
        {HUES.map((hue) => (
          <div key={hue.label}>
            <p className="colors-grouplabel">{hue.label}</p>
            <div className="colors-grid">
              {hue.tokens.map((t) => (
                <Swatch key={t} token={t} primitive />
              ))}
            </div>
          </div>
        ))}
      </DocSection>

      <DocSection
        id="semantic"
        title="Semantic"
        description="Components consume semantic tokens, never primitives directly. These remap in dark mode."
      >
        <div className="colors-semgrid">
          {SEMANTIC.map((t) => (
            <div key={t} className="colors-semcard">
              <div className="colors-semcard__chip" style={{ background: `var(${t})` }} />
              <span className="colors-semcard__name">{t}</span>
            </div>
          ))}
        </div>
      </DocSection>
    </>
  );
}
