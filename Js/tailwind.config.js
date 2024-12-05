/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./Js/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
};
