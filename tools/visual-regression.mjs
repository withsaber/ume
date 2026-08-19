#!/usr/bin/env node
/* Visual regression smoke for ume.saberali.co — captures every doc route
   and writes PNGs to .snapshots/. Compares against a baseline in .snapshots/baseline/.
   Usage:
     node tools/visual-regression.mjs capture   # build current state
     node tools/visual-regression.mjs compare   # diff against baseline
*/
import { chromium } from 'playwright';
import { mkdir, writeFile, readdir, readFile, stat } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const ROUTES = [
  '/', '/introduction', '/quickstart', '/colors', '/typography', '/shadows', '/labels',
  '/form-patterns', '/button', '/iconbutton', '/buttongroup', '/icontext',
  '/input', '/textarea', '/select', '/codeinput',
  '/password', '/phone', '/card', '/expiry',
  '/banner', '/dialog', '/popover', '/progress', '/skeleton',
  '/card-page', '/chip', '/avatar', '/facepile', '/chatbubble', '/divider',
  '/tabs', '/dropdown', '/menu',
  '/badge', '/breadcrumb', '/filter', '/checklist',
  '/icons',
];

const BASE = resolve(process.cwd(), '.snapshots');
const SHOT_DIR = join(BASE, process.argv[2] === 'compare' ? 'current' : 'baseline');

async function capture(label) {
  await mkdir(SHOT_DIR, { recursive: true });
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 1600 } });
  const page = await ctx.newPage();
  const results = [];
  for (const route of ROUTES) {
    const url = `https://ume.saberali.co${route}`;
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
      await page.waitForTimeout(300);
      const slug = route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '-');
      const path = join(SHOT_DIR, `${slug}.png`);
      await page.screenshot({ path, fullPage: true });
      const s = await stat(path);
      results.push({ route, bytes: s.size });
      console.log(`  ✓ ${route} (${(s.size / 1024).toFixed(1)}kb)`);
    } catch (e) {
      console.log(`  ✗ ${route} — ${e.message}`);
      results.push({ route, error: e.message });
    }
  }
  await browser.close();
  await writeFile(join(SHOT_DIR, 'index.json'), JSON.stringify(results, null, 2));
}

async function compare() {
  const baseDir = join(BASE, 'baseline');
  const curDir = join(BASE, 'current');
  await mkdir(curDir, { recursive: true });
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 1600 } });
  const page = await ctx.newPage();
  const diffs = [];
  for (const route of ROUTES) {
    const slug = route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '-');
    const url = `https://ume.saberali.co${route}`;
    await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(300);
    await page.screenshot({ path: join(curDir, `${slug}.png`), fullPage: true });
  }
  await browser.close();

  const bases = await readdir(baseDir).catch(() => []);
  const curs = await readdir(curDir).catch(() => []);
  for (const f of new Set([...bases, ...curs])) {
    if (f === 'index.json') continue;
    const b = await stat(join(baseDir, f)).catch(() => null);
    const c = await stat(join(curDir, f)).catch(() => null);
    if (!b || !c) { diffs.push({ file: f, status: 'missing' }); continue; }
    const dr = Math.abs(b.size - c.size) / b.size;
    if (dr > 0.05) diffs.push({ file: f, baseline: b.size, current: c.size, drift: dr });
  }
  if (diffs.length === 0) console.log('✓ all snapshots match baseline (within 5%)');
  else { console.log(`✗ ${diffs.length} differences:`); diffs.forEach((d) => console.log(' ', d)); process.exit(1); }
}

const mode = process.argv[2];
if (mode === 'compare') compare();
else capture(mode || 'baseline');
