import React from 'react';
import { Icon } from '../../../src';
import { Logo } from './Logo';

interface TopBarProps {
  theme: 'light' | 'dark';
  scrolled?: boolean;
  onToggleTheme: () => void;
  onOpenSearch: () => void;
  onToggleNav: () => void;
}

export function TopBar({ theme, scrolled, onToggleTheme, onOpenSearch, onToggleNav }: TopBarProps) {
  return (
    <header className={`docs-topbar${scrolled ? ' docs-topbar--scrolled' : ''}`}>
      <div className="docs-topbar__left">
        <button
          className="docs-iconbtn docs-topbar__menu"
          aria-label="Toggle navigation"
          onClick={onToggleNav}
        >
          <Icon name="menu" />
        </button>
        <span className="docs-topbar__logo">
          <Logo />
        </span>
      </div>
      <button className="docs-search" onClick={onOpenSearch} aria-label="Search documentation">
        <Icon name="search" />
        <span className="docs-search__placeholder">Search Ume UI...</span>
        <kbd className="docs-search__kbd">⌘K</kbd>
      </button>
      <div className="docs-topbar__right">
        <button
          className="docs-iconbtn docs-topbar__searchicon"
          aria-label="Find something..."
          onClick={onOpenSearch}
        >
          <Icon name="search" />
        </button>
        <span className="docs-topbar__divider" aria-hidden="true" />
        <button
          className="docs-iconbtn"
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          onClick={onToggleTheme}
        >
          <Icon name={theme === 'light' ? 'sun' : 'moon'} />
        </button>
      </div>
    </header>
  );
}
