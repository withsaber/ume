import React from 'react';
import { Badge } from '../../../src';
import { DocSection } from '../components/DocSection';
import { Preview, PropsTable } from '../components/Preview';
import { CodeBlock } from '../components/CodeBlock';

const TONES = ['neutral', 'success', 'warning', 'danger', 'info', 'plum', 'blue'] as const;
const VARIANTS = ['soft', 'solid', 'outline', 'dot'] as const;

export default function BadgePage() {
  return (
    <>
      <header className="docs-pagehead">
        <h1 className="docs-h1">Badge</h1>
        <p className="docs-lede">
          Inline labels for status, count, or category. 7 tones, 4 variants, 2 sizes, with an
          optional anchor offset for notification dots.
        </p>
      </header>

      <DocSection id="soft" title="Soft" description="Default variant. Subtle fill, readable foreground.">
        <Preview>
          {TONES.map((t) => (
            <Badge key={t} tone={t} variant="soft" label={t} />
          ))}
        </Preview>
        <CodeBlock code={`<Badge tone="success" variant="soft" label="Active" />`} />
      </DocSection>

      <DocSection id="solid" title="Solid" description="Strong fill, white foreground. Reserve for primary signal.">
        <Preview>
          {TONES.map((t) => (
            <Badge key={t} tone={t} variant="solid" label={t} />
          ))}
        </Preview>
        <CodeBlock code={`<Badge tone="blue" variant="solid" label="New" />`} />
      </DocSection>

      <DocSection id="outline" title="Outline" description="Transparent with a tinted border. Useful inside busy surfaces.">
        <Preview>
          {TONES.map((t) => (
            <Badge key={t} tone={t} variant="outline" label={t} />
          ))}
        </Preview>
        <CodeBlock code={`<Badge tone="warning" variant="outline" label="Draft" />`} />
      </DocSection>

      <DocSection id="dot" title="Dot" description="Leading colored dot with text. Status indicator.">
        <Preview>
          {TONES.map((t) => (
            <Badge key={t} tone={t} variant="dot" label={t} />
          ))}
        </Preview>
        <CodeBlock code={`<Badge tone="success" variant="dot" label="Online" />`} />
      </DocSection>

      <DocSection id="sizes" title="Sizes" description="md for inline UI; sm for chips, dense lists, and table cells.">
        <Preview>
          <Badge tone="success" variant="soft" size="md" label="Active" />
          <Badge tone="success" variant="soft" size="sm" label="Active" />
          <Badge tone="blue" variant="solid" size="md" label="New" />
          <Badge tone="blue" variant="solid" size="sm" label="New" />
        </Preview>
        <CodeBlock code={`<Badge size="md" ... />\n<Badge size="sm" ... />`} />
      </DocSection>

      <DocSection id="anchor" title="Anchored" description="Absolute top-right of a parent. Used for notification counts and unread indicators.">
        <div style={{ display: 'flex', gap: 16 }}>
          <div className="docs-preview" style={{ position: 'relative', padding: '24px 32px' }}>
            <span>Card title</span>
            <span style={{ position: 'absolute', top: -6, right: -6 }}>
              <Badge tone="danger" variant="solid" size="sm" label="3" />
            </span>
          </div>
        </div>
        <CodeBlock code={`<div style={{ position: 'relative' }}>\n  <span>Card title</span>\n  <span style={{ position: 'absolute', top: -6, right: -6 }}>\n    <Badge tone="danger" variant="solid" size="sm" label="3" />\n  </span>\n</div>`} />
      </DocSection>

      <DocSection title="Properties" level={3}>
        <PropsTable
          rows={[
            { name: 'label', type: 'string', description: 'Visible label text.', required: true },
            { name: 'tone', type: `'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'plum' | 'blue'`, description: 'Color family. Defaults to neutral.' },
            { name: 'variant', type: `'soft' | 'solid' | 'outline' | 'dot'`, description: 'Visual style. Defaults to soft.' },
            { name: 'size', type: `'sm' | 'md'`, description: 'Height. md = 22px, sm = 18px.' },
            { name: 'icon', type: 'UmeIconName', description: 'Optional icon shown before the label.' },
          ]}
        />
      </DocSection>
    </>
  );
}
