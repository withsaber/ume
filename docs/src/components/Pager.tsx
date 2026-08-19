import React from 'react';
import { NavPage } from '../nav';
import { pageHref } from '../router';
import { TwitterIcon, GithubIcon, DiscordIcon } from './icons';
import { Icon } from '../../../src';

/** Previous / Next pagination at the bottom of a docs page. */
export function Pager({ prev, next }: { prev?: NavPage; next?: NavPage }) {
  return (
    <div className="docs-pager">
      <div className="docs-pager__side">
        {prev && (
          <a className="docs-pager__link" href={pageHref(prev.id)}>
            <span className="docs-pager__pill">
              <Icon name="arrow-left" size={14} /> Previous
            </span>
            <span className="docs-pager__label">{prev.label}</span>
          </a>
        )}
      </div>
      <div className="docs-pager__side docs-pager__side--right">
        {next && (
          <a className="docs-pager__link docs-pager__link--right" href={pageHref(next.id)}>
            <span className="docs-pager__pill">
              Next <Icon name="arrow-right" size={14} />
            </span>
            <span className="docs-pager__label">{next.label}</span>
          </a>
        )}
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="docs-footer">
      <span className="docs-footer__copy">© Copyright 2026. All rights reserved.</span>
      <span className="docs-footer__socials">
        <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noreferrer">
          <TwitterIcon />
        </a>
        <a href="https://github.com" aria-label="GitHub" target="_blank" rel="noreferrer">
          <GithubIcon />
        </a>
        <a href="https://discord.com" aria-label="Discord" target="_blank" rel="noreferrer">
          <DiscordIcon />
        </a>
      </span>
    </footer>
  );
}
