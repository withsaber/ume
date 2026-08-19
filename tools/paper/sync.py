#!/usr/bin/env python3
"""Sync Ume design tokens: Paper (source of truth) -> repo src/tokens.css.

Usage:
  python3 tools/paper/sync.py            # apply Paper token values to tokens.css
  python3 tools/paper/sync.py --check    # diff only, write nothing

After applying, run `npm run build` to regenerate tokens/ (JSON, Tailwind, TOKENS.md).

Mapping (Paper -> repo). Paper is the source of truth; the repo mirrors Paper's
naming convention (no --ume- prefix on non-color tokens):

  --color-ume-<name>      oklch() / hex  -> --ume-<name>: R G B;
  --color-text-* etc.     var()          -> --ume-text-*: rgb(var(--ume-<primitive>));
  --text-* px             -> rem (base 16) -> --ume-text-*: Nrem
  --font-sans             -> 'Family', system-ui, ... stack preserved
  --font-mono             -> 'Family', ui-monospace, ... stack preserved
  --radius-*              -> str(value)                        (passed through)
  --font-weight-*         -> int(value)                        (no unit)
  --leading-*             px -> rem (base 16)
  --tracking-*            -> str(value)                        (em unit kept)
  --space-*               px -> rem (base 16)

NOTE: dark theme block is NOT managed by Paper; it is preserved untouched.
"""
import json, re, sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from paper_mcp import PaperMCP

REPO = Path(__file__).resolve().parents[2]
TOKENS_CSS = REPO / 'src' / 'tokens.css'

PRIM_BASE = {'#0C0C0C': 'black', '#FFFFFF': 'white'}


def _oklch_to_srgb255(L, C, H):
    """Björn Ottosson's OKLab -> linear sRGB -> gamma-encoded 0..255."""
    import math
    a, b_ = C * math.cos(math.radians(H)), C * math.sin(math.radians(H))
    l = (L + 0.3963377774 * a + 0.2158037573 * b_) ** 3
    m = (L - 0.1055613458 * a - 0.0638541728 * b_) ** 3
    s = (L - 0.0894841775 * a - 1.2914855480 * b_) ** 3
    r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s
    g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s
    b2 = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s

    def gam(c):
        c = max(0, min(1, c))
        return 12.92 * c if c <= 0.0031308 else 1.055 * (c ** (1 / 2.4)) - 0.055

    return tuple(round(max(0, min(1, gam(c))) * 255) for c in (r, g, b2))


_OKLCH_RE = re.compile(r'oklch\(\s*([\d.]+)%?\s+([\d.]+)\s+([\d.]+)\s*\)')


def hex_to_rgb(h):
    h = h.lstrip('#')
    if len(h) == 8:
        r, g, b, a = int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16), round(int(h[6:8], 16) / 255, 2)
        return (r, g, b, a)
    return (int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16), None)


def px_to_rem(px_str):
    """Convert a pixel value ('16px', '4px') to a rem string ('1rem', '0.25rem')."""
    px = float(str(px_str).replace('px', '').strip())
    return f'{px / 16:g}rem'


