import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import html from '@rollup/plugin-html';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';

export default {
  input: 'extension/popup/src/index.tsx',
  output: {
    dir: 'dist/extension/popup',
    format: 'cjs'
  },
  plugins: [
    nodeResolve({ browser: true }),
    commonjs(),
    typescript({
      tsconfig: 'extension/popup/tsconfig.json'
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    terser(),
    html({ title: 'Popup' })
  ]
};
