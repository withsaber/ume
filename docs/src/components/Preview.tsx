import React from 'react';

/** Light preview box that renders live ume components. */
export function Preview({ children }: { children: React.ReactNode }) {
  return <div className="docs-preview">{children}</div>;
}

export interface PropRow {
  name: string;
  type: string;
  description: string;
  required?: boolean;
}

/** Properties list: name chip, type, description — one row per prop. */
export function PropsTable({ rows }: { rows: PropRow[] }) {
  return (
    <div className="docs-props">
      {rows.map((row) => (
        <div className="docs-props__row" key={row.name}>
          <div className="docs-props__head">
            <code className="docs-chip">{row.name}</code>
            <span className="docs-props__type">{row.type}</span>
            {row.required && <span className="docs-props__required">required</span>}
          </div>
          <p className="docs-props__desc">{row.description}</p>
        </div>
      ))}
    </div>
  );
}
