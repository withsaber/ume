# ume icons

`icons.ts` is a **generated file** — do not edit it by hand. It contains the
curated ume icon registry: ~150 essential UI icons extracted from the local
Nucleo UI collection (18px grid), each in **three variants**:

| Variant | Nucleo klass | Look |
|---|---|---|
| `fill` | `glyph` | solid shapes |
| `outline` | `outline` | 1.5px strokes |
| `duotone` | `glyph-duo` | solid, secondary layer at 40% opacity |

All markup is stored as inner SVG strings with every paint (fill and stroke)
set to `currentColor`, so icons always inherit the surrounding text color.
Nucleo's secondary two-tone elements (`data-color="color-2"`) are normalized
to `opacity="0.4"` in every variant.

## Regenerating

The registry is produced by a one-shot Node script (kept out of the repo; it
depends on the author's local Nucleo install). To regenerate:

1. Source data (read-only):
   - DB: `~/Library/Application Support/Nucleo/icons/data.sqlite3`
     (tables `icons(id, name, set_id, klass, width, ...)`, `sets(id, title, group_id)`;
     the "Nucleo UI" group is `group_id=1`).
   - SVGs: `~/Library/Application Support/Nucleo/icons/sets/<set_id>/<icon_id>.svg`.
2. For each canonical registry name × variant, resolve the Nucleo icon with
   `klass` per the table above, `width=18`, preferring sets
   `29, 5, 11, 9, 13, 22, 27, 30`, then any other set in group 1; lowest `id`
   wins. If an icon has no `glyph-duo` drawing, fall back to `glyph` (none
   needed at generation time — all 153 had full duotone coverage).
3. Extract the contents of `<g class="nc-icon-wrapper">…</g>`, then normalize:
   - elements carrying `data-color="color-2"` → `currentColor` paint +
     `opacity="0.4"` (strip `fill-opacity`/`data-*` bookkeeping)
   - every other `fill`/`stroke` (except `none`) → `currentColor`
4. Emit `src/icons/icons.ts`:

   ```ts
   export const umeIcons = {
     fill:    { 'search': '<path …/>', … },
     outline: { 'search': '<path …/>', … },
     duotone: { 'search': '<path …/>', … },
   } as const;
   export type UmeIconName = keyof typeof umeIcons.fill;
   export type UmeIconVariant = keyof typeof umeIcons;
   ```

## Naming

Registry names are canonical kebab-case and may differ from Nucleo's:
`magnifier` → `search`, `xmark` → `x`, `envelope` → `mail`, `house` → `home`,
`floppy-disk` → `save`, `export` → `share`, `lock-open` → `unlock`,
`bell-slash` → `bell-off`, `eye-slash` → `eye-off`, `print` → `printer`,
`file-content` → `file-text`, `bullet-list` → `list`, `chevron-expand-y` →
`chevrons-up-down`, `power-off` → `power`, `arrow-door-in/out` → `login`/`logout`,
etc. When adding icons, prefer the generic product name over the source name.

## Usage

```tsx
import { Icon } from './components/Icon';

<Icon name="search" />                           // fill, decorative, aria-hidden
<Icon name="search" variant="outline" />
<Icon name="check-circle" variant="duotone" />
<Icon name="trash" aria-label="Delete" />        // announced as an image
<Icon name="chevron-down" size={14} />
```
