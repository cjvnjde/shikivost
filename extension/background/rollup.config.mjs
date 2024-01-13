import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

export default {
  input: 'extension/background/src/index.ts',
  output: {
    dir: 'dist/extension/background',
    format: 'cjs'
  },
  plugins: [typescript(), terser()]
};
