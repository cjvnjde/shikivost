/** @type {import("prettier").Config} */
const config = {
  printWidth: 160,
  tailwindFunctions: ['clsx', 'cn', 'twmerge', 'cva'],
  plugins: ['prettier-plugin-tailwindcss'],
};

module.exports = config;
