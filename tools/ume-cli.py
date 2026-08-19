#!/usr/bin/env python3
"""ume-cli — project starter for the Ume design system.

Usage:
  python3 tools/ume-cli.py new my-app
  python3 tools/ume-cli.py add my-app

Scaffolds a Vite + React + TypeScript project with ume as a local file dependency,
the correct font links, and an example App.tsx that uses every component.
"""
import argparse, os, sys, json, shutil, subprocess, textwrap, pathlib

REPO = pathlib.Path(__file__).resolve().parent.parent.parent
TEMPLATE = REPO / 'tools' / 'ume-cli' / 'template'

TEMPLATE_FILES: dict[str, str] = {
 'package.json': json.dumps({
   'name': '{name}', 'private': True, 'version': '0.1.0', 'type': 'module',
   'scripts': {'dev': 'vite', 'build': 'tsc -b && vite build', 'preview': 'vite preview'},
   'dependencies': {
     'react': '^18.3.1', 'react-dom': '^18.3.1',
     'ume': f'file:{REPO}',
   },
   'devDependencies': {
     '@types/react': '^18.3.12', '@types/react-dom': '^18.3.1',
     '@vitejs/plugin-react': '^4.3.4', 'typescript': '^5.6.3', 'vite': '^5.4.10',
   },
 }, indent=2),

 'tsconfig.json': json.dumps({
   'compilerOptions': {
     'target': 'ES2022', 'lib': ['ES2022', 'DOM', 'DOM.Iterable'],
     'module': 'ESNext', 'skipLibCheck': True, 'moduleResolution': 'Bundler',
     'allowImportingTsExtensions': True, 'resolveJsonModule': True,
     'isolatedModules': True, 'noEmit': True, 'jsx': 'react-jsx', 'strict': True,
   },
   'include': ['src'],
 }, indent=2),

 'vite.config.ts': "import { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\nexport default defineConfig({ plugins: [react()], server: { port: 5173 } });\n",

 'index.html': """<!doctype html>
<html lang="en" data-ume-theme="light">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{name}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200..800&family=Geist+Mono:wght@100..900&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
""",

 'src/main.tsx': """import React from 'react';
import ReactDOM from 'react-dom/client';
import { UmeProvider } from 'ume';
import 'ume/styles.css';
import { App } from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UmeProvider theme="light">
      <App />
    </UmeProvider>
  </React.StrictMode>
);
""",

 'README.md': """# {name}

Bootstrapped with **ume-cli**. Built on Vite + React + TypeScript, themed by the Ume design system.

## Run

```
npm install
npm run dev
```

Open http://localhost:5173.

## Theming

`<UmeProvider theme="light">` or `theme="dark"`. The `data-ume-theme` attribute on
`<html>` switches the whole document.

## Where to next

- Replace `src/App.tsx` with your real UI.
- Read the docs at https://ume.saberali.co for every component and its API.
- Add your brand color in `src/ume.css` overriding `--ume-action-accent-bg`,
  or fork the tokens in Paper and re-sync.
""",
}


def cmd_new(name: str) -> None:
    """Scaffold a new project."""
    target = pathlib.Path(name).resolve()
    if target.exists():
        print(f'error: {target} already exists', file=sys.stderr)
        sys.exit(1)
    print(f'Scaffolding {target}…')
    for relpath, content in TEMPLATE_FILES.items():
        out = target / relpath
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(content.format(name=name))
    print(f'✓ {target} created.')
    print()
    print(f'  cd {target.name}')
    print('  npm install')
    print('  npm run dev')


def cmd_add(target: str) -> None:
    """Add ume to an existing project."""
    p = pathlib.Path(target).resolve()
    pkg = p / 'package.json'
    if not pkg.exists():
        print(f'error: {pkg} not found — is this a Node project?', file=sys.stderr)
        sys.exit(1)
    data = json.loads(pkg.read_text())
    deps = data.setdefault('dependencies', {})
    deps['ume'] = f'file:{REPO}'
    pkg.write_text(json.dumps(data, indent=2))
    print(f'✓ added ume → {pkg}')
    print('  npm install')


def main() -> None:
    ap = argparse.ArgumentParser(prog='ume-cli', description='Ume design system starter.')
    sub = ap.add_subparsers(dest='cmd', required=True)
    p_new = sub.add_parser('new', help='scaffold a new project with ume')
    p_new.add_argument('name')
    p_add = sub.add_parser('add', help='add ume to an existing package.json')
    p_add.add_argument('path', nargs='?', default='.')
    args = ap.parse_args()
    if args.cmd == 'new':
        cmd_new(args.name)
    elif args.cmd == 'add':
        cmd_add(args.path)


if __name__ == '__main__':
    main()
