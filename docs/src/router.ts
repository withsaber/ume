import { useEffect, useState } from 'react';

export interface Route {
  /** Page id, e.g. 'avatar' */
  page: string;
  /** Optional in-page anchor, e.g. 'sizes' */
  anchor?: string;
}

function parseHash(): Route {
  const raw = window.location.hash.replace(/^#\/?/, '');
  const [page, anchor] = raw.split('/');
  return { page: page || 'introduction', anchor: anchor || undefined };
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(parseHash);
  useEffect(() => {
    const onHashChange = () => setRoute(parseHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);
  return route;
}

export function pageHref(page: string): string {
  return `#/${page}`;
}

export function anchorHref(page: string, anchor: string): string {
  return `#/${page}/${anchor}`;
}
