import React from 'react';

/**
 * Side-by-side Light/Dark preview boards.
 * Each board forces its theme via data-ume-theme, so ume tokens resolve
 * correctly regardless of the page's global theme. Mirrors the Paper
 * Previews structure (Light board / Dark board).
 */
export function ThemeBoards({ light, dark }: { light: React.ReactNode; dark: React.ReactNode }) {
  return (
    <div className="docs-themeboards">
      <div className="docs-themeboards__board">
        <div className="docs-themeboards__label">Light</div>
        <div className="docs-themeboards__content" data-ume-theme="light">
          {light}
        </div>
      </div>
      <div className="docs-themeboards__board">
        <div className="docs-themeboards__label">Dark</div>
        <div className="docs-themeboards__content" data-ume-theme="dark">
          {dark}
        </div>
      </div>
    </div>
  );
}