def paper_to_ume(name, value, ptype):
    """Map a Paper token to (repo_name, repo_value). Return None to skip."""
    # --- Non-color tokens -------------------------------------------------
    if not name.startswith('--color-'):
        # Strip leading '--'
        short = name[2:]

        if ptype == 'fontFamily' and short == 'font-sans':
            return ('--ume-font-sans',
                    f"'{value}', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif")
        if ptype == 'fontFamily' and short == 'font-mono':
            return ('--ume-font-mono',
                    f"'{value}', ui-monospace, 'SF Mono', Menlo, Consolas, monospace")

        if ptype == 'fontSize' and short.startswith('text-'):
            return (f'--ume-{short}', px_to_rem(value))

        if ptype == 'radius' and short.startswith('radius-'):
            return (f'--ume-{short}', str(value))

        # New types — repo mirrors Paper's name exactly (no --ume- prefix).
        if ptype == 'fontWeight' and short.startswith('font-weight-'):
            return (f'--{short}', str(value))
        if ptype == 'lineHeight' and short.startswith('leading-'):
            return (f'--{short}', px_to_rem(value))
        if ptype == 'letterSpacing' and short.startswith('tracking-'):
            return (f'--{short}', str(value))
        if ptype == 'spacing' and short.startswith('space-'):
            return (f'--{short}', px_to_rem(value))

        return None  # unmapped type

    # --- Color tokens ------------------------------------------------------
    short = name[len('--color-'):]                       # ume-grey-500 or text-primary
    repo_name = f'--{short}' if short.startswith('ume-') else f'--ume-{short}'
    v = str(value)

    # Alias: var(--color-...) — primitive targets already carry ume- prefix
    m = re.fullmatch(r'var\(--color-([\w-]+)\)', v)
    if m:
        tgt = m.group(1)
        ref = tgt if tgt.startswith('ume-') else f'ume-{tgt}'
        return (repo_name, f'rgb(var(--{ref}))')

    # oklch(...) -> sRGB triplet
    ok = _OKLCH_RE.fullmatch(v)
    if ok:
        L, C, H = float(ok.group(1)), float(ok.group(2)), float(ok.group(3))
        if L > 1:                                           # percent form
            L /= 100
        r, g, b = _oklch_to_srgb255(L, C, H)
        return (repo_name, f'{r} {g} {b}')

    # 8-digit hex on black/white base -> rgba
    if re.fullmatch(r'#[0-9A-Fa-f]{8}', v):
        r, g, b, a = hex_to_rgb(v)
        base = PRIM_BASE.get(v[:7].upper())
        if base:
            return (repo_name, f'rgb(var(--ume-{base}) / {a})')
        return (repo_name, f'rgb({r} {g} {b} / {a})')

    # Plain 6-digit hex
    if re.fullmatch(r'#[0-9A-Fa-f]{6}', v):
        r, g, b, _ = hex_to_rgb(v)
        return (repo_name, f'{r} {g} {b}')

    return None  # unmapped


def main():
    check_only = '--check' in sys.argv
    mcp = PaperMCP()
    r = mcp.call('get_tokens', {'format': 'json'})
    raw = r['content'][0]['text']
    data = json.loads(raw)
    items = data.get('items') or data.get('tokens') or []
    print(f'pulled {len(items)} tokens from Paper')

    src = TOKENS_CSS.read_text()
    # Locate the dark block
    dark_marker = '[data-ume-theme="dark"]'
    if dark_marker not in src:
        die('Could not find dark-theme marker in src/tokens.css')
    light_end = src.index(dark_marker)
    light, dark = src[:light_end], src[light_end:]

    changes, skipped, news = [], 0, []
    for t in items:
        conv = paper_to_ume(t['name'], t['value'], t.get('type', ''))
        if not conv:
            skipped += 1
            continue
        name, val = conv
        pat = re.compile(rf'({re.escape(name)}:\s*)([^;]+);')
        m = pat.search(light)
        if not m:
            news.append(f'  {name}: {val};')
            changes.append(f'NEW   {name}: {val};')
            continue
        if m.group(2).strip() != val.strip():
            changes.append(f'CHG   {name}: {m.group(2).strip()}  ->  {val}')
            light = light[:m.start(2)] + val + light[m.end(2):]

    if not changes and not news:
        print('✓ repo already matches Paper')
        return
    print('\n'.join(changes))
    if news:
        print('\nNew tokens to add:')
        print('\n'.join(news))
    print(f'\n{len(changes)} change(s), {len(news)} new, {skipped} token(s) skipped')
    if check_only:
        print('--check: nothing written')
        return

    out = light + dark
    if news:
        block = '\n  /* Synced from Paper (new tokens) */\n' + '\n'.join(news) + '\n'
        out = light.rstrip() + '\n' + block + '\n' + dark
    TOKENS_CSS.write_text(out)
    print(f'✓ wrote {TOKENS_CSS}  (dark block untouched; run npm run build)')


def die(msg):
    print(f'\nsync: {msg}\n')
    sys.exit(1)


if __name__ == '__main__':
    main()