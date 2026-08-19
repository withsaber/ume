import React from 'react';
import { Icon } from '../../../src';

const HIGHLIGHTS = [
  {
    icon: 'sparkle',
    title: 'Tokens first',
    body: 'Every color, radius, and shadow comes from a token. Nothing hardcoded.',
  },
  {
    icon: 'moon',
    title: 'Dark mode built in',
    body: 'One attribute switch, every component follows.',
  },
  {
    icon: 'shield',
    title: 'Accessible always',
    body: 'Real focus rings, ARIA roles, and keyboard support in every component.',
  },
  {
    icon: 'grid',
    title: 'One face, everywhere',
    body: 'Mail app, calendar app, whatever comes next — same look, same feel.',
  },
];

export default function IntroductionPage() {
  return (
    <>
      <header className="docs-pagehead">
        <h1 className="docs-h1">Introduction</h1>
        <p className="docs-lede">
          Ume is a standalone design system. Named for the plum blossom (梅): quiet, consistent, and
          early to everything.
        </p>
      </header>

      <section className="docs-section">
        <div className="docs-intro-grid">
          {HIGHLIGHTS.map((h) => (
            <div key={h.title} className="docs-intro-card">
              <span className="docs-intro-card__icon">
                <Icon name={h.icon as never} size={18} />
              </span>
              <span className="docs-intro-card__title">{h.title}</span>
              <span className="docs-intro-card__body">{h.body}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="docs-section">
        <h2 className="docs-h2">The rule</h2>
        <p className="docs-desc">
          Every project uses this system. No project invents its own colors, spacing, typography,
          buttons, or inputs. If a component is missing, it gets added to ume first, then used. That
          is how every product keeps the same face.
        </p>
      </section>

      <section className="docs-section">
        <h2 className="docs-h2">What is inside</h2>
        <p className="docs-desc">
          Ume ships design tokens as CSS custom properties, plain-CSS component styles built on
          those tokens, and React components for every pattern: Avatar, Banner, Button,
          ButtonGroup, Card, Chip, CircularProgress, Dialog, Divider, Dropdown, Facepile,
          IconButton, IconText, Input, Progress, Select, Skeleton, Tabs, Toast, Toggle, Tooltip, and
          Typography.
        </p>
        <p className="docs-desc">
          Tokens are also published standalone as JSON, a Tailwind preset, and plain CSS, so any web
          project can use the ume look without React.
        </p>
      </section>

      <section className="docs-section">
        <h2 className="docs-h2">Inspiration</h2>
        <p className="docs-desc">
          Ume's documentation structure and state coverage patterns take cues from{' '}
          <a href="https://skiff.com/ui" target="_blank" rel="noreferrer">
            skiff.com/ui
          </a>
          , the Skiff design system.
        </p>
      </section>
    </>
  );
}