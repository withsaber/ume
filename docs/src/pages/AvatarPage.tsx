import React from 'react';
import { Avatar, Facepile } from '../../../src';
import { DocSection } from '../components/DocSection';
import { Preview, PropsTable } from '../components/Preview';
import { CodeBlock } from '../components/CodeBlock';

/* Local Unsplash portraits (cached at build time, no network at runtime). */
const PHOTO = '/avatars/saber.jpg';
const PEOPLE = [
  { name: 'Alex Brand', src: '/avatars/alex.jpg' },
  { name: 'Emma Mason', src: '/avatars/emma.jpg' },
  { name: 'Jamie Drake', src: '/avatars/jamie.jpg' },
  { name: 'Saber Khan', src: '/avatars/saber.jpg' },
  { name: 'Riley Park', src: '/avatars/riley.jpg' },
  { name: 'Noor Alam', src: '/avatars/noor.jpg' },
];

export default function AvatarPage() {
  return (
    <>
      <header className="docs-pagehead">
        <h1 className="docs-h1">Avatar</h1>
        <p className="docs-lede">
          A graphical representation of a user or entity, often an image or initials displayed in a
          circular container. Supports presence dots, verified checks, and notification counts.
        </p>
      </header>

      <DocSection id="sizes" title="Sizes" description="Avatars come in three sizes.">
        <Preview>
          <Avatar name="Alice" size="lg" />
          <Avatar name="Alice" size="md" />
          <Avatar name="Alice" size="sm" />
        </Preview>
        <CodeBlock
          title="Example: Sizes"
          code={`import { Avatar } from 'ume';

<Avatar name="Alice" size="lg" />
<Avatar name="Alice" size="md" />
<Avatar name="Alice" size="sm" />`}
        />
      </DocSection>

      <DocSection id="image" title="Image" description="When src is provided, the image fills the circle. Falls back to initials if it fails to load.">
        <Preview>
          <Avatar name="Saber Khan" src={PHOTO} size="lg" />
          <Avatar name="Saber Khan" src={PHOTO} size="md" />
          <Avatar name="Saber Khan" src={PHOTO} size="sm" />
        </Preview>
        <CodeBlock code={`<Avatar name="Saber Khan" src="/photos/saber.jpg" size="lg" />`} />
      </DocSection>

      <DocSection id="presence" title="Presence" description="Anchor a colored dot to the bottom-right. Five states: online, away, busy, offline, verified.">
        <Preview>
          <Avatar name="Online user"   badge="online" size="lg" />
          <Avatar name="Away user"     badge="away"   size="lg" />
          <Avatar name="Busy user"     badge="busy"   size="lg" />
          <Avatar name="Offline user"  badge="offline" size="lg" />
          <Avatar name="Verified user" badge="verified" src="/avatars/emma.jpg" size="lg" />
        </Preview>
        <CodeBlock code={`<Avatar name="Online user" badge="online" size="lg" />
<Avatar name="Away user"   badge="away"   size="lg" />
<Avatar name="Busy user"   badge="busy"   size="lg" />
<Avatar name="Offline user" badge="offline" size="lg" />
<Avatar name="Verified user" badge="verified" src={PHOTO} size="lg" />`} />
      </DocSection>

      <DocSection id="count" title="Notification count" description="Renders a count badge at the top-right. Shows 99+ above 99. Wins over badge.">
        <Preview>
          <Avatar name="Three new"  count={3}   size="lg" />
          <Avatar name="Twelve"     count={12}  size="lg" />
          <Avatar name="Lots more"  count={150} size="lg" />
        </Preview>
        <CodeBlock code={`<Avatar name="Three" count={3} size="lg" />
<Avatar name="Lots"  count={150} size="lg" />  // renders "99+"`} />
      </DocSection>

      <DocSection id="facepile" title="Facepile" description="Stack avatars with -8px overlap. Useful for 'and 5 others' affordances.">
        <Preview>
          <Facepile>
            <Avatar name="Alex Brand" badge="online" />
            <Avatar name="Emma Mason" badge="busy" />
            <Avatar name="Jamie Drake" badge="verified" src="/avatars/jamie.jpg" />
            <Avatar name="Riley Park" />
          </Facepile>
        </Preview>
        <CodeBlock
          code={`<Facepile>
  <Avatar name="Alex Brand" badge="online" />
  <Avatar name="Emma Mason" badge="busy" />
  <Avatar name="Jamie Drake" badge="verified" src={PHOTO} />
  <Avatar name="Riley Park" />
</Facepile>`}
        />
      </DocSection>

      <DocSection title="Properties" level={3}>
        <PropsTable
          rows={[
            { name: 'name', type: 'string', description: 'Used for initials and aria-label.' },
            { name: 'src', type: 'string', description: 'Image URL. Falls back to initials on load failure.' },
            { name: 'size', type: `'sm' | 'md' | 'lg'`, description: '28 / 36 / 48 px.' },
            { name: 'badge', type: `'online' | 'away' | 'busy' | 'offline' | 'verified'`, description: 'Bottom-right badge. Hidden when `count` is set.' },
            { name: 'count', type: 'number', description: 'Top-right count badge. Shows 99+ above 99.' },
          ]}
        />
      </DocSection>
    </>
  );
}
