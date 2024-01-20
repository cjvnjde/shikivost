import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  preflight: { scope: '.extension' },
  include: ['./extension/content/src/**/*.{ts,tsx,js,jsx}'],
  exclude: [],
  outdir: 'styled-system',
});
