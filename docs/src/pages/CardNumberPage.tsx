import React, { useState } from 'react';
import { CardNumber, ExpiryCVC } from '../../../src';
import { DocSection } from '../components/DocSection';
import { Preview, PropsTable } from '../components/Preview';
import { CodeBlock } from '../components/CodeBlock';

export default function CardNumberPage() {
  const [exp, setExp] = useState('');
  const [cvc, setCvc] = useState('');
  return (
    <>
      <header className="docs-pagehead">
        <h1 className="docs-h1">CardNumber & ExpiryCVC</h1>
        <p className="docs-lede">
          Card number auto-detects the brand and renders a colored chip. ExpiryCVC is the matching
          split field.
        </p>
      </header>

      <DocSection id="card" title="Card number">
        <Preview>
          <div style={{ width: 360 }}>
            <CardNumber label="Card number" defaultValue="4242424242424242" />
          </div>
        </Preview>
        <CodeBlock code={`<CardNumber label="Card number" />`} />
      </DocSection>

      <DocSection id="expiry" title="Expiry + CVC">
        <Preview>
          <div style={{ width: 360 }}>
            <ExpiryCVC label="Expiry & CVC" expiry={exp} cvc={cvc} onExpiryChange={setExp} onCvcChange={setCvc} />
          </div>
        </Preview>
        <CodeBlock code={`<ExpiryCVC
  expiry={exp}
  cvc={cvc}
  onExpiryChange={setExp}
  onCvcChange={setCvc}
/>`} />
      </DocSection>

      <DocSection id="composed" title="Composed — full card form">
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, width: 360 }}>
            <CardNumber label="Card number" defaultValue="5555555555554444" />
            <ExpiryCVC label="Expiry & CVC" expiry={exp} cvc={cvc} onExpiryChange={setExp} onCvcChange={setCvc} />
          </div>
        </Preview>
      </DocSection>

      <DocSection title="Properties" level={3}>
        <PropsTable
          rows={[
            { name: 'CardNumber.label / helper / error', type: 'string', description: 'Field chrome.' },
            { name: 'CardNumber.value / defaultValue', type: 'string', description: 'Number, digits-only. Auto-formatted to 4-4-4-4 groups.' },
            { name: 'ExpiryCVC.expiry', type: 'string', description: 'MM/YY. Auto-formatted with slash.' },
            { name: 'ExpiryCVC.cvc', type: 'string', description: '3-4 digits, digits-only.' },
            { name: 'ExpiryCVC.onExpiryChange / onCvcChange', type: '(v: string) => void', description: 'Controlled update.' },
          ]}
        />
      </DocSection>
    </>
  );
}
