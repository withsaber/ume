import React from 'react';
import { NAV_GROUPS, NAV_PAGES, PAGE_SECTIONS } from '../nav';
import { pageHref, anchorHref } from '../router';

interface SidebarProps {
  activePage: string;
  activeAnchor?: string;
  open: boolean;
  onNavigate: () => void;
}

export function Sidebar({ activePage, activeAnchor, open, onNavigate }: SidebarProps) {
  return (
    <nav className={`docs-sidebar${open ? ' docs-sidebar--open' : ''}`} aria-label="Documentation">
      <div className="docs-sidebar__inner">
        {NAV_GROUPS.map((group) => (
          <div className="docs-nav-group" key={group}>
            <div className="docs-nav-group__label">{group}</div>
            <ul className="docs-nav-group__list">
              {NAV_PAGES.filter((p) => p.group === group).map((page) => {
                const active = page.id === activePage;
                const sections = active ? PAGE_SECTIONS[page.id] : undefined;
                return (
                  <li key={page.id}>
                    <a
                      href={pageHref(page.id)}
                      className={`docs-nav-item${active ? ' docs-nav-item--active' : ''}`}
                      aria-current={active && !activeAnchor ? 'page' : undefined}
                      onClick={onNavigate}
                    >
                      {page.label}
                    </a>
                    {sections && (
                      <ul className="docs-nav-sublist">
                        {sections.map((s) => (
                          <li key={s.id}>
                            <a
                              href={anchorHref(page.id, s.id)}
                              className={`docs-nav-item docs-nav-item--sub${
                                activeAnchor === s.id ? ' docs-nav-item--active' : ''
                              }`}
                              onClick={onNavigate}
                            >
                              {s.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
