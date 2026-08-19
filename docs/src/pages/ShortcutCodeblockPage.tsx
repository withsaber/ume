import React from 'react';
import { CodeBlock, KeyCodeSequence } from '../../../src';
import { DocSection } from '../components/DocSection';
import { Preview, PropsTable } from '../components/Preview';
import { CodeBlock as DocsCodeBlock } from '../components/CodeBlock';

export default function ShortcutCodeblockPage() {
  return (
    <>
      <header className="docs-pagehead">
        <h1 className="docs-h1">Shortcut &amp; Codeblock</h1>
        <p className="docs-lede">Keyboard shortcuts and syntax-highlighted code, as components.</p>
      </header>

      <DocSection
        id="shortcuts"
        title="Shortcuts"
        description="KeyCodeSequence renders key-cap chips; aliases like cmd and shift become symbols."
      >
        <Preview>
          <KeyCodeSequence keys={['cmd', 'K']} />
          <KeyCodeSequence keys={['cmd', 'shift', 'P']} />
          <KeyCodeSequence keys={['esc']} size="sm" />
        </Preview>
        <DocsCodeBlock
          title="Example: Shortcuts"
          code={`import { KeyCodeSequence } from 'ume';

<KeyCodeSequence keys={['cmd', 'K']} />
<KeyCodeSequence keys={['cmd', 'shift', 'P']} />
<KeyCodeSequence keys={['esc']} size="sm" />`}
        />
      </DocSection>

      <DocSection
        id="codeblock"
        title="CodeBlock"
        description="A dark code panel with a tiny highlighter and a copy button (top right — try it)."
      >
        <Preview>
          <div style={{ width: '100%' }}>
            <CodeBlock
              title="greet.js"
              code={`// A tiny greeting
const greet = (name) => {
  return \`Hello, \${name}!\`;
};`}
            />
          </div>
        </Preview>
        <DocsCodeBlock
          title="Example: CodeBlock"
          code={`import { CodeBlock } from 'ume';

<CodeBlock
  title="greet.js"
  code={\`const greet = (name) => {
  return \\\`Hello, \\\${name}!\\\`;
};\`}
/>`}
        />
      </DocSection>

      <hr className="docs-separator" />

      <DocSection title="KeyCodeSequence properties" level={3}>
        <PropsTable
          rows={[
            {
              name: 'keys',
              type: 'string[]',
              description: 'The keys to render, in order. Aliases like cmd, shift, and esc are normalized.',
              required: true,
            },
            {
              name: 'separator',
              type: 'ReactNode',
              description: 'Rendered between key chips. Defaults to nothing.',
            },
            {
              name: 'size',
              type: `'sm' | 'md'`,
              description: 'Chip size. Defaults to "md".',
            },
          ]}
        />
      </DocSection>

      <DocSection title="CodeBlock properties" level={3}>
        <PropsTable
          rows={[
            {
              name: 'code',
              type: 'string',
              description: 'The source code to render, syntax highlighted.',
              required: true,
            },
            {
              name: 'title',
              type: 'string',
              description: 'Header label, e.g. a file name. Defaults to "Example".',
            },
          ]}
        />
      </DocSection>
    </>
  );
}
