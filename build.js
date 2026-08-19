/* ume build: bundles src/ into dist/esm and dist/cjs, extracting CSS,
   and emits .d.ts declarations via tsc for the full module surface. */
const esbuild = require('esbuild');
const { execSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const shared = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  sourcemap: true,
  target: ['es2019'],
  external: ['react', 'react-dom', 'react-dom/*', 'react/jsx-runtime'],
  loader: { '.css': 'css' },
  logLevel: 'info',
};

async function build() {
  await Promise.all([
    esbuild.build({ ...shared, format: 'esm', outfile: 'dist/esm/index.js' }),
    esbuild.build({ ...shared, format: 'cjs', outfile: 'dist/cjs/index.js' }),
  ]);
  // Emit declarations for the whole module surface (every component file).
  fs.mkdirSync('dist/types', { recursive: true });
  execSync(
    'npx tsc --emitDeclarationOnly --declaration --declarationMap false ' +
    '--jsx react-jsx --outDir dist/types --rootDir src --skipLibCheck ' +
    'src/index.ts src/components/*.tsx src/components/ExtInputs.tsx src/icons/icons.ts',
    { stdio: 'inherit' },
  );
  // Rewrite dist/types/index.d.ts to use barrel re-exports (esbuild emits one file per entry).
  const indexDts =
    `import './tokens.css';\n` +
    `import './ume.css';\n\n` +
    `export * from './components/primitives';\n` +
    `export * from './components/composites';\n` +
    `export * from './components/Icon';\n` +
    `export * from './components/Select';\n` +
    `export * from './components/CodeInput';\n` +
    `export * from './components/TextArea';\n` +
    `export * from './components/DropdownSubmenu';\n` +
    `export * from './components/Portal';\n` +
    `export * from './components/KeyCodeSequence';\n` +
    `export * from './components/MonoTag';\n` +
    `export * from './components/ChatBubble';\n` +
    `export * from './components/Popover';\n` +
    `export * from './components/Menu';\n` +
    `export * from './components/CodeBlock';\n` +
    `export * from './components/Markdown';\n` +
    `export * from './hooks';\n` +
    `export { umeIcons } from './icons/icons';\n` +
    `export { Password, PhoneInput, CardNumber, ExpiryCVC } from './components/ExtInputs';\n` +
    `export type { PasswordProps, PhoneInputProps, CardNumberProps, CardBrand, ExpiryCVCProps } from './components/ExtInputs';\n`;
  fs.writeFileSync('dist/types/index.d.ts', indexDts);
  console.log('build complete (declarations emitted)');
}

build().catch((e) => { console.error(e); process.exit(1); });
