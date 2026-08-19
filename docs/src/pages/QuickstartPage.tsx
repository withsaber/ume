import React from 'react';
import { DocSection } from '../components/DocSection';
import { CodeBlock } from '../components/CodeBlock';
import { Button } from '../../../src';
import { Preview } from '../components/Preview';

export default function QuickstartPage() {
  return (
    <>
      <header className="docs-pagehead">
        <h1 className="docs-h1">Quickstart</h1>
        <p className="docs-lede">Get ume running in your app in a few minutes.</p>
      </header>

      <DocSection title="Install">
        <CodeBlock title="Terminal" code={`npm install ume`} />
      </DocSection>

      <DocSection
        title="Add the typefaces"
        description="Ume uses Plus Jakarta Sans for UI and Geist Mono for code. Add them once per app."
      >
        <CodeBlock
          title="index.html"
          code={`<link
  href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200..800&family=Geist+Mono:wght@100..900&display=swap"
  rel="stylesheet"
/>`}
        />
      </DocSection>

      <DocSection
        title="Wrap your app"
        description="UmeProvider applies the theme and token scope. Import the styles once."
      >
        <CodeBlock
          title="App.tsx"
          code={`import { UmeProvider, Button } from 'ume';
import 'ume/styles.css';

<UmeProvider theme="light">
  <Button variant="accent">Save</Button>
</UmeProvider>`}
        />
        <Preview>
          <Button variant="accent">Save</Button>
        </Preview>
      </DocSection>

      <DocSection
        title="Tokens only"
        description="Any web project can use the ume tokens without React."
      >
        <CodeBlock
          title="styles.css"
          code={`@import 'ume/tokens.css';

/* var(--ume-text-primary), var(--ume-action-accent-bg), ... */`}
        />
      </DocSection>

      <DocSection title="Dark mode" description="One attribute switches the whole system.">
        <CodeBlock
          title="App.tsx"
          code={`<UmeProvider theme="dark">
  <App />
</UmeProvider>`}
        />
      </DocSection>
    </>
  );
}
