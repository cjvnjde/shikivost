import typescript from '@rollup/plugin-typescript';
import html from '@rollup/plugin-html';

export default {
  input: 'extension/popup/src/index.ts',
  output: {
    dir: 'dist/extension/popup',
    format: 'cjs'
  },
  plugins: [typescript(), html({ title: "Popup"})]
};
