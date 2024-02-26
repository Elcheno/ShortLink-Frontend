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
        'black-ultralight': '#3f3f46',

        'white-primary': '#fafafa',
        'white-secondary': '#f4f4f5',

        'orange-primary': '#F87900',
        'orange-light': '#FF9333',
        'orange-dark': '#E86600',
      }
      ,screens: {
        '3xl': '1921px'
      },
      animation: {
        "pop": "pop 0.3s ease-out",
        "zoom-in": "zoom-in 0.05s ease-out",
        "zoom-in-1": "zoom-in 0.1s ease-out",
      },
      keyframes: {
        "pop": {
          "0%": {
            "transform": "scale(1)"
          },
          "50%": {
            "transform": "scale(1.025)"
          },
          "100%": {
            "transform": "scale(1)"
          }
        },
        "zoom-in": {
          "0%": {
            "opacity": "0",
            "transform": "scale(.5)"
          },
          "100%": {
            "opacity": "1",
            "transform": "scale(1)"
          }
        }
      }
    },
  },
  plugins: [],
}

