const {
  scopedPreflightStyles,
  isolateInsideOfContainer,
} = require('tailwindcss-scoped-preflight');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./extension/content/src/**/*.{tsx,ts}'],
  theme: {
    extend: {},
  },
  plugins: [
    scopedPreflightStyles({
      isolationStrategy: isolateInsideOfContainer('.extension'),
    }),
  ],
  important: true,
};
