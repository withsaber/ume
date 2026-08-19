/* Navigation model for the docs site. */

export interface NavPage {
  /** Route id, e.g. 'introduction', 'avatar' */
  id: string;
  /** Display label in the sidebar */
  label: string;
  group: 'Getting started' | 'Foundation' | 'Components';
}

export interface NavSection {
  /** Anchor id within the page */
  id: string;
  label: string;
}

export const NAV_PAGES: NavPage[] = [
  { id: 'introduction', label: 'Introduction', group: 'Getting started' },
  { id: 'quickstart', label: 'Quickstart', group: 'Getting started' },
  { id: 'colors', label: 'Colors', group: 'Foundation' },
  { id: 'shadows', label: 'Shadows', group: 'Foundation' },
  { id: 'typography', label: 'Typography', group: 'Foundation' },
  { id: 'button', label: 'Button', group: 'Foundation' },
  { id: 'input', label: 'Input', group: 'Foundation' },
  { id: 'chatbubble', label: 'Chat Bubble', group: 'Foundation' },
  { id: 'dropdown', label: 'Dropdown', group: 'Foundation' },
  { id: 'menu', label: 'Menu', group: 'Foundation' },
  { id: 'dialog', label: 'Dialog', group: 'Foundation' },
  { id: 'popover', label: 'Popover', group: 'Foundation' },
  { id: 'avatar', label: 'Avatar', group: 'Foundation' },
  { id: 'markdown', label: 'Markdown Renderer', group: 'Foundation' },
  { id: 'shortcut-codeblock', label: 'Shortcut & Codeblock', group: 'Foundation' },
  { id: 'banner', label: 'Banner', group: 'Components' },
  { id: 'buttongroup', label: 'ButtonGroup', group: 'Components' },
  { id: 'card', label: 'Card', group: 'Components' },
  { id: 'circularprogress', label: 'CircularProgress', group: 'Components' },
  { id: 'chip', label: 'Chip', group: 'Components' },
  { id: 'codeinput', label: 'CodeInput', group: 'Components' },
  { id: 'divider', label: 'Divider', group: 'Components' },
  { id: 'facepile', label: 'Facepile', group: 'Components' },
  { id: 'iconbutton', label: 'IconButton', group: 'Components' },
  { id: 'icons', label: 'Icons', group: 'Components' },
  { id: 'icontext', label: 'IconText', group: 'Components' },
  { id: 'keycodesequence', label: 'KeyCodeSequence', group: 'Components' },
  { id: 'monotag', label: 'MonoTag', group: 'Components' },
  { id: 'progress', label: 'Progress', group: 'Components' },
  { id: 'select', label: 'Select', group: 'Components' },
  { id: 'skeleton', label: 'Skeleton', group: 'Components' },
  { id: 'tabs', label: 'Tabs', group: 'Components' },
  { id: 'textarea', label: 'TextArea', group: 'Components' },
  { id: 'toast', label: 'Toast', group: 'Components' },
  { id: 'toggle', label: 'Toggle', group: 'Components' },
  { id: 'tooltip', label: 'Tooltip', group: 'Components' },
  { id: 'badge', label: 'Badge', group: 'Components' },
  { id: 'breadcrumb', label: 'Breadcrumb', group: 'Components' },
  { id: 'filter', label: 'Filter', group: 'Components' },
  { id: 'checklist', label: 'Checklist', group: 'Components' },
];

export const NAV_GROUPS: Array<NavPage['group']> = ['Getting started', 'Foundation', 'Components'];

/** Sections (sidebar sub-items) per page. Pages not listed have no sub-nav. */
export const PAGE_SECTIONS: Record<string, NavSection[]> = {
  avatar: [
    { id: 'sizes', label: 'Sizes' },
    { id: 'initial-avatar', label: 'Initial Avatar' },
    { id: 'photo-avatar', label: 'Photo Avatar' },
    { id: 'facepile', label: 'Facepile' },
  ],
};

export function pageById(id: string): NavPage | undefined {
  return NAV_PAGES.find((p) => p.id === id);
}

/** Previous / next page in sidebar order. */
export function adjacentPages(id: string): { prev?: NavPage; next?: NavPage } {
  const i = NAV_PAGES.findIndex((p) => p.id === id);
  return {
    prev: i > 0 ? NAV_PAGES[i - 1] : undefined,
    next: i >= 0 && i < NAV_PAGES.length - 1 ? NAV_PAGES[i + 1] : undefined,
  };
}
