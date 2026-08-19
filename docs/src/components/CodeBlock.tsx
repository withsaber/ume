import React, { useState } from 'react';
import { Icon } from '../../../src';

/* ---------- Tiny syntax highlighter for TSX / bash snippets ---------- */

type TokenType = 'keyword' | 'tag' | 'attr' | 'string' | 'punct' | 'comment' | 'plain';

interface Token {
  type: TokenType;
  text: string;
}

const KEYWORDS = new Set(['import', 'from', 'export', 'const', 'let', 'return', 'function', 'default']);

function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];
  // comment lines (bash or js)
  if (/^\s*(#|\/\/)/.test(line)) {
    return [{ type: 'comment', text: line }];
  }
  const re = /('[^']*'|"[^"]*"|`[^`]*`)|([A-Za-z_$][\w$.]*)|([{}()[\]<>\/=;,:]+)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(line)) !== null) {
    if (m.index > last) tokens.push({ type: 'plain', text: line.slice(last, m.index) });
    const [full, str, word, punct] = m;
    if (str) {
      tokens.push({ type: 'string', text: full });
    } else if (word) {
      if (KEYWORDS.has(word)) tokens.push({ type: 'keyword', text: full });
      else if (/^[A-Z]/.test(word)) tokens.push({ type: 'tag', text: full });
      else tokens.push({ type: 'attr', text: full });
    } else if (punct) {
      tokens.push({ type: 'punct', text: full });
    }
    last = m.index + full.length;
  }
  if (last < line.length) tokens.push({ type: 'plain', text: line.slice(last) });
  return tokens;
}

function HighlightedCode({ code }: { code: string }) {
  return (
    <>
      {code.split('\n').map((line, i) => (
        <div className="docs-code__line" key={i}>
          {tokenizeLine(line).map((t, j) => (
            <span key={j} className={`tok-${t.type}`}>
              {t.text}
            </span>
          ))}
          {line === '' && ' '}
        </div>
      ))}
    </>
  );
}

/* ---------- CodeBlock ---------- */

interface CodeBlockProps {
  /** Header label, e.g. 'Example: Sizes' */
  title?: string;
  code: string;
}

export function CodeBlock({ title, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };
  return (
    <figure className="docs-code">
      <div className="docs-code__header">
        <span className="docs-code__title">{title ?? 'Example'}</span>
        <button className="docs-code__copy" onClick={copy} aria-label="Copy code">
          {copied ? <Icon name="check" size={14} /> : <Icon name="copy" size={14} />}
        </button>
      </div>
      <pre className="docs-code__body">
        <code>
          <HighlightedCode code={code} />
        </code>
      </pre>
    </figure>
  );
}
