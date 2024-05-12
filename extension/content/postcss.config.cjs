module.exports = {
  plugins: [
    require('tailwindcss')('./extension/content/tailwind.config.js'),
    require('postcss-import'),
    require('postcss-nested'),
    require('autoprefixer'),
    require('cssnano'),
  ],
};
