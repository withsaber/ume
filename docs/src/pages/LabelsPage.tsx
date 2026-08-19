import React from 'react';
import { DocSection } from '../components/DocSection';
import { Preview, PropsTable } from '../components/Preview';

const ROLES: Array<[string, string, string, number, number, string, string?]> = [
  ['Label', 'Email address', 'var(--ume-text-secondary)', 13, 550, ''],
  ['Helper', 'We will send a verification link.', 'var(--ume-text-tertiary)', 11, 400, ''],
  ['Error', 'Please enter a valid email.', '#B91C1C', 11, 500, ''],
  ['Success', 'Looks good.', '#00804B', 11, 500, ''],
  ['Caption', 'Updated 3 minutes ago', 'var(--ume-text-tertiary)', 12, 500, ''],
  ['Footnote', '1 of 12', 'var(--ume-text-tertiary)', 10, 500, '0.04em'],
  ['Section heading', 'Account settings', 'var(--ume-text-primary)', 16, 650, '-0.01em'],
  ['Stat', '$48,210', 'var(--ume-text-primary)', 32, 700, '-0.02em'],
  ['Disabled', 'Locked field', 'var(--ume-text-disabled)', 13, 400, ''],
];

export default function LabelsPage() {
  return (
    <>
      <header className="docs-pagehead">
        <h1 className="docs-h1">Labels & captions</h1>
        <p className="docs-lede">
          The text roles used in product UI. Three roles, three sizes each — kept minimal. Always use
          semantic HTML (label, figcaption).
        </p>
      </header>

      <DocSection id="roles" title="Roles">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {ROLES.map(([role, sample, color, size, weight, tracking]) => (
            <div
              key={role}
              style={{
                display: 'grid',
                gridTemplateColumns: '160px 1fr 120px',
                alignItems: 'center',
                gap: 16,
                padding: '10px 0',
                borderBottom: '1px solid var(--ume-border-subtle)',
              }}
            >
              <div style={{ fontSize: 12, color: 'var(--ume-text-tertiary)', fontWeight: 500 }}>{role}</div>
              <div style={{ fontSize: size, color, fontWeight: weight, letterSpacing: tracking }}>{sample}</div>
              <div
                style={{
                  fontFamily: 'var(--ume-font-mono)',
                  fontSize: 10,
                  color: 'var(--ume-text-tertiary)',
                  textAlign: 'right',
                }}
              >
                {size}/{weight}
              </div>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection id="in-context" title="In context">
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, width: 360 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 550, color: 'var(--ume-text-secondary)' }}>Display name</label>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  height: 38,
                  padding: '0 12px',
                  borderRadius: 10,
                  background: 'var(--ume-bg-field)',
                  boxShadow: 'inset 0 0 0 1px var(--ume-border-default)',
                  fontSize: 14,
                  color: 'var(--ume-text-primary)',
                }}
              >
                Saber
              </div>
              <div style={{ fontSize: 11, color: 'var(--ume-text-tertiary)' }}>
                This is how your name will appear on invoices.
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                padding: 20,
                borderRadius: 14,
                background: 'var(--ume-bg-raised)',
                boxShadow: 'inset 0 0 0 1px var(--ume-border-subtle)',
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', color: 'var(--ume-text-tertiary)', textTransform: 'uppercase' }}>
                Revenue · 30d
              </div>
              <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--ume-text-primary)' }}>
                $48,210
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--ume-text-tertiary)' }}>
                <span>vs $42k last period</span>
                <span>Updated 3 min ago</span>
              </div>
            </div>
          </div>
        </Preview>
      </DocSection>
    </>
  );
}
