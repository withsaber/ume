import React from 'react';
import { Markdown } from '../../../src';
import { DocSection } from '../components/DocSection';
import { Preview, PropsTable } from '../components/Preview';
import { CodeBlock } from '../components/CodeBlock';

const DEMO = `# Release notes

Version **1.4** ships the *Markdown* renderer, with support for inline code like \`npm run build\` and links to the [ume repository](https://github.com/ume).

## Highlights

- Fenced code blocks with syntax highlighting
- *Italic* and **bold** inline styles
- Ordered and unordered lists

### Getting started

1. Install the package
2. Import the component
3. Pass a markdown string

\`\`\`tsx
import { Markdown } from 'ume';

export const Note = () => <Markdown content="# Hello" />;
\`\`\`

Paragraphs are separated by a blank line, like this one.`;

export default function MarkdownPage() {
  return (
    <>
      <header className="docs-pagehead">
        <h1 className="docs-h1">Markdown Renderer</h1>
        <p className="docs-lede">
          Renders markdown content — chat messages, docs, notes — with ume typography.
        </p>
      </header>

      <DocSection
        id="basic"
        title="Basic"
        description="Headings, bold and italic, inline code, links, both list kinds, and fenced code blocks are supported."
      >
        <Preview>
          <div style={{ width: '100%' }}>
            <Markdown content={DEMO} />
          </div>
        </Preview>
        <CodeBlock
          title="Example: Basic"
          code={`import { Markdown } from 'ume';

<Markdown content={\`# Hello

Some **bold** text and a [link](https://example.com).

- one
- two\`} />`}
        />
      </DocSection>

      <hr className="docs-separator" />

      <DocSection title="Properties" level={3}>
        <PropsTable
          rows={[
            {
              name: 'content',
              type: 'string',
              description: 'The markdown source to render.',
              required: true,
            },
            {
              name: 'className',
              type: 'string',
              description: 'Extra class name on the root element.',
            },
          ]}
        />
      </DocSection>
    </>
  );
}
