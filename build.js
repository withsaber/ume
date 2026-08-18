/* ume build: bundles src/ into dist/esm and dist/cjs, extracting CSS. */
const esbuild = require('esbuild');

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
  console.log('build complete');
}

build().catch((e) => { console.error(e); process.exit(1); });
