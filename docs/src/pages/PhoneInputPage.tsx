import React from 'react';
import { PhoneInput } from '../../../src';
import { DocSection } from '../components/DocSection';
import { Preview, PropsTable } from '../components/Preview';
import { CodeBlock } from '../components/CodeBlock';

export default function PhoneInputPage() {
  return (
    <>
      <header className="docs-pagehead">
        <h1 className="docs-h1">PhoneInput</h1>
        <p className="docs-lede">
          Phone number field with a country prefix chip. Numeric keyboard on mobile via inputMode.
        </p>
      </header>

      <DocSection id="basic" title="Basic">
        <Preview>
          <div style={{ width: 320 }}>
            <PhoneInput label="Phone number" />
          </div>
        </Preview>
        <CodeBlock code={`<PhoneInput label="Phone number" />`} />
      </DocSection>

      <DocSection id="prefix" title="Custom prefix">
        <Preview>
          <div style={{ width: 320 }}>
            <PhoneInput label="Mobile" prefix="+1" />
          </div>
        </Preview>
        <CodeBlock code={`<PhoneInput label="Mobile" prefix="+1" />`} />
      </DocSection>

      <DocSection title="Properties" level={3}>
        <PropsTable
          rows={[
            { name: 'label', type: 'string', description: 'Field label.' },
            { name: 'helper', type: 'string', description: 'Helper text under the input.' },
            { name: 'error', type: 'string', description: 'Replaces helper and adds red border.' },
            { name: 'prefix', type: 'string', description: 'Country code shown as a chip. Defaults to +880.' },
            { name: 'value / defaultValue', type: 'string', description: 'Standard input value props.' },
          ]}
        />
      </DocSection>
    </>
  );
}
