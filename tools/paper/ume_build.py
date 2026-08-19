"""Shared builders for constructing the Ume design system in Paper."""
import sys, json
sys.path.insert(0, '/Users/saber/Documents/Ume/.hermes')
from paper_mcp import PaperMCP

INTER = "Plus Jakarta Sans"
MONO = "ui-monospace, Menlo, monospace"

def text(r):
    return r['content'][0]['text'] if isinstance(r, dict) and 'content' in r else str(r)

def created_ids(r):
    """Return list of created node ids from a write_html/create result."""
    try:
        d = json.loads(text(r))
        return [n['id'] for n in d.get('createdNodes', [])]
    except Exception:
        return []

def swatch(name, fill, caption=None):
    cap = caption if caption is not None else fill
    return (f'<div style="display:flex;flex-direction:column;gap:6px;width:96px;flex-shrink:0;">'
            f'<div style="width:96px;height:56px;border-radius:10px;background:{fill};'
            f'box-shadow:inset 0 0 0 1px var(--color-border-subtle);"></div>'
            f'<div style="font-family:{MONO};font-size:11px;color:var(--color-text-primary);">{name}</div>'
            f'<div style="font-family:{MONO};font-size:11px;color:var(--color-text-tertiary);">{cap}</div>'
            f'</div>')

def section(title, inner):
    return (f'<div style="display:flex;flex-direction:column;gap:16px;">'
            f'<div style="font-family:{INTER};font-size:13px;font-weight:600;letter-spacing:0.04em;'
            f'text-transform:uppercase;color:var(--color-text-tertiary);">{title}</div>{inner}</div>')

def row(inner, gap=12):
    return f'<div style="display:flex;flex-wrap:wrap;gap:{gap}px;">{inner}</div>'

def page_header(title, sub):
    return ('<div style="display:flex;flex-direction:column;gap:8px;">'
            f'<div style="font-family:{INTER};font-size:32px;font-weight:700;letter-spacing:-0.02em;'
            f'color:var(--color-text-primary);">{title}</div>'
            f'<div style="font-family:{INTER};font-size:14px;color:var(--color-text-secondary);">{sub}</div>'
            '</div>')

def label(txt):
    return (f'<div style="font-family:{INTER};font-size:12px;font-weight:500;'
            f'color:var(--color-text-tertiary);">{txt}</div>')

# ---------- Component builders (state replicas of ume.css) ----------

def btn(txt, bg, color, border=False, opacity=None, ring=False, size='md'):
    h, pad, fs, rad = ('36px','0 16px','14px','10px') if size=='md' else ('28px','0 12px','13px','6px')
    o = f'opacity:{opacity};' if opacity is not None else ''
    sh = ''
    if border: sh = 'box-shadow:inset 0 0 0 1px var(--color-border-default);'
    if ring: sh = 'box-shadow:0 0 0 3px rgba(239,96,63,0.28);'
    return (f'<div style="display:inline-flex;align-items:center;justify-content:center;height:{h};padding:{pad};'
            f'border-radius:{rad};background:{bg};color:{color};font-family:{INTER};font-size:{fs};'
            f'font-weight:550;white-space:nowrap;{o}{sh}">{txt}</div>')

def state_col(title, inner):
    return (f'<div style="display:flex;flex-direction:column;gap:8px;align-items:flex-start;">'
            f'<div style="font-family:{MONO};font-size:11px;color:var(--color-text-tertiary);">{title}</div>{inner}</div>')

def variant_row(name, states, gap=32):
    return section(name, row(''.join(state_col(t, b) for t, b in states), gap=gap))

# Minimal 16px stroke icons (lucide-style paths)
_ICONS = {
 'plus': '<path d="M8 3v10M3 8h10"/>',
 'x': '<path d="M4 4l8 8M12 4l-8 8"/>',
 'chevron-down': '<path d="M4 6l4 4 4-4"/>',
 'search': '<circle cx="7" cy="7" r="4"/><path d="M10.5 10.5L14 14"/>',
 'trash': '<path d="M3 4h10M6 4V2.5h4V4M4.5 4l.7 9h5.6l.7-9"/>',
 'check': '<path d="M3 8.5l3.5 3.5L13 4.5"/>',
 'star': '<path d="M8 2.5l1.8 3.6 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4L2.2 6.7l4-.6z"/>',
 'copy': '<rect x="5" y="5" width="8" height="8" rx="1.5"/><path d="M3 10V3.5A1.5 1.5 0 0 1 4.5 2H11"/>',
 'info': '<circle cx="8" cy="8" r="6"/><path d="M8 7.2V11M8 4.8v.2"/>',
 'warning': '<path d="M8 2.5L14.5 13h-13z"/><path d="M8 6.5v3M8 11v.2"/>',
 'dot': '<circle cx="8" cy="8" r="3" fill="currentColor" stroke="none"/>',
}
def icon(name, size=16, color='currentColor'):
    return (f'<svg width="{size}" height="{size}" viewBox="0 0 16 16" fill="none" '
            f'stroke="{color}" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round">'
            f'{_ICONS[name]}</svg>')
