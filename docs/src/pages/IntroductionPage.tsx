import React from 'react';

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
        <p className="docs-desc">
          One look, one feel, everywhere: mail app, calendar app, whatever comes next. Every product
          built on ume shares the same face. Every line of code is original and MIT licensed.
        </p>
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
        <h2 className="docs-h2">Design principles</h2>
        <ul className="docs-list">
          <li>
            <strong>Quiet by default.</strong> Warm greys, one persimmon accent, no decoration for
            decoration's sake.
          </li>
          <li>
            <strong>Tokens first.</strong> Every color, radius, and shadow comes from a token.
            Nothing hardcoded.
          </li>
          <li>
            <strong>Accessible always.</strong> Real focus rings, ARIA roles, and keyboard support
            in every component.
          </li>
          <li>
            <strong>Dark mode built in.</strong> One attribute switch, every component follows.
          </li>
        </ul>
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
