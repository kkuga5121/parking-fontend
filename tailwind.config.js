/** @type {import('tailwindcss').Config} */

// const forms = require('@tailwindcss/forms');
// const typography = require('@tailwindcss/typography');
// const aspectRatio = require('@tailwindcss/aspect-ratio');
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  important: '#root',
  theme: {
    extend: {},
  },
  corePlugins: {
    // Remove the Tailwind CSS preflight styles so it can use Material UI's preflight instead (CssBaseline).
    preflight: false,
  },
  // plugins: [forms, typography, aspectRatio],
};