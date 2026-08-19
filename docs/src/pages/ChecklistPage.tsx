import React, { useState } from 'react';
import { Checklist, ChecklistItem } from '../../../src';
import { DocSection } from '../components/DocSection';
import { Preview, PropsTable } from '../components/Preview';
import { CodeBlock } from '../components/CodeBlock';

const ITEMS: ChecklistItem[] = [
  { id: 'inbox', label: 'Inbox zero', helper: 'Reply or archive every message' },
  { id: 'archive', label: 'Auto-archive after 30 days', helper: 'Older emails move to Archive' },
  { id: 'read', label: 'Send read receipts', checked: true },
  { id: 'smart', label: 'Smart notifications', helper: 'AI learns which threads matter' },
  { id: 'sso', label: 'Enterprise SSO', helper: 'Available on Pro and above', disabled: true },
];

export default function ChecklistPage() {
  const [items, setItems] = useState(ITEMS);
  const toggle = (id: string) =>
    setItems((curr) => curr.map((it) => (it.id === id ? { ...it, checked: !it.checked } : it)));

  return (
    <>
      <header className="docs-pagehead">
        <h1 className="docs-h1">Checklist</h1>
        <p className="docs-lede">
          A vertical list of checkboxes with optional helper text. Disabled rows render at 50%
          opacity and ignore interaction.
        </p>
      </header>

      <DocSection id="basic" title="Basic">
        <Preview>
          <div style={{ width: 360 }}>
            <Checklist items={items} onToggle={toggle} />
          </div>
        </Preview>
        <CodeBlock
          code={`const [items, setItems] = useState(ITEMS);
const toggle = (id) =>
  setItems(curr => curr.map(it => it.id === id ? { ...it, checked: !it.checked } : it));

<Checklist items={items} onToggle={toggle} />`}
        />
      </DocSection>

      <DocSection id="disabled" title="Disabled rows">
        <Preview>
          <div style={{ width: 360 }}>
            <Checklist
              items={[
                { id: 'a', label: 'Free tier option' },
                { id: 'b', label: 'Pro tier option', checked: true },
                { id: 'c', label: 'Team tier option', disabled: true },
              ]}
            />
          </div>
        </Preview>
        <CodeBlock code={`<Checklist
  items={[
    { id: 'a', label: 'Free tier option' },
    { id: 'b', label: 'Pro tier option', checked: true },
    { id: 'c', label: 'Team tier option', disabled: true },
  ]}
/>`} />
      </DocSection>

      <DocSection title="Properties" level={3}>
        <PropsTable
          rows={[
            { name: 'items', type: 'ChecklistItem[]', description: 'Items. Each has id, label, optional checked/helper/disabled.', required: true },
            { name: 'onToggle', type: '(id: string) => void', description: 'Fired with the item id when its checkbox is clicked.' },
          ]}
        />
      </DocSection>
    </>
  );
}
