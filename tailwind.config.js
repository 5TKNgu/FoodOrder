/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*"],
  theme: {
    extend: {},
    fontFamily: {
      'playwrite': ['Playwrite GB S', 'sans-serif'],
      'lobster': ["Lobster", 'sans-serif'],
      'kavivanar':  ["Kavivanar", 'sans-serif'],
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
}