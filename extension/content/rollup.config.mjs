import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

export default {
  input: 'extension/content/src/index.ts',
  output: {
    dir: 'dist/extension/content',
    format: 'cjs'
  },
  plugins: [typescript(), terser()]
};
