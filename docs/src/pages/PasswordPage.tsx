import React from 'react';
import { Password } from '../../../src';
import { DocSection } from '../components/DocSection';
import { Preview, PropsTable } from '../components/Preview';
import { CodeBlock } from '../components/CodeBlock';

export default function PasswordPage() {
  return (
    <>
      <header className="docs-pagehead">
        <h1 className="docs-h1">Password</h1>
        <p className="docs-lede">
          Password input with show/hide toggle and an optional live strength meter.
        </p>
      </header>

      <DocSection id="basic" title="Basic">
        <Preview>
          <div style={{ width: 320 }}>
            <Password label="Password" placeholder="Create a password" />
          </div>
        </Preview>
        <CodeBlock code={`<Password label="Password" placeholder="Create a password" />`} />
      </DocSection>

      <DocSection id="strength" title="Strength meter" description="Four bars light up as the password gets longer, mixed-case, and adds digits/symbols.">
        <Preview>
          <div style={{ width: 320 }}>
            <Password label="Choose a password" defaultValue="Saber2026!" showStrength />
          </div>
        </Preview>
        <CodeBlock code={`<Password defaultValue="Saber2026!" showStrength />`} />
      </DocSection>

      <DocSection id="error" title="Error">
        <Preview>
          <div style={{ width: 320 }}>
            <Password label="Password" defaultValue="123" error="Password is too weak." />
          </div>
        </Preview>
      </DocSection>

      <DocSection title="Properties" level={3}>
        <PropsTable
          rows={[
            { name: 'label', type: 'string', description: 'Field label.' },
            { name: 'helper', type: 'string', description: 'Helper text under the input.' },
            { name: 'error', type: 'string', description: 'Replaces helper and adds red border.' },
            { name: 'showStrength', type: 'boolean', description: 'Render the live strength meter below the input.' },
            { name: 'value / defaultValue', type: 'string', description: 'Standard input value props.' },
            { name: '...rest', type: 'InputHTMLAttributes', description: 'Pass-through to the underlying input (name, autoComplete, onChange, etc.).' },
          ]}
        />
      </DocSection>
    </>
  );
}
