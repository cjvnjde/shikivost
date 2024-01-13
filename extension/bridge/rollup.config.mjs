import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'extension/bridge/src/lib/index.ts',
  output: {
    dir: 'dist/extension/bridge',
    format: 'cjs'
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript({
    tsconfig: 'extension/bridge/tsconfig.json'
  }),
    terser()
  ]
};
