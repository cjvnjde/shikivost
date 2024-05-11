import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import alias from '@rollup/plugin-alias';

export default {
  input: 'extension/content/src/index.ts',
  output: {
    dir: 'dist/extension/content',
    format: 'cjs'
  },
  plugins: [
    alias({
      entries: [
        { find: 'react', replacement: 'preact/compat' },
        { find: 'react-dom/test-utils', replacement: 'preact/test-utils' },
        { find: 'react-dom', replacement: 'preact/compat' },
        { find: 'react/jsx-runtime', replacement: 'preact/jsx-runtime' }
      ]
    }),
    postcss({
      extract: true,
      config: {
        path: 'extension/content/postcss.config.cjs'
      }
    }),
    nodeResolve({ browser: true }),
    commonjs(),
    typescript({
      tsconfig: 'extension/content/tsconfig.json'
    }),
    terser()
  ]
};
