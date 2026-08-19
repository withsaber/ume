import React, { useMemo, useState } from 'react';
import { Icon, umeIcons, UmeIconName, UmeIconVariant, Input, Tabs } from '../../../src';
import { DocSection } from '../components/DocSection';
import { Preview, PropsTable } from '../components/Preview';
import { CodeBlock } from '../components/CodeBlock';

const ICON_NAMES = Object.keys(umeIcons.fill) as UmeIconName[];
const VARIANTS: Array<{ id: UmeIconVariant; label: string }> = [
  { id: 'fill', label: 'Fill' },
  { id: 'outline', label: 'Outline' },
];

export default function IconsPage() {
  const [query, setQuery] = useState('');
  const [variant, setVariant] = useState<UmeIconVariant>('fill');
  const [copied, setCopied] = useState<string | null>(null);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? ICON_NAMES.filter((n) => n.includes(q)) : ICON_NAMES;
  }, [query]);

  const copy = async (name: string) => {
    try {
      const variantAttr = variant === 'fill' ? '' : ` variant="${variant}"`;
      await navigator.clipboard.writeText(`<Icon name="${name}"${variantAttr} />`);
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
          The ume icon set: {ICON_NAMES.length} essential UI icons on an 18px grid, rendered from
          the Nucleo UI collection. Every icon comes in two variants — fill and outline (1.25px
          stroke) — and inherits the surrounding text color.
        </p>
      </header>

      <DocSection
        title="Usage"
        description="Import Icon and pass a name. Variant defaults to fill, size to 18."
      >
        <Preview>
          <Icon name="search" />
          <Icon name="search" variant="outline" />
          <Icon name="bell" variant="outline" size={24} />
          <Icon name="check-circle" size={32} />
        </Preview>
        <CodeBlock
          title="Example: Icons"
          code={`import { Icon } from 'ume';

<Icon name="search" />
<Icon name="search" variant="outline" />
<Icon name="bell" variant="outline" size={24} />
<Icon name="check-circle" size={32} />`}
        />
      </DocSection>

      <DocSection
        title="Gallery"
        description={`All ${ICON_NAMES.length} icons in two variants. Click one to copy its usage.`}
      >
        <div className="docs-iconfilter">
          <Input
            placeholder="Filter icons..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Filter icons"
          />
          <Tabs
            tabs={VARIANTS.map((v) => ({ id: v.id, label: v.label }))}
            active={variant}
            onChange={(id) => setVariant(id as UmeIconVariant)}
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
              <Icon name={name} variant={variant} size={20} />
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
        description="Default is 18px (the design grid). Use 14 for dense lists, 24-32 for hero illustrations."
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

      <DocSection
        id="all-outline"
        title="Outline grid"
        description="All 153 icons in outline (1.25px stroke). Same filter and copy behaviour as the main grid."
      >
        <OutlineGrid />
      </DocSection>

      <DocSection
        title="Properties"
        level={3}
      >
        <PropsTable
          rows={[
            {
              name: 'name',
              type: 'UmeIconName',
              description: 'One of the 153 names in the gallery below.',
              required: true,
            },
            {
              name: 'variant',
              type: `'fill' | 'outline'`,
              description: 'Drawing style. Defaults to "fill".',
            },
            {
              name: 'size',
              type: 'number',
              description: 'Width and height in px. Defaults to 18.',
            },
            {
              name: 'aria-label',
              type: 'string',
              description: 'When provided, the icon is exposed as an image with this label. Decorative (aria-hidden) by default.',
            },
          ]}
        />
      </DocSection>
    </>
  );
}

function OutlineGrid() {
  const names = Object.keys(umeIcons.outline) as UmeIconName[];
  const [q, setQ] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const visible = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s ? names.filter((n) => n.includes(s)) : names;
  }, [q]);
  const copy = (n: string) => {
    navigator.clipboard?.writeText(`<Icon name="${n}" variant="outline" />`);
    setCopied(n);
    setTimeout(() => setCopied(null), 1000);
  };
  return (
    <>
      <Input
        placeholder={`Filter ${names.length} outline icons…`}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="Filter outline icons"
      />
      <div className="docs-icon-grid" style={{ marginTop: 16 }}>
        {visible.map((n) => (
          <button
            key={n}
            className={`docs-icon-cell${copied === n ? ' docs-icon-cell--copied' : ''}`}
            onClick={() => copy(n)}
            title={copied === n ? 'Copied!' : `Copy <Icon name="${n}" variant="outline" />`}
          >
            <Icon name={n} variant="outline" size={20} />
            <span className="docs-icon-cell__name">{copied === n ? 'copied' : n}</span>
          </button>
        ))}
        {visible.length === 0 && <p className="docs-desc">No outline icons match "{q}".</p>}
      </div>
    </>
  );
}
