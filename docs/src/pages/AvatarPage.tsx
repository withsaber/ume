import React from 'react';
import { Avatar, Facepile } from '../../../src';
import { DocSection } from '../components/DocSection';
import { Preview, PropsTable } from '../components/Preview';
import { CodeBlock } from '../components/CodeBlock';

/* Inline SVG portrait so the docs work offline. */
const PHOTO =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFB59D"/><stop offset="1" stop-color="#EF603F"/></linearGradient></defs><rect width="80" height="80" fill="url(#g)"/><circle cx="58" cy="18" r="26" fill="#FFFFFF" opacity="0.22"/><circle cx="24" cy="60" r="18" fill="#FFFFFF" opacity="0.16"/></svg>`
  );

export default function AvatarPage() {
  return (
    <>
      <header className="docs-pagehead">
        <h1 className="docs-h1">Avatar</h1>
        <p className="docs-lede">
          A graphical representation of a user or entity, often an image or initials displayed in a
          circular container.
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

      <DocSection
        id="initial-avatar"
        title="Initial Avatar"
        description="Avatars display up to two initials derived from the name prop."
      >
        <Preview>
          <Avatar name="Alice" size="lg" />
          <Avatar name="Alice Ng" size="md" />
          <Avatar name="Bobby Tables" size="sm" />
        </Preview>
        <CodeBlock
          title="Example: Initial avatar"
          code={`import { Avatar } from 'ume';

<Avatar name="Alice" size="lg" />
<Avatar name="Alice Ng" size="md" />
<Avatar name="Bobby Tables" size="sm" />`}
        />
      </DocSection>

      <DocSection
        id="photo-avatar"
        title="Photo Avatar"
        description="Images can be passed into the Avatar component with the src prop."
      >
        <Preview>
          <Avatar name="Alice" src={PHOTO} size="lg" />
          <Avatar name="Alice" src={PHOTO} size="md" />
          <Avatar name="Alice" src={PHOTO} size="sm" />
        </Preview>
        <CodeBlock
          title="Example: Photo avatar"
          code={`import { Avatar } from 'ume';

<Avatar name="Alice" src={ProfilePic} size="lg" />
<Avatar name="Alice" src={ProfilePic} size="md" />
<Avatar name="Alice" src={ProfilePic} size="sm" />`}
        />
      </DocSection>

      <DocSection
        id="facepile"
        title="Facepile"
        description="Stack overlapping avatars with the Facepile component."
      >
        <Preview>
          <Facepile>
            <Avatar name="Alice Ng" />
            <Avatar name="Bobby Tables" />
            <Avatar name="Carol Danvers" />
            <Avatar name="David Kim" />
          </Facepile>
        </Preview>
        <CodeBlock
          title="Example: Facepile"
          code={`import { Avatar, Facepile } from 'ume';

<Facepile>
  <Avatar name="Alice Ng" />
  <Avatar name="Bobby Tables" />
  <Avatar name="Carol Danvers" />
  <Avatar name="David Kim" />
</Facepile>`}
        />
      </DocSection>

      <hr className="docs-separator" />

      <DocSection title="Properties" level={3}>
        <PropsTable
          rows={[
            {
              name: 'name',
              type: 'string',
              description:
                'Full name of the user. Up to two initials are derived from it when no image is given.',
            },
            {
              name: 'src',
              type: 'string',
              description: 'Image URL for a photo avatar. Falls back to initials when omitted.',
            },
            {
              name: 'size',
              type: `'sm' | 'md' | 'lg'`,
              description: 'The size of the avatar. Defaults to "md".',
            },
          ]}
        />
      </DocSection>
    </>
  );
}
