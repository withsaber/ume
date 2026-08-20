import React from 'react';
import { DocSection } from '../components/DocSection';

/* Mirrors the "Spacing" board on Paper (Foundation page).
   Numeric scale on a 4px base, plus the 96px section rhythm. */

const SCALE = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24];

function Bar({ step }: { step: number }) {
  const px = step * 4;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <code
        style={{
          fontFamily: 'var(--ume-font-mono)',
          fontSize: 11,
          color: 'var(--ume-text-tertiary)',
          width: 150,
          flexShrink: 0,
        }}
      >
        --space-{step} · {px}px
      </code>
      <div
        style={{
          height: 16,
          width: Math.min(px * 2, 320),
          background: 'var(--ume-blue-500, #0066D9)',
          borderRadius: 2,
        }}
      />
    </div>
  );
}

export default function SpacingPage() {
  return (
    <>
      <header className="docs-pagehead">
        <h1 className="docs-h1">Spacing</h1>
        <p className="docs-lede">
          A numeric scale on a 4px base. Component internals use steps 1–6; layout gaps use 8–16;
          page sections breathe at <code>--space-section</code> (96px).
        </p>
      </header>

      <DocSection
        id="scale"
        title="Scale"
        description="Every step is a multiple of 4px. The scale runs 1–24; beyond 24, compose."
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '24px 0' }}>
          {SCALE.map((s) => (
            <Bar key={s} step={s} />
          ))}
        </div>
      </DocSection>

      <DocSection
        id="section-rhythm"
        title="Section rhythm"
        description="Between major page sections, use --space-section (96px). Inside a section, keep gaps under 24px."
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            border: '1px solid var(--ume-border-default)',
            borderRadius: 8,
            overflow: 'hidden',
          }}
        >
          <div style={{ padding: 24, background: 'var(--ume-bg-raised)' }}>
            <strong>Section A</strong>
          </div>
          <div
            style={{
              height: 96,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background:
                'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(0,102,217,0.06) 8px, rgba(0,102,217,0.06) 16px)',
              fontFamily: 'var(--ume-font-mono)',
              fontSize: 11,
              color: 'var(--ume-text-tertiary)',
            }}
          >
            --space-section · 96px
          </div>
          <div style={{ padding: 24, background: 'var(--ume-bg-raised)' }}>
            <strong>Section B</strong>
          </div>
        </div>
      </DocSection>
    </>
  );
}
