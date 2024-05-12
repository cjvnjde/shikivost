import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import replace from '@rollup/plugin-replace';

export default {
  input: 'extension/content/src/index.ts',
  output: {
    dir: 'dist/extension/content',
    format: 'cjs',
  },
  plugins: [
    replace({
      preventAssignment: false,
      'process.env.NODE_ENV': '"development"',
    }),
    postcss({
      extract: true,
      config: {
        path: 'extension/content/postcss.config.cjs',
      },
    }),
    nodeResolve({ browser: true }),
    commonjs(),
    typescript({
      tsconfig: 'extension/content/tsconfig.json',
    }),
    terser(),
  ],
};
