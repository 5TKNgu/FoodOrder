/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    files: ["*"],
    transform: (content) => content.replace(/taos:/g, ''),
  },
  theme: {
    extend: {},
    fontFamily: {
      'playwrite': ['Playwrite GB S', 'sans-serif'],
      'lobster': ["Lobster", 'sans-serif'],
      'kavivanar':  ["Kavivanar", 'sans-serif'],
    },
    colors: {
      'brown-light': '#F5F5F5',
    },
  },
  safelist: [
    '!duration-[0ms]',
    '!delay-[0ms]',
    'html.js :where([class*="taos:"]:not(.taos-init))'
  ],
  plugins: [
    require('daisyui'),
    require('taos/plugin'),
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
}