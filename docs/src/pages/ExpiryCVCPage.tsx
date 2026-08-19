import React from 'react';
import { DocSection } from '../components/DocSection';
import { Preview, PropsTable } from '../components/Preview';
import { CodeBlock } from '../components/CodeBlock';
import { ExpiryCVC } from '../../../src';

export default function ExpiryCVCPage() {
  return (
    <>
      <header className="docs-pagehead">
        <h1 className="docs-h1">ExpiryCVC</h1>
        <p className="docs-lede">
          The expiry and CVC half of the card form. Two side-by-side fields with auto-formatting.
        </p>
      </header>

      <DocSection id="basic" title="Basic">
        <Preview>
          <div style={{ width: 320 }}>
            <ExpiryCVC expiry="" cvc="" />
          </div>
        </Preview>
        <CodeBlock code={`<ExpiryCVC expiry={exp} cvc={cvc} onExpiryChange={setExp} onCvcChange={setCvc} />`} />
      </DocSection>

      <DocSection id="controlled" title="Controlled">
        <Preview>
          <ExpiryCVC expiry="08/27" cvc="123" />
        </Preview>
      </DocSection>

      <DocSection title="Properties" level={3}>
        <PropsTable
          rows={[
            { name: 'label', type: 'string', description: 'Group label.' },
            { name: 'helper', type: 'string', description: 'Helper text under both fields.' },
            { name: 'error', type: 'string', description: 'Replaces helper and turns both fields red.' },
            { name: 'expiry / cvc', type: 'string', description: 'Controlled values.' },
            { name: 'onExpiryChange / onCvcChange', type: '(v: string) => void', description: 'Controlled update.' },
          ]}
        />
      </DocSection>
    </>
  );
}
