# ume icons

`icons.ts` is a **generated file** — do not edit it by hand. It contains the
curated ume icon registry: 206 UI icons extracted from the SVG collection in
this directory.

## Source layout

Flat SVG files at the top of this directory, named by grid size + canonical
name with comma-separated aliases:

```
24-magnifying-glass,-search.svg
24-bars-three,-menu,-list,-hamburger.svg
24-chevron-bottom.svg
```

The first segment after the grid prefix is the canonical name; each
comma-separated suffix is an alias (the registry resolves either).

## Registry format

Each entry is self-contained inner-SVG markup with every paint normalised to
`fill="none" stroke="currentColor"`, so icons always inherit the surrounding
text colour:

```ts
export const umeIcons: Record<string, string> = {
  'search': '<path fill="none" stroke="currentColor" d="..." .../>',
  ...
};
export type UmeIconName = keyof typeof umeIcons;
```

## Usage

```tsx
import { Icon } from './components/Icon';

<Icon name="search" />                      // default: glyph 18px, wrapper 22px
<Icon name="menu" />                        // hamburger (bars-three)
<Icon name="trash" aria-label="Delete" />   // announced as an image
<Icon name="chevron-down" size={14} />
```

To add an icon: drop the SVG in this directory, then add the name → alias
mapping to the curation step and regenerate `icons.ts`.
