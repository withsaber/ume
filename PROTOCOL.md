# Ume — Operating Protocol

> This file is the contract. **Read this first, every session, before doing any work.**
> Pair with `STATUS.md` for current state.

## 0. What this is

Ume (梅) is our internal design system for our own applications.
**Paper is the source of truth. The repo is the build artifact. The docs site is a mirror.**
Paper file: `01M0DP6PXQ0Q5Z4WHCJKDX0B4V` — driven ONLY via the MCP (`tools/paper/paper_mcp.py`), never via browser automation.

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

## 5. Sync commands (only after approval)

```bash
python3 tools/paper/sync.py --check   # preview Paper → repo token diff
python3 tools/paper/sync.py           # apply to src/tokens.css
npm run build                         # regenerate tokens/ + dist
```
