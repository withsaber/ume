import React from 'react';
import { DocSection } from '../components/DocSection';
import { Preview, PropsTable, PropRow } from '../components/Preview';
import { CodeBlock } from '../components/CodeBlock';

export interface ComponentSectionSpec {
  id?: string;
  title: string;
  description?: React.ReactNode;
  preview?: React.ReactNode;
  code?: string;
  codeTitle?: string;
}

export interface ComponentPageSpec {
  title: string;
  lede: string;
  sections: ComponentSectionSpec[];
  props?: PropRow[];
}

/** Generic component documentation page rendered from a spec. */
export function ComponentPage({ spec }: { spec: ComponentPageSpec }) {
  return (
    <>
      <header className="docs-pagehead">
        <h1 className="docs-h1">{spec.title}</h1>
        <p className="docs-lede">{spec.lede}</p>
      </header>
      {spec.sections.map((s) => (
        <DocSection key={s.title} id={s.id} title={s.title} description={s.description}>
          {s.preview && <Preview>{s.preview}</Preview>}
          {s.code && <CodeBlock title={s.codeTitle ?? `Example: ${s.title}`} code={s.code} />}
        </DocSection>
      ))}
      {spec.props && (
        <>
          <hr className="docs-separator" />
          <DocSection title="Properties" level={3}>
            <PropsTable rows={spec.props} />
          </DocSection>
        </>
      )}
    </>
  );
}
