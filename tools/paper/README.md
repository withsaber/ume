# Ume ⇄ Paper

**Paper is the source of truth. The repo is the build artifact.**

Paper file: https://app.paper.design/file/01M0DP6PXQ0Q5Z4WHCJKDX0B4V
(Paper Desktop must be running — it serves the MCP API at 127.0.0.1:29979.)

## Pages

| Page | Contents |
|---|---|
| Foundation | Colors, Typography, Radius & Shadows |
| Actions | Button, Button Colors, IconButton, ButtonGroup, IconText |
| Forms | Input, Input Types, TextArea & Toggle, Select, CodeInput |
| Feedback | Banner, Dialog, Toast/Tooltip/Popover, Progress & Skeleton |
| Content & Display | Card, Chip & MonoTag, Avatar/Facepile/Kbd, ChatBubble, CodeBlock & Divider |
| Navigation | Tabs, Dropdown & Menu |
| Icons | Nucleo UI registry mirror — fill / outline / duotone (153 each) |
| Dark theme | Dark colors + dark components |

## Sync Paper → repo

```bash
python3 tools/paper/sync.py --check   # preview diff
python3 tools/paper/sync.py           # apply to src/tokens.css
npm run build                         # regenerate tokens/ + dist
```

Convention (agreed with owner): when the user asks to sync/apply Paper changes,
apply immediately and show the diff after.

- Light theme: managed by Paper.
- Dark theme block: managed in the repo (Paper holds no dark tokens).
- Icons page mirrors `src/icons/icons.ts`; regenerate from the registry, don't hand-edit.
- New Paper tokens are appended to tokens.css under `/* Synced from Paper */`;
  move them into their family section when convenient.

## Files

- `paper_mcp.py` — Paper MCP client (also registered in Hermes as `paper`)
- `sync.py` — token sync (Paper → tokens.css)
- `ume_build.py` — component HTML builders used to construct the Paper pages
