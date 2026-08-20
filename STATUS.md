# Ume — Status

> Read with `PROTOCOL.md`. Update this file whenever work state changes.

## Session state
- **Last updated:** 2026-08-20
- **Repo state:** ✅ Synced, committed (`39f6ca5`), pushed to `main`. Docs site deploys via GitHub Actions on push.
- **Status:** ✅ Closed. Owner approved Form — Full Preview boards on Paper (Forms page, top row: 81T-0 Light + 81U-0 Dark), approved bringing them to docs + committing + pushing. Session closed.

## Session summary

**Final outcome:** Unified Form Preview built on Paper → approved → mirrored to docs (`FormPreviewsPage.tsx`) → committed + pushed to main. PROTOCOL.md + STATUS.md (operating contract) also merged this session.

**What was done:**
- Scanned Foundation (focus-ring spec: `0 0 0 3px blue-500 @ 28%` light / `0 0 0 3px blue-400 @ 35%` dark)
- Scanned Forms page: 6 existing breakdowns confirmed, 2 broken "Frame" boards deleted
- Built **2 new Previews boards** with full Payment & Account composition (Input/PhoneInput/CardNumber/ExpiryCVC/CodeInput/TextArea/Toggle/Checkbox/Select/Button)
- Both boards indexed by Paper MCP (fix: `mode: 'insert-children'` not `replace` — see Notes)
- Created `docs/src/pages/FormPreviewsPage.tsx` mirroring Paper: same composition, all token-var()
- Wired into `registry.tsx` + `nav.ts` ("Form previews" → Foundation group)
- Built docs ✅ · Library ✅ · Committed `39f6ca5` · Pushed to `main` ✅
- Token hygiene: spacing → `var(--space-1..16)`, radius → `var(--radius-sm/md/lg/full)`, text → `var(--text-xs..xl)` + `var(--font-sans/mono)`, colors → `--color-*`, focus ring → real 3px blue values, button → `var(--color-action-primary-bg)`. One intentional hardcode: VISA brand chip `#1A1F71` (3rd-party brand color).

### Built this session (Paper, approved + synced)
| Board | ID | Size | Position | State |
|---|---|---|---|---|
| Form — Full Preview | 81T-0 | 1600×1100 | worldX=0, worldY=-1100 | ✅ Indexed + content + docs mirror + commit |
| Form — Full Preview — Dark | 81U-0 | 1600×1100 | worldX=1640, worldY=-1100 | ✅ Indexed + content + docs mirror + commit |

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
| Form — Full Preview (Light + Dark) | ✅ | — | ✅ NEW | — | ✅ |
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

## Next steps (for the next session)
1. **Token audit on existing breakdown boards** (owner-assigned) — verify every node in Paper Forms page breakdowns (Input — Breakdown, TextArea & Toggle, Select, CodeInput, Input Types, Forms — patterns) references `var(--ume-…)` tokens with no hardcoded hex/oklch/px. Fix any offenders by `find_nodes` styleValue sweep.
2. **Reorganize Forms page layout** — once the token audit is clean, reposition breakdowns into a tighter grid (currently at fixed worldX = -47 + 1140·n, worldY=45; spacing/alignment could be tightened).
3. **Sync dark theme Component pages** — Buttons, Inputs, etc. need Dark frames on Paper to mirror the Light coverage that exists.

## Notes
- Dark theme tokens live in repo `tokens.css` only (Paper holds no dark tokens) — by design.
- Icons page mirrors `src/icons/icons.ts`; regenerate from registry, don't hand-edit.
- ⚠️ `src/tokens.css` has a known cosmetic issue: the `/* Synced from Paper */` blue-200/400/600/800 block sits outside `:root` (build shows 2 warnings, still passes). Fix on next approved sync.
- **Paper MCP gotcha:** Use `write_html` with **`mode: 'insert-children'`** to populate newly-created artboards. Using `mode: 'replace'` creates content as orphan frames that Paper's index never picks up — the boards exist and have content, but won't show in `get_basic_info`, `get_children`, or `get_tree_summary`. Always call `finish_working_on_nodes({})` when done editing an artboard.
- **Session close ritual:** now baked into `PROTOCOL.md` §4a. Owner says "close" → compact artifact-state summary → approve each sub-step (docs? commit? push?) → update STATUS, confirm hashes. Drift to watch for: re-running builds unprompted, syncing without re-ask, missing `finish_working_on_nodes({})`.
