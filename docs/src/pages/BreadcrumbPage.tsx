import React from 'react';
import { Breadcrumb } from '../../../src';
import { DocSection } from '../components/DocSection';
import { Preview, PropsTable } from '../components/Preview';
import { CodeBlock } from '../components/CodeBlock';

export default function BreadcrumbPage() {
  return (
    <>
      <header className="docs-pagehead">
        <h1 className="docs-h1">Breadcrumb</h1>
        <p className="docs-lede">
          Path navigation showing the user's place in a hierarchy. Last item is the current page and
          is not a link.
        </p>
      </header>

      <DocSection id="basic" title="Basic">
        <Preview>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Projects', href: '/projects' },
              { label: 'Atlas', href: '/projects/atlas' },
              { label: 'Settings' },
            ]}
          />
        </Preview>
        <CodeBlock code={`<Breadcrumb
  items={[
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'Atlas', href: '/projects/atlas' },
    { label: 'Settings' },
  ]}
/>`} />
      </DocSection>

      <DocSection id="separator" title="Separator" description="Defaults to / but you can pass any character.">
        <Preview>
          <Breadcrumb
            items={[
              { label: 'Workspace', href: '#' },
              { label: 'Channels', href: '#' },
              { label: 'general' },
            ]}
            separator="›"
          />
        </Preview>
      </DocSection>

      <DocSection id="short" title="Short" description="2-3 levels. Good for modal titles and side panels.">
        <Preview>
          <Breadcrumb items={[{ label: 'Settings', href: '#' }, { label: 'Billing' }]} />
        </Preview>
      </DocSection>

      <DocSection title="Properties" level={3}>
        <PropsTable
          rows={[
            { name: 'items', type: 'Crumb[]', description: 'Ordered list. Each item has label and optional href. Last item is rendered as the current page.', required: true },
            { name: 'separator', type: 'string', description: 'Character between items. Defaults to /.' },
          ]}
        />
      </DocSection>
    </>
  );
}
