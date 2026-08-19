import React, { useCallback, useEffect, useState } from 'react';
import { UmeProvider } from '../../src';
import { useRoute } from './router';
import { adjacentPages } from './nav';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { SearchDialog } from './components/SearchDialog';
import { Pager, Footer } from './components/Pager';
import { Logo } from './components/Logo';
import { PAGE_REGISTRY } from './pages/registry';

type Theme = 'light' | 'dark';

function initialTheme(): Theme {
  try {
    const saved = window.localStorage.getItem('ume-docs-theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    /* storage unavailable */
  }
  return 'light';
}

export default function App() {
  const route = useRoute();
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [navOpen, setNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    // Theme on the root element so the page background (body) follows too.
    document.documentElement.dataset.umeTheme = theme;
    try {
      window.localStorage.setItem('ume-docs-theme', theme);
    } catch {
      /* storage unavailable */
    }
  }, [theme]);

  // Cmd/Ctrl+K opens search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Scroll on navigation: top for a new page, into view for an anchor.
  useEffect(() => {
    if (route.anchor) {
      // wait a frame for the page to render
      requestAnimationFrame(() => {
        document.getElementById(route.anchor!)?.scrollIntoView({ block: 'start' });
      });
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [route.page, route.anchor]);

  const closeOverlays = useCallback(() => setNavOpen(false), []);

  // Hairline shadow under the sticky top bar once the page scrolls.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const Page = PAGE_REGISTRY[route.page] ?? PAGE_REGISTRY.introduction;
  const { prev, next } = adjacentPages(route.page in PAGE_REGISTRY ? route.page : 'introduction');

  return (
    <UmeProvider theme={theme}>
      <div className="docs-layout">
        <div className="docs-layout__sidebar">
          <div className="docs-layout__logo">
            <Logo />
          </div>
          <Sidebar
            activePage={route.page}
            activeAnchor={route.anchor}
            open={navOpen}
            onNavigate={closeOverlays}
          />
        </div>
        {navOpen && <div className="docs-scrim" onClick={() => setNavOpen(false)} />}
        <div className="docs-layout__main">
          <TopBar
            theme={theme}
            scrolled={scrolled}
            onToggleTheme={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
            onOpenSearch={() => setSearchOpen(true)}
            onToggleNav={() => setNavOpen((o) => !o)}
          />
          <main className="docs-main">
            <article className="docs-article">
              <Page />
            </article>
            <div className="docs-article docs-article--footer">
              <Pager prev={prev} next={next} />
              <Footer />
            </div>
          </main>
        </div>
        <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
      </div>
    </UmeProvider>
  );
}
