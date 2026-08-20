# Ume — Status

> Read with `PROTOCOL.md`. Update this file whenever work state changes.
> Paper mechanics / debugging → `paper_mcp.md`.

## Session state
- **Last updated:** 2026-08-20 (icon stroke sweep + light IDE twin)
- **Repo state:** Synced, committed (`39f6ca5`), pushed to `main`. Docs site deploys via GitHub Actions on push.
- **Paper state:** Design system 8 pages + Usage page (your IDE twin). 56 artboards total.
- **Status:** Icon stroke width rule applied. 1875 source SVGs in `src/icons/` updated to `stroke-width="1.25"`. Paper-native icons (Icons page, Navigation, etc.) still render at the original 1.5 because their stroke-width is baked into Paper-native SVG nodes and cannot be updated via MCP — see Notes below.

## Icon stroke width (HARD rule)
- **Rule:** all icons must use `stroke-width: 1.25`. PROTOCOL.md §7.
- **Source files in `src/icons/`:** Updated (1875 of 2129 files). The remaining 254 had no `stroke-width` attribute (filled icons, no stroke).
- **Light IDE (BHO-0) on Usage page:** 45 SVG nodes updated to `strokeWidth: 1.25px` via Paper MCP. Visible at 1.25.
- **Paper-native icons (Icons page 741 nodes, Navigation 24, etc.):** Still render at 1.5. Cannot be updated via MCP — stroke-width is baked into Paper-native SVG node data.

### Why Paper-native icons stay at 1.5
- Icons on Icons page (16U-0 fill, 1X8-0 outline), Navigation, and other pages were imported into Paper from the original SVGs (which had `stroke-width="1.5"`).
- Paper MCP `update_styles` doesn't propagate `strokeWidth` to SVGVisualElement children when the original stroke is part of the SVG node's stored path data.
- Fix requires re-importing the icons into Paper from the updated `src/icons/` files (which now have 1.25).
- This is an owner action — open Paper Desktop, re-import the icons from the updated SVG files, or have me build a new "Icons v1.25" artboard with the updated paths.

## Component checklist

Legend — Paper: designed on Paper · Spec: SPEC strip present · Docs: on docs site · Repo: coded & exported · Sync: Paper = repo

(continued from previous session — Form — Full Preview boards approved, synced, committed, pushed to main.)

## Usage page (light IDE twin)
- **Yours:** `plo-ide-window (My version)` (AAS-0) at worldX=-720, worldY=735, 1440×820
- **Light twin:** `plo-ide-window — Light` (BHO-0) at worldX=800, worldY=735, 1440×820
- **Structure identical** — same pane positions, same content, same typography, same spacing
- **Only colors swapped** — dark surface `#292929` → warm cream `#FDFCFC`, light grey text → dark ink text, etc.
- **Real SVG icons** from `src/icons/` (UMEI) embedded via write_html
- **All icons at stroke-width: 1.25** (HARD rule)

## Next session priorities
1. **Re-import Paper-native icons** (1,000+ nodes on Icons page, Navigation, etc.) — needs Paper Desktop
2. **Apply design system tokens to your IDE components** — formalize the audit (your 15 hex values → Ume tokens)
3. **Component sweep** — actual Ume components using the new role tokens
4. **Build new patterns** (empty states, error banners, loading skeletons) as separate components, not changes to your existing ones