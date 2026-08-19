import React from 'react';
import { Icon, KeyCodeSequence, Menu, MenuItem } from '../../../src';
import { DocSection } from '../components/DocSection';
import { Preview, PropsTable } from '../components/Preview';
import { CodeBlock } from '../components/CodeBlock';

export default function MenuPage() {
  return (
    <>
      <header className="docs-pagehead">
        <h1 className="docs-h1">Menu</h1>
        <p className="docs-lede">
          An embedded list of actions, for sidebars, settings panes, and context menus.
        </p>
      </header>

      <DocSection
        id="basic"
        title="Basic"
        description="Compose MenuItems inside a Menu. Items support icons and a destructive tone."
      >
        <Preview>
          <div style={{ width: 260 }}>
            <Menu>
              <MenuItem label="Rename" icon={<Icon name="pencil" size={16} />} />
              <MenuItem label="Share" icon={<Icon name="share" size={16} />} />
              <MenuItem label="Archive" icon={<Icon name="archive" size={16} />} />
              <MenuItem label="Delete" icon={<Icon name="trash" size={16} />} destructive />
            </Menu>
          </div>
        </Preview>
        <CodeBlock
          title="Example: Basic"
          code={`import { Icon, Menu, MenuItem } from 'ume';

<Menu>
  <MenuItem label="Rename" icon={<Icon name="pencil" size={16} />} />
  <MenuItem label="Share" icon={<Icon name="share" size={16} />} />
  <MenuItem label="Archive" icon={<Icon name="archive" size={16} />} />
  <MenuItem label="Delete" icon={<Icon name="trash" size={16} />} destructive />
</Menu>`}
        />
      </DocSection>

      <DocSection
        id="shortcuts"
        title="With shortcuts"
        description="Use the end prop for trailing content like a KeyCodeSequence."
      >
        <Preview>
          <div style={{ width: 260 }}>
            <Menu>
              <MenuItem
                label="Duplicate"
                icon={<Icon name="copy" size={16} />}
                end={<KeyCodeSequence keys={['cmd', 'D']} size="sm" />}
              />
              <MenuItem
                label="Share"
                icon={<Icon name="share" size={16} />}
                end={<KeyCodeSequence keys={['cmd', 'shift', 'S']} size="sm" />}
              />
              <MenuItem
                label="Delete"
                icon={<Icon name="trash" size={16} />}
                destructive
                end={<KeyCodeSequence keys={['backspace']} size="sm" />}
              />
            </Menu>
          </div>
        </Preview>
        <CodeBlock
          title="Example: With shortcuts"
          code={`<Menu>
  <MenuItem
    label="Duplicate"
    icon={<Icon name="copy" size={16} />}
    end={<KeyCodeSequence keys={['cmd', 'D']} size="sm" />}
  />
</Menu>`}
        />
      </DocSection>

      <hr className="docs-separator" />

      <DocSection title="Menu properties" level={3}>
        <PropsTable
          rows={[
            {
              name: 'children',
              type: 'MenuItem[]',
              description: 'The menu items to render.',
              required: true,
            },
            {
              name: 'className',
              type: 'string',
              description: 'Extra class name on the menu panel.',
            },
          ]}
        />
      </DocSection>

      <DocSection title="MenuItem properties" level={3}>
        <PropsTable
          rows={[
            { name: 'label', type: 'string', description: 'The item text.' },
            { name: 'icon', type: 'ReactNode', description: 'Icon shown before the label.' },
            {
              name: 'destructive',
              type: 'boolean',
              description: 'Mark the action as destructive (danger color).',
            },
            {
              name: 'end',
              type: 'ReactNode',
              description: 'Content rendered at the end (e.g. a KeyCodeSequence shortcut).',
            },
            {
              name: 'disabled',
              type: 'boolean',
              description: 'Disables the item (native button attribute).',
            },
            {
              name: 'onClick',
              type: '(e: React.MouseEvent) => void',
              description: 'Trigger the action when the item is clicked.',
            },
          ]}
        />
      </DocSection>
    </>
  );
}
