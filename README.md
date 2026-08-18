# ume

A standalone design system. Named for the plum blossom (梅): quiet, consistent, and early to everything.

One look, one feel, everywhere: mail app, calendar app, whatever comes next. Every product built on ume shares the same face. Every line of code in this repository is original and MIT licensed.

## What is in here

| Path | What it is |
|---|---|
| `src/tokens.css` | The token source of truth: primitives, semantic tokens, dark mode, type scale, radii, shadows, motion |
| `src/ume.css` | All component styles, plain CSS on top of the tokens |
| `src/components/` | React components: Button, IconButton, Input, Select, Toggle, Tabs, Dialog, Toast, Avatar, Facepile, Chip, Card, Tooltip, Divider, Skeleton, Progress, Typography, UmeProvider |
| `dist/` | Built ESM + CJS bundles with extracted CSS and TypeScript types (`node build.js`) |
| `tokens/` | Standalone token files generated from the source: `ume-tokens.json`, `tokens.css`, `tokens.tailwind.js`, `TOKENS.md` |

## The rule

Every project uses this system. No project invents its own colors, spacing, typography, buttons, or inputs. If a component is missing, it gets added here first, then used. That is how every product keeps the same face.

## Quick start

```bash
npm install ume        # once published, or point package.json at this repo
```

Add Inter (the ume typeface) once per app:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

```tsx
import { UmeProvider, Button, Input } from 'ume';
import 'ume/styles.css';

<UmeProvider theme="light">
  <Button variant="accent">Save</Button>
</UmeProvider>
```

**Tokens only (any web project, no React):**

```css
@import 'ume/tokens.css';
/* var(--ume-text-primary), var(--ume-action-accent-bg), var(--ume-radius-md), ... */
```

**Tailwind:**

```js
// tailwind.config.js
module.exports = { presets: [require('ume/tokens/tokens.tailwind.js')] };
```

## Changing a token

1. Edit `src/tokens.css` (the single source of truth).
2. Run `node build.js` and re-export the files in `tokens/`.
3. Bump the version. Downstream projects pick it up deliberately, never silently.

## Dark mode

`<UmeProvider theme="dark">`, or `data-ume-theme="dark"` on any element wrapping plain CSS usage.

## Licence

MIT. Entirely original work; no third-party attribution required.
