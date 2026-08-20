import React from 'react';
import { DocSection } from '../components/DocSection';
import { Preview } from '../components/Preview';

const ringLight = '0 0 0 3px rgba(54.4% 0.231 265.1 / 0.28)';
const ringDark = '0 0 0 3px rgba(62% 0.199 263.3 / 0.35)';

/* The unified form as it appears on Paper (Forms page, top row).
   Mirrors "Form — Full Preview" + "Form — Full Preview — Dark" boards.
   Every value references --ume-* tokens — no hardcoded colors/sizes. */
function FullFormPreview({ theme }: { theme: 'light' | 'dark' }) {
  const isDark = theme === 'dark';

  // Colors
  const textPrimary = isDark ? 'var(--color-ume-grey-100)' : 'var(--ume-text-primary)';
  const textSecondary = isDark ? 'var(--color-ume-grey-300)' : 'var(--ume-text-secondary)';
  const textTertiary = isDark ? 'var(--color-ume-grey-500)' : 'var(--ume-text-tertiary)';
  const fieldBg = isDark ? 'rgb(255 255 255 / 0.07)' : 'var(--ume-bg-field)';
  const fieldBorder = isDark ? 'inset 0 0 0 1px rgb(255 255 255 / 0.08)' : 'inset 0 0 0 1px transparent';
  const canvasBg = isDark ? 'var(--color-ume-grey-900)' : 'var(--ume-bg-canvas)';
  const linkColor = isDark ? 'var(--color-ume-blue-300)' : 'var(--ume-text-link)';

  // Typography & spacing
  const radius = 'var(--ume-radius-md)';

  return (
    <div
      data-ume-theme={theme}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        padding: 32,
        fontFamily: 'var(--ume-font-sans)',
        fontSize: 14,
        color: textPrimary,
        background: canvasBg,
        width: '100%',
      }}
    >
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 600, margin: 0, color: textPrimary, lineHeight: '26px' }}>
          Payment &amp; Account
        </h2>
        <p style={{ fontSize: 13, color: textSecondary, margin: '4px 0 0', lineHeight: '20px' }}>
          All form primitives at once. Same token contract — every spacing, radius, color, focus state
          reads from <code style={{ fontFamily: 'var(--ume-font-mono)', fontSize: 12, color: textTertiary }}>var(--ume-…)</code>.
        </p>
      </div>

      {/* Row 1: First / Last name */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Field label="First name" value="Saber" tokenText={textPrimary} tokenBg={fieldBg} tokenBorder={fieldBorder} radius={radius} />
        <Field label="Last name" placeholder="Rahman" tokenText={textPrimary} tokenBg={fieldBg} tokenBorder={fieldBorder} radius={radius} />
      </div>

      {/* Row 2: Email / Phone */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Field label="Email" placeholder="you@ume.com" type="email" tokenText={textPrimary} tokenBg={fieldBg} tokenBorder={fieldBorder} radius={radius} />
        <PhoneField label="Phone" value="1700 123 456" tokenText={textPrimary} tokenBg={fieldBg} tokenBorder={fieldBorder} tokenSecondary={textSecondary} isDark={isDark} radius={radius} />
      </div>

      {/* Row 3: Card / Country */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
        <CardField label="Card number" value="4242 4242 4242 4242" tokenText={textPrimary} tokenBg={fieldBg} tokenBorder={fieldBorder} radius={radius} />
        <SelectField label="Country" value="Bangladesh" tokenText={textPrimary} tokenBg={fieldBg} tokenBorder={fieldBorder} tokenTertiary={textTertiary} radius={radius} />
      </div>

      {/* Row 4: Expiry / CVC (CVC focused) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Label tokenText={textSecondary}>Expiry &amp; CVC</Label>
        <div style={{ display: 'flex', gap: 12 }}>
          <Field label={undefined} value="08/28" placeholder="MM/YY" mono tokenText={textPrimary} tokenBg={fieldBg} tokenBorder={fieldBorder} radius={radius} />
          <Field
            label={undefined}
            value="123"
            placeholder="CVC"
            mono
            focused
            tokenText={textPrimary}
            tokenBg={fieldBg}
            tokenBorder={fieldBorder}
            ring={isDark ? ringDark : ringLight}
            radius={radius}
          />
        </div>
        <span style={{ fontSize: 12, color: textTertiary }}>
          CVC field is{' '}
          <span style={{ color: linkColor, fontWeight: 550 }}>focused</span> — note the 3px blue ring.
        </span>
      </div>

      {/* Row 5: CodeInput (one filled, one focused) */}
      <CodeRow theme={theme} radius={radius} />

      {/* Row 6: Bio */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Label tokenText={textSecondary}>Bio</Label>
        <div
          style={{
            height: 80,
            padding: 12,
            background: fieldBg,
            borderRadius: radius,
            boxShadow: fieldBorder,
            display: 'flex',
            alignItems: 'flex-start',
          }}
        >
          <span style={{ fontSize: 14, color: textTertiary, fontStyle: 'italic' }}>
            Tell us a little about yourself. Optional.
          </span>
        </div>
      </div>

      {/* Row 7: Toggle + checkbox */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 8 }}>
        <ToggleRow theme={theme} label="Save card for next time" />
        <CheckboxRow theme={theme} linkColor={linkColor} textPrimary={textPrimary} />
      </div>

      {/* Row 8: Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 8 }}>
        <button
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 44,
            padding: '0 24px',
            background: isDark ? 'var(--color-ume-grey-100)' : 'var(--ume-action-primary-bg)',
            color: isDark ? 'var(--color-ume-grey-900)' : 'var(--ume-action-primary-text)',
            fontFamily: 'var(--ume-font-sans)',
            fontSize: 14,
            fontWeight: 600,
            border: 'none',
            borderRadius: radius,
            cursor: 'pointer',
            flex: 1,
            maxWidth: 280,
          }}
        >
          Pay $128.40
        </button>
        <button
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 44,
            padding: '0 24px',
            background: 'transparent',
            color: isDark ? 'var(--color-ume-grey-400)' : 'var(--ume-text-secondary)',
            fontFamily: 'var(--ume-font-sans)',
            fontSize: 14,
            fontWeight: 550,
            border: 'none',
            borderRadius: radius,
            cursor: 'pointer',
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

/* ── primitives ──────────────────────────────────────────────────────────── */

function Label({ children, tokenText }: { children: React.ReactNode; tokenText: string }) {
  return (
    <label style={{ fontSize: 13, fontWeight: 550, color: tokenText }}>{children}</label>
  );
}

function Field({
  label,
  value,
  placeholder,
  type = 'text',
  mono,
  focused,
  tokenText,
  tokenBg,
  tokenBorder,
  ring,
  radius,
}: {
  label?: string;
  value?: string;
  placeholder?: string;
  type?: string;
  mono?: boolean;
  focused?: boolean;
  tokenText: string;
  tokenBg: string;
  tokenBorder: string;
  ring?: string;
  radius: string;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {label && <Label tokenText={tokenText}>{label}</Label>}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: 38,
          padding: '0 12px',
          background: tokenBg,
          borderRadius: radius,
          boxShadow: focused
            ? `inset 0 0 0 1.5px var(--ume-border-focus), ${ring}`
            : tokenBorder,
          fontSize: 14,
          color: tokenText,
          fontFamily: mono ? 'var(--ume-font-mono)' : 'inherit',
          letterSpacing: mono ? '0.02em' : 'normal',
        }}
      >
        {value ?? <span style={{ color: 'var(--ume-text-tertiary)' }}>{placeholder}</span>}
      </div>
    </div>
  );
}

function PhoneField({
  label,
  value,
  tokenText,
  tokenBg,
  tokenBorder,
  tokenSecondary,
  isDark,
  radius,
}: {
  label: string;
  value: string;
  tokenText: string;
  tokenBg: string;
  tokenBorder: string;
  tokenSecondary: string;
  isDark: boolean;
  radius: string;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Label tokenText={tokenText}>{label}</Label>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          height: 38,
          padding: '0 12px',
          background: tokenBg,
          borderRadius: radius,
          boxShadow: tokenBorder,
          gap: 8,
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '2px 8px',
            borderRadius: 'var(--ume-radius-sm)',
            background: isDark ? 'rgb(255 255 255 / 0.06)' : 'var(--ume-bg-raised)',
            boxShadow: isDark
              ? 'inset 0 0 0 1px rgb(255 255 255 / 0.06)'
              : 'inset 0 0 0 1px var(--ume-border-subtle)',
            fontFamily: 'var(--ume-font-mono)',
            fontSize: 12,
            color: tokenSecondary,
            flexShrink: 0,
          }}
        >
          +880
        </span>
        <span
          style={{
            fontFamily: 'var(--ume-font-mono)',
            letterSpacing: '0.02em',
            fontSize: 14,
            color: tokenText,
          }}
        >
          {value}
        </span>
      </div>
    </div>
  );
}

