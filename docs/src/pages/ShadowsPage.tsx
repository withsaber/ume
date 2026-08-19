import React from 'react';
import { Button } from '../../../src';
import { DocSection } from '../components/DocSection';
import { Preview } from '../components/Preview';
import './shadows.css';

const LEVELS = [
  { token: '--ume-shadow-1', note: 'Subtle lift for cards and chips' },
  { token: '--ume-shadow-2', note: 'Floating panels and dropdowns' },
  { token: '--ume-shadow-3', note: 'Dialogs and search overlay' },
];

export default function ShadowsPage() {
  return (
    <>
      <header className="docs-pagehead">
        <h1 className="docs-h1">Shadows</h1>
        <p className="docs-lede">
          A three-level elevation scale. Higher elevation means a larger, softer shadow — pick the
          lowest level that separates the surface from what's beneath it.
        </p>
      </header>

      <DocSection
        id="elevation"
        title="Elevation"
        description="Each level is a single token, applied with box-shadow: var(--ume-shadow-N)."
      >
        <Preview>
          <div className="shadows-grid">
            {LEVELS.map((l) => (
              <div key={l.token} className="shadows-card" style={{ boxShadow: `var(${l.token})` }}>
                <span className="shadows-card__name">{l.token}</span>
                <span className="shadows-card__note">{l.note}</span>
              </div>
            ))}
          </div>
        </Preview>
      </DocSection>

      <DocSection
        id="focus-ring"
        title="Focus ring"
        description={
          <>
            Interactive elements show <code>var(--ume-ring)</code> on <code>:focus-visible</code>.
            The sample box renders the ring statically; tab to the button to see it for real.
          </>
        }
      >
        <Preview>
          <span className="shadows-ringsample">--ume-ring</span>
          <Button variant="secondary">Tab to me</Button>
        </Preview>
      </DocSection>
    </>
  );
}
