import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'extension/content/src/index.ts',
  output: {
    dir: 'dist/extension/content',
    format: 'cjs'
  },
  plugins: [
    nodeResolve({ browser: true }),
    commonjs(),
    typescript({
      tsconfig: 'extension/content/tsconfig.json'
    }), terser()
  ]
};
