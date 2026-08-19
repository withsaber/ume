import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { NAV_PAGES, PAGE_SECTIONS } from '../nav';
import { pageHref, anchorHref } from '../router';
import { Icon } from '../../../src';

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

interface Result {
  key: string;
  label: string;
  hint: string;
  href: string;
}

const ALL_RESULTS: Result[] = NAV_PAGES.flatMap((p) => [
  { key: p.id, label: p.label, hint: p.group, href: pageHref(p.id) },
  ...(PAGE_SECTIONS[p.id] ?? []).map((s) => ({
    key: `${p.id}/${s.id}`,
    label: s.label,
    hint: p.label,
    href: anchorHref(p.id, s.id),
  })),
]);

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ALL_RESULTS;
    return ALL_RESULTS.filter(
      (r) => r.label.toLowerCase().includes(q) || r.hint.toLowerCase().includes(q)
    );
  }, [query]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => setIndex(0), [query]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setIndex((i) => Math.min(i + 1, results.length - 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === 'Enter' && results[index]) {
        window.location.hash = results[index].href;
        onClose();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, results, index, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="docs-searchdialog__scrim"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="docs-searchdialog" role="dialog" aria-modal="true" aria-label="Search documentation">
        <div className="docs-searchdialog__inputrow">
          <Icon name="search" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Ume UI..."
            aria-label="Search documentation"
          />
          <kbd className="docs-search__kbd">esc</kbd>
        </div>
        <ul className="docs-searchdialog__results" role="listbox">
          {results.length === 0 && <li className="docs-searchdialog__empty">No results for “{query}”.</li>}
          {results.map((r, i) => (
            <li key={r.key}>
              <a
                href={r.href}
                role="option"
                aria-selected={i === index}
                className={`docs-searchdialog__result${i === index ? ' docs-searchdialog__result--active' : ''}`}
                onMouseEnter={() => setIndex(i)}
                onClick={onClose}
              >
                <span>{r.label}</span>
                <span className="docs-searchdialog__hint">{r.hint}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>,
    document.body
  );
}
