import React from 'react';
import { DocSection } from '../components/DocSection';

/* Mirrors the "Syntax" board on Paper (Foundation page).
   10 syntax tokens, 5 language samples, dark code panel. */

const TOKENS = [
  { token: '--color-syntax-keyword', role: 'const, function, return, if', color: '#0066D9' },
  { token: '--color-syntax-string', role: 'string literals', color: '#D9393E' },
  { token: '--color-syntax-number', role: 'numeric literals', color: '#A85A8C' },
  { token: '--color-syntax-comment', role: 'comments', color: '#6E6E73' },
  { token: '--color-syntax-function', role: 'function calls', color: '#00884F' },
  { token: '--color-syntax-type', role: 'types, interfaces', color: '#823A5E' },
];

const SAMPLES: Record<string, string> = {
  TypeScript: `interface ImageBuffer { data: ArrayBuffer }
export async function generateImageTLDR() {
  const options = await getAIConfig();  // maxLength updated per prompt
  const maxLength = 350;
  return { maxLength };
}`,
  Python: `@dataclass
class Capture:
    id: str
    title: str = "Untitled"

def render(c: Capture) -> dict:
    return {"id": c.id, "title": c.title}  # 350 max`,
  Bash: `#!/usr/bin/env bash
# Install ume
curl -fsSL ume.design/install | bash
ume --version  # 1.0.0`,
  JSON: `{
  "name": "ume",
  "version": "1.0.0",
  "private": true,
  "icons": 2129
}`,
};

function highlight(code: string) {
  // Tiny regex highlighter matching the token roles.
  return code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(
      /\b(const|function|return|if|export|async|await|interface|def|class|import|from|for|in|new|typeof)\b/g,
      '<span style="color:#0066D9">$1</span>',
    )
    .replace(/("[^"]*"|'[^']*')/g, '<span style="color:#D9393E">$1</span>')
    .replace(/\b(\d+)\b/g, '<span style="color:#A85A8C">$1</span>')
    .replace(/(#[^\n]*|\/\/[^\n]*)/g, '<span style="color:#6E6E73">$1</span>');
}

function CodePanel({ lang, code }: { lang: string; code: string }) {
  return (
    <div
      style={{
        background: '#201D1D',
        borderRadius: 8,
        overflow: 'hidden',
        border: '1px solid rgba(255,240,230,0.10)',
      }}
    >
      <div
        style={{
          padding: '8px 14px',
          background: '#302C2C',
          fontFamily: 'var(--ume-font-mono)',
          fontSize: 11,
          color: '#9A9898',
        }}
      >
        {lang}
      </div>
      <pre
        style={{
          margin: 0,
          padding: 14,
          fontFamily: 'var(--ume-font-mono)',
          fontSize: 12,
          lineHeight: '20px',
          color: '#FAFAF9',
          overflowX: 'auto',
        }}
        dangerouslySetInnerHTML={{ __html: highlight(code) }}
      />
    </div>
  );
}

export default function SyntaxPage() {
  return (
    <>
      <header className="docs-pagehead">
        <h1 className="docs-h1">Syntax</h1>
        <p className="docs-lede">
          One token set for code highlighting across every language. Apple Blue owns keywords;
          strings are red, numbers plum, comments grey, functions green, types plum-deep.
        </p>
      </header>

      <DocSection id="tokens" title="Tokens" description="The full set.">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {TOKENS.map((t) => (
            <div
              key={t.token}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 12px',
                border: '1px solid var(--ume-border-default)',
                borderRadius: 6,
              }}
            >
              <div style={{ width: 14, height: 14, borderRadius: 3, background: t.color }} />
              <code style={{ fontFamily: 'var(--ume-font-mono)', fontSize: 11 }}>{t.token}</code>
              <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--ume-text-tertiary)' }}>
                {t.role}
              </span>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection
        id="samples"
        title="Per-language samples"
        description="Same tokens, four languages. The code panel is always warm dark (#201D1D), in both themes."
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {Object.entries(SAMPLES).map(([lang, code]) => (
            <CodePanel key={lang} lang={lang} code={code} />
          ))}
        </div>
      </DocSection>
    </>
  );
}
