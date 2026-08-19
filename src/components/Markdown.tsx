import React from 'react';
import { CodeBlock } from './CodeBlock';
import './markdown.css';

/* ---------- Markdown ----------
   A small, dependency-free markdown renderer: headings, bold/italic, inline
   code, links, lists, fenced code blocks, and paragraphs. Renders real React
   elements — no dangerouslySetInnerHTML. */
export interface MarkdownProps {
  content: string;
  className?: string;
}

/* ---------- Inline parsing: **bold**, *italic*, `code`, [text](url) ---------- */

const INLINE_RE = /(\*\*[^*]+\*\*|\*[^*\n]+\*|`[^`\n]+`|\[[^\]\n]+\]\([^)\s]+\))/g;

function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  INLINE_RE.lastIndex = 0;
  while ((m = INLINE_RE.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const tok = m[0];
    const key = `${keyPrefix}-${i++}`;
    if (tok.startsWith('**')) {
      nodes.push(<strong key={key}>{tok.slice(2, -2)}</strong>);
    } else if (tok.startsWith('*')) {
      nodes.push(<em key={key}>{tok.slice(1, -1)}</em>);
    } else if (tok.startsWith('`')) {
      nodes.push(
        <code key={key} className="ume-markdown__code">
          {tok.slice(1, -1)}
        </code>
      );
    } else {
      const match = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(tok);
      if (match) {
        nodes.push(
          <a key={key} className="ume-markdown__link" href={match[2]} target="_blank" rel="noreferrer">
            {match[1]}
          </a>
        );
      } else {
        nodes.push(tok);
      }
    }
    last = m.index + tok.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

/* ---------- Block parsing ---------- */

type Block =
  | { type: 'heading'; level: 1 | 2 | 3; text: string }
  | { type: 'code'; code: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'para'; text: string };

function parseBlocks(content: string): Block[] {
  const blocks: Block[] = [];
  const lines = content.split('\n');
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    // Fenced code block
    if (/^```/.test(line.trim())) {
      const buf: string[] = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i].trim())) {
        buf.push(lines[i]);
        i++;
      }
      i++; // skip closing fence
      blocks.push({ type: 'code', code: buf.join('\n') });
      continue;
    }

    // Headings
    const heading = /^(#{1,3})\s+(.*)$/.exec(line);
    if (heading) {
      blocks.push({ type: 'heading', level: heading[1].length as 1 | 2 | 3, text: heading[2].trim() });
      i++;
      continue;
    }

    // Unordered list
    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*]\s+/, '').trim());
        i++;
      }
      blocks.push({ type: 'ul', items });
      continue;
    }

    // Ordered list
    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+\.\s+/, '').trim());
        i++;
      }
      blocks.push({ type: 'ol', items });
      continue;
    }

    // Blank line
    if (line.trim() === '') {
      i++;
      continue;
    }

    // Paragraph: consecutive non-blank, non-special lines
    const buf: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !/^```/.test(lines[i].trim()) &&
      !/^(#{1,3})\s+/.test(lines[i]) &&
      !/^\s*[-*]\s+/.test(lines[i]) &&
      !/^\s*\d+\.\s+/.test(lines[i])
    ) {
      buf.push(lines[i].trim());
      i++;
    }
    blocks.push({ type: 'para', text: buf.join(' ') });
  }
  return blocks;
}

export function Markdown({ content, className = '' }: MarkdownProps) {
  const blocks = parseBlocks(content);
  return (
    <div className={`ume-markdown ${className}`.trim()}>
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'heading': {
            const Tag = (`h${block.level}`) as 'h1' | 'h2' | 'h3';
            return (
              <Tag key={i} className={`ume-markdown__h${block.level}`}>
                {renderInline(block.text, `h-${i}`)}
              </Tag>
            );
          }
          case 'code':
            return (
              <div key={i}>
                <CodeBlock code={block.code} />
              </div>
            );
          case 'ul':
            return (
              <ul key={i} className="ume-markdown__list">
                {block.items.map((item, j) => (
                  <li key={j}>{renderInline(item, `ul-${i}-${j}`)}</li>
                ))}
              </ul>
            );
          case 'ol':
            return (
              <ol key={i} className="ume-markdown__list">
                {block.items.map((item, j) => (
                  <li key={j}>{renderInline(item, `ol-${i}-${j}`)}</li>
                ))}
              </ol>
            );
          case 'para':
            return (
              <p key={i} className="ume-markdown__p">
                {renderInline(block.text, `p-${i}`)}
              </p>
            );
        }
      })}
    </div>
  );
}
