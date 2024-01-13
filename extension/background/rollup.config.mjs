import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'extension/background/src/index.ts',
  output: {
    dir: 'dist/extension/background',
    format: 'cjs'
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript({
      tsconfig: 'extension/background/tsconfig.json'
    }),
    terser()
  ]
};
