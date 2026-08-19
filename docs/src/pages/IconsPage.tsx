import React, { useMemo, useState } from 'react';
import { Icon, umeIcons, UmeIconName, Input } from '../../../src';
import { DocSection } from '../components/DocSection';
import { Preview, PropsTable } from '../components/Preview';
import { CodeBlock } from '../components/CodeBlock';

const ICON_NAMES = Object.keys(umeIcons).sort() as UmeIconName[];

export default function IconsPage() {
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? ICON_NAMES.filter((n) => n.includes(q)) : ICON_NAMES;
  }, [query]);

  const copy = async (name: string) => {
    try {
      await navigator.clipboard.writeText(`<Icon name="${name}" />`);
      setCopied(name);
      setTimeout(() => setCopied(null), 1200);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <>
      <header className="docs-pagehead">
        <h1 className="docs-h1">Icons</h1>
        <p className="docs-lede">
          The ume icon set: {ICON_NAMES.length} line-variant icons on a 24px grid. Every icon
          inherits the surrounding text colour via <code>currentColor</code>.
        </p>
      </header>

      <DocSection
        title="Usage"
        description="Import Icon and pass a name. Default glyph size is 18 — wrapper auto-grows to 22 so the icon optically centers in its slot."
      >
        <Preview>
          <Icon name="search" />
          <Icon name="bell" size={24} />
          <Icon name="check" size={32} />
          <Icon name="warning-circle" size={32} color="var(--ume-text-danger)" />
        </Preview>
        <CodeBlock
          title="Example: Icons"
          code={`import { Icon } from 'ume';

<Icon name="search" />
<Icon name="bell" size={24} />
<Icon name="check" size={32} />
<Icon name="warning-circle" size={32} color="var(--ume-text-danger)" />`}
        />
      </DocSection>

      <DocSection
        title="Gallery"
        description={`All ${ICON_NAMES.length} icons. Click one to copy its usage.`}
      >
        <div className="docs-iconfilter">
          <Input
            placeholder="Filter icons..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Filter icons"
          />
        </div>
        <div className="docs-icon-grid">
          {visible.map((name) => (
            <button
              key={name}
              className={`docs-icon-cell${copied === name ? ' docs-icon-cell--copied' : ''}`}
              onClick={() => copy(name)}
              title={copied === name ? 'Copied!' : `Copy <Icon name="${name}" />`}
            >
              <Icon name={name} size={20} />
              <span className="docs-icon-cell__name">{copied === name ? 'copied' : name}</span>
            </button>
          ))}
          {visible.length === 0 && <p className="docs-desc">No icons match “{query}”.</p>}
        </div>
      </DocSection>

      <hr className="docs-separator" />

      <DocSection
        id="sizes"
        title="Sizes"
        description="The glyph scales; the wrapper is always 4px larger so the icon never touches its bounds. Default glyph is 18 → wrapper 22."
      >
        <Preview>
          <Icon name="search" size={12} />
          <Icon name="search" size={14} />
          <Icon name="search" size={16} />
          <Icon name="search" size={18} />
          <Icon name="search" size={20} />
          <Icon name="search" size={24} />
          <Icon name="search" size={32} />
          <Icon name="search" size={48} />
        </Preview>
        <CodeBlock code={`<Icon name="search" size={24} />`} />
      </DocSection>

      <DocSection title="Properties" level={3}>
        <PropsTable
          rows={[
            {
              name: 'name',
              type: 'UmeIconName',
              description: `One of the ${ICON_NAMES.length} icons in the gallery below.`,
              required: true,
            },
            {
              name: 'size',
              type: 'number',
              description: 'Glyph size in px. Wrapper auto-grows to size + 4. Defaults to 18.',
            },
            {
              name: 'color',
              type: 'string',
              description: 'Override the inherited text colour (any CSS color).',
            },
            {
              name: 'className',
              type: 'string',
              description: 'Extra class on the wrapper span.',
            },
            {
              name: 'aria-label',
              type: 'string',
              description:
                'When provided, the icon is announced as an image with this label. Decorative (aria-hidden) by default.',
            },
          ]}
        />
      </DocSection>
    </>
  );
}