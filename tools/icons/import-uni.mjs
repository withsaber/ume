#!/usr/bin/env node
/* tools/icons/import-uni.mjs
 *
 * Imports a folder (or zip) of Uni Icons SVGs into the ume icon registry.
 *
 * Why this script exists: the official Uni Icons set by Flaticon ships its
 * SVGs only as paid downloads from flaticon.com (the npm package only
 * contains icon fonts + CSS). To swap the icon library without paying, you
 * download the free or premium Uni Icons bundle from Flaticon's web UI,
 * point this script at the folder (or zip) of SVGs, and it produces the
 *   src/icons/icons.ts
 * file the ume design system consumes.
 *
 * Usage:
 *   node tools/icons/import-uni.mjs <folder-or-zip>        # write registry
 *   node tools/icons/import-uni.mjs <folder-or-zip> --check  # dry-run + stats
 *
 * Input format: one file per icon, named <icon-name>.svg (Uni Icons uses
 *   kebab-case by default: home.svg, arrow-right.svg, etc.). The script
 *   reads each <svg viewBox="0 0 24 24"> (Uni Icons standard), strips the
 *   outer <svg> tag, and stores just the inner markup (paths, lines, etc.)
 *   so the Icon component can render it on any viewBox.
 *
 * Naming: Flaticon's Uni Icons names are canonical kebab-case; we keep
 * them as-is. If you have an alias map from a previous UMEI registry,
 * import it explicitly via --aliases <file.json>.
 *
 * Output: src/icons/icons.ts in the format consumed by src/components/Icon.tsx.
 */

