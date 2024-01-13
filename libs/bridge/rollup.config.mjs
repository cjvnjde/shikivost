import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'libs/bridge/src/lib/index.ts',
  output: {
    dir: 'dist/libs/bridge',
    format: 'cjs'
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript({
      tsconfig: 'libs/bridge/tsconfig.json'
    }),
    terser()
  ]
};
