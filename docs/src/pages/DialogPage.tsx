import React, { useState } from 'react';
import { Button, Dialog } from '../../../src';
import { DocSection } from '../components/DocSection';
import { Preview, PropsTable } from '../components/Preview';
import { CodeBlock } from '../components/CodeBlock';

function BasicDialogDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Delete project…
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Delete project?"
        actions={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => setOpen(false)}>
              Delete
            </Button>
          </>
        }
      >
        This permanently deletes the project and all of its documents. This action can't be undone.
      </Dialog>
    </>
  );
}

export default function DialogPage() {
  return (
    <>
      <header className="docs-pagehead">
        <h1 className="docs-h1">Dialog</h1>
        <p className="docs-lede">A modal dialog for focused tasks and confirmations.</p>
      </header>

      <DocSection
        id="basic"
        title="Basic"
        description="Controlled with open and onClose. Closes on Escape and on scrim click; actions are composed from Buttons."
      >
        <Preview>
          <BasicDialogDemo />
        </Preview>
        <CodeBlock
          title="Example: Basic"
          code={`import { Button, Dialog } from 'ume';

const [open, setOpen] = useState(false);

<Button variant="secondary" onClick={() => setOpen(true)}>Delete project…</Button>
<Dialog
  open={open}
  onClose={() => setOpen(false)}
  title="Delete project?"
  actions={
    <>
      <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant="danger" onClick={() => setOpen(false)}>Delete</Button>
    </>
  }
>
  This permanently deletes the project and all of its documents.
</Dialog>`}
        />
      </DocSection>

      <hr className="docs-separator" />

      <DocSection title="Properties" level={3}>
        <PropsTable
          rows={[
            {
              name: 'open',
              type: 'boolean',
              description: 'Controls whether the dialog is rendered.',
              required: true,
            },
            {
              name: 'onClose',
              type: '() => void',
              description: 'Called on Escape and on scrim click.',
              required: true,
            },
            {
              name: 'title',
              type: 'string',
              description: 'The dialog heading; also used as its accessible label.',
              required: true,
            },
            {
              name: 'children',
              type: 'ReactNode',
              description: 'Body content, rendered as secondary text.',
              required: true,
            },
            {
              name: 'actions',
              type: 'ReactNode',
              description: 'Buttons rendered at the bottom right (e.g. Cancel + Confirm).',
            },
          ]}
        />
      </DocSection>
    </>
  );
}
