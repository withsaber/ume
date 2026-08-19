#!/usr/bin/env python3
"""Sync Ume design tokens: Paper (source of truth) -> repo src/tokens.css.

Usage:
  python3 tools/paper/sync.py            # apply Paper token values to tokens.css
  python3 tools/paper/sync.py --check    # diff only, write nothing

After applying, run `npm run build` to regenerate tokens/ (JSON, Tailwind, TOKENS.md).

Mapping (Paper -> repo):
  --color-ume-<name>      hex      -> --ume-<name>: R G B;
  --color-text-* etc.     var()    -> --ume-text-*: rgb(var(--ume-<primitive>));
  8-digit hex on black/white base  -> rgb(var(--ume-black|white) / a)
  --text-* px             -> rem (base 16)
  --font-sans             -> 'Family', system-ui, ... stack preserved

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
    import math
    a, b_ = C*math.cos(math.radians(H)), C*math.sin(math.radians(H))
    l = (L + 0.3963377774*a + 0.2158037573*b_)**3
    m = (L - 0.1055613458*a - 0.0638541728*b_)**3
    s = (L - 0.0894841775*a - 1.2914855480*b_)**3
    r = +4.0767416621*l - 3.3077115913*m + 0.2309699292*s
    g = -1.2684380046*l + 2.6097574011*m - 0.3413193965*s
    b2 = -0.0041960863*l - 0.7034186147*m + 1.7076147010*s
    def gam(c): return 12.92*c if c <= 0.0031308 else 1.055*(c**(1/2.4)) - 0.055
    return tuple(round(max(0, min(1, gam(c)))*255) for c in (r, g, b2))

_OKLCH_RE = re.compile(r'oklch\(\s*([\d.]+)%?\s+([\d.]+)\s+([\d.]+)\s*\)')

def hex_to_rgb(h):
    h = h.lstrip('#')
    if len(h) == 8:
        r, g, b, a = int(h[0:2],16), int(h[2:4],16), int(h[4:6],16), round(int(h[6:8],16)/255, 2)
        return (r, g, b, a)
    return (int(h[0:2],16), int(h[2:4],16), int(h[4:6],16), None)

def paper_to_ume(name, value, ptype):
    """Return (repo_name, repo_value) or None to skip."""
    if not name.startswith('--color-'):
        if ptype == 'fontSize' and name.startswith('--text-'):
            px = float(str(value).replace('px',''))
            return (f'--ume-{name[2:]}', f'{px/16:g}rem')
        if ptype == 'fontFamily' and name == '--font-sans':
            return ('--ume-font-sans', f"'{value}', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif")
        if ptype == 'fontFamily' and name == '--font-mono':
            return ('--ume-font-mono', f"'{value}', ui-monospace, 'SF Mono', Menlo, Consolas, monospace")
        if ptype == 'radius' and name.startswith('--radius-'):
            return (f'--ume-{name[2:]}', str(value))
        return None  # spacing/leading/tracking/weights: repo keeps its own scale
    short = name[len('--color-'):]  # e.g. ume-grey-500 or text-primary
    repo_name = f'--{short}' if short.startswith('ume-') else f'--ume-{short}'
    v = str(value)
    m = re.fullmatch(r'var\(--color-([\w-]+)\)', v)
    if m:  # alias — primitive targets already carry the ume- prefix
        tgt = m.group(1)
        ref = tgt if tgt.startswith('ume-') else f'ume-{tgt}'
        return (repo_name, f'rgb(var(--{ref}))')
    ok = _OKLCH_RE.fullmatch(v)
    if ok:
        L, C, H = float(ok.group(1)), float(ok.group(2)), float(ok.group(3))
        if L > 1:  # percent form
            L /= 100
        r, g, b = _oklch_to_srgb255(L, C, H)
        return (repo_name, f'{r} {g} {b}')
    if re.fullmatch(r'#[0-9A-Fa-f]{8}', v):
        r, g, b, a = hex_to_rgb(v)
        base = PRIM_BASE.get(v[:7].upper())
        if base:
            return (repo_name, f'rgb(var(--ume-{base}) / {a})')
        return (repo_name, f'rgb({r} {g} {b} / {a})')
    if re.fullmatch(r'#[0-9A-Fa-f]{6}', v):
        r, g, b, _ = hex_to_rgb(v)
        return (repo_name, f'{r} {g} {b}')
    return None

def main():
    check_only = '--check' in sys.argv
    mcp = PaperMCP()
    r = mcp.call('get_tokens', {'format': 'json'})
    raw = r['content'][0]['text']
    data = json.loads(raw)
    items = data.get('items') or data.get('tokens') or []
    print(f'pulled {len(items)} tokens from Paper')

    src = TOKENS_CSS.read_text()
    light_end = src.index('[data-ume-theme="dark"]')
    light, dark = src[:light_end], src[light_end:]

    changes, skipped, news = [], 0, []
    for t in items:
        conv = paper_to_ume(t['name'], t['value'], t.get('type',''))
        if not conv:
            skipped += 1; continue
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

    if not changes:
        print('✓ repo already matches Paper')
        return
    print('\n'.join(changes))
    print(f'\n{len(changes)} difference(s), {skipped} token(s) not mapped (spacing/leading/etc.)')
    if check_only:
        print('--check: nothing written')
        return
    TOKENS_CSS.write_text(light + dark)
    if news:
        # insert new tokens at the end of the light block, before the dark marker
        block = '\n  /* Synced from Paper (new tokens) */\n' + '\n'.join(news) + '\n'
        content = TOKENS_CSS.read_text()
        idx = content.index('[data-ume-theme="dark"]')
        TOKENS_CSS.write_text(content[:idx].rstrip() + '\n' + block + '\n' + content[idx:])
    print(f'✓ wrote {TOKENS_CSS}  (dark block untouched; run npm run build)')

if __name__ == '__main__':
    main()
