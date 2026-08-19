import React from 'react';
import { Avatar, ChatBubble } from '../../../src';
import { DocSection } from '../components/DocSection';
import { Preview, PropsTable } from '../components/Preview';
import { CodeBlock } from '../components/CodeBlock';

export default function ChatBubblePage() {
  return (
    <>
      <header className="docs-pagehead">
        <h1 className="docs-h1">Chat Bubble</h1>
        <p className="docs-lede">A message bubble for conversational interfaces.</p>
      </header>

      <DocSection
        id="roles"
        title="Roles"
        description="User messages align right on the accent color; assistant messages align left with an optional avatar."
      >
        <Preview>
          <div className="docs-stack">
            <ChatBubble
              role="assistant"
              avatar={<Avatar name="Ume" />}
              timestamp="09:41"
            >
              What would you like to ship today?
            </ChatBubble>
            <ChatBubble role="user" timestamp="09:42">
              A settings page for the billing flow.
            </ChatBubble>
            <ChatBubble
              role="assistant"
              avatar={<Avatar name="Ume" />}
              timestamp="09:42"
            >
              Great — I'll scaffold the page and wire up the plan picker first.
            </ChatBubble>
          </div>
        </Preview>
        <CodeBlock
          title="Example: Roles"
          code={`import { Avatar, ChatBubble } from 'ume';

<ChatBubble role="assistant" avatar={<Avatar name="Ume" />} timestamp="09:41">
  What would you like to ship today?
</ChatBubble>
<ChatBubble role="user" timestamp="09:42">
  A settings page for the billing flow.
</ChatBubble>`}
        />
      </DocSection>

      <DocSection
        id="rich-content"
        title="Rich content"
        description="Children can be any React node — inline code, multiple paragraphs, or a Markdown component."
      >
        <Preview>
          <div className="docs-stack">
            <ChatBubble role="assistant" avatar={<Avatar name="Ume" />} timestamp="09:43">
              <p style={{ margin: 0 }}>
                Run <code className="docs-chip">npm run build</code> to bundle the library.
              </p>
              <p style={{ margin: '8px 0 0' }}>
                The output lands in <code className="docs-chip">dist/</code>, with CSS extracted
                alongside the JS.
              </p>
            </ChatBubble>
          </div>
        </Preview>
        <CodeBlock
          title="Example: Rich content"
          code={`<ChatBubble role="assistant" avatar={<Avatar name="Ume" />} timestamp="09:43">
  <p>Run <code>npm run build</code> to bundle the library.</p>
  <p>The output lands in <code>dist/</code>.</p>
</ChatBubble>`}
        />
      </DocSection>

      <hr className="docs-separator" />

      <DocSection title="Properties" level={3}>
        <PropsTable
          rows={[
            {
              name: 'role',
              type: `'user' | 'assistant'`,
              description: 'Who sent the message. Controls alignment, colors, and the avatar slot.',
              required: true,
            },
            {
              name: 'avatar',
              type: 'ReactNode',
              description: 'Avatar rendered bottom-aligned to the left of assistant bubbles.',
            },
            {
              name: 'timestamp',
              type: 'string',
              description: 'Small tertiary text under the bubble, aligned to the bubble\'s side.',
            },
            {
              name: 'children',
              type: 'ReactNode',
              description: 'Message content. Line breaks are preserved; arbitrary nodes are allowed.',
              required: true,
            },
          ]}
        />
      </DocSection>
    </>
  );
}