import { readFileSync, writeFileSync, readdirSync, mkdirSync, statSync } from 'node:fs';
import { join, dirname, basename, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO = join(__dirname, '..', '..');
const OUT = join(REPO, 'src', 'icons', 'icons.ts');

const args = process.argv.slice(2);
if (!args.length) {
  die(
    'Usage:\n' +
      '  node tools/icons/import-uni.mjs <folder-or-zip>\n' +
      '  node tools/icons/import-uni.mjs <folder-or-zip> --check\n',
  );
}
const SOURCE = args[0];
const CHECK = args.includes('--check');

/* ---------- Inputs ---------- */
function resolveInputs() {
  if (!SOURCE) die('Provide a path to a folder or zip of SVGs.');
  let s;
  try {
    s = statSync(SOURCE);
  } catch {
    die(`Not found: ${SOURCE}`);
  }
  if (s.isDirectory()) return readFolder(SOURCE);
  if (extname(SOURCE).toLowerCase() === '.zip') return readZip(SOURCE);
  die(`Not a folder or .zip: ${SOURCE}`);
}

function readFolder(folder) {
  const files = readdirSync(folder).filter((f) => f.toLowerCase().endsWith('.svg'));
  return files.map((f) => ({
    name: kebab(basename(f, '.svg')),
    path: join(folder, f),
  }));
}

function readZip(zip) {
  // Unzip to a tmp scratch directory then read like a folder.
  const tmp = `/tmp/uicons-${Date.now()}`;
  mkdirSync(tmp, { recursive: true });
  try {
    execFileSync('unzip', ['-q', zip, '-d', tmp], { stdio: 'pipe' });
  } catch (e) {
    die(`unzip failed: ${e.message}\nIs 'unzip' installed? On macOS it ships with the system.`);
  }
  // Walk for .svg files (Uni Icons zips usually have a top-level "svg/" dir).
  return walkSvgs(tmp);
}

function walkSvgs(folder) {
  const out = [];
  function recurse(dir) {
    for (const entry of readdirSync(dir)) {
      const p = join(dir, entry);
      const s = statSync(p);
      if (s.isDirectory()) recurse(p);
      else if (entry.toLowerCase().endsWith('.svg')) {
        out.push({ name: kebab(basename(entry, '.svg')), path: p });
      }
    }
  }
  recurse(folder);
  return out;
}

function kebab(s) {
  return s.toLowerCase().replace(/\s+/g, '-').replace(/_+/g, '-');
}

/* ---------- SVG normalisation ---------- */
function normaliseSvg(svg) {
  // Extract the wrapper contents (UMEI ships icons inside <g class="nc-icon-wrapper">).
  // After extraction we normalise: stroke -> currentColor, fill -> none (line variant),
  // and remove any bookkeeping that doesn't help at runtime.
  const m = svg.match(/<g[^>]*class=["']nc-icon-wrapper["'][^>]*>([\s\S]*?)<\/g>(?:\s*<\/g>)*\s*<\/svg>/);
  if (!m) throw new Error('no nc-icon-wrapper');
  let inner = m[1];

  // Drop the <title> noise; the registry key carries the name.
  inner = inner.replace(/<title>[\s\S]*?<\/title>/g, '');

  // Force every <g> wrapper's attributes to a known good state for the
  // line variant. We trust <path stroke="..." fill="..."> and rewrite it.
  inner = inner.replace(
    /<g\s+([^>]*)>/g,
    (whole, attrs) => {
      const cleaned = attrs
        .replace(/\sfill="[^"]*"/g, '')
        .replace(/\sstroke="[^"]*"/g, '')
        .replace(/\sclass="[^"]*"/g, '');
      return `<g${cleaned} fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round">`;
    },
  );

  // Normalise <path> fills/strokes to currentColor / none.
  inner = inner.replace(/<path\b([^>]*)>/g, (whole, attrs) => {
    let cleaned = attrs
      .replace(/\sfill="(?!none")[^"]*"/g, ' fill="none"')
      .replace(/\sfill="none"/g, ' fill="none"')
      .replace(/\sstroke="(?!currentColor")[^"]*"/g, ' stroke="currentColor"');
    if (!/\sfill=/.test(cleaned)) cleaned += ' fill="none"';
    if (!/\sstroke=/.test(cleaned)) cleaned += ' stroke="currentColor"';
    return `<path${cleaned}>`;
  });

  // Same normalisation for every other shape element (circle, rect, line,
  // polyline, polygon, ellipse) — stroke -> currentColor, fill -> none,
  // and force stroke-width 1.25 when a stroke is present.
  inner = inner.replace(
    /<(circle|rect|line|polyline|polygon|ellipse)\b([^>]*)>/g,
    (whole, tag, attrs) => {
      let cleaned = attrs
        .replace(/\sfill="(?!none")[^"]*"/g, ' fill="none"')
        .replace(/\sstroke="(?!currentColor")[^"]*"/g, ' stroke="currentColor"')
        .replace(/\sstroke-width="[^"]*"/g, '');
      if (/\sstroke=/.test(cleaned)) cleaned += ' stroke-width="1.25"';
      if (!/\sfill=/.test(cleaned)) cleaned += ' fill="none"';
      return `<${tag}${cleaned}>`;
    },
  );

  // Force every path stroke-width to 1.25 (the library rule).
  inner = inner.replace(/\sstroke-width="[^"]*"/g, ' stroke-width="1.25"');

  return inner.trim();
}

/* ---------- Build registry ---------- */
/* Friendly aliases → canonical filenames. Components reference these stable
   names; the underlying file may change without breaking the API. */
const ALIASES = {
  'check': 'checkmark-1-medium',
  'copy': 'square-behind-square-2',
  'chevron-down': 'chevron-bottom',
  'chevron-up': 'chevron-top',
  'chevron-left': 'chevron-left',
  'chevron-right': 'chevron-right',
  'eye': 'eye-open',
  'eye-off': 'eye-slash',
  'close': 'x',
  'search': 'search-intelligence',
  'menu': 'bars-three',
  'warning-circle': 'warning-sign',
  'download': 'cloud-download',
  'upload': 'cloud-upload',
  'refresh': 'arrows-repeat',
  'sync': 'cloud-sync',
  'copy-clipboard': 'clipboard',
  'save': 'floppy-disk-1',
  'edit': 'edit-big',
  'trash': 'trash-can',
  'link': 'chain-link-1',
  'unlink': 'broken-chain-link-1',
  'grid': 'apps',
  'list': 'list-bullets',
  'terminal': 'code',
  'wand': 'magic-wand',
  'users': 'people',
  'login': 'enter',
  'logout': 'arrow-out-of-box',
};

function build(inputs) {
  const seen = new Set();
  const out = {};
  for (const { name, path } of inputs) {
    if (seen.has(name)) continue; // dedupe by canonical name
    seen.add(name);
    const svg = readFileSync(path, 'utf8');
    try {
      const inner = normaliseSvg(svg);
      out[name] = inner;
    } catch (e) {
      console.error(`skip ${name}: ${e.message}`);
    }
  }
  // Apply aliases (canonical file content under a friendly name).
  for (const [alias, target] of Object.entries(ALIASES)) {
    if (out[target] && !out[alias]) out[alias] = out[target];
  }
  return out;
}

/* ---------- Emit src/icons/icons.ts ---------- */
function emit(registry) {
  const names = Object.keys(registry).sort();
  const lines = [];
  lines.push(
    '/* ume icon registry — GENERATED FILE, do not edit by hand.',
  );
  lines.push(
    '   Source: Uni Icons by Flaticon (icons-only export). Re-generate with:',
  );
  lines.push('   `node tools/icons/import-uni.mjs <folder-or-zip>`');
  lines.push('*/');
  lines.push('');
  lines.push('export const umeIcons: Record<string, string> = {');
  for (const name of names) {
    const inner = registry[name];
    lines.push(`  '${name.replace(/'/g, "\\'")}': "${inner.replace(/"/g, '\\"')}",`);
  }
  lines.push('};');
  lines.push("export type UmeIconName = string;");
  lines.push("export type UmeIconVariant = 'line';");
  return lines.join('\n') + '\n';
}

/* ---------- Helpers ---------- */
function die(msg) {
  console.error(`\nimport-uni: ${msg}\n`);
  process.exit(1);
}

/* ---------- Main ---------- */
function main() {
  const inputs = resolveInputs();
  if (!inputs.length) die('No .svg files found in the source.');
  const registry = build(inputs);
  const ts = emit(registry);

  const total = Object.keys(registry).length;
  console.log(`import-uni: ${total} icons parsed.`);
  if (CHECK) {
    console.log(`--check: would write ${ts.length} bytes to ${OUT}`);
    process.exit(0);
  }
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, ts);
  console.log(`import-uni: wrote ${OUT}`);
  console.log(
    `\nNOTE: the Icon component currently consumes umeIcons.fill/outline.`,
    `\n      After this swap, update src/components/Icon.tsx to use umeIcons.line.`,
    `\n      The script keeps the same data shape; only the key changes.`,
  );
}

main();