function CardField({
  label,
  value,
  tokenText,
  tokenBg,
  tokenBorder,
  radius,
}: {
  label: string;
  value: string;
  tokenText: string;
  tokenBg: string;
  tokenBorder: string;
  radius: string;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Label tokenText={tokenText}>{label}</Label>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          height: 38,
          padding: '0 12px',
          background: tokenBg,
          borderRadius: radius,
          boxShadow: tokenBorder,
          gap: 8,
        }}
      >
        <span
          style={{
            flex: 1,
            fontFamily: 'var(--ume-font-mono)',
            letterSpacing: '0.02em',
            fontSize: 14,
            color: tokenText,
          }}
        >
          {value}
        </span>
        {/* Brand chip — Visa is a 3rd-party brand color, NOT a token. */}
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            height: 22,
            padding: '0 8px',
            borderRadius: 'var(--ume-radius-sm)',
            background: '#1A1F71',
            fontFamily: 'var(--ume-font-mono)',
            fontSize: 10,
            fontWeight: 600,
            color: '#fff',
            letterSpacing: '0.04em',
            flexShrink: 0,
          }}
        >
          VISA
        </span>
      </div>
    </div>
  );
}

function SelectField({
  label,
  value,
  tokenText,
  tokenBg,
  tokenBorder,
  tokenTertiary,
  radius,
}: {
  label: string;
  value: string;
  tokenText: string;
  tokenBg: string;
  tokenBorder: string;
  tokenTertiary: string;
  radius: string;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Label tokenText={tokenText}>{label}</Label>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 38,
          padding: '0 12px',
          background: tokenBg,
          borderRadius: radius,
          boxShadow: tokenBorder,
          fontSize: 14,
          color: tokenText,
        }}
      >
        <span>{value}</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: tokenTertiary }}
          />
        </svg>
      </div>
    </div>
  );
}

