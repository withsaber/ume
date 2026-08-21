# Paper MCP Session Note

This session ran from ~03:30 to ~04:50 UTC on 2026-08-21.

## Key accomplishments

- Tokenized all 8 component pages (622 hardcoded values → 0 fixable)
- Deduplicated 191 → 177 tokens
- Merged 10 dark artboards into light pages (A-0: 12 → 1 artboard)
- Polished 6 Foundation artboards (Colors, Typography, Spacing, Syntax, Focus, Surfaces)
- Applied opencode.ai elevation pattern to Surfaces
- Softened focus rings (inset 2px instead of outer 2px)
- Renamed 3 pages in Paper UI: Primitives, Atoms, Showcase

## Paper limitations encountered

1. **Border per side**: only works via individual `borderTopWidth`, `borderRightWidth`, etc.
   - shorthand `border: 1px solid var(...)` is silently dropped
2. **box-shadow**: `0 0 0 2px var(...)` works but inconsistent — sometimes Paper doesn't apply it
3. **Focus ring**: only achievable via `box-shadow` — no native outline
4. **Positioning**: absolute children need `top` values **relative** to their parent, not global
5. **Multi-color strokes / linear gradient borders**: don't work
6. **Page renames**: only via Paper UI, not via MCP
7. **Artboard repositioning**: `move_nodes` doesn't set absolute x/y — only changes parent/order

## Recommendations for next session

- Consider migrating to Figma (mature Variables + Components + native outline)
- Or accept Paper limits and continue with workaround patterns
