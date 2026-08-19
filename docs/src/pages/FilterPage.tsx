import React from 'react';
import { Filter } from '../../../src';
import { DocSection } from '../components/DocSection';
import { Preview, PropsTable } from '../components/Preview';
import { CodeBlock } from '../components/CodeBlock';

const STATUS_OPTS = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'archived', label: 'Archived' },
  { value: 'draft', label: 'Draft' },
];

export default function FilterPage() {
  return (
    <>
      <header className="docs-pagehead">
        <h1 className="docs-h1">Filter</h1>
        <p className="docs-lede">
          A single-select trigger. Pair it with a Dropdown panel for the option list — Filter is just
          the chrome.
        </p>
      </header>

      <DocSection id="basic" title="Basic">
        <Preview>
          <Filter label="Status" options={STATUS_OPTS} value="active" />
          <Filter label="Sort" options={[{ value: 'new', label: 'Newest first' }, { value: 'old', label: 'Oldest first' }]} value="new" />
          <Filter label="Plan" options={[{ value: 'free', label: 'Free' }, { value: 'pro', label: 'Pro' }, { value: 'team', label: 'Team' }]} value="pro" />
        </Preview>
        <CodeBlock code={`<Filter label="Status" options={STATUS_OPTS} value="active" />`} />
      </DocSection>

      <DocSection id="chip" title="As a filter chip" description="Wrap the trigger in a rounded pill with a close affordance for the 'active filter' pattern.">
        <Preview>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 28, padding: '0 6px 0 10px', borderRadius: 999, background: 'var(--ume-bg-raised)', boxShadow: 'inset 0 0 0 1px var(--ume-border-default)', fontFamily: 'var(--ume-font-sans)', fontSize: 13, fontWeight: 500, color: 'var(--ume-text-primary)' }}>
              Status: <strong>Active</strong>
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 18, height: 18, borderRadius: 999, color: 'var(--ume-text-tertiary)', cursor: 'pointer' }}>×</span>
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 28, padding: '0 6px 0 10px', borderRadius: 999, background: 'var(--ume-bg-raised)', boxShadow: 'inset 0 0 0 1px var(--ume-border-default)', fontFamily: 'var(--ume-font-sans)', fontSize: 13, fontWeight: 500, color: 'var(--ume-text-primary)' }}>
              Sort: <strong>Last 2 days</strong>
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 18, height: 18, borderRadius: 999, color: 'var(--ume-text-tertiary)', cursor: 'pointer' }}>×</span>
            </span>
          </div>
        </Preview>
      </DocSection>

      <DocSection title="Properties" level={3}>
        <PropsTable
          rows={[
            { name: 'label', type: 'string', description: 'Visible field label (text-tertiary, 12px).', required: true },
            { name: 'options', type: 'FilterOption[]', description: 'Options to render in the dropdown panel.', required: true },
            { name: 'value', type: 'string', description: 'Currently selected option value.' },
            { name: 'onChange', type: '(value: string) => void', description: 'Selection change handler.' },
          ]}
        />
      </DocSection>
    </>
  );
}