function CodeRow({ theme, radius }: { theme: 'light' | 'dark'; radius: string }) {
  const isDark = theme === 'dark';
  const cellBg = isDark ? 'var(--color-ume-grey-800)' : 'var(--ume-bg-raised)';
  const cellBgFocus = isDark ? 'var(--color-ume-grey-900)' : 'var(--ume-bg-raised)';
  const cellBorder = isDark ? 'inset 0 0 0 1px rgb(255 255 255 / 0.08)' : 'inset 0 0 0 1px var(--ume-border-default)';
  const cellBorderFilled = isDark
    ? 'inset 0 0 0 1px var(--color-ume-grey-600)'
    : 'inset 0 0 0 1px var(--ume-border-strong)';
  const focusRing = isDark ? ringDark : ringLight;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Label tokenText={isDark ? 'var(--color-ume-grey-300)' : 'var(--ume-text-secondary)'}>
        Verification code
      </Label>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        <div
          style={{
            width: 40,
            height: 40,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: cellBg,
            borderRadius: radius,
            boxShadow: cellBorderFilled,
            fontSize: 16,
            fontWeight: 600,
            color: isDark ? 'var(--color-ume-grey-100)' : 'var(--ume-text-primary)',
          }}
        >
          7
        </div>
        <div
          style={{
            width: 40,
            height: 40,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: cellBgFocus,
            borderRadius: radius,
            boxShadow: `inset 0 0 0 1.5px var(--ume-border-focus), ${focusRing}`,
            fontFamily: 'var(--ume-font-mono)',
            fontSize: 16,
            fontWeight: 600,
            color: isDark ? 'var(--color-ume-grey-100)' : 'var(--ume-text-primary)',
          }}
        >
          _
        </div>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              width: 40,
              height: 40,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: cellBg,
              borderRadius: radius,
              boxShadow: cellBorder,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function ToggleRow({ theme, label }: { theme: 'light' | 'dark'; label: string }) {
  const isDark = theme === 'dark';
  const trackOn = isDark ? 'var(--color-ume-blue-400)' : 'var(--ume-action-accent-bg)';
  const knobShadow = isDark
    ? '0 1px 2px rgb(0 0 0 / 0.5)'
    : 'var(--ume-shadow-1)';
  const textColor = isDark ? 'var(--color-ume-grey-200)' : 'var(--ume-text-primary)';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div
        style={{
          position: 'relative',
          width: 40,
          height: 24,
          background: trackOn,
          borderRadius: 'var(--ume-radius-full)',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 3,
            left: 19,
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: '#fff',
            boxShadow: knobShadow,
          }}
        />
      </div>
      <span style={{ fontSize: 13, color: textColor }}>{label}</span>
    </div>
  );
}

