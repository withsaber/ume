import React from 'react';
import { H1, H2, H3, Body, Caption, Mono } from '../../../src';
import { DocSection } from '../components/DocSection';
import { Preview } from '../components/Preview';
import './typography.css';

const SCALE = [
  { token: '--ume-text-xs', px: '12px' },
  { token: '--ume-text-sm', px: '13px' },
  { token: '--ume-text-md', px: '14px' },
  { token: '--ume-text-lg', px: '16px' },
  { token: '--ume-text-xl', px: '20px' },
  { token: '--ume-text-2xl', px: '24px' },
  { token: '--ume-text-3xl', px: '32px' },
];

const SPECIMEN = 'The quick brown fox jumps over the lazy dog';

export default function TypographyPage() {
  return (
    <>
      <header className="docs-pagehead">
        <h1 className="docs-h1">Typography</h1>
        <p className="docs-lede">
          ume sets type in Plus Jakarta Sans — a variable font with a warm, geometric voice — on a
          seven-step scale with a small set of text components.
        </p>
      </header>

      <DocSection id="typeface" title="Typeface">
        <p className="docs-desc">
          The sans stack is <code>--ume-font-sans</code>: Plus Jakarta Sans, falling back to
          system-ui, -apple-system, Segoe UI, and Roboto. Code and token labels use{' '}
          <code>--ume-font-mono</code>: Geist Mono, then ui-monospace, SF Mono, Menlo, Consolas.
          Load both as variable fonts; ume uses 400–700 (500 for mono) and a default −0.01em
          tracking on UI text.
        </p>
      </DocSection>

      <DocSection
        id="scale"
        title="Scale"
        description="Seven text-size tokens cover everything from captions to page titles."
      >
        <Preview>
          <div style={{ width: '100%' }}>
            {SCALE.map((s) => (
              <div key={s.token} className="type-row">
                <div className="type-row__meta">
                  <span className="type-row__name">{s.token}</span>
                  <span className="type-row__size">{s.px}</span>
                </div>
                <span className="type-row__specimen" style={{ fontSize: `var(${s.token})` }}>
                  {SPECIMEN}
                </span>
              </div>
            ))}
          </div>
        </Preview>
      </DocSection>

      <DocSection
        id="weights"
        title="Weights"
        description="Regular for body text, medium and semibold for emphasis, bold for headings."
      >
        <Preview>
          <div style={{ width: '100%' }}>
            {[400, 500, 600, 700].map((w) => (
              <div key={w} className="type-row">
                <div className="type-row__meta">
                  <span className="type-row__name">{w}</span>
                </div>
                <span className="type-row__specimen" style={{ fontWeight: w }}>
                  {SPECIMEN}
                </span>
              </div>
            ))}
          </div>
        </Preview>
      </DocSection>

      <DocSection
        id="usage"
        title="Usage"
        description="The library maps the scale to a handful of typography components."
      >
        <Preview>
          <div className="docs-stack">
            <H1>Page title</H1>
            <H2>Section heading</H2>
            <H3>Subsection heading</H3>
            <Body>Body text runs at 14px with a relaxed line height for reading.</Body>
            <Caption>Captions annotate and de-emphasize.</Caption>
            <Mono>--ume-text-md</Mono>
          </div>
        </Preview>
      </DocSection>
    </>
  );
}
