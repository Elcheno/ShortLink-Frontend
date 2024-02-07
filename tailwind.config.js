/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'black-primary': '#18181B',
        'black-light': '#27272A',
        'black-dark': '#09090B',

        'white-primary': '#fafafa',
        'white-secondary': '#f4f4f5',

        'orange-primary': '#F87900',
        'orange-light': '#FF9333',
        'orange-dark': '#E86600',
      }
    },
  },
  plugins: [],
}

