import React from 'react';
import './keycodesequence.css';

/* ---------- KeyCodeSequence ---------- */
const KEY_ALIASES: Record<string, string> = {
  cmd: '⌘',
  meta: '⌘',
  command: '⌘',
  '⌘': '⌘',
  shift: '⇧',
  alt: '⌥',
  option: '⌥',
  ctrl: '⌃',
  control: '⌃',
  enter: '↵',
  return: '↵',
  backspace: '⌫',
  delete: '⌦',
  esc: 'esc',
  escape: 'esc',
  up: '↑',
  down: '↓',
  left: '←',
  right: '→',
  space: '␣',
};

function normalizeKey(key: string): string {
  const alias = KEY_ALIASES[key.toLowerCase()];
  if (alias) return alias;
  return key.length === 1 ? key.toUpperCase() : key;
}

export interface KeyCodeSequenceProps {
  keys: Array<string>;
  separator?: React.ReactNode;
  size?: 'sm' | 'md';
  className?: string;
}

export function KeyCodeSequence({ keys, separator, size = 'md', className = '' }: KeyCodeSequenceProps) {
  const chips: React.ReactNode[] = [];
  keys.forEach((key, i) => {
    if (separator && i > 0) {
      chips.push(
        <span key={`sep-${i}`} className="ume-kbd__separator" aria-hidden="true">
          {separator}
        </span>,
      );
    }
    chips.push(
      <kbd key={`key-${i}`} className={`ume-kbd ume-kbd--${size}`}>
        {normalizeKey(key)}
      </kbd>,
    );
  });
  return (
    <span className={`ume-kbd-sequence ${className}`.trim()} role="group" aria-label={keys.join(' + ')}>
      {chips}
    </span>
  );
}