function CheckboxRow({
  theme,
  linkColor,
  textPrimary,
}: {
  theme: 'light' | 'dark';
  linkColor: string;
  textPrimary: string;
}) {
  const isDark = theme === 'dark';
  const boxBg = isDark ? 'var(--color-ume-blue-400)' : 'var(--ume-action-accent-bg)';
  const checkColor = isDark ? '#0a0a0a' : '#fff';
  const textColor = isDark ? 'var(--color-ume-grey-200)' : 'var(--ume-text-primary)';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div
        style={{
          width: 18,
          height: 18,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: boxBg,
          borderRadius: 'var(--ume-radius-sm)',
          flexShrink: 0,
        }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2.5 6.5l2.5 2.5L9.5 3.5" stroke={checkColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <span style={{ fontSize: 13, color: textColor }}>
        I agree to the <span style={{ color: linkColor }}>Terms</span> &amp;{' '}
        <span style={{ color: linkColor }}>Privacy Policy</span>
      </span>
    </div>
  );
}

/* ── page ─────────────────────────────────────────────────────────────────── */

export default function FormPreviewsPage() {
  return (
    <>
      <header className="docs-pagehead">
        <h1 className="docs-h1">Form previews</h1>
        <p className="docs-lede">
          Every form primitive at once — Input, PhoneInput, CardNumber, ExpiryCVC, CodeInput,
          TextArea, Toggle, Checkbox, Select, and Button — composed in one realistic form, shown
          side-by-side in Light and Dark. Mirrors the <code>Form — Full Preview</code> boards on
          the Forms page of Paper.
        </p>
      </header>

      <DocSection id="light" title="Light" description="Default Ume light surface.">
        <Preview>
          <FullFormPreview theme="light" />
        </Preview>
      </DocSection>

      <DocSection id="dark" title="Dark" description="Dark surfaces via Paper's dark-mode frame.">
        <Preview>
          <FullFormPreview theme="dark" />
        </Preview>
      </DocSection>
    </>
  );
}
