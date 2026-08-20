import React from 'react';
import { Button } from '../../../src';
import { DocSection } from '../components/DocSection';
import { ThemeBoards } from '../components/ThemeBoards';
import './shadows.css';

const LEVELS = [
  { token: '--ume-shadow-1', note: 'Subtle lift for cards and chips' },
  { token: '--ume-shadow-2', note: 'Floating panels and dropdowns' },
  { token: '--ume-shadow-3', note: 'Dialogs and search overlay' },
];

const RADII = [
  { token: '--ume-radius-sm', value: '6px' },
  { token: '--ume-radius-md', value: '10px' },
  { token: '--ume-radius-lg', value: '14px' },
  { token: '--ume-radius-xl', value: '16px' },
  { token: '--ume-radius-full', value: '999px' },
];

const SURFACES = [
  { token: '--ume-bg-canvas', label: 'bg-canvas' },
  { token: '--ume-bg-sunken', label: 'bg-sunken' },
  { token: '--ume-bg-raised', label: 'bg-raised' },
  { token: '--ume-bg-overlay', label: 'bg-overlay' },
  { token: '--ume-bg-emphasis', label: 'bg-emphasis', inverse: true },
];

function ShadowCard({ token, note }: { token: string; note: string }) {
  return (
    <div className="shadows-card" style={{ boxShadow: `var(${token})` }}>
      <span className="shadows-card__name">{token}</span>
      <span className="shadows-card__note">{note}</span>
    </div>
  );
}

function SurfaceStrip({ token, label, inverse }: { token: string; label: string; inverse?: boolean }) {
  return (
    <div className={`shadows-surface${inverse ? ' shadows-surface--inverse' : ''}`} style={{ background: `var(${token})` }}>
      <span className="shadows-surface__name">{label}</span>
      <span className="shadows-surface__token">{token}</span>
    </div>
  );
}

function RadiusCard({ token, value }: { token: string; value: string }) {
  return (
    <div className="shadows-radius">
      <div className="shadows-radius__box" style={{ borderRadius: `var(${token})` }} />
      <span className="shadows-card__name">{token}</span>
      <span className="shadows-card__note">{value}</span>
    </div>
  );
}

export default function ShadowsPage() {
  return (
    <>
      <header className="docs-pagehead">
        <h1 className="docs-h1">Radius &amp; Shadows</h1>
        <p className="docs-lede">
          Corner radii are theme-independent geometry. Elevation is a three-level scale — pick the
          lowest level that separates the surface from what's beneath it. Dark theme deepens the
          same shadows rather than adding glows.
        </p>
      </header>

      <DocSection
        id="radius"
        title="Radius"
        description="One scale for both themes: 6 / 10 / 14 / 16 / full."
      >
        <div className="shadows-grid">
          {RADII.map((r) => (
            <RadiusCard key={r.token} token={r.token} value={r.value} />
          ))}
        </div>
      </DocSection>

      <DocSection
        id="elevation"
        title="Elevation"
        description="Each level is a single token, applied with box-shadow: var(--ume-shadow-N). Dark theme uses deeper black (50/55/60%) instead of light's softer steps."
      >
        <ThemeBoards
          light={
            <div className="shadows-grid">
              {LEVELS.map((l) => (
                <ShadowCard key={l.token} token={l.token} note={l.note} />
              ))}
            </div>
          }
          dark={
            <div className="shadows-grid">
              {LEVELS.map((l) => (
                <ShadowCard key={l.token} token={l.token} note={l.note} />
              ))}
            </div>
          }
        />
      </DocSection>

      <DocSection
        id="surfaces"
        title="Surfaces"
        description="The background ladder shadows sit on. Elevation only reads when the surface steps are respected."
      >
        <ThemeBoards
          light={
            <div className="shadows-surfacelist">
              {SURFACES.map((s) => (
                <SurfaceStrip key={s.token} token={s.token} label={s.label} inverse={s.inverse} />
              ))}
            </div>
          }
          dark={
            <div className="shadows-surfacelist">
              {SURFACES.map((s) => (
                <SurfaceStrip key={s.token} token={s.token} label={s.label} inverse={s.inverse} />
              ))}
            </div>
          }
        />
      </DocSection>

      <DocSection
        id="focus-ring"
        title="Focus ring"
        description={
          <>
            Interactive elements show <code>var(--ume-ring)</code> on <code>:focus-visible</code>.
            Light: blue-500 / 28% · Dark: blue-400 / 35%.
          </>
        }
      >
        <ThemeBoards
          light={
            <>
              <span className="shadows-ringsample">--ume-ring</span>
              <Button variant="secondary">Tab to me</Button>
            </>
          }
          dark={
            <>
              <span className="shadows-ringsample">--ume-ring</span>
              <Button variant="secondary">Tab to me</Button>
            </>
          }
        />
      </DocSection>
    </>
  );
}
