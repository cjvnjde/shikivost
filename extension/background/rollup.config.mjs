import typescript from '@rollup/plugin-typescript';

export default {
  input: 'extension/background/src/index.ts',
  output: {
    dir: 'dist/extension/background',
    format: 'cjs'
  },
  plugins: [typescript()]
};
