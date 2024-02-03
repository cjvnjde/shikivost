import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss'

export default {
  input: 'extension/content/src/index.ts',
  output: {
    dir: 'dist/extension/content',
    format: 'cjs'
  },
  plugins: [
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
