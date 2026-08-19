import React from 'react';
import { DocSection } from '../components/DocSection';
import { Preview } from '../components/Preview';

const STATES: Array<[string, string, string, string]> = [
  ['Default', 'you@email.com', 'var(--ume-text-tertiary)', 'Hint'],
  ['Hover', 'you@email.com', 'var(--ume-text-tertiary)', 'Hint'],
  ['Focus', 'saber@squidx.co', 'var(--ume-text-tertiary)', 'Hint'],
  ['Filled', 'saber@squidx.co', 'var(--ume-text-tertiary)', 'Hint'],
  ['Error', 'not-an-email', '#B91C1C', 'Please enter a valid email.'],
  ['Success', 'saber@squidx.co', '#00804B', 'Looks good.'],
  ['Disabled', 'locked', 'var(--ume-text-tertiary)', 'Hint'],
];

export default function FormPatternsPage() {
  return (
    <>
      <header className="docs-pagehead">
        <h1 className="docs-h1">Form patterns</h1>
        <p className="docs-lede">
          Label positions, input states, helper text, and validation — the conventions every form in
          Ume follows.
        </p>
      </header>

      <DocSection id="states" title="Input states">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {STATES.map(([label, val, helpColor, helper]) => {
            const isError = label === 'Error';
            const isSuccess = label === 'Success';
            const isFocus = label === 'Focus';
            const isDisabled = label === 'Disabled';
            const bg = isFocus || isError || isSuccess ? 'var(--ume-bg-raised)' : isDisabled ? 'var(--ume-bg-sunken)' : 'var(--ume-bg-field)';
            const brd = isFocus
              ? 'inset 0 0 0 1.5px var(--ume-border-focus, #2B5DF3), 0 0 0 3px rgba(43, 93, 243, 0.35)'
              : isError
              ? 'inset 0 0 0 1.5px #DC2626'
              : isSuccess
              ? 'inset 0 0 0 1.5px #00A05E'
              : 'inset 0 0 0 1px var(--ume-border-default, #D4D4D1)';
            return (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ fontSize: 13, fontWeight: 550, color: 'var(--ume-text-secondary)' }}>{label}</div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: 38,
                    padding: '0 12px',
                    borderRadius: 10,
                    background: bg,
                    boxShadow: brd,
                    opacity: isDisabled ? 0.55 : 1,
                    fontSize: 14,
                    color: val ? 'var(--ume-text-primary)' : 'var(--ume-text-tertiary)',
                  }}
                >
                  {val}
                </div>
                <div style={{ fontSize: 11, color: helpColor }}>{helper}</div>
              </div>
            );
          })}
        </div>
      </DocSection>

      <DocSection id="label-positions" title="Label positions">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 550, color: 'var(--ume-text-secondary)' }}>Top-aligned</label>
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
              Saber Khan
            </div>
            <div style={{ fontSize: 11, color: 'var(--ume-text-tertiary)' }}>Default for forms.</div>
          </div>
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div
              style={{
                position: 'absolute',
                left: 12,
                top: -7,
                padding: '0 4px',
                background: 'var(--ume-bg-canvas)',
                fontSize: 11,
                fontWeight: 550,
                color: 'var(--ume-text-secondary)',
                zIndex: 1,
              }}
            >
              Floating
            </div>
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
              saber@squidx.co
            </div>
            <div style={{ fontSize: 11, color: 'var(--ume-text-tertiary)' }}>Compact when dense.</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ fontSize: 13, fontWeight: 550, color: 'var(--ume-text-secondary)', minWidth: 60 }}>Inline</div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                height: 32,
                padding: '0 10px',
                borderRadius: 8,
                background: 'var(--ume-bg-field)',
                boxShadow: 'inset 0 0 0 1px var(--ume-border-default)',
                fontSize: 13,
                color: 'var(--ume-text-primary)',
              }}
            >
              Saber
            </div>
          </div>
        </div>
      </DocSection>

      <DocSection id="composition" title="Form composition">
        <Preview>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 18,
              maxWidth: 560,
              padding: 24,
              borderRadius: 14,
              background: 'var(--ume-bg-raised)',
              boxShadow: 'inset 0 0 0 1px var(--ume-border-subtle)',
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 650, color: 'var(--ume-text-primary)' }}>Create account</div>
            <div style={{ fontSize: 13, color: 'var(--ume-text-tertiary)' }}>It takes less than a minute.</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {['First name', 'Last name'].map((l, i) => (
                <div key={l} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ fontSize: 13, fontWeight: 550, color: 'var(--ume-text-secondary)' }}>{l}</div>
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
                    {i === 0 ? 'Saber' : 'Khan'}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, paddingTop: 8 }}>
              <button
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  height: 36,
                  padding: '0 16px',
                  borderRadius: 10,
                  background: 'transparent',
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'var(--ume-text-secondary)',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  height: 36,
                  padding: '0 18px',
                  borderRadius: 10,
                  background: '#2B5DF3',
                  color: '#FFFFFF',
                  fontSize: 14,
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 1px 2px rgba(12,12,12,0.12)',
                }}
              >
                Create account
              </button>
            </div>
          </div>
        </Preview>
      </DocSection>
    </>
  );
}
