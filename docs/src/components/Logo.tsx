import React from 'react';

/** Ume logo: plum blossom mark + wordmark. Petals follow the accent token
    so the mark tracks the system accent (royal blue) in both themes. */
export function Logo() {
  return (
    <a className="docs-logo" href="#/introduction" aria-label="Ume home">
      <svg width="30" height="30" viewBox="0 0 26 26" aria-hidden="true">
        {/* five-petal plum blossom */}
        <g fill="var(--ume-action-accent-bg)">
          <circle cx="13" cy="6.2" r="4.4" />
          <circle cx="19.5" cy="11.4" r="4.4" />
          <circle cx="17" cy="18.7" r="4.4" />
          <circle cx="9" cy="18.7" r="4.4" />
          <circle cx="6.5" cy="11.4" r="4.4" />
        </g>
        <circle cx="13" cy="13" r="2.6" fill="var(--ume-bg-canvas)" />
      </svg>
      <span className="docs-logo__word">Ume</span>
    </a>
  );
}