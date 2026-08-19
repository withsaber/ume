import React from 'react';
import { Icon } from '../../../src';

interface DocSectionProps {
  /** Anchor id for deep links; omit for an unanchored section */
  id?: string;
  title: string;
  /** Level 2 = page section, 3 = sub-block like "Properties" */
  level?: 2 | 3;
  description?: React.ReactNode;
  children?: React.ReactNode;
}

/** A documentation section: heading + optional description + content. */
export function DocSection({ id, title, level = 2, description, children }: DocSectionProps) {
  const Heading = level === 2 ? 'h2' : 'h3';
  const currentPage = window.location.hash.replace(/^#\/?/, '').split('/')[0];
  return (
    <section className="docs-section" id={id}>
      <Heading className={level === 2 ? 'docs-h2' : 'docs-h3'}>
        {id && (
          <a className="docs-anchor" href={`#/${currentPage}/${id}`} aria-label={`Link to ${title}`}>
            <Icon name="link" size={11} />
          </a>
        )}
        {title}
      </Heading>
      {description && <p className="docs-desc">{description}</p>}
      {children}
    </section>
  );
}
