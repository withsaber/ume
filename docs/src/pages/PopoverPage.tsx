import React, { useRef, useState } from 'react';
import { Button, Input, Popover } from '../../../src';
import { DocSection } from '../components/DocSection';
import { Preview, PropsTable } from '../components/Preview';
import { CodeBlock } from '../components/CodeBlock';

function BasicPopoverDemo() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLSpanElement>(null);
  return (
    <>
      <span ref={anchorRef} style={{ display: 'inline-block' }}>
        <Button variant="secondary" onClick={() => setOpen((o) => !o)}>
          Open popover
        </Button>
      </span>
      <Popover open={open} onClose={() => setOpen(false)} anchorRef={anchorRef}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 240 }}>
          <strong style={{ fontSize: 'var(--ume-text-md)' }}>Rename project</strong>
          <span style={{ fontSize: 'var(--ume-text-sm)', color: 'var(--ume-text-secondary)' }}>
            The name shows in the sidebar and share links.
          </span>
          <Input placeholder="Project name" defaultValue="Ume" aria-label="Project name" />
        </div>
      </Popover>
    </>
  );
}

export default function PopoverPage() {
  return (
    <>
      <header className="docs-pagehead">
        <h1 className="docs-h1">Popover</h1>
        <p className="docs-lede">
          A floating panel anchored to a trigger, for rich content that doesn't fit a menu or
          tooltip.
        </p>
      </header>

      <DocSection
        id="basic"
        title="Basic"
        description="Controlled with open and onClose; anchored to any element via anchorRef. Closes on outside click and Escape."
      >
        <Preview>
          <BasicPopoverDemo />
        </Preview>
        <CodeBlock
          title="Example: Basic"
          code={`import { Button, Input, Popover } from 'ume';

const [open, setOpen] = useState(false);
const anchorRef = useRef<HTMLSpanElement>(null);

<span ref={anchorRef}>
  <Button variant="secondary" onClick={() => setOpen((o) => !o)}>
    Open popover
  </Button>
</span>
<Popover open={open} onClose={() => setOpen(false)} anchorRef={anchorRef}>
  <strong>Rename project</strong>
  <Input placeholder="Project name" />
</Popover>`}
        />
      </DocSection>

      <hr className="docs-separator" />

      <DocSection title="Properties" level={3}>
        <PropsTable
          rows={[
            {
              name: 'open',
              type: 'boolean',
              description: 'Controls whether the popover is rendered.',
              required: true,
            },
            {
              name: 'onClose',
              type: '() => void',
              description: 'Called on outside click and Escape (focus returns to the anchor).',
              required: true,
            },
            {
              name: 'anchorRef',
              type: 'React.RefObject<HTMLElement>',
              description: 'Ref to the trigger element; the panel is positioned below it.',
              required: true,
            },
            {
              name: 'align',
              type: `'start' | 'center' | 'end'`,
              description: 'Horizontal alignment relative to the anchor. Defaults to "start".',
            },
            {
              name: 'children',
              type: 'ReactNode',
              description: 'Panel content — text, forms, anything.',
              required: true,
            },
          ]}
        />
      </DocSection>
    </>
  );
}
