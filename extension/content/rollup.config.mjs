import typescript from '@rollup/plugin-typescript';

export default {
  input: 'extension/content/src/index.ts',
  output: {
    dir: 'dist/extension/content',
    format: 'cjs'
  },
  plugins: [typescript()]
};
