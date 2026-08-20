# Ume — Operating Protocol

> This file is the contract. **Read this first, every session, before doing any work.**
> Pair with `STATUS.md` for current state.
> Pair with `paper_mcp.md` for Paper mechanics (connecting, calling, gotchas) — if Paper isn't behaving, that's where to look.

## 0. What this is

Ume (梅) is our internal design system for our own applications.
**Paper is the source of truth. The repo is the build artifact. The docs site is a mirror.**
Paper file: `01M0DP6PXQ0Q5Z4WHCJKDX0B4V` — driven ONLY via the MCP (`tools/paper/paper_mcp.py`), never via browser automation. **Paper connection / tool quirks / debugging → `paper_mcp.md`.**

## 1. The golden rule

> **Design work happens on Paper first, via MCP. Nothing goes to the docs site or repo without the owner's explicit approval.**

When the owner asks for something:
1. Do it on Paper via MCP.
2. Show what was made.
3. Owner reviews on Paper.
4. Owner approves the page → **ask** before adding to docs site → ask before syncing to repo.
5. Update `STATUS.md`.

No plan-free dives. No guessing. No unapproved docs edits.

## 2. Page structure standard (every Paper page)

### Foundation page
- **Colors** — two frames side by side: `Light` frame (light theme tokens) and `Dark` frame (dark theme tokens).
- **Typography** — full type scale, weights, leading, tracking.
- **Radius & Shadows** — two frames: shadows demonstrated on `Light` and on `Dark` (cards, overlays, surfaces, backgrounds only — no extra chrome).

### Component pages (e.g. Accordion)
1. **Previews board first** — the component in all its variants, shown in **both light and dark** mode side by side (two boards: `Light`, `Dark`). Every kind of the component appears here so the owner sees the full range at a glance.
2. **Breakdown** — anatomy of the component, states.
3. **SPEC strip** — mono 10px, ≤4 lines: measurements, states, tokens used, contrast notes. Without a SPEC strip the page is a picture, not knowledge.

### Naming
- Optimal, short, Ume-inspired. Preview windows are called **Previews** (`Light` / `Dark` boards).

### Token rule
- Everything on Paper references existing tokens (`var(--color-…)` etc.) so a token edit propagates everywhere. No hardcoded values except where a token genuinely doesn't exist (then flag it to the owner).

## 3. Change-sync flow (owner edits Paper)

1. Owner: "I made changes on [page], check what changed."
2. Agent: diff Paper against repo (tokens + structure), report the changes in a tight list.
3. Agent asks: bring to docs site? sync to repo (`tokens.css` + rebuild)?
4. Owner says yes → apply, show diff, update `STATUS.md`.

## 4. Session resume protocol

Sessions die (limits, connection, whatever). Recovery:

1. New session → agent reads `PROTOCOL.md` (this file) + `STATUS.md` **before anything else**.
2. If owner says "start session" (or similar), agent replies with:
   - Current component states (from STATUS.md table)
   - What was in progress / left unfinished
   - What we were about to do next
3. **STATUS.md is updated whenever work state changes** — it's the shared memory across sessions and across AIs.

### 4a. Session close ritual
When the owner says "close" / "approve and close":
1. Send a compact summary: what's approved on Paper vs what's pending (artifact state, not work log).
2. Owner approves (or says "needs changes" → stop and list them).
3. Ask each sub-step separately:
   - **Apply to docs?** — approved → mirror Paper → docs page → `npm run build` (both root and `docs/`) → record.
   - **Commit + push?** — approved → `git add -A -- . ':!.hermes'`, build, commit, push. Report commit hash.
   - Anything deferred → mark in `STATUS.md` "awaiting next session".
4. Update `STATUS.md` final section: what landed, what's approved + synced, what's next (numbered, top-priority first).
5. Confirm commit + push hashes to owner.

**Drift to watch for:**
- Owner says "apply to docs" → agent writes to `src/*` without confirmation → ask-before-sync gate broken. Stop and re-ask.
- Agent commits without re-running `npm run build` (both library AND `docs/`) → CI may catch stale dist. Build first.
- Agent forgets `finish_working_on_nodes({})` for any artboard it touched → Paper renders stale. Call before close.

## 5. Sync commands (only after approval)

```bash
python3 tools/paper/sync.py --check   # preview Paper → repo token diff
python3 tools/paper/sync.py           # apply to src/tokens.css
npm run build                         # regenerate tokens/ + dist
```

## 6. Component preservation rule (HARD, added Aug 2026)

> **Never alter components the owner provides verbatim.** When the owner shares a mockup (e.g. on the Usage page), build the design system AROUND it — define tokens, focus rings, themes, audit coverage — but do NOT change the component's visual or functional structure. Spacing values, font weights, dimensions, variants, internal layout are all intentional. "Inconsistencies" between components are by design; flag as observations, never normalize.

What this means in practice:
- If a component uses 4px gap and another uses 12px, both are correct.
- If a component uses font-weight 500 and another uses 600, both are correct.
- If a button has no focus ring, leave it without a focus ring until the owner adds one.
- If a tab is differentiated by background shift (not underline), keep it that way.
- **You may ADD** new components or variants that the owner hasn't built yet (focus rings, error states, dark variants of system tokens). You may NOT modify what the owner has built.

When in doubt: **preserve the source, document the pattern, propose the change separately.**

## 7. Icon stroke width (HARD rule, added Aug 2026)

> **All icons must use `stroke-width: 1.25`.** No matter what size, color, or context.

This applies to:
- All UMEI icons in `src/icons/` (24-* files)
- All Paper icons rendered in any board (light + dark, all sizes)
- All icons used in component previews, mockups, usage screens
- All future icons added to the library

Why: 1.5 reads too heavy at small sizes (10-12px). 1.0 reads too thin. 1.25 is the sweet spot across the scale.

When creating or modifying icons:
- Default `stroke-width="1.25"` in the SVG markup
- Use `currentColor` for fill/stroke so the icon picks up parent text color
- viewBox is `0 0 24 24` for the 24px grid
- All paths use `stroke-linecap="round"` and `stroke-linejoin="round"`

## 8. Token hygiene

- All Paper nodes reference existing tokens (`var(--color-…)`, `var(--text-…)` etc.) so a token edit propagates everywhere.
- **Exception:** boards that have to render correctly under both themes (Usage page, dark variant boards, Components preview) use **literal hex** for theme-specific colors because Paper has no dark theme token block. The literal hex is the dark-theme value; the light-theme equivalent is the token ref.
- This is documented in the SPEC strip of each such board.
