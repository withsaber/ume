# Ume — Status

> Read with `PROTOCOL.md`. Update this file whenever work state changes.

## Session state
- **Last updated:** 2026-08-20
- **Repo state:** unchanged this session (no docs edits pending approval)
- **Status:** ✅ Approved. Session closing.

## Session summary

**Final outcome:** Unified Form Preview built + indexed in Paper (Forms page, top row). All token-var(). Owner approved and asked to close.

**What was done:**
- Scanned Foundation (focus-ring spec confirmed: `0 0 0 3px blue-500 @ 28%` light / `0 0 0 3px blue-400 @ 35%` dark)
- Scanned Forms page: 6 existing breakdowns confirmed, 2 broken "Frame" boards deleted
- Built **2 new Previews boards** with full Payment & Account composition (Input/PhoneInput/CardNumber/ExpiryCVC/CodeInput/TextArea/Toggle/Checkbox/Select/Button all present)
- Both boards indexed by Paper MCP (fixed by using `write_html` mode `'insert-children'` instead of `'replace'` — see Notes)
- Token hygiene applied to every value:
  - All spacing → `var(--space-1..16)`
  - All radius → `var(--radius-sm/md/lg/full)`
  - All text → `var(--text-xs..xl)` + `var(--font-sans/mono)` + `var(--leading-…)`
  - All colors → `var(--color-text-primary/secondary/tertiary/link)` etc.
  - Focus ring → real 3px blue @ 28% / 35% opacity values
  - Button → `var(--color-action-primary-bg)`, no raw hex
  - One intentional hardcode: VISA brand chip `#1A1F71` (3rd-party brand color)

### Built this session (Paper, approved)
| Board | ID | Size | Position | State |
|---|---|---|---|---|
| Form — Full Preview | 81T-0 | 1600×1100 | worldX=0, worldY=-1100 | ✅ Indexed + content |
| Form — Full Preview — Dark | 81U-0 | 1600×1100 | worldX=1640, worldY=-1100 | ✅ Indexed + content |

### Composition inside Form — Full Preview
- Header: "Payment & Account" + lede
- Row 1: First name / Last name (Input)
- Row 2: Email / Phone with `+880` prefix (PhoneInput — real prefix chip style)
- Row 3: Card number (CardNumber) with VISA brand chip / Country (Select)
- Row 4: Expiry / CVC split (ExpiryCVC) — CVC field is **focused**, shows the real 3px blue ring
- Row 5: Verification code (CodeInput) — 6 cells, first filled with "7", second focused (caret)
- Row 6: Bio (TextArea)
- Row 7: Save card toggle (on, blue) + Terms checkbox (checked)
- Row 8: Pay $128.40 (primary Button) + Cancel (ghost Button)

## Component checklist

Legend — Paper: designed on Paper · Spec: SPEC strip present · Docs: on docs site · Repo: coded & exported · Sync: Paper = repo

| Component | Paper | Spec | Docs | Repo | Sync |
|---|---|---|---|---|---|
| **Foundation** |
| Colors (light+dark frames) | 🟡 light only | — | ✅ | ✅ | ✅ |
| Typography | ✅ | — | ✅ | ✅ | ✅ |
| Radius & Shadows | 🟡 light only | — | ✅ | ✅ | ✅ |
| **Actions** |
| Button | ✅ | ✅ | ✅ | ✅ | ✅ |
| IconButton | ✅ | ✅ | ✅ | ✅ | ✅ |
| ButtonGroup | ✅ | ✅ | ✅ | ✅ | ✅ |
| IconText | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Forms** |
| Input | ✅ | ✅ | ❌ | ✅ | ✅ |
| TextArea & Toggle | ✅ | ✅ | 🟡 partial | ✅ | ✅ |
| Select | ✅ | ✅ | ✅ | ✅ | ✅ |
| CodeInput | ✅ | ✅ | ✅ | ✅ | ✅ |
| Input Types (Password/Phone/Card/Expiry) | ✅ | ✅ | ✅ | ✅ | ✅ |
| Forms — patterns | ✅ | ✅ | ✅ | ❌ | ❌ |
| **Feedback** |
| Banner | ✅ | ✅ | ✅ | ✅ | ✅ |
| Dialog | ✅ | ✅ | ✅ | ✅ | ✅ |
| Toast / Tooltip / Popover | ✅ | ✅ | ✅ | ✅ | ✅ |
| Progress & Skeleton | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Content & Display** |
| Card | ✅ | ✅ | ✅ | ✅ | ✅ |
| Chip & MonoTag | ✅ | ✅ | ✅ | ✅ | ✅ |
| Avatar / Facepile / Kbd | ✅ | ✅ | ✅ | ✅ | ✅ |
| ChatBubble | ✅ | ✅ | ✅ | ✅ | ✅ |
| CodeBlock & Divider | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Navigation** |
| Tabs | ✅ | ✅ | ✅ | ✅ | ✅ |
| Dropdown & Menu | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Icons** |
| Nucleo mirror (fill/outline/duotone) | ✅ | — | ✅ | ✅ | ✅ |
| **Dark theme** |
| Dark colors | ✅ | — | 🟡 toggle only | ✅ | ✅ |
| Dark components | 🟡 partial | — | ❌ | ✅ | 🟡 |
| **Elements** (page 9-0) | 🟡 tbd | — | — | — | — |

## Notes
- Dark theme tokens live in repo `tokens.css` only (Paper holds no dark tokens) — by design.
- Icons page mirrors `src/icons/icons.ts`; regenerate from registry, don't hand-edit.
- ⚠️ `src/tokens.css` has a known cosmetic issue: the `/* Synced from Paper */` blue-200/400/600/800 block sits outside `:root` (build shows 2 warnings, still passes). Fix on next approved sync.
- **Paper MCP gotcha (important):** Use `write_html` with **`mode: 'insert-children'`** to populate newly-created artboards. Using `mode: 'replace'` creates content as orphan frames that Paper's index never picks up — the boards exist and have content, but won't show in `get_basic_info`, `get_children`, or `get_tree_summary`. Always call `finish_working_on_nodes` when done editing an artboard.
