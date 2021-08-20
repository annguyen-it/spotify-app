const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  darkMode: false,
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './src/**/*.{js,ts,html}'
    ]
  },
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      gray: colors.trueGray,
    }
  },
  extend: {
    transitionProperty: {
      height: 'height',
    },
  },
  variants: {},
  plugin: []
}